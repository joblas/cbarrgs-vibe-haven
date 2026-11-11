/**
 * The newest release. Update this file (and index.html's og:/twitter: tags and
 * public/llms.txt) on release day; the hero fallback, the hero "listen" link,
 * the /new page, and the homepage player all read from here.
 */
export const LATEST_RELEASE = {
  title: 'No Vengas A llorar',
  type: 'Single',
  released: '2026-10-23',
  spotifyAlbumId: '4No0zRWJAC14vysua97HDL',
  appleMusicUrl: 'https://music.apple.com/us/album/no-vengas-a-llorar-single/6826693141',
} as const;

export const LATEST_RELEASE_SPOTIFY_URL = `https://open.spotify.com/album/${LATEST_RELEASE.spotifyAlbumId}`;
export const LATEST_RELEASE_SPOTIFY_EMBED = `https://open.spotify.com/embed/album/${LATEST_RELEASE.spotifyAlbumId}?utm_source=generator&theme=0`;
