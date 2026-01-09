import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import {
  INSTAGRAM_URL,
  SPOTIFY_URL,
  YOUTUBE_CHANNEL,
  APPLE_MUSIC_URL,
  SOUNDCLOUD_URL,
  LINKTREE_URL
} from '@/utils/constants';

export interface SocialLink {
  name: string;
  url: string;
  icon: IconDefinition;
}

/**
 * All social media links for Cbarrgs
 * Used across Hero, Footer, and Mobile Menu
 */
export const socialLinks: SocialLink[] = [
  { name: 'Instagram', url: INSTAGRAM_URL, icon: faInstagram },
  { name: 'YouTube', url: YOUTUBE_CHANNEL, icon: faYoutube },
  { name: 'Apple Music', url: APPLE_MUSIC_URL, icon: faApple },
  { name: 'Spotify', url: SPOTIFY_URL, icon: faSpotify },
  { name: 'SoundCloud', url: SOUNDCLOUD_URL, icon: faSoundcloud },
  { name: 'Linktree', url: LINKTREE_URL, icon: faLink },
];

/**
 * Subset of social links for mobile menu (most important ones)
 */
export const mobileSocialLinks: SocialLink[] = [
  { name: 'Instagram', url: INSTAGRAM_URL, icon: faInstagram },
  { name: 'Spotify', url: SPOTIFY_URL, icon: faSpotify },
  { name: 'YouTube', url: YOUTUBE_CHANNEL, icon: faYoutube },
];
