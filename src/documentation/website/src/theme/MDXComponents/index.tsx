import MDXComponents from '@theme-original/MDXComponents';
import {VegaLite} from '@site/src/components/VegaLite';
import {CsvTable} from '@site/src/components/CsvTable';

/**
 * Custom MDX components that extend the default Docusaurus MDX components.
 * This allows us to use custom components like VegaLite in markdown files.
 */
export default {
  // Reuse the default Docusaurus MDX components
  ...MDXComponents,
  // Add custom components
  VegaLite,
  CsvTable
};
