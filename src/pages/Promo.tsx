import React from 'react';
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
import {
  staggerContainerVariants,
  staggerItemVariants,
  prefersReducedMotion,
} from '@/utils/animations';
import SubscribeForm from '@/components/SubscribeForm';

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

const Promo: React.FC = () => {
  const reducedMotion = prefersReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/lovable-uploads/cbarrgs-insta-bw.webp"
          alt=""
          className="w-full h-full object-cover opacity-20"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Back link */}
        <div className="px-4 sm:px-6 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-light tracking-wider transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            cbarrgs.com
          </Link>
        </div>

        <motion.div
          className="max-w-lg mx-auto px-4 sm:px-6 pt-8 pb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header: Logo + EP Title */}
          <motion.div className="text-center mb-10" variants={staggerItemVariants}>
            <motion.img
              src="/images/cbarrgs-logo.png"
              alt="Cbarrgs"
              className="h-14 sm:h-16 w-auto mx-auto mb-6"
              style={{
                filter: 'invert(1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
              }}
              animate={reducedMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-wider mb-2">
              Pieces For You
            </h1>
            <p className="text-white/60 text-sm font-light tracking-wide">
              New EP &middot; Out April 25th
            </p>
          </motion.div>

          {/* Section: Listen */}
          <motion.div className="mb-8" variants={staggerItemVariants}>
            <h2 className="text-xs font-light tracking-[0.2em] text-white/40 uppercase mb-3 text-center">
              Listen
            </h2>
            <div className="space-y-2.5">
              {streamingPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 w-full p-4 rounded-lg bg-white/[0.04] border border-white/10 transition-all duration-300 ${platform.color}`}
                >
                  <FontAwesomeIcon
                    icon={platform.icon}
                    className={`w-5 h-5 text-white/70 transition-colors duration-300 ${platform.iconColor}`}
                  />
                  <span className="font-light tracking-wider text-sm sm:text-base">
                    {platform.name}
                  </span>
                  <span className="ml-auto text-white/30 text-xs font-light tracking-wider group-hover:text-white/60 transition-colors">
                    Play
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Section: Free Show */}
          <motion.div className="mb-8" variants={staggerItemVariants}>
            <h2 className="text-xs font-light tracking-[0.2em] text-white/40 uppercase mb-3 text-center">
              Free Live Show
            </h2>
            <a
              href={venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full p-5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <div className="text-center">
                <h3 className="font-serif text-lg font-light mb-3">Distinction Gallery</h3>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-white/60 text-sm font-light">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    April 11th
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    6pm &ndash; 8pm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    Escondido, CA
                  </span>
                </div>
                <p className="text-white/40 text-xs mt-2 font-light">All ages &middot; Free admission</p>
              </div>
            </a>
          </motion.div>

          {/* Section: Shop */}
          <motion.div className="mb-8" variants={staggerItemVariants}>
            <h2 className="text-xs font-light tracking-[0.2em] text-white/40 uppercase mb-3 text-center">
              Merch
            </h2>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
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
                  className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-300"
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
              className="group flex items-center justify-center gap-2 w-full p-3.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 text-white/60" />
              <span className="font-light tracking-wider text-sm">Shop All</span>
            </a>
          </motion.div>

          {/* Section: Stay Connected */}
          <motion.div className="mb-8" variants={staggerItemVariants}>
            <h2 className="text-xs font-light tracking-[0.2em] text-white/40 uppercase mb-3 text-center">
              Stay Connected
            </h2>
            <div className="p-5 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-white/50" />
                <p className="text-white/60 text-sm font-light">
                  Get notified on new drops
                </p>
              </div>
              <SubscribeForm />
            </div>
          </motion.div>

          {/* Section: Follow */}
          <motion.div className="mb-10" variants={staggerItemVariants}>
            <h2 className="text-xs font-light tracking-[0.2em] text-white/40 uppercase mb-3 text-center">
              Follow
            </h2>
            <div className="flex justify-center gap-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-white/70" />
              </a>
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300"
                aria-label="Subscribe on YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 text-white/70" />
              </a>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300"
                aria-label="Follow on Spotify"
              >
                <FontAwesomeIcon icon={faSpotify} className="w-5 h-5 text-white/70" />
              </a>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div className="text-center" variants={staggerItemVariants}>
            <Link
              to="/"
              className="text-white/30 hover:text-white/60 text-xs font-light tracking-wider transition-colors duration-300"
            >
              cbarrgs.com
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Promo;
