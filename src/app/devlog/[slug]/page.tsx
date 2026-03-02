import { notFound } from 'next/navigation';
import Link from 'next/link';
import { devlogPosts, getPostBySlug } from '@/data/devlog';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Sector Z Devlog`,
    description: post.excerpt,
  };
}

export default async function DevlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Header Image */}
      {post.headerImage && (
        <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-12">
          <div className="aspect-[21/9] bg-surface overflow-hidden">
            <img
              src={post.headerImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article */}
      <div className="max-w-[65ch] mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-sm font-medium tracking-wider uppercase">
              {post.tag}
            </span>
            <span className="text-muted text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground">
            {post.title}
          </h1>
        </header>

        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/devlog"
            className="text-muted hover:text-accent transition-colors text-sm"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
