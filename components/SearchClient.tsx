'use client';

import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';
import type { Post } from '@/lib/posts';

interface SearchClientProps {
  allPosts: Post[];
}

export default function SearchClient({ allPosts }: SearchClientProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const q = query.toLowerCase();

  const posts = query
    ? allPosts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? '').toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        (p.category ?? '').toLowerCase().includes(q)
      )
    : [];

  return (
    <>
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 font-serif flex items-center gap-2">
            <Search size={22} className="text-blue-600" />
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          {query && (
            <p className="text-gray-600 mt-1 text-sm">
              {posts.length} {posts.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!query && (
          <div className="text-center py-16 text-gray-500">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Enter a search term in the navigation bar above.</p>
          </div>
        )}

        {query && posts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No posts found for &quot;{query}&quot;</p>
            <p className="text-sm mt-2">Try different keywords or browse all posts.</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
