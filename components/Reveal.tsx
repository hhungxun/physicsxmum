/**
 * Marks a block to be revealed on scroll.
 *
 * Deliberately NOT a client component. It renders nothing but classes; a single
 * observer set up by the inline script in app/nextfrontier/layout.tsx does the work
 * for every `.camp-reveal` on the page.
 *
 * That matters on a static export: 51 client components each holding their own
 * observer and state means 51 reveals that all wait on React hydration. One plain
 * observer runs the moment the DOM is parsed, ships no component JS, and cannot be
 * broken by a hydration failure elsewhere on the page.
 */

import type { ElementType, ReactNode, CSSProperties } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: ReactNode;
  /** Stagger within a group, in ms. */
  delay?: number;
  direction?: Direction;
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
  className = '',
  id,
  style,
}: RevealProps) {
  return (
    <Tag
      id={id}
      className={`camp-reveal camp-reveal--${direction}${className ? ' ' + className : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
