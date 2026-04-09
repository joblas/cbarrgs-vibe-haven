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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Require admin key
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');

  if (!env.ADMIN_API_KEY || token !== env.ADMIN_API_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // List all subscriber keys from KV
  const list = await env.SUBSCRIBERS.list();
  const subscribers: Array<{ email: string; subscribedAt: string }> = [];

  for (const key of list.keys) {
    // Skip internal keys
    if (key.name.startsWith('__')) continue;

    const value = await env.SUBSCRIBERS.get(key.name);
    if (value) {
      try {
        subscribers.push(JSON.parse(value));
      } catch {
        subscribers.push({ email: key.name, subscribedAt: 'unknown' });
      }
    }
  }

  return new Response(JSON.stringify({
    count: subscribers.length,
    subscribers,
    exportedAt: new Date().toISOString(),
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
