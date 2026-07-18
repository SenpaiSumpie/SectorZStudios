'use client';

import { usePrefersReducedMotion } from '@/lib/hooks';

interface Mote {
	id: number;
	x: number;
	size: number;
	opacity: number;
	duration: number;
	delay: number;
	drift: number;
}

// Seeded PRNG so the server and client generate identical motes,
// avoiding a hydration mismatch without deferring to an effect.
function mulberry32(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const random = mulberry32(0x5ec702);

const MOTES: Mote[] = Array.from({ length: 8 }, (_, i) => ({
	id: i,
	x: random() * 100,
	size: 2 + random() * 2,
	opacity: 0.08 + random() * 0.15,
	duration: 20 + random() * 25,
	delay: -(random() * 30),
	drift: -30 + random() * 60,
}));

export function DustMotes() {
	const prefersReducedMotion = usePrefersReducedMotion();

	if (prefersReducedMotion) return null;

	return (
		<div
			className="fixed inset-0 pointer-events-none z-30"
			aria-hidden="true"
		>
			{MOTES.map((mote) => (
				<div
					key={mote.id}
					className="absolute rounded-full bg-white"
					style={{
						left: `${mote.x}%`,
						bottom: '-5%',
						width: `${mote.size}px`,
						height: `${mote.size}px`,
						opacity: mote.opacity,
						animation: `dustFloat${mote.id} ${mote.duration}s linear ${mote.delay}s infinite`,
					}}
				/>
			))}
			<style>
				{MOTES.map(
					(mote) => `
        @keyframes dustFloat${mote.id} {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: ${mote.opacity};
          }
          90% {
            opacity: ${mote.opacity};
          }
          100% {
            transform: translate(${mote.drift}px, -110vh);
            opacity: 0;
          }
        }
      `
				).join('\n')}
			</style>
		</div>
	);
}
