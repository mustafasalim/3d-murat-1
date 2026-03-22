import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      ok: true,
      message: 'Teklif için POST + JSON gövde (Content-Type: application/json) kullanın.',
    });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'Sunucu yapılandırması eksik (RESEND_API_KEY).' });
    return;
  }

  const body = req.body as Record<string, unknown> | undefined;
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'JSON gövde gerekli (Content-Type: application/json).' });
    return;
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const material = String(body.material ?? '').trim();
  const quantity = String(body.quantity ?? '').trim();
  const notes = String(body.notes ?? '').trim();
  const unitPrice = String(body.unitPrice ?? '').trim();
  const totalPrice = String(body.totalPrice ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !phone) {
    res.status(400).json({ error: 'Ad, e-posta ve telefon zorunludur.' });
    return;
  }

  let attachments: { filename: string; content: string }[] | undefined;
  const b64 = body.attachmentBase64;
  const attachmentName = String(body.attachmentName ?? 'ek.stl');
  if (typeof b64 === 'string' && b64.length > 0) {
    const buf = Buffer.from(b64, 'base64');
    if (buf.length > MAX_ATTACHMENT_BYTES) {
      res.status(413).json({
        error: `Ek dosya en fazla ${MAX_ATTACHMENT_BYTES / (1024 * 1024)} MB olabilir.`,
      });
      return;
    }
    attachments = [{ filename: attachmentName, content: b64 }];
  }

  const to = process.env.RESEND_TO_EMAIL ?? 'muratcankap16@gmail.com';
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  const html = `
    <h2 style="font-family:system-ui,sans-serif;">3D Murat — Teklif talebi</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;">
      <tr><td><strong>Ad</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>E-posta</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Telefon</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><strong>Malzeme</strong></td><td>${escapeHtml(material)}</td></tr>
      <tr><td><strong>Adet</strong></td><td>${escapeHtml(quantity)}</td></tr>
      <tr><td><strong>Birim (₺)</strong></td><td>${escapeHtml(unitPrice)}</td></tr>
      <tr><td><strong>Toplam (₺)</strong></td><td>${escapeHtml(totalPrice)}</td></tr>
      <tr><td colspan="2"><strong>Not</strong><br/>${escapeHtml(notes || '—')}</td></tr>
    </table>
    <pre style="font-family:ui-monospace,monospace;white-space:pre-wrap;font-size:13px;margin-top:16px;">${escapeHtml(message)}</pre>
  `;

  const payload: Record<string, unknown> = {
    from,
    to: [to],
    reply_to: email,
    subject: '3D Murat — Hızlı Teklif Talebi',
    html,
  };
  if (attachments?.length) {
    payload.attachments = attachments;
  }

  const controller = new AbortController();
  const kill = setTimeout(() => controller.abort(), 25_000);
  let r: Response;
  try {
    r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError';
    res.status(aborted ? 504 : 502).json({
      error: aborted
        ? 'İstek zaman aşımı (dosya çok büyük olabilir).'
        : 'E-posta sunucusuna bağlanılamadı.',
    });
    return;
  } finally {
    clearTimeout(kill);
  }

  const data = (await r.json().catch(() => ({}))) as { message?: string };

  if (!r.ok) {
    res.status(r.status >= 400 ? r.status : 502).json({
      error: data.message ?? 'E-posta gönderilemedi.',
    });
    return;
  }

  res.status(200).json({ ok: true });
}
