import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostContent from '@/components/PostContent';
import { getPostBySlug } from '@/lib/posts';
import Image from 'next/image';
import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About the Department',
  description: 'The Department of Physics at Xiamen University Malaysia offers an interdisciplinary physics education with international exposure and collaboration networks.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About the Department',
    description: 'Learn about the mission, facilities, programmes, and student outcomes of XMUM Physics.',
    images: [
      {
        url: absoluteUrl('/images/about-department/image1.png'),
        alt: 'XMUM Physics Department',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl('/images/about-department/image1.png')],
  },
};

export default function AboutPage() {
  const post = getPostBySlug('about-department');
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {post.cover_image ? (
          <div className="relative h-72 md:h-80 w-full">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary to-primary-deep py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
          <PostContent content={post.content} />
        </div>
      </main>
      <Footer />
    </>
  );
}
