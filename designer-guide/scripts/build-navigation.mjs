/**
 * Builds sidebar navigation from content/_meta.js files.
 * Run: node scripts/build-navigation.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT = join(ROOT, 'content');
const NAV_OUTPUT = join(ROOT, 'src/data/navigation.json');

async function loadMeta(metaPath) {
  if (!existsSync(metaPath)) {
    return {};
  }
  const mod = await import(pathToFileURL(metaPath).href);
  return mod.default ?? {};
}

/**
 * Reads the frontmatter `description` from a markdown file.
 * @param {string} mdPath
 * @returns {string | undefined}
 */
function readDescription(mdPath) {
  if (!existsSync(mdPath)) {
    return undefined;
  }

  const text = readFileSync(mdPath, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    return undefined;
  }

  const match = frontmatter[1].match(/^description:\s*(.*)$/m);
  if (!match) {
    return undefined;
  }

  let value = match[1].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).replaceAll('\\"', '"');
  }

  return value || undefined;
}

/**
 * @param {{ slug: string, label: string, pages?: unknown[] }} item
 * @param {string | undefined} description
 * @returns {{ slug: string, label: string, description?: string, pages?: unknown[] }}
 */
function withDescription(item, description) {
  return description ? { ...item, description } : item;
}

export async function buildNavigation() {
  if (!existsSync(join(CONTENT, '_meta.js'))) {
    throw new Error(`Content meta not found: ${join(CONTENT, '_meta.js')}`);
  }

  const rootMeta = await loadMeta(join(CONTENT, '_meta.js'));
  const home = withDescription(
    { slug: 'index', label: 'Home' },
    readDescription(join(CONTENT, 'index.md')),
  );
  const sections = [];

  for (const [sectionSlug, sectionLabel] of Object.entries(rootMeta)) {
    const sectionMeta = await loadMeta(join(CONTENT, sectionSlug, '_meta.js'));
    const pages = Object.entries(sectionMeta)
      .filter(([pageSlug]) => pageSlug !== 'index')
      .map(([pageSlug, label]) =>
        withDescription(
          { slug: `${sectionSlug}/${pageSlug}`, label },
          readDescription(join(CONTENT, sectionSlug, `${pageSlug}.md`)),
        ),
      );

    sections.push(
      withDescription(
        { slug: sectionSlug, label: sectionLabel, pages },
        readDescription(join(CONTENT, sectionSlug, 'index.md')),
      ),
    );
  }

  const navigation = { home, sections };
  mkdirSync(dirname(NAV_OUTPUT), { recursive: true });
  writeFileSync(NAV_OUTPUT, `${JSON.stringify(navigation, null, 2)}\n`);
  return navigation;
}

async function main() {
  const navigation = await buildNavigation();
  console.log(`Wrote navigation (${navigation.sections.length} sections)`);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isCli) {
  await main();
}
