import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostContent from '@/components/PostContent';
import TagBadge from '@/components/TagBadge';
import BlogCard from '@/components/BlogCard';
import { getPostBySlug, getAdjacentPosts, getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || undefined,
      url: absoluteUrl(canonicalPath),
      images: post.cover_image
        ? [{ url: post.cover_image, alt: post.title }]
        : [{ url: absoluteUrl('/particle-in-box.svg'), alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [post.cover_image] : [absoluteUrl('/particle-in-box.svg')],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts({ published: true });
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const { prev, next } = getAdjacentPosts(post.slug);

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Cover */}
        {post.cover_image ? (
          <div className="relative h-72 md:h-96 w-full">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
              {post.category && (
                <Link href={`/category/${encodeURIComponent(post.category)}`}
                  className="text-blue-300 text-sm font-semibold uppercase tracking-wide mb-2 block hover:text-blue-200"
                >
                  {post.category}
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary to-primary-deep py-16 px-4">
            <div className="max-w-4xl mx-auto">
              {post.category && (
                <Link href={`/category/${encodeURIComponent(post.category)}`}
                  className="text-blue-300 text-sm font-semibold uppercase tracking-wide mb-3 block hover:text-blue-200"
                >
                  {post.category}
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <User size={15} className="text-border" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-border" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-border" />
              {readTime} min read
            </span>
          </div>

          {/* Content */}
          <PostContent content={post.content} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 border-t border-border pt-6">
              <span className="mr-2 text-sm font-medium text-text">Tags:</span>
              <div className="inline-flex flex-wrap gap-1.5">
                {post.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
              </div>
            </div>
          )}

          {/* Prev/Next */}
          {(prev || next) && (
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-2">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent">
                  <div className="mb-1 text-xs text-muted">← Previous</div>
                  <div className="line-clamp-2 text-sm font-medium text-text font-serif group-hover:text-accent">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group ml-auto w-full rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent md:text-right">
                  <div className="mb-1 text-xs text-muted">Next →</div>
                  <div className="line-clamp-2 text-sm font-medium text-text font-serif group-hover:text-accent">{next.title}</div>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
