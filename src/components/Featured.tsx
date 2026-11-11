import React from 'react';
import BlurFade from '@/components/ui/blur-fade';
import TextReveal from '@/components/ui/text-reveal';
import { SURFACE_SPOTS } from '@/data/featured';

const Featured: React.FC = () => (
  <section id="featured" className="relative py-16 sm:py-20 md:py-32 bg-black overflow-hidden scroll-mt-20">
    <div className="relative z-10 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <BlurFade delay={0.1}>
        <TextReveal
          as="h2"
          className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-light tracking-wider text-center"
        >
          As Heard In
        </TextReveal>
      </BlurFade>

      <BlurFade delay={0.2}>
        <p className="text-white/50 mb-8 sm:mb-12 font-extralight max-w-md mx-auto text-sm sm:text-base tracking-wide text-center">
          Music by Cbarrgs in Microsoft's Surface Pro campaign.
        </p>
      </BlurFade>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {SURFACE_SPOTS.map((spot, i) => (
          <li key={spot.youtubeId}>
            <BlurFade delay={0.25 + i * 0.05}>
              <a
                href={`https://www.youtube.com/watch?v=${spot.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden bg-white/[0.03] border border-white/10 transition-colors duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
              >
                <div className="relative aspect-video overflow-hidden bg-white/5">
                  <img
                    src={`/images/featured/${spot.youtubeId}.webp`}
                    alt=""
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/50 transition-colors duration-300 group-hover:border-white/80">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-white/90">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="p-3.5 sm:p-4">
                  <p className="font-serif text-base sm:text-lg font-light tracking-wide">
                    Surface Pro · {spot.title}
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm font-extralight tracking-wide mt-1">
                    {spot.song ? `"${spot.song}" by Cbarrgs` : 'Music by Cbarrgs'}
                    <span className="sr-only"> (opens on YouTube)</span>
                  </p>
                </div>
              </a>
            </BlurFade>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Featured;
