import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">404</p>
          <h1 className="mb-4 text-4xl font-bold text-text font-serif">Page not found</h1>
          <p className="mb-8 text-muted">
            The page you requested does not exist or may have moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-primary"
            >
              Go Home
            </Link>
            <Link
              href="/faculty"
              className="rounded-lg border border-border px-4 py-2 text-text transition-colors hover:bg-surface"
            >
              Faculty
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
