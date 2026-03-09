'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Menu, X, Atom } from 'lucide-react';

export interface NavbarSearchItem {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
}

interface NavbarClientProps {
  searchIndex: NavbarSearchItem[];
}

interface SearchResult {
  slug: string;
  title: string;
  category: string | null;
}

export default function NavbarClient({ searchIndex }: NavbarClientProps) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();

    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const nextResults = searchIndex
      .filter(item =>
        item.title.toLowerCase().includes(trimmed) ||
        (item.excerpt ?? '').toLowerCase().includes(trimmed) ||
        item.tags.some(tag => tag.toLowerCase().includes(trimmed)) ||
        (item.category ?? '').toLowerCase().includes(trimmed)
      )
      .slice(0, 6)
      .map(item => ({
        slug: item.slug,
        title: item.title,
        category: item.category,
      }));

    setResults(nextResults);
  }, [query, searchIndex]);

  function resetSearch() {
    setQuery('');
    setResults([]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) {
      router.push(`/blog/${results[0].slug}`);
      setMenuOpen(false);
      resetSearch();
    }
  }

  function handleResultClick(slug: string) {
    router.push(`/blog/${slug}`);
    setMenuOpen(false);
    resetSearch();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Atom className="text-accent" size={28} />
            <div className="hidden sm:block">
              <div className="text-base font-bold leading-tight text-primary font-serif">XMUM Physics</div>
              <div className="text-xs text-muted">Department Blog</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text">
            <Link href="/about" className="transition-colors hover:text-accent">About</Link>
            <Link href="/faculty" className="transition-colors hover:text-accent">Faculty</Link>
            <Link href="/category/Events" className="transition-colors hover:text-accent">Talks</Link>
            <Link href="/category/News" className="transition-colors hover:text-accent">News</Link>
            <Link href="/category/Students" className="transition-colors hover:text-accent">Students</Link>
          </nav>

          <form onSubmit={handleSubmit} className="relative hidden sm:block">
            <label htmlFor="navbar-search" className="sr-only">
              Search posts
            </label>
            <input
              id="navbar-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-52 rounded-lg border border-border bg-surface py-1.5 pl-3 pr-8 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
            >
              <Search size={16} />
            </button>
            {query.trim().length >= 2 && (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
                {results.length > 0 ? (
                  <ul className="py-2">
                    {results.map(result => (
                      <li key={result.slug}>
                        <button
                          type="button"
                          onClick={() => handleResultClick(result.slug)}
                          className="block w-full px-4 py-2 text-left transition-colors hover:bg-bg"
                        >
                          <div className="text-sm font-medium text-text">{result.title}</div>
                          {result.category && <div className="text-xs text-muted">{result.category}</div>}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted">No matching posts.</div>
                )}
              </div>
            )}
          </form>

          <button
            type="button"
            className="text-muted hover:text-text md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-border/70 py-3 md:hidden">
            <nav className="mb-3 flex flex-col gap-2 text-sm font-medium text-text">
              <Link href="/about" className="py-1 hover:text-accent" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/faculty" className="py-1 hover:text-accent" onClick={() => setMenuOpen(false)}>Faculty</Link>
              <Link href="/category/Events" className="py-1 hover:text-accent" onClick={() => setMenuOpen(false)}>Talks</Link>
              <Link href="/category/News" className="py-1 hover:text-accent" onClick={() => setMenuOpen(false)}>News</Link>
              <Link href="/category/Students" className="py-1 hover:text-accent" onClick={() => setMenuOpen(false)}>Students</Link>
            </nav>
            <form onSubmit={handleSubmit} className="relative">
              <label htmlFor="mobile-navbar-search" className="sr-only">
                Search posts
              </label>
              <input
                id="mobile-navbar-search"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-lg border border-border bg-surface py-2 pl-3 pr-9 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                <Search size={16} />
              </button>
              {query.trim().length >= 2 && (
                <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                  {results.length > 0 ? (
                    <ul className="py-2">
                      {results.map(result => (
                        <li key={result.slug}>
                          <button
                            type="button"
                            onClick={() => handleResultClick(result.slug)}
                            className="block w-full px-4 py-2 text-left transition-colors hover:bg-bg"
                          >
                            <div className="text-sm font-medium text-text">{result.title}</div>
                            {result.category && <div className="text-xs text-muted">{result.category}</div>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted">No matching posts.</div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
