import Link from 'next/link';
import { games } from '@/data/games';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games — Sector Z',
  description: 'Explore our atmospheric horror games.',
};

export default function GamesPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Games
          </h1>
        </header>

        <div className="space-y-1">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group block py-8 border-b border-border hover:border-accent transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-display text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors duration-200">
                    {game.title}
                  </h2>
                  <p className="text-muted mt-2">{game.tagline}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="text-accent">{game.status}</span>
                  <span>{game.year}</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
