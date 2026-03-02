export interface DevlogPost {
	slug: string;
	title: string;
	date: string;
	tag: 'Art' | 'Engineering' | 'Design' | 'Audio' | 'Community';
	excerpt: string;
	thumbnail: string;
	content: string[];
	headerImage?: string;
	relatedGame?: string;
}

export const devlogPosts: DevlogPost[] = [
	{
		slug: 'creating-atmospheric-environments',
		title: 'Creating Atmospheric Environments',
		date: '2024-12-15',
		tag: 'Art',
		excerpt:
			"How we build environments that breathe, decay, and respond to the player's emotional state.",
		thumbnail: '/images/devlog/atmospheres-thumb.jpg',
		headerImage: '/images/devlog/atmospheres-header.jpg',
		relatedGame: 'reverie-of-fear',
		content: [
			'Every environment in Reverie of Fear is designed to feel alive — or more accurately, to feel like something that was once alive and is slowly forgetting how.',
			"We start with photogrammetry scans of real locations: abandoned hospitals, overgrown research labs, corridors that haven't seen maintenance in years. These scans give us the foundation of authenticity that no procedural generation can match.",
			'From there, our environment team introduces what we call "dream decay" — subtle distortions that increase as the player moves deeper into a patient\'s subconscious. Walls that lean slightly. Floors that breathe. Windows that show a sky that isn\'t quite right.',
		],
	},
	{
		slug: 'dynamic-fear-system',
		title: 'The Dynamic Fear System',
		date: '2024-12-12',
		tag: 'Engineering',
		excerpt:
			'Building an AI that learns what scares you and adapts in real-time.',
		thumbnail: '/images/devlog/fear-system-thumb.jpg',
		relatedGame: 'reverie-of-fear',
		content: [
			"The core of Reverie of Fear's horror isn't scripted scares — it's an adaptive system that profiles what unsettles each individual player and evolves its approach accordingly.",
			'We track over 40 behavioral signals: where you look, how long you hesitate at doors, whether you explore dark corners or avoid them, your movement speed in different contexts. This data feeds into what we call the Fear Profile — a real-time model of your personal horror thresholds.',
		],
	},
	{
		slug: 'player-feedback-integration',
		title: 'Listening to Our Players',
		date: '2024-12-10',
		tag: 'Community',
		excerpt:
			'How community feedback shapes every major design decision at Sector Z.',
		thumbnail: '/images/devlog/feedback-thumb.jpg',
		content: [
			'We believe the best horror games are built in conversation with the people who play them. Every month, we run structured feedback sessions with our community.',
		],
	},
	{
		slug: 'sound-design-philosophy',
		title: 'Sound Design Philosophy',
		date: '2024-12-08',
		tag: 'Audio',
		excerpt:
			'Why silence is our most powerful tool, and how we design soundscapes that haunt.',
		thumbnail: '/images/devlog/sound-thumb.jpg',
		relatedGame: 'echoes-of-silence',
		content: [
			"In horror, what you don't hear matters more than what you do. Our approach to sound design starts with silence and builds outward — every sound must earn its place in the mix.",
		],
	},
	{
		slug: 'narrative-design-process',
		title: 'Our Narrative Design Process',
		date: '2024-12-05',
		tag: 'Design',
		excerpt:
			'How we structure branching narratives that feel natural, not mechanical.',
		thumbnail: '/images/devlog/narrative-thumb.jpg',
		content: [
			'Traditional branching narratives feel like choosing from a menu. Our approach is different — we design narrative spaces, not narrative paths.',
		],
	},
	{
		slug: 'accessibility-first-approach',
		title: 'Accessibility From Day One',
		date: '2024-12-03',
		tag: 'Design',
		excerpt:
			'How we build accessibility into our horror games without diluting the experience.',
		thumbnail: '/images/devlog/accessibility-thumb.jpg',
		content: [
			'Horror games often rely on sensory overload — loud sounds, flashing lights, rapid visual changes. Making these games accessible means rethinking how fear works at a fundamental level.',
		],
	},
];

export function getPostBySlug(slug: string): DevlogPost | undefined {
	return devlogPosts.find((p) => p.slug === slug);
}

export const allTags = [
	'Art',
	'Engineering',
	'Design',
	'Audio',
	'Community',
] as const;
