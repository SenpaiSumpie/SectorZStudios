'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StudioBeatProps {
  prefersReducedMotion: boolean;
}

export function StudioBeat({ prefersReducedMotion }: StudioBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center py-32 lg:py-40"
      aria-label="About Sector Z"
    >
      <div
        ref={contentRef}
        className="max-w-2xl mx-auto px-6 lg:px-8 text-center opacity-0"
      >
        <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8">
          We build worlds you can&apos;t forget.
        </h2>
        <p className="text-muted text-lg leading-relaxed">
          Sector Z is a game studio focused on atmospheric horror.
          We believe the best games don&apos;t just entertain — they linger.
          Every shadow, every sound, every silence is deliberate.
        </p>
      </div>
    </section>
  );
}
