'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 2,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * -30,
    opacity: 0.1 + Math.random() * 0.3,
  }));
}

export function EmberParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setVisible(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches);
    mq.addEventListener('change', handler);

    setParticles(generateParticles(14));

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!visible || particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: p.opacity,
            animation: `emberFloat ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes emberFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-50vh) translateX(20px);
          }
          100% {
            transform: translateY(-110vh) translateX(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
