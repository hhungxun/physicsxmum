import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchClient from '@/components/SearchClient';
import { getAllPosts } from '@/lib/posts';

export const metadata = { title: 'Search' };

export default function SearchPage() {
  const allPosts = getAllPosts({ published: true });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense>
          <SearchClient allPosts={allPosts} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
