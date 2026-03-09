import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import TagBadge from './TagBadge';
import ParticleFallback from './ParticleFallback';
import type { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), 'MMM d, yyyy');

  return (
    <article className="animate-slide-up flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/8">
      {post.cover_image ? (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
          </div>
        </Link>
      ) : (
        <Link href={`/blog/${post.slug}`}>
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-accent-soft via-white to-accent-soft/60">
            <ParticleFallback size={72} imageClassName="drop-shadow-xl" />
          </div>
        </Link>
      )}

      <div className="p-5 flex flex-col flex-1">
        {post.category && (
          <Link
            href={`/category/${encodeURIComponent(post.category)}`}
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-accent transition-colors hover:text-primary"
          >
            {post.category}
          </Link>
        )}

        <Link href={`/blog/${post.slug}`}>
          <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-text font-serif transition-colors hover:text-accent">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="mb-4 flex-1 line-clamp-3 text-sm text-muted">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 border-t border-border/70 pt-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
