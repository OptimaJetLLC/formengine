/**
 * MDX lint configuration aligned with Docusaurus markdown processing.
 * @see https://docusaurus.io/docs/markdown-features
 */
export default {
  plugins: [
    ['remark-frontmatter', ['yaml']],
    'remark-directive',
    'remark-gfm',
    'remark-custom-heading-id',
  ],
};
