'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface DevlogReelSectionProps {
  prefersReducedMotion: boolean;
}

export function DevlogReelSection({ prefersReducedMotion }: DevlogReelSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current!;
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      const maxScroll = scrollWidth - containerWidth;

      // Pin the section and scrub horizontally
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${maxScroll + window.innerHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Horizontal scroll animation
      gsap.to(scrollContainer, {
        x: -maxScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${maxScroll + window.innerHeight}`,
          scrub: 1,
        }
      });

      // Animate individual cards as they come into view
      const cards = scrollContainer.querySelectorAll('.devlog-card');
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 50 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'left right',
              end: 'right left',
              horizontal: true,
              containerAnimation: gsap.getProperty(scrollContainer, 'x'),
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const devlogPosts = [
    {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      tag: 'Art',
      date: 'Dec 15, 2024',
      title: 'Painting with Shadows',
      excerpt: 'How we use darkness as a primary art medium to create atmosphere that speaks without words.',
    },
    {
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      tag: 'Engineering',
      date: 'Dec 12, 2024',
      title: 'Responsive Fear Systems',
      excerpt: 'Building AI that learns your behavioral patterns to create personalized horror experiences.',
    },
    {
      image: 'https://images.unsplash.com/photo-1574270109494-d3d4eaa85b0d?w=400&h=300&fit=crop',
      tag: 'Design',
      date: 'Dec 10, 2024',
      title: 'Architecture of Anxiety',
      excerpt: 'How spatial design principles create psychological tension without relying on jump scares.',
    },
    {
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
      tag: 'Audio',
      date: 'Dec 8, 2024',
      title: 'Silent Screams',
      excerpt: 'The power of absence in sound design and how silence can be the loudest element.',
    },
    {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      tag: 'Community',
      date: 'Dec 5, 2024',
      title: 'Player Feedback Loop',
      excerpt: 'How community input shaped our approach to narrative branching and choice consequence.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-section scroll-section--pinned relative overflow-hidden bg-black"
      aria-label="Devlog Reel section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-cinematic text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              From the <span className="text-accent">Devlog</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Behind-the-scenes insights into our creative process. 
              Each post reveals the thinking behind our atmospheric worlds.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative z-10 flex-1">
        <div 
          ref={scrollContainerRef}
          className="horizontal-scroll flex items-center h-full px-4 sm:px-6 lg:px-8 pb-20"
        >
          {devlogPosts.map((post, index) => (
            <div
              key={index}
              className="horizontal-scroll__item devlog-card bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover-lift will-change-transform"
            >
              <div className="aspect-video bg-gray-800 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-accent font-medium uppercase tracking-wider">
                    {post.tag}
                  </span>
                  <span className="text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <button className="text-accent hover:text-accent-hover font-medium text-sm transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
          
          {/* Final card with CTA */}
          <div className="horizontal-scroll__item devlog-card bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 rounded-lg flex items-center justify-center p-8 text-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Explore All Posts
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Dive deeper into our creative process and development journey.
              </p>
              <button className="bg-accent text-black px-6 py-3 rounded-sm font-semibold hover:bg-accent-hover transition-colors">
                View Full Devlog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-8 h-px bg-gradient-to-r from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}