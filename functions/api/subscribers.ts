/**
 * Export subscriber list from Cloudflare KV.
 * Protected by a simple API key in the Authorization header.
 *
 * Usage: curl -H "Authorization: Bearer YOUR_ADMIN_KEY" https://cbarrgs.com/api/subscribers
 *
 * Set ADMIN_API_KEY in Cloudflare Pages environment variables.
 */

interface Env {
  SUBSCRIBERS: KVNamespace;
  ADMIN_API_KEY?: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
}

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

/** Constant-time comparison; hashing first makes the inputs equal length. */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);
  return crypto.subtle.timingSafeEqual(hashA, hashB);
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  const token = /^Bearer (.+)$/.exec(request.headers.get('Authorization') || '')?.[1];
  if (!env.ADMIN_API_KEY || !token || !(await safeEqual(token, env.ADMIN_API_KEY))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: HEADERS });
  }

  // KV list returns at most 1000 keys per call; follow the cursor to the end.
  const subscribers: Subscriber[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.SUBSCRIBERS.list({ cursor });
    // Subscriber keys are email addresses; skip internal keys such as the old __count__.
    const names = page.keys.map((key) => key.name).filter((name) => name.includes('@'));
    const values = await Promise.all(names.map((name) => env.SUBSCRIBERS.get(name)));
    names.forEach((name, i) => {
      const value = values[i];
      if (!value) return;
      try {
        subscribers.push(JSON.parse(value));
      } catch {
        subscribers.push({ email: name, subscribedAt: 'unknown' });
      }
    });
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return new Response(JSON.stringify({
    count: subscribers.length,
    subscribers,
    exportedAt: new Date().toISOString(),
  }), { headers: HEADERS });
};
