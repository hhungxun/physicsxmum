import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';

interface PostContentProps {
  content: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Custom renderers
const components: Components = {
  // Post pages already render the page title as H1 in the hero block.
  // Demote markdown H1 to H2 to keep one semantic H1 per page.
  h1(props) {
    return <h2 {...props} />;
  },
  // Prepend basePath to absolute image paths so static-export deploys work correctly
  img(props) {
    const src = typeof props.src === 'string' ? props.src : undefined;
    const resolvedSrc = src?.startsWith('/') ? basePath + src : src;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={resolvedSrc}
        alt={props.alt || ''}
        className="my-6 mx-auto block max-w-full rounded-lg border border-border shadow-sm"
      />
    );
  },
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text prose-strong:text-text prose-a:text-accent prose-code:text-primary prose-code:bg-accent-soft prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-primary-deep prose-pre:text-white prose-blockquote:border-accent prose-blockquote:text-muted prose-li:text-text prose-p:text-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
