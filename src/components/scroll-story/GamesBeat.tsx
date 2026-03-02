'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { games } from '@/data/games';

interface GamesBeatProps {
  prefersReducedMotion: boolean;
}

export function GamesBeat({ prefersReducedMotion }: GamesBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gameRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gameRefs.current.forEach((gameEl, index) => {
        if (!gameEl) return;

        const image = gameEl.querySelector('.game-bg');
        const content = gameEl.querySelector('.game-content');
        const overlay = gameEl.querySelector('.game-overlay');

        // Pin each game at full viewport
        ScrollTrigger.create({
          trigger: gameEl,
          start: 'top top',
          end: '+=100vh',
          pin: true,
          pinSpacing: true,
        });

        // Parallax on background image
        if (image) {
          gsap.fromTo(
            image,
            { y: '-5%' },
            {
              y: '5%',
              ease: 'none',
              scrollTrigger: {
                trigger: gameEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        // Content fade in
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gameEl,
                start: 'top 60%',
                once: true,
              },
            }
          );
        }

        // Film dissolve: fade overlay out as section enters view
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 1 },
            {
              opacity: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: gameEl,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={sectionRef}>
      {games.map((game, index) => (
        <section
          key={game.slug}
          ref={(el) => { gameRefs.current[index] = el; }}
          className="scroll-section scroll-section--pinned relative flex items-end overflow-hidden"
          aria-label={game.title}
        >
          {/* Background Image */}
          <div
            className="game-bg absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${game.heroImage})`,
              /* Fallback gradient if image doesn't load */
              backgroundColor: 'var(--surface)',
            }}
          />

          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Film dissolve overlay (fades out on scroll) */}
          <div className="game-overlay absolute inset-0 bg-background pointer-events-none z-10" />

          {/* Content */}
          <div className="game-content relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28 w-full opacity-0">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              {game.status}
            </p>
            <h2 className="text-display text-4xl sm:text-5xl lg:text-7xl text-foreground mb-4">
              {game.title}
            </h2>
            <p className="text-muted text-lg md:text-xl max-w-xl mb-8">
              {game.tagline}
            </p>
            <Link
              href={`/games/${game.slug}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-medium tracking-wide group"
            >
              Explore
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* "View all games" on last game */}
            {index === games.length - 1 && (
              <div className="mt-12">
                <Link
                  href="/games"
                  className="text-muted hover:text-accent transition-colors text-sm"
                >
                  View all games →
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
