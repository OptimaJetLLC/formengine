import navigation from '../data/navigation.json';

interface ArticleNeighbor {
  slug: string;
  label: string;
}

interface ArticleNeighbors {
  prev: ArticleNeighbor | null;
  next: ArticleNeighbor | null;
}

interface NavPage {
  slug: string;
  label: string;
}

interface NavSection {
  slug: string;
  label: string;
  pages: NavPage[];
}

function getSidebarArticles(): ArticleNeighbor[] {
  const sections = (navigation as { sections: NavSection[] }).sections;
  return [
    { slug: 'index', label: 'Home' },
    ...sections.flatMap((section) => [
      { slug: section.slug, label: section.label },
      ...section.pages.map((page) => ({
        slug: page.slug,
        label: page.label,
      })),
    ]),
  ];
}

/**
 * Resolves previous and next articles for the current content entry id.
 * @param entryId navigation slug such as `meet-the-designer`, `meet-the-designer/examples-and-use-cases`, or `index`
 * @returns prev/next object.
 */
export function getArticleNeighbors(entryId: string): ArticleNeighbors {
  const articles = getSidebarArticles();
  const index = articles.findIndex((article) => article.slug === entryId);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}
