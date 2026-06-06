import type { APIRoute } from 'astro';

export const prerender = false;

const safe = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const POST: APIRoute = async ({ request }) => {
  const json = (data: object, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid_request' }, 400);
  }

  const name    = fd.get('name')?.toString().trim()    ?? '';
  const email   = fd.get('email')?.toString().trim()   ?? '';
  const subject = fd.get('subject')?.toString().trim() ?? '';
  const message = fd.get('message')?.toString().trim() ?? '';

  if (!name || !email || !subject || !message)
    return json({ ok: false, error: 'missing_fields' }, 400);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ ok: false, error: 'invalid_email' }, 400);

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return json({ ok: false, error: 'server_config_error' }, 500);
  }

  const html = `
    <h2>Yeni İletişim Formu Mesajı</h2>
    <p><strong>Ad Soyad:</strong> ${safe(name)}</p>
    <p><strong>E-posta:</strong> ${safe(email)}</p>
    <p><strong>Konu:</strong> ${safe(subject)}</p>
    <hr />
    <p>${safe(message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GİTA Teknoloji Web <noreply@gitateknoloji.com>',
        to:   'info@gitateknoloji.com',
        reply_to: email,
        subject: `[Web Formu] ${safe(subject)}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text());
      return json({ ok: false, error: 'send_failed' }, 500);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return json({ ok: false, error: 'unexpected_error' }, 500);
  }
};
