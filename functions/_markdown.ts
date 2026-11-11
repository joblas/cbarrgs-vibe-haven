/**
 * Markdown for Agents: content negotiation for page routes.
 *
 * The site is a client-rendered SPA, so its HTML shell carries no readable
 * content. Requests that prefer `text/markdown` get a markdown document
 * instead; browsers (which never send text/markdown) keep getting HTML.
 */

export interface MarkdownEnv {
  ASSETS: Fetcher;
}

/** True when the Accept header ranks text/markdown at least as high as text/html. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  let markdownQ = 0;
  let htmlQ = 0;
  for (const range of accept.split(',')) {
    const [type, ...params] = range.split(';').map((part) => part.trim().toLowerCase());
    const qParam = params.find((param) => param.startsWith('q='));
    const q = qParam === undefined ? 1 : Number(qParam.slice(2));
    if (!(q >= 0 && q <= 1)) continue;
    if (type === 'text/markdown') markdownQ = Math.max(markdownQ, q);
    else if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return markdownQ > 0 && markdownQ >= htmlQ;
}

/**
 * Returns the markdown representation when the request asks for it, else null.
 * `sourcePath` is a static markdown file under public/.
 */
export async function markdownFor(
  context: EventContext<MarkdownEnv, string, unknown>,
  sourcePath: string,
): Promise<Response | null> {
  const { request, env } = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  if (!prefersMarkdown(request.headers.get('accept'))) return null;

  const source = await env.ASSETS.fetch(new URL(sourcePath, request.url));
  // The SPA fallback answers a missing file with index.html and a 200, so a
  // text/html body here means the source file is gone: fall back to HTML.
  if (!source.ok || source.headers.get('content-type')?.includes('text/html')) return null;

  return new Response(request.method === 'HEAD' ? null : source.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/** Marks an HTML response from a negotiated route as varying on Accept. */
export function varyOnAccept(response: Response): Response {
  const out = new Response(response.body, response);
  out.headers.append('Vary', 'Accept');
  return out;
}
