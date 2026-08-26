// Same-origin proxy for the cbarrgs-marketing-agent worker.
// The site's CSP is connect-src 'self', so the browser can't call the
// worker directly; this function fetches it server-side. It also
// normalizes the payload to plain text (the hero renders these strings
// as text, never HTML).

const AGENT_NEWS_URL = 'https://cbarrgs-marketing-agent.joe-184.workers.dev/api/news';

interface MarketingNews {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}

function toPlainText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const text = value
    .replace(/<[^>]*>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  return text.length > 0 && text.length <= 200 ? text : undefined;
}

export const onRequestGet: PagesFunction = async () => {
  try {
    const upstream = await fetch(AGENT_NEWS_URL, {
      signal: AbortSignal.timeout(5000),
    });
    if (!upstream.ok) throw new Error(`agent responded ${upstream.status}`);
    const raw = (await upstream.json()) as MarketingNews;
    const news = {
      headline: toPlainText(raw.headline),
      subheadline: toPlainText(raw.subheadline),
      ctaText: toPlainText(raw.ctaText),
    };
    return new Response(JSON.stringify(news), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch {
    // Client hook falls back to its built-in copy on any non-2xx.
    return new Response(JSON.stringify({ error: 'news unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
