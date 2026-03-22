import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Deploy kontrolü: tarayıcıda GET /api/health → 200 JSON */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, service: '3d-murat-api' });
}
