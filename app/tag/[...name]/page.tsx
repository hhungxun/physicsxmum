import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, getAllTags } from '@/lib/posts';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(t => ({ name: t.split('/') }));
}

interface Props {
  params: Promise<{ name: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const tag = name.join('/');
  return {
    title: `Tag: #${tag}`,
    alternates: {
      canonical: `/tag/${tag}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { name } = await params;
  const tag = name.join('/');
  const posts = getAllPosts({ published: true, tag });

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <div className="border-b border-border bg-surface py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent">Tag</div>
            <h1 className="text-3xl font-bold text-text font-serif">#{tag}</h1>
            <p className="mt-1 text-sm text-muted">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => <BlogCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-muted">
              <p className="text-lg">No posts with this tag yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
