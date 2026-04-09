interface Env {
  SUBSCRIBERS: KVNamespace;
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

  // Store in KV with timestamp and source metadata
  const subscribedAt = new Date().toISOString();
  await env.SUBSCRIBERS.put(email, JSON.stringify({
    email,
    subscribedAt,
    source: new URL(request.url).origin,
  }));

  // Update subscriber count in KV for quick stats
  const countStr = await env.SUBSCRIBERS.get('__count__');
  const count = countStr ? parseInt(countStr, 10) + 1 : 1;
  await env.SUBSCRIBERS.put('__count__', String(count));

  return jsonResponse({ status: 'subscribed', message: 'Thank you for subscribing!' });
};
