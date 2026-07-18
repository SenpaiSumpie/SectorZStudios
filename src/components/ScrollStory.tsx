'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VoidBeat } from './scroll-story/VoidBeat';
import { GamesBeat } from './scroll-story/GamesBeat';
import { StudioBeat } from './scroll-story/StudioBeat';
import { usePrefersReducedMotion } from '@/lib/hooks';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="scroll-story"
      aria-label="Sector Z"
    >
      <VoidBeat prefersReducedMotion={prefersReducedMotion} />
      <GamesBeat prefersReducedMotion={prefersReducedMotion} />
      <StudioBeat prefersReducedMotion={prefersReducedMotion} />
      {/* Signal footer is rendered globally from layout.tsx */}
    </div>
  );
}
