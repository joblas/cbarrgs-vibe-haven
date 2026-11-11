/**
 * The hero copy comes from the marketing bot (/api/news), which only changes
 * when someone messages it. A bot headline that quotes a release title other
 * than the newest one has outlived that release, so the site falls back to its
 * own latest-release copy (src/data/latestRelease.ts). A headline that quotes
 * no title, such as a show announcement, is kept.
 */
export const isStaleNews = (headline: string, latestTitle: string): boolean => {
  const quoted = [...headline.matchAll(/["“”]([^"“”]+)["“”]/g)].map((m) =>
    m[1].trim().toLowerCase(),
  );
  return quoted.length > 0 && !quoted.includes(latestTitle.trim().toLowerCase());
};
