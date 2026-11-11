/**
 * Placements of Cbarrgs's music in other people's work. Newest first.
 * `song` is optional: fill it in when the track for a spot is confirmed.
 * Thumbnails are self-hosted in public/images/featured/<youtubeId>.webp (640x360).
 */
export interface FeaturedSpot {
  youtubeId: string;
  title: string;
  published: string; // YYYY-MM-DD, from the video page
  song?: string;
}

export const SURFACE_SPOTS: FeaturedSpot[] = [
  { youtubeId: 'tSzorr808ds', title: 'It Can Stage', published: '2026-10-23' },
  { youtubeId: '0Zh5y5VhLLE', title: 'It Can Stay Out Late', published: '2026-10-15' },
  { youtubeId: 'cs935ctWaLs', title: 'It Can Dream', published: '2026-10-13' },
  { youtubeId: 'AwWoPr1At40', title: 'It Can Make It Real', published: '2026-10-02' },
];
