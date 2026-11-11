interface Env {
  SUBSCRIBERS: KVNamespace;
  RESEND_API_KEY: string;
}

// No whitespace, no second @, and none of the characters that could form markup.
const EMAIL_REGEX = /^[^\s@<>"'`&]+@[^\s@<>"'`&]+\.[^\s@<>"'`&]+$/;
const MAX_EMAIL_LENGTH = 254;

const SUBSCRIBED = { status: 'subscribed', message: 'Thank you for subscribing!' };

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

async function notifyOwners(apiKey: string, email: string, subscribedAt: string): Promise<void> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Cbarrgs Updates <notifications@cbarrgs.com>',
        to: ['cbarrgs@gmail.com', 'joe@joestechsolutions.com'],
        subject: 'New Subscriber: cbarrgs.com',
        html: `<p>You have a new subscriber!</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Date:</strong> ${subscribedAt}</p>`,
      }),
    });
    if (!res.ok) console.error(`Resend responded ${res.status}`);
  } catch (e) {
    console.error('Failed to send notification email:', e);
  }
}

// Same-origin form only: no CORS headers, so other sites can't drive this endpoint from a browser.
export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }
  const fields = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};

  // Honeypot: the form's hidden "website" field is invisible to people, so only
  // form-filling bots fill it. Answer as if it worked and store nothing.
  if (typeof fields.website === 'string' && fields.website.length > 0) {
    return jsonResponse(SUBSCRIBED);
  }

  const email = typeof fields.email === 'string' ? fields.email.trim().toLowerCase() : '';
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400);
  }

  const subscribedAt = new Date().toISOString();
  try {
    if (await env.SUBSCRIBERS.get(email)) {
      return jsonResponse({ status: 'already_subscribed', message: "You're already on our mailing list!" });
    }
    await env.SUBSCRIBERS.put(email, JSON.stringify({ email, subscribedAt }));
  } catch (e) {
    console.error('Subscriber store failed:', e);
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500);
  }

  if (env.RESEND_API_KEY) {
    context.waitUntil(notifyOwners(env.RESEND_API_KEY, email, subscribedAt));
  }

  return jsonResponse(SUBSCRIBED);
};
