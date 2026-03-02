'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface SharpSystemsSectionProps {
  prefersReducedMotion: boolean;
}

export function SharpSystemsSection({ prefersReducedMotion }: SharpSystemsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Feature cards "assemble" animation
      const featureCards = cardsRef.current?.querySelectorAll('.feature-card');
      if (featureCards) {
        // Set initial state
        gsap.set(featureCards, { 
          scale: 0.8, 
          rotation: (index) => (index % 2 === 0 ? -5 : 5), 
          opacity: 0 
        });

        // Animate cards assembling
        gsap.to(featureCards, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            once: true,
          }
        });

        // Add assembled class for CSS transitions
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top center',
          once: true,
          onEnter: () => {
            featureCards.forEach(card => {
              card.classList.add('feature-card--assembled');
            });
          }
        });
      }

      // Title animation
      const title = sectionRef.current?.querySelector('.section-title');
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              once: true,
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const features = [
    {
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      title: 'Adaptive AI',
      description: 'Our behavioral systems learn from player choices, creating truly personal horror experiences that evolve with your fears.',
    },
    {
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
      title: 'Dynamic Storytelling',
      description: 'Narrative threads weave together based on your actions, ensuring no two playthroughs tell the same story.',
    },
    {
      image: 'https://images.unsplash.com/photo-1574270109494-d3d4eaa85b0d?w=800&h=600&fit=crop',
      title: 'Immersive Audio',
      description: 'Spatial audio design that responds to your emotional state, creating soundscapes that breathe with the story.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen bg-gray-900 py-20 lg:py-32 atmosphere"
      aria-label="Sharp Systems section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-cinematic text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Sharp <span className="text-accent">Systems</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Behind every atmospheric moment lies precision engineering. 
            Our systems work in harmony to create seamless experiences that feel magical.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'feature-card scan-line-hover bg-black border border-gray-800 rounded-lg overflow-hidden will-change-transform',
                index === 0 && 'lg:col-span-2'
              )}
            >
              <div className="aspect-video bg-gray-800 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom content */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every system is designed with intention, every interaction crafted to serve the story. 
            Technology becomes invisible when it serves emotion.
          </p>
        </div>
      </div>
    </section>
  );
}