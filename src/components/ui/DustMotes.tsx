'use client';

import { useEffect, useState } from 'react';

interface Mote {
	id: number;
	x: number;
	size: number;
	opacity: number;
	duration: number;
	delay: number;
	drift: number;
}

export function DustMotes() {
	const [motes, setMotes] = useState<Mote[]>([]);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const generated: Mote[] = Array.from({ length: 8 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			size: 2 + Math.random() * 2,
			opacity: 0.08 + Math.random() * 0.15,
			duration: 20 + Math.random() * 25,
			delay: -(Math.random() * 30),
			drift: -30 + Math.random() * 60,
		}));

		setMotes(generated);
	}, []);

	if (motes.length === 0) return null;

	return (
		<div
			className="fixed inset-0 pointer-events-none z-30"
			aria-hidden="true"
		>
			{motes.map((mote) => (
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
				{motes
					.map(
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
					)
					.join('\n')}
			</style>
		</div>
	);
}
