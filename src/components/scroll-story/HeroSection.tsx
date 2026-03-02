'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroSectionProps {
  prefersReducedMotion: boolean;
}

export function HeroSection({ prefersReducedMotion }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the hero section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100vh',
        pin: true,
        pinSpacing: false,
      });

      // Video zoom effect
      if (videoRef.current) {
        gsap.fromTo(videoRef.current, 
          { scale: 1 }, 
          {
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100vh',
              scrub: 1,
            }
          }
        );
      }

      // Word-by-word reveal animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word-reveal__inner');
        
        gsap.set(words, { y: '100%' });
        
        gsap.to(words, {
          y: '0%',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          }
        });
      }

      // Vignette effect
      gsap.fromTo('.hero-vignette',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Handle video playback based on reduced motion preference
  useEffect(() => {
    if (videoRef.current) {
      if (prefersReducedMotion) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    }
  }, [prefersReducedMotion]);

  const headlineWords = [
    'We', 'craft', 'atmospheric', 'worlds', 'and', 'sharp,', 'character-driven', 'games'
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-section scroll-section--pinned relative flex items-center justify-center overflow-hidden film-grain"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="scroll-video will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero.png"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Vignette Overlay */}
      <div className="hero-vignette absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="max-w-3xl">
        <h1
          ref={headlineRef}
          className="text-cinematic text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
        >
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
            {headlineWords.map((word, index) => (
              <span key={index} className="word-reveal">
                <span className="word-reveal__inner">{word}</span>
              </span>
            ))}
          </div>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          Step inside our world where every shadow tells a story and every choice echoes through reality.
        </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}