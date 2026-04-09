/**
 * Cloudflare Pages Function to inject OG meta tags for /new page.
 * Social crawlers (iMessage, Instagram, Twitter, Facebook) don't execute JS,
 * so we intercept their requests and return HTML with proper meta tags.
 * Regular browsers get the normal SPA.
 */

const CRAWLER_UAS = /bot|crawl|spider|facebookexternalhit|whatsapp|telegram|slack|discord|linkedin|twitter|applebot|iframely|embedly|preview/i;

export const onRequest: PagesFunction = async (context) => {
  const ua = context.request.headers.get('user-agent') || '';

  // Only intercept crawlers — let real users through to the SPA
  if (!CRAWLER_UAS.test(ua)) {
    return context.next();
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cbarrgs — "Pieces For You" | New EP, Show, Merch</title>
  <meta name="description" content="New EP 'Pieces For You' coming April 25th. Free live show April 11th. New tees and pins just arrived. Stream, shop, and follow Cbarrgs." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cbarrgs.com/new" />
  <meta property="og:title" content="Cbarrgs — &quot;Pieces For You&quot; | New EP, Show, Merch" />
  <meta property="og:description" content="New EP coming April 25th. Free live show April 11th in Escondido. New tees &amp; pins just arrived. Stream on Spotify, Apple Music, YouTube &amp; more." />
  <meta property="og:image" content="https://cbarrgs.com/og-image.png?v=20260409" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Cbarrgs - Pieces For You" />
  <meta property="og:site_name" content="Cbarrgs Music" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Cbarrgs — &quot;Pieces For You&quot; | New EP, Show, Merch" />
  <meta name="twitter:description" content="New EP coming April 25th. Free live show April 11th. Stream, shop, and follow Cbarrgs." />
  <meta name="twitter:image" content="https://cbarrgs.com/og-image.png?v=20260409" />

  <link rel="image_src" href="https://cbarrgs.com/og-image.png?v=20260409" />
  <link rel="canonical" href="https://cbarrgs.com/new" />
</head>
<body>
  <p>Redirecting to <a href="https://cbarrgs.com/new">cbarrgs.com/new</a></p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
