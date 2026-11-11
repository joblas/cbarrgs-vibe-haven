/**
 * /new — the smart-link page that goes in every bio, flyer, and QR code.
 *
 * - Agents that ask for text/markdown get the llms.txt summary (links + current release).
 * - Social crawlers (iMessage, Instagram, X, Facebook) don't execute JS, so they read
 *   the link-preview tags straight from index.html. We serve them that same page with
 *   its URL tags pointed at /new. The preview copy lives only in index.html, so updating
 *   it there for each release updates this link's preview too.
 * - Everyone else gets the SPA.
 */

import { markdownFor, varyOnAccept, type MarkdownEnv } from './_markdown';

const CRAWLER_UAS = /bot|crawl|spider|facebookexternalhit|whatsapp|telegram|slack|discord|linkedin|twitter|applebot|iframely|embedly|preview/i;
const NEW_URL = 'https://cbarrgs.com/new';

const setAttribute = (name: string, value: string) => ({
  element(element: Element) {
    element.setAttribute(name, value);
  },
});

export const onRequest: PagesFunction<MarkdownEnv> = async (context) => {
  const markdown = await markdownFor(context, '/llms.txt');
  if (markdown) return markdown;

  const page = varyOnAccept(await context.next());
  const ua = context.request.headers.get('user-agent') || '';
  if (!CRAWLER_UAS.test(ua)) return page;

  return new HTMLRewriter()
    .on('link[rel="canonical"]', setAttribute('href', NEW_URL))
    .on('meta[property="og:url"]', setAttribute('content', NEW_URL))
    .on('meta[name="twitter:url"]', setAttribute('content', NEW_URL))
    .transform(page);
};
