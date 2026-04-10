import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple, faYoutube, faSoundcloud, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Calendar, Clock, ArrowLeft, ShoppingBag, Mail } from 'lucide-react';
import {
  SPOTIFY_URL,
  APPLE_MUSIC_URL,
  YOUTUBE_CHANNEL,
  SOUNDCLOUD_URL,
  INSTAGRAM_URL,
  SHOPIFY_STORE,
} from '@/utils/constants';
import { prefersReducedMotion } from '@/utils/animations';
import SubscribeForm from '@/components/SubscribeForm';
import BlurFade from '@/components/ui/blur-fade';
import Magnetic from '@/components/ui/magnetic';

const streamingPlatforms = [
  {
    name: 'Spotify',
    url: SPOTIFY_URL,
    icon: faSpotify,
    color: 'hover:bg-[#1DB954]/20 hover:border-[#1DB954]/40',
    iconColor: 'group-hover:text-[#1DB954]',
  },
  {
    name: 'Apple Music',
    url: APPLE_MUSIC_URL,
    icon: faApple,
    color: 'hover:bg-[#FC3C44]/20 hover:border-[#FC3C44]/40',
    iconColor: 'group-hover:text-[#FC3C44]',
  },
  {
    name: 'YouTube',
    url: YOUTUBE_CHANNEL,
    icon: faYoutube,
    color: 'hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40',
    iconColor: 'group-hover:text-[#FF0000]',
  },
  {
    name: 'SoundCloud',
    url: SOUNDCLOUD_URL,
    icon: faSoundcloud,
    color: 'hover:bg-[#FF5500]/20 hover:border-[#FF5500]/40',
    iconColor: 'group-hover:text-[#FF5500]',
  },
];

const venueUrl = 'https://maps.google.com/?q=317+E+Grand+Ave+Escondido+CA+92025';

const socialFollowLinks = [
  { name: 'Follow on Instagram', url: INSTAGRAM_URL, icon: faInstagram },
  { name: 'Subscribe on YouTube', url: YOUTUBE_CHANNEL, icon: faYoutube },
  { name: 'Follow on Spotify', url: SPOTIFY_URL, icon: faSpotify },
];

const Promo: React.FC = () => {
  const reducedMotion = prefersReducedMotion();
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  return (
    <div className="min-h-[100svh] bg-black text-white overflow-x-hidden">
       {/* Background */}
       <div className="fixed inset-0 z-0">
         <img
           src="/lovable-uploads/cbarrgs-insta-bw.webp"
           alt=""
           className="w-full h-full object-cover opacity-20 transition-opacity duration-1000 ease-in-out"
           style={{ opacity: bgImageLoaded ? 0.2 : 0 }}
           fetchPriority="high"
           onLoad={() => setBgImageLoaded(true)}
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
       </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Back link */}
        <div className="px-5 sm:px-6 pt-[env(safe-area-inset-top,0px)]">
          <div className="pt-5 sm:pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-extralight tracking-wider transition-colors duration-300 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              cbarrgs.com
            </Link>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-5 sm:px-6 pt-6 sm:pt-8 pb-12 sm:pb-16">
          {/* Header: Logo + EP Title */}
          <BlurFade delay={0.05}>
            <div className="text-center mb-8 sm:mb-10">
              <motion.img
                src="/images/cbarrgs-logo.png"
                alt="Cbarrgs"
                className="h-12 sm:h-16 w-auto mx-auto mb-5 sm:mb-6"
                style={{
                  filter: 'invert(1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
                }}
                animate={reducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-wider mb-2">
                Pieces For You
              </h1>
              <p className="text-white/50 text-sm font-extralight tracking-wide">
                New EP &middot; Coming April 25th
              </p>
            </div>
          </BlurFade>

          {/* Section: Listen */}
          <BlurFade delay={0.15}>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-xs font-extralight tracking-[0.2em] text-white/35 uppercase mb-1 text-center">
                Listen Now
              </h2>
              <p className="text-white/25 text-xs font-extralight tracking-wide text-center mb-3">
                "Pieces For You" EP drops April 25th
              </p>
              <div className="space-y-2">
                {streamingPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 w-full p-3.5 sm:p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] transition-all duration-300 touch-manipulation ${platform.color}`}
                  >
                    <FontAwesomeIcon
                      icon={platform.icon}
                      className={`w-5 h-5 text-white/60 transition-colors duration-300 ${platform.iconColor}`}
                    />
                    <span className="font-extralight tracking-wider text-sm">
                      {platform.name}
                    </span>
                    <span className="ml-auto text-white/25 text-xs font-extralight tracking-wider group-hover:text-white/50 transition-colors">
                      Play
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Section: Free Show */}
          <BlurFade delay={0.25}>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-xs font-extralight tracking-[0.2em] text-white/35 uppercase mb-3 text-center">
                Free Live Show
              </h2>
              <a
                href={venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="font-serif text-lg font-light mb-3 tracking-wide">Distinction Gallery</h3>
                  <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-white/55 text-sm font-extralight">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/35" />
                      April 11th
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-white/35" />
                      6pm &ndash; 8pm
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/35" />
                      Escondido, CA
                    </span>
                  </div>
                  <p className="text-white/35 text-xs mt-2 font-extralight">All ages &middot; Free admission</p>
                </div>
              </a>
            </div>
          </BlurFade>

          {/* Section: Shop */}
          <BlurFade delay={0.35}>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-xs font-extralight tracking-[0.2em] text-white/35 uppercase mb-1 text-center">
                New Merch Just Arrived
              </h2>
              <p className="text-white/25 text-xs font-extralight tracking-wide text-center mb-3">
                In the shop soon
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3">
                {[
                  { src: '/images/merch/tshirt.jpeg', alt: 'Cbarrgs tee' },
                  { src: '/images/merch/Pin.jpeg', alt: 'Cbarrgs pin' },
                  { src: '/images/merch/stickers.jpeg', alt: 'Cbarrgs stickers' },
                ].map((item) => (
                  <a
                    key={item.alt}
                    href={SHOPIFY_STORE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </a>
                ))}
              </div>
              <a
                href={SHOPIFY_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full p-3 sm:p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 text-white/50" />
                <span className="font-extralight tracking-wider text-sm">Shop All</span>
              </a>
            </div>
          </BlurFade>

          {/* Section: Stay Connected */}
          <BlurFade delay={0.45}>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-xs font-extralight tracking-[0.2em] text-white/35 uppercase mb-3 text-center">
                Stay Connected
              </h2>
              <div className="p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Mail className="w-4 h-4 text-white/40" />
                  <p className="text-white/50 text-sm font-extralight">
                    Get notified on new drops
                  </p>
                </div>
                <SubscribeForm />
              </div>
            </div>
          </BlurFade>

          {/* Section: Follow */}
          <BlurFade delay={0.55}>
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xs font-extralight tracking-[0.2em] text-white/35 uppercase mb-3 text-center">
                Follow
              </h2>
              <div className="flex justify-center gap-4 sm:gap-5">
                {socialFollowLinks.map((social) => (
                  <Magnetic key={social.name} strength={0.25} radius={60}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-5 h-5 text-white/60" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Footer */}
          <BlurFade delay={0.6}>
            <div className="text-center">
              <Link
                to="/"
                className="text-white/25 hover:text-white/50 text-xs font-extralight tracking-wider transition-colors duration-300"
              >
                cbarrgs.com
              </Link>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Promo;
