import Link from 'next/link';
import { formatTagLabel } from '@/lib/tags';

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export default function TagBadge({ tag, clickable = true }: TagBadgeProps) {
  const { primary, secondary } = formatTagLabel(tag);
  const badge = (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent-soft/55 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent-soft">
      <span className="font-semibold">#{primary}</span>
      {secondary && (
        <>
          <span className="text-muted/65">/</span>
          <span className="text-accent">{secondary}</span>
        </>
      )}
    </span>
  );

  if (clickable) {
    return (
      <Link href={`/tag/${tag}`} aria-label={`View posts tagged ${tag}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}
