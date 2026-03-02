'use client';

import { useEffect, useRef } from 'react';

export function PageRevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.setAttribute('data-loaded', 'true');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="page-reveal">
      {children}
    </div>
  );
}
