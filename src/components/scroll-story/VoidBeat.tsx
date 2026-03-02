'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VoidBeatProps {
  prefersReducedMotion: boolean;
}

export function VoidBeat({ prefersReducedMotion }: VoidBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the void section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=50vh',
        pin: true,
        pinSpacing: true,
      });

      // Title fade in with slight Y movement
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out',
          }
        );
      }

      // Subtitle fades in after title
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 1.3,
            ease: 'power2.out',
          }
        );
      }

      // Indicator fades in last
      if (indicatorRef.current) {
        gsap.fromTo(
          indicatorRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            delay: 1.8,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="scroll-section scroll-section--pinned relative flex flex-col items-center justify-center bg-background film-grain"
      aria-label="Welcome"
    >
      <div className="relative z-10 text-center px-6">
        <h1
          ref={titleRef}
          className="text-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] text-foreground opacity-0"
        >
          SECTOR Z
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-muted text-lg md:text-xl max-w-md mx-auto opacity-0"
        >
          We make atmospheric horror games.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
