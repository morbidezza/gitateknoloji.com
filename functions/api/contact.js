const safe = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  let fd;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false }, 400);
  }

  const name    = fd.get('name')?.toString().trim()    ?? '';
  const email   = fd.get('email')?.toString().trim()   ?? '';
  const subject = fd.get('subject')?.toString().trim() ?? '';
  const message = fd.get('message')?.toString().trim() ?? '';

  if (!name || !email || !subject || !message) return json({ ok: false }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  return json({ ok: false }, 400);

  const html = `
    <p><strong>Ad Soyad:</strong> ${safe(name)}</p>
    <p><strong>E-posta:</strong> ${safe(email)}</p>
    <p><strong>Konu:</strong> ${safe(subject)}</p>
    <p><strong>Mesaj:</strong></p>
    <p>${safe(message).replace(/\n/g, '<br>')}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'GİTA Teknoloji <noreply@gitateknoloji.com>',
      to:   ['info@gitateknoloji.com'],
      reply_to: email,
      subject: `Web iletişim: ${safe(subject)}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', await res.text());
    return json({ ok: false }, 500);
  }

  return json({ ok: true });
}
