import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { games, getGameBySlug } from '@/data/games';
import { devlogPosts } from '@/data/devlog';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: 'Game Not Found' };
  return {
    title: `${game.title} — Sector Z`,
    description: game.tagline,
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) notFound();

  const relatedPosts = devlogPosts
    .filter((p) => p.relatedGame === game.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${game.heroImage})`,
            backgroundColor: 'var(--surface)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 w-full">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            {game.status} · {game.year}
          </p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-8xl text-foreground mb-4">
            {game.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-6">
            {game.genre.map((g) => (
              <span
                key={g}
                className="text-sm text-muted border border-border px-3 py-1"
              >
                {g}
              </span>
            ))}
          </div>
          {game.platforms.length > 0 && (
            <p className="text-muted text-sm">
              {game.platforms.join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* Synopsis */}
      <section className="max-w-[65ch] mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="space-y-6">
          {game.synopsis.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        {(game.steamUrl || game.trailerUrl) && (
          <div className="flex flex-wrap gap-4 mt-12">
            {game.steamUrl && (
              <Button variant="solid" size="lg">
                Wishlist on Steam
              </Button>
            )}
            {game.trailerUrl && (
              <Button variant="ghost" size="lg">
                Watch Trailer
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Screenshots */}
      {game.screenshots.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {game.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-[400px] lg:w-[600px] aspect-video bg-surface overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`${game.title} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 600px, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Devlog Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-display text-2xl lg:text-3xl text-foreground mb-10">
              Development Diary
            </h2>
            <div className="space-y-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/devlog/${post.slug}`}
                  className="block group py-4 border-b border-border hover:border-accent transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-foreground group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm mt-1">{post.excerpt}</p>
                    </div>
                    <span className="text-muted text-sm hidden sm:block">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <Link
          href="/games"
          className="text-muted hover:text-accent transition-colors text-sm"
        >
          ← All games
        </Link>
      </div>
    </div>
  );
}
