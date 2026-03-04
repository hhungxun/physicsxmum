import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJWT } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

/**
 * Layout for all protected admin pages (/admin, /admin/posts, etc.).
 *
 * Security layers:
 *   1. proxy.ts (primary)  — intercepts every request and checks the JWT cookie
 *      before the page renders.  Unauthenticated → redirect to /admin/login.
 *   2. This layout (secondary) — server-side JWT check as defence-in-depth,
 *      in case the proxy is somehow skipped (e.g. direct server invocation).
 *
 * Static export: the parent app/admin/layout.tsx calls notFound() first, so
 * this layout is never reached.  We add the same guard here anyway because
 * Next.js renders layout segments independently during the static build and
 * would otherwise error on the cookies() call.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Must come before cookies() — static export analysis runs this layout
  // independently of the parent, so we guard here too.
  if (process.env.STATIC_EXPORT === 'true') {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token || !(await verifyJWT(token))) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
