import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';
import ParticleFallback from '@/components/ParticleFallback';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const allPosts = getAllPosts({ published: true });
  const featuredPost = allPosts.find(p => p.featured) ?? allPosts[0];
  const latestPosts = allPosts.filter(p => p.slug !== featuredPost?.slug).slice(0, 9);
  const faculty = allPosts.filter(p => p.category === 'Staff');
  const researchAreas = new Set(
    faculty.flatMap(post => post.tags)
      .filter(tag => tag !== 'staff' && !['experimental', 'theoretical', 'computational-physics', 'biophysics', 'plasma'].includes(tag))
      .map(tag => tag.split('/')[0])
  );
  const quickStats = [
    `${faculty.length} faculty`,
    `${researchAreas.size} research areas`,
    'Est. 2016',
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection featuredPost={featuredPost} />

        <section className="border-b border-border bg-surface/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl animate-slide-up">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Department of Physics</p>
              <p className="mt-2 text-base leading-relaxed text-text md:text-lg">
                XMUM Physics brings together internationally trained faculty, interdisciplinary research, and industry-relevant training in fundamental and applied physics.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-2">
                {quickStats.map(stat => (
                  <span
                    key={stat}
                    className="animate-scale-in rounded-full border border-border bg-bg px-3 py-1 text-sm font-medium text-primary"
                  >
                    {stat}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/about" className="rounded-full bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-deep">
                  About the Department
                </Link>
                <Link href="/faculty" className="rounded-full border border-border px-4 py-2 text-primary transition-colors hover:border-accent hover:text-accent">
                  Meet the Faculty
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {latestPosts.length > 0 && (
            <section>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Latest</p>
                <h2 className="text-2xl font-bold text-text font-serif">Latest Posts</h2>
              </div>
              <div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {allPosts.length === 0 && (
            <div className="py-20 text-center text-muted">
              <ParticleFallback className="mb-4" size={92} />
              <p className="text-xl text-text">No posts yet. Check back soon.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
