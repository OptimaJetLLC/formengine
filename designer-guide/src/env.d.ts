/// <reference types="astro/client" />

interface Window {
  docsearch?: (options: {
    container: string;
    appId: string;
    apiKey: string;
    indexName: string;
    placeholder?: string;
    transformItems?: (items: Array<{ url: string }>) => Array<{ url: string }>;
  }) => void;
}
