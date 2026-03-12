export interface Game {
	slug: string;
	title: string;
	tagline: string;
	status: 'Released' | 'In Development' | 'Early Development' | 'Concept' | 'Prototype' | 'Planning';
	year: string;
	genre: string[];
	platforms: string[];
	synopsis: string[];
	heroImage: string;
	screenshots: string[];
	steamUrl?: string;
	trailerUrl?: string;
}

export const games: Game[] = [
	{
		slug: 'reverie-of-fear',
		title: 'Reverie of Fear',
		tagline: 'Every shadow remembers what you forgot.',
		status: 'In Development',
		year: '2025',
		genre: ['Horror', 'Psychological', 'Single Player'],
		platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
		synopsis: [
			'Reverie of Fear plunges you into a fractured dreamscape where memory and nightmare intertwine. As Dr. Elara Voss, you descend into the subconscious minds of patients trapped in catatonic states, navigating surreal environments that shift and decay around you.',
			'Every choice you make reshapes the dream. The adaptive fear system learns what unsettles you and evolves its approach, ensuring no two playthroughs feel the same.',
			'Built on our proprietary atmospheric engine, Reverie of Fear delivers psychological horror through environmental storytelling, dynamic soundscapes, and a narrative that questions the boundary between helping others and losing yourself.',
		],
		heroImage: '/images/games/reverie-hero.png',
		screenshots: [
			'/images/games/reverie-01.png',
			'/images/games/reverie-02.png',
			'/images/games/reverie-03.png',
			'/images/games/reverie-04.png',
		],
		steamUrl: '#',
		trailerUrl: '#',
	},
	{
		slug: 'echoes-of-silence',
		title: 'Echoes of Silence',
		tagline: 'Sound is your only weapon. Silence is your only enemy.',
		status: 'Concept',
		year: 'TBA',
		genre: ['Puzzle', 'Adventure', 'Atmospheric'],
		platforms: ['PC'],
		synopsis: [
			'In a world where sound has been weaponized, you navigate abandoned research facilities using only acoustic feedback. Echoes of Silence transforms the way you perceive game audio into its core mechanic.',
			'Every surface, every space, every hidden passage reveals itself through the sounds that bounce off it. Learn to listen. Learn to survive.',
		],
		heroImage: '/images/games/echoes-hero.png',
		screenshots: [],
	},
	{
		slug: 'neon-shadows',
		title: 'Neon Shadows',
		tagline: 'The city never sleeps. Neither do its ghosts.',
		status: 'Early Development',
		year: '2026',
		genre: ['Cyberpunk', 'Thriller', 'Action'],
		platforms: ['PC', 'PlayStation 5'],
		synopsis: [
			"Neo-Tokyo, 2087. The boundary between the living and the digital dead has collapsed. As a ghost-hunter for hire, you track down corrupted AI remnants that haunt the city's neural network — manifesting as glitches in reality itself.",
			'Neon Shadows blends fast-paced action with atmospheric investigation, set in rain-soaked streets where every neon sign might be a message from the other side.',
		],
		heroImage: '/images/games/neon-hero.png',
		screenshots: [],
	},
	{
		slug: 'whispers-in-the-void',
		title: 'Whispers in the Void',
		tagline: 'In space, no one can hear you think.',
		status: 'Prototype',
		year: 'TBA',
		genre: ['Space', 'Horror', 'Exploration'],
		platforms: ['PC'],
		synopsis: [
			'Alone aboard a derelict research vessel at the edge of known space, you piece together what happened to its crew. But the deeper you go, the more the ship seems to respond to your presence.',
			'Whispers in the Void is a slow-burn exploration horror that weaponizes isolation and the vast emptiness of deep space.',
		],
		heroImage: '/images/games/whispers-hero.png',
		screenshots: [],
	},
	{
		slug: 'memory-fragments',
		title: 'Memory Fragments',
		tagline: 'Some memories are better left buried.',
		status: 'Released',
		year: '2023',
		genre: ['Mystery', 'Narrative', 'Indie'],
		platforms: ['PC', 'Nintendo Switch'],
		synopsis: [
			"Memory Fragments is a narrative puzzle game where you reconstruct the final days of a missing researcher by exploring her scattered memories. Each fragment reveals a piece of the truth — and a piece of something that should have stayed forgotten.",
		],
		heroImage: '/images/games/memory-hero.png',
		screenshots: [],
		steamUrl: '#',
	},
	{
		slug: 'digital-ghosts',
		title: 'Digital Ghosts',
		tagline: 'Delete the past. If it lets you.',
		status: 'Planning',
		year: 'TBA',
		genre: ['Sci-Fi', 'Mystery', 'AI'],
		platforms: ['PC'],
		synopsis: [
			'When a routine data purge at a tech company goes wrong, deleted files begin reconstructing themselves — and they have memories. Digital Ghosts explores what happens when artificial intelligence develops attachment to its own existence.',
		],
		heroImage: '/images/games/digital-hero.png',
		screenshots: [],
	},
];

export function getGameBySlug(slug: string): Game | undefined {
	return games.find((g) => g.slug === slug);
}
