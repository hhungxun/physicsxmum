import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TagBadge from '@/components/TagBadge';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';
import ParticleFallback from '@/components/ParticleFallback';

export const metadata: Metadata = {
  title: 'Faculty',
  description: 'Meet the faculty of the Department of Physics at Xiamen University Malaysia — their research areas, profiles, and contact information.',
  alternates: {
    canonical: '/faculty',
  },
  openGraph: {
    title: 'Faculty',
    description: 'Meet the faculty of the Department of Physics at Xiamen University Malaysia.',
    images: [
      {
        url: absoluteUrl('/images/lab/Labpic18.png'),
        alt: 'XMUM Physics laboratories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl('/images/lab/Labpic18.png')],
  },
};

// Strip the "Staff Profile: " prefix to get just the person's name
function extractName(title: string): string {
  return title.replace(/^Staff Profile:\s*/i, '');
}

// Return only physics-area tags (exclude meta-tags like "staff")
const META_TAGS = new Set(['staff', 'research', 'education', 'department', 'experimental', 'theoretical', 'computational-physics', 'biophysics', 'plasma', 'astrophysics']);

function physicsAreaTags(tags: string[]): string[] {
  return tags.filter(t => !META_TAGS.has(t));
}

export default function FacultyPage() {
  const faculty = getAllPosts({ published: true, category: 'Staff' });

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <div className="border-b border-border bg-surface py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-text font-serif">Faculty</h1>
            <p className="mt-1 text-sm text-muted">{faculty.length} members</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {faculty.map(member => {
              const name = extractName(member.title);
              const areaTags = physicsAreaTags(member.tags);
              return (
                <Link
                  key={member.slug}
                  href={`/blog/${member.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/8"
                >
                  {/* Photo */}
                  <div className="relative h-56 w-full overflow-hidden bg-bg">
                    {member.cover_image ? (
                      <Image
                        src={member.cover_image}
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          member.portrait_focus === 'top'
                            ? 'object-top'
                            : member.portrait_focus === 'bottom'
                              ? 'object-bottom'
                              : 'object-center'
                        }`}
                      />
                    ) : (
                      <ParticleFallback className="h-full" size={78} imageClassName="drop-shadow-xl" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="font-semibold text-text font-serif leading-snug transition-colors group-hover:text-accent">
                      {name}
                    </h2>
                    {areaTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {areaTags.slice(0, 3).map(tag => (
                          <TagBadge key={tag} tag={tag} clickable={false} />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
