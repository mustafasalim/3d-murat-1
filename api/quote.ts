export const runtime = 'edge';

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

/** Tarayıcı farklı origin’den POST + FormData için; aynı origin’de de zararı yok. */
const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Edge’de büyük dosyada tek tek char birleştirmek dakikalar sürebilir; chunk ile çözülür. */
function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunk = 8192;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    const sub = bytes.subarray(i, Math.min(i + chunk, bytes.length));
    binary += String.fromCharCode.apply(null, sub as unknown as number[]);
  }
  return btoa(binary);
}

export default async function handler(request: Request): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (method === 'GET') {
    return json(
      {
        ok: true,
        message: 'Teklif formu POST ile gönderilir; bu adres tarayıcıda test içindir.',
      },
      200
    );
  }

  if (method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        ...corsHeaders,
        'content-type': 'application/json; charset=utf-8',
        Allow: 'GET, POST, OPTIONS',
      },
    });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return json({ error: 'Sunucu yapılandırması eksik (RESEND_API_KEY).' }, 500);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'Form verisi okunamadı.' }, 400);
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const material = String(formData.get('material') ?? '').trim();
  const quantity = String(formData.get('quantity') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();
  const unitPrice = String(formData.get('unitPrice') ?? '').trim();
  const totalPrice = String(formData.get('totalPrice') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !phone) {
    return json({ error: 'Ad, e-posta ve telefon zorunludur.' }, 400);
  }

  const file = formData.get('attachment');
  let attachments: { filename: string; content: string }[] | undefined;

  if (file instanceof Blob && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return json(
        { error: `Ek dosya en fazla ${MAX_ATTACHMENT_BYTES / (1024 * 1024)} MB olabilir (Vercel sınırı).` },
        413
      );
    }
    const fname = file instanceof File ? file.name : 'ek.stl';
    const base64 = arrayBufferToBase64(await file.arrayBuffer());
    attachments = [{ filename: fname, content: base64 }];
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

  const body: Record<string, unknown> = {
    from,
    to: [to],
    reply_to: email,
    subject: '3D Murat — Hızlı Teklif Talebi',
    html,
  };
  if (attachments?.length) {
    body.attachments = attachments;
  }

  const controller = new AbortController();
  const kill = setTimeout(() => controller.abort(), 25_000);
  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError';
    return json(
      {
        error: aborted
          ? 'İstek zaman aşımı (dosya çok büyük olabilir). Daha küçük STL deneyin.'
          : 'E-posta sunucusuna bağlanılamadı.',
      },
      aborted ? 504 : 502
    );
  } finally {
    clearTimeout(kill);
  }

  const data = (await res.json().catch(() => ({}))) as { message?: string };

  if (!res.ok) {
    return json(
      { error: data.message ?? 'E-posta gönderilemedi.' },
      res.status >= 400 ? res.status : 502
    );
  }

  return json({ ok: true }, 200);
}

function json(payload: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders,
    },
  });
}
