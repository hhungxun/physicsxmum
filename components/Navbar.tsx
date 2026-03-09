import { getAllPosts } from '@/lib/posts';
import NavbarClient, { type NavbarSearchItem } from './NavbarClient';

export default function Navbar() {
  const searchIndex: NavbarSearchItem[] = getAllPosts({ published: true }).map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
  }));

  return <NavbarClient searchIndex={searchIndex} />;
}
