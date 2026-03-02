'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';

interface FinalCTASectionProps {
  prefersReducedMotion: boolean;
}

export function FinalCTASection({ prefersReducedMotion }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Logo micro-split animation
      const logoChars = logoRef.current?.querySelectorAll('.logo-split__char');
      if (logoChars) {
        gsap.set(logoChars, { x: 0 });
        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top center',
          once: true,
          onEnter: () => {
            // Add glow effect
            logoRef.current?.classList.add('glow-effect--active');
            
            // Animate character split
            gsap.to(logoChars, {
              x: (index) => (index % 2 === 0 ? -10 : 10),
              duration: 0.3,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
            });
          }
        });
      }

      // CTA content animation
      const ctaElements = ctaRef.current?.children;
      if (ctaElements) {
        gsap.fromTo(ctaElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              once: true,
            }
          }
        );
      }

      // Newsletter form animation
      if (newsletterRef.current) {
        gsap.fromTo(newsletterRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log('Newsletter signup:', email);
    // Add your newsletter subscription logic here
    setEmail('');
  };

  const logoText = 'SECTOR Z';

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen overflow-hidden bg-black atmosphere"
      aria-label="Final CTA section"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1920&h=1080&fit=crop)',
        }}
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 film-grain" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo with split effect */}
          <div
            ref={logoRef}
            className="logo-split glow-effect mb-12"
          >
            <h1 className="text-cinematic text-6xl md:text-7xl lg:text-8xl text-white mb-4">
              {logoText.split('').map((char, index) => (
                <span
                  key={index}
                  className="logo-split__char inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>

          {/* CTA Content */}
          <div ref={ctaRef} className="space-y-8">
            <div>
              <h2 className="text-cinematic text-2xl md:text-3xl text-white mb-4">
                Your journey into fear begins here
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Step inside Reverie of Fear and discover what lies beyond the threshold 
                of consciousness. Every shadow holds a secret, every choice echoes through eternity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent text-black hover:bg-accent-hover font-bold px-8 py-4"
              >
                Explore Reverie of Fear
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="border-white/30 text-white hover:border-accent hover:text-accent px-8 py-4"
              >
                Watch Gameplay Trailer
              </Button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div ref={newsletterRef} className="mt-16 pt-16 border-t border-gray-800">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-400 mb-6">
                Get exclusive updates and early access to our atmospheric worlds.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-accent text-black hover:bg-accent-hover font-medium"
                >
                  Join Our World
                </Button>
              </form>
              
              <p className="text-gray-500 text-sm mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="Join our Discord"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-accent transition-colors"
              aria-label="Watch on YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}