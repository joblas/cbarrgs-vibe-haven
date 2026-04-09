interface Env {
  SUBSCRIBERS: KVNamespace;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
}

interface SubscribeRequest {
  email: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: SubscribeRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400);
  }

  // Check for duplicate in KV
  const existing = await env.SUBSCRIBERS.get(email);
  if (existing) {
    return jsonResponse({ status: 'already_subscribed', message: "You're already on our mailing list!" });
  }

  // Store in KV with timestamp metadata
  await env.SUBSCRIBERS.put(email, JSON.stringify({
    email,
    subscribedAt: new Date().toISOString(),
  }));

  // Send notification email via Resend (non-blocking — don't fail subscription on email error)
  if (env.RESEND_API_KEY) {
    const notifyEmail = env.NOTIFY_EMAIL || 'cbarrgs@gmail.com';
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Cbarrgs <noreply@cbarrgs.com>',
          to: [notifyEmail],
          subject: 'New Subscriber on cbarrgs.com',
          html: `<p>New subscriber: <strong>${email}</strong></p><p>Subscribed at: ${new Date().toISOString()}</p>`,
        }),
      });
    } catch (err) {
      console.error('Failed to send notification email:', err);
    }
  }

  return jsonResponse({ status: 'subscribed', message: 'Thank you for subscribing!' });
};
