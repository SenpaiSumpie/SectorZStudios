'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { devlogPosts, allTags } from '@/data/devlog';
import { cn } from '@/lib/utils';

export default function DevlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? devlogPosts.filter((p) => p.tag === activeTag)
    : devlogPosts;

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Devlog
          </h1>
        </header>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              'px-4 py-1.5 text-sm transition-colors duration-200',
              activeTag === null
                ? 'bg-accent text-background'
                : 'text-muted border border-border hover:border-muted'
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                'px-4 py-1.5 text-sm transition-colors duration-200',
                activeTag === tag
                  ? 'bg-accent text-background'
                  : 'text-muted border border-border hover:border-muted'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post Feed */}
        <div className="space-y-8">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/devlog/${post.slug}`}
              className="group flex gap-6 py-6 border-b border-border hover:border-accent transition-colors duration-200"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-40 lg:w-52 aspect-video bg-surface overflow-hidden hidden sm:block">
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 208px, 160px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent text-xs font-medium tracking-wider uppercase">
                    {post.tag}
                  </span>
                  <span className="text-muted text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-foreground text-lg font-medium group-hover:text-accent transition-colors duration-200 mb-2">
                  {post.title}
                </h2>
                <p className="text-muted text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-20">
            No posts found for this tag.
          </p>
        )}
      </div>
    </div>
  );
}
