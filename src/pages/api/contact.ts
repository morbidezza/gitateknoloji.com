import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name    = data.get('name')?.toString().trim();
  const email   = data.get('email')?.toString().trim();
  const subject = data.get('subject')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_email' }), { status: 400 });
  }

  const safeHtml = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'GİTA Teknoloji Web <noreply@gitateknoloji.com>',
      to: 'info@gitateknoloji.com',
      replyTo: email,
      subject: `[Web Formu] ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${safeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${safeHtml(email)}</p>
        <p><strong>Konu:</strong> ${safeHtml(subject)}</p>
        <hr />
        <p>${safeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), { status: 500 });
  }
};
