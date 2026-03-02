'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CraftingWorldsSectionProps {
  prefersReducedMotion: boolean;
}

export function CraftingWorldsSection({ prefersReducedMotion }: CraftingWorldsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax layers with different speeds
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          y: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          y: '-50%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          y: '-70%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Content blocks slide in
      const copyBlocks = contentRef.current?.querySelectorAll('.copy-block');
      if (copyBlocks) {
        gsap.fromTo(copyBlocks,
          { 
            opacity: 0, 
            y: 60 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              once: true,
            }
          }
        );
      }

      // Accent underline grows
      const accentLines = contentRef.current?.querySelectorAll('.accent-underline');
      if (accentLines) {
        accentLines.forEach((line) => {
          gsap.to(line, {
            scrollTrigger: {
              trigger: line,
              start: 'top center',
              once: true,
              onEnter: () => {
                line.classList.add('accent-underline--active');
              }
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen overflow-hidden bg-black atmosphere"
      aria-label="Crafting Worlds section"
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        <div
          ref={layer1Ref}
          className="parallax-layer will-change-transform"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          ref={layer2Ref}
          className="parallax-layer will-change-transform"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
          }}
        />
        <div
          ref={layer3Ref}
          className="parallax-layer will-change-transform"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl lg:max-w-[40%]">
            <div className="copy-block mb-8">
              <h2 className="text-cinematic text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                <span className="accent-underline">Crafting</span> Worlds
              </h2>
            </div>

            <div className="copy-block mb-12">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
                Every environment we create is a character in its own right. 
                From the whisper of wind through abandoned halls to the 
                <span className="accent-underline"> subtle interplay of light and shadow</span>, 
                we build worlds that breathe with life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="copy-block">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="accent-underline">Atmospheric Design</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We layer sound, lighting, and environmental storytelling to create 
                  spaces that feel alive. Every corner holds a secret, every shadow 
                  tells a story.
                </p>
              </div>

              <div className="copy-block">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="accent-underline">Psychological Space</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our environments reflect the inner world of characters. Architecture 
                  becomes emotion, and geometry transforms into psychology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}