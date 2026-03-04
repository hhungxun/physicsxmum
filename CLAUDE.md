# CLAUDE.md — XMUM Physics Blog

Project instructions for Claude Code. These apply to every session.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — config is CSS-first (`app/globals.css`), uses `@import "tailwindcss"` and `@plugin "@tailwindcss/typography"`
- **gray-matter** — parses YAML frontmatter from `.md` files in `content/posts/`
- **react-markdown** with `remark-gfm`, `remark-math`, `rehype-highlight`, `rehype-slug`, `rehype-katex` for rendering post content
- **No server, no database, no auth** — pure static site, deployable to GitHub Pages

## Key Files

| File | Purpose |
|------|---------|
| `content/posts/` | Markdown files — one file per post with YAML frontmatter |
| `lib/posts.ts` | Reads + parses all `.md` files; exports `getAllPosts`, `getPostBySlug`, `getAdjacentPosts`, `searchPosts`, `getAllTags`, `getAllCategories` |
| `components/PostContent.tsx` | Renders markdown post content — add new remark/rehype plugins here |
| `components/BlogCard.tsx` | Blog post card for grids |
| `components/TagBadge.tsx` | Clickable tag pill linking to `/tag/[name]` |
| `components/SearchClient.tsx` | Client component — reads `?q=` via `useSearchParams()`, filters posts in JS |
| `app/globals.css` | Tailwind v4 config, highlight.js CSS, KaTeX CSS, animation keyframes |

## Commands

```bash
npm run dev           # dev server at http://localhost:3000
npm run build         # production build
npm run build:static  # static export to ./out (sets STATIC_EXPORT=true BASE_PATH=/repo-name in CI)
```

## Post Format

Posts live in `content/posts/<slug>.md`. The filename (without `.md`) is the slug unless overridden with `slug:` in frontmatter.

```yaml
---
title: "Post Title"
excerpt: "Short description shown on cards."
author: "Author Name"
category: "Category"
tags:
  - tag one
  - tag two
cover_image: "https://picsum.photos/seed/example/1200/600"
published: true
date: "2024-03-01"
---

Post content in Markdown here...
```

- `published: false` (or omitting `published`) keeps a post as a draft — it won't appear on the public site
- `date` is the canonical display and sort date (ISO `YYYY-MM-DD`)
- `tags` is a YAML list (rendered as `string[]`, no JSON encoding needed)

## Static Export (GitHub Pages)

- Triggered by `STATIC_EXPORT=true` env var → sets `output: 'export'` in `next.config.ts`
- `BASE_PATH` env var sets the Next.js `basePath` (e.g. `/phy-blog` for GitHub Pages project pages)
- `NEXT_PUBLIC_BASE_PATH` is exposed to client for resolving static asset paths in markdown images
- **All dynamic page segments must have** `generateStaticParams()` — return raw (not URL-encoded) values
- Posts are read from `content/posts/` at build time; the static `./out` folder has no server
- Search works on GitHub Pages via client-side filtering in `SearchClient.tsx`

## Conventions

- Post content is **Markdown** in `content/posts/<slug>.md` — not in a database
- LaTeX: use `$...$` for inline math and `$$...$$` for display math (rendered via KaTeX)
- Cover images: use picsum.photos URLs for demos (`https://picsum.photos/seed/<key>/1200/600`)
- `generateStaticParams` for tag/category pages must return **non-encoded** segment values

## Important Constraints

- Do **not** use `encodeURIComponent` in `generateStaticParams` — pass raw values; Next.js handles encoding
- Do **not** add `@import` for Google Fonts in CSS (causes Tailwind v4 ordering warnings) — use `<link>` in `app/layout.tsx`
- There is no admin panel, no API routes, no authentication, and no database

---

## How to Add a New Blog Post

1. Create a new file in `content/posts/` named `<slug>.md` (the filename becomes the URL slug)
2. Add YAML frontmatter at the top of the file:

```yaml
---
title: "My New Post"
excerpt: "A brief description for the card and meta tags."
author: "Your Name"
category: "Research"
tags:
  - physics
  - education
cover_image: "https://picsum.photos/seed/my-post/1200/600"
published: true
date: "2024-03-15"
---
```

3. Write the post body in Markdown below the frontmatter
4. Set `published: true` to make it live; omit or set `false` to keep as draft
5. `git add content/posts/my-new-post.md && git push` — GitHub Actions deploys automatically

### Markdown cheat sheet for posts

```
# Heading 1
## Heading 2

**bold**, *italic*, `inline code`

- bullet list
1. numbered list

> blockquote

| Column | Column |
|--------|--------|
| cell   | cell   |

$E = mc^2$           ← inline LaTeX
$$\hat{H}\psi = E\psi$$  ← display LaTeX

![Alt text](/uploads/my-image.png)
```
