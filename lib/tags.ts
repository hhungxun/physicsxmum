export function formatTagLabel(tag: string): { primary: string; secondary: string | null } {
  const [primary, ...rest] = tag.split('/');
  return {
    primary,
    secondary: rest.length > 0 ? rest.join(' / ') : null,
  };
}

export function groupTagsByArea(tags: string[]): Array<{ area: string; tags: string[] }> {
  const groups = new Map<string, string[]>();

  for (const tag of tags) {
    const area = tag.split('/')[0];
    const existing = groups.get(area) ?? [];
    existing.push(tag);
    groups.set(area, existing);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([area, groupTags]) => ({
      area,
      tags: groupTags.sort((a, b) => a.localeCompare(b)),
    }));
}
