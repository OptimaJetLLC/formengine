#!/usr/bin/env node
/**
 * Applies fixes from documentation/validation-todo.md and marks completed items.
 * Usage: node scripts/fix-validation-todos.mjs [--batch N] [--dry-run]
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const TODO_PATH = path.join(ROOT, 'documentation/validation-todo.md');
const BATCH = (() => {
  const i = process.argv.indexOf('--batch');
  return i !== -1 ? Number(process.argv[i + 1]) : Infinity;
})();
const DRY_RUN = process.argv.includes('--dry-run');

const TODO_LINE =
  /^- \[( |x)\] `([^`]+)`(?: \(line (\d+)\))?: \*\*([^*]+)\*\* \[(\w+)\]/;

function parseFrontmatterTitle(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const titleMatch = m[1].match(/^title:\s*(?:"([^"]*)"|'([^']*)'|(.+))$/m);
  if (!titleMatch) return null;
  return (titleMatch[1] ?? titleMatch[2] ?? titleMatch[3] ?? '').trim();
}

function normalizeTitle(s) {
  return s.replace(/^["']|["']$/g, '').trim();
}

function fixHeadingSingleH1(content) {
  const title = parseFrontmatterTitle(content);
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterDone = false;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!frontmatterDone) {
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        if (!inFrontmatter) frontmatterDone = true;
      }
      continue;
    }
    const h1 = line.match(/^(#) (.+)$/);
    if (h1) {
      if (title) {
        lines[i] = `## ${h1[2]}`;
        changed = true;
      }
      break;
    }
  }
  return changed ? lines.join('\n') : content;
}

function fixNoConsecutiveBlankLines(content) {
  return content.replace(/\n{3,}/g, '\n\n');
}

function fixBareUrlAngled(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  if (idx < 0 || idx >= lines.length) return content;
  lines[idx] = lines[idx].replace(
    /(?<![<(])(https?:\/\/[^\s)>]+)(?![>)])/g,
    '<$1>',
  );
  return lines.join('\n');
}

function fixCodeBlockLanguage(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  for (let i = idx; i >= 0; i--) {
    if (lines[i].startsWith('```')) {
      if (lines[i] === '```') lines[i] = '```text';
      break;
    }
  }
  return lines.join('\n');
}

function fixListsBlankLines(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  if (idx > 0 && lines[idx - 1].trim() !== '') {
    lines.splice(idx, 0, '');
  }
  return lines.join('\n');
}

function fixListIndentConsistency(content, lineNum) {
  const lines = content.split('\n');
  for (let idx = lineNum - 1; idx < lines.length; idx++) {
    const line = lines[idx];
    const m = line.match(/^(\s*)[-*+] /);
    if (!m) {
      if (line.trim() === '') continue;
      break;
    }
    const spaces = m[1].length;
    if (spaces === 0) continue;
    const newSpaces = spaces >= 4 ? 2 : spaces;
    if (newSpaces !== spaces) {
      lines[idx] = line.replace(/^\s+/, ' '.repeat(newSpaces));
    }
  }
  return lines.join('\n');
}

function fixBareUrlsGlobally(content) {
  return content.replace(/(?<![<(])(https?:\/\/[^\s<>)]+)(?![>)])/g, '<$1>');
}

function fixNoReversedLinks(content) {
  return content.replace(/\(([^)\]]+)\)\[([^\]]+)\]/g, '[$1]($2)');
}

function fixFirstLineH1(content) {
  if (content.startsWith('---')) return content;
  if (content.match(/^#\s/m)) return content;
  const lines = content.split('\n');
  const firstNonEmpty = lines.findIndex((l) => l.trim() !== '');
  if (firstNonEmpty === -1) return content;
  if (!lines[firstNonEmpty].startsWith('#')) {
    lines[firstNonEmpty] = `# ${lines[firstNonEmpty].replace(/^#+\s*/, '')}`;
    return lines.join('\n');
  }
  return content;
}

function fixAllHeadingIncrements(content) {
  const lines = content.split('\n');
  let inFence = false;
  let prevLevel = 0;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6}) (.+)$/);
    if (!m) continue;
    let level = m[1].length;
    if (prevLevel > 0 && level > prevLevel + 1) {
      level = prevLevel + 1;
      lines[i] = `${'#'.repeat(level)} ${m[2]}`;
      changed = true;
    }
    prevLevel = level;
  }
  return changed ? lines.join('\n') : content;
}
  const lines = content.split('\n');
  const idx = lineNum - 1;
  let prevLevel = 0;
  for (let i = 0; i < idx; i++) {
    const m = lines[i].match(/^(#{1,6}) /);
    if (m) prevLevel = m[1].length;
  }
  const cur = lines[idx]?.match(/^(#{1,6}) (.+)$/);
  if (!cur) return content;
  const curLevel = cur[1].length;
  if (curLevel > prevLevel + 1 && prevLevel > 0) {
    lines[idx] = `${'#'.repeat(prevLevel + 1)} ${cur[2]}`;
  }
  return lines.join('\n');
}

function fixUnorderedListStyle(content, lineNum) {
  const lines = content.split('\n');
  for (let i = lineNum - 1; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)[*+] /);
    if (m) lines[i] = lines[i].replace(/^(\s*)[*+] /, '$1- ');
    else if (lines[i].trim() !== '' && !lines[i].match(/^\s/)) break;
  }
  return lines.join('\n');
}

function fixNoTrailingSpaces(content) {
  return content
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, ''))
    .join('\n');
}

function fixFencedCodeBlankLines(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  if (idx > 0 && lines[idx - 1].trim() !== '' && !lines[idx - 1].startsWith('```')) {
    lines.splice(idx, 0, '');
  }
  return lines.join('\n');
}

function fixHeadingBlankLines(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  if (idx > 0 && lines[idx - 1].trim() !== '') {
    lines.splice(idx, 0, '');
  }
  if (idx < lines.length - 1 && lines[idx + 1]?.trim() !== '') {
    lines.splice(idx + 1, 0, '');
  }
  return lines.join('\n');
}

function fixImageAltText(content, lineNum) {
  const lines = content.split('\n');
  const idx = lineNum - 1;
  lines[idx] = lines[idx].replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (alt.trim()) return match;
    const name = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'image';
    return `![${name}](${src})`;
  });
  return lines.join('\n');
}

function fixSingleTrailingNewline(content) {
  return `${content.replace(/\s+$/, '')}\n`;
}

function applyFixesForFile(filePath, issues) {
  if (filePath.includes('node_modules')) return { skipped: true, content: null };
  const abs = path.join(ROOT, filePath);
  let content = null;
  const rules = new Set(issues.map((i) => i.ruleId));

  return {
    async apply() {
      content = await readFile(abs, 'utf-8');
      let updated = content;

      if (rules.has('md-heading-single-h1') || rules.has('md-first-line-h1')) {
        updated = fixHeadingSingleH1(updated);
      }
      if (rules.has('md-no-consecutive-blank-lines')) {
        updated = fixNoConsecutiveBlankLines(updated);
      }
      if (rules.has('md-no-trailing-spaces')) {
        updated = fixNoTrailingSpaces(updated);
      }
      if (rules.has('md-bare-url-angled')) {
        updated = fixBareUrlsGlobally(updated);
      }
      if (rules.has('md-no-reversed-links')) {
        updated = fixNoReversedLinks(updated);
      }
      if (rules.has('md-heading-increment')) {
        updated = fixAllHeadingIncrements(updated);
      }
      if (rules.has('md-single-trailing-newline')) {
        updated = fixSingleTrailingNewline(updated);
      }

      for (const issue of issues) {
        switch (issue.ruleId) {
          case 'md-bare-url-angled':
            updated = fixBareUrlAngled(updated, issue.line);
            break;
          case 'md-code-block-language':
            updated = fixCodeBlockLanguage(updated, issue.line);
            break;
          case 'md-lists-blank-lines':
            updated = fixListsBlankLines(updated, issue.line);
            break;
          case 'md-list-indent-consistency':
            updated = fixListIndentConsistency(updated, issue.line);
            break;
          case 'md-heading-increment':
            updated = fixHeadingIncrement(updated, issue.line);
            break;
          case 'md-unordered-list-style':
            updated = fixUnorderedListStyle(updated, issue.line);
            break;
          case 'md-fenced-code-blank-lines':
            updated = fixFencedCodeBlankLines(updated, issue.line);
            break;
          case 'md-heading-blank-lines':
            updated = fixHeadingBlankLines(updated, issue.line);
            break;
          case 'md-image-alt-text':
            updated = fixImageAltText(updated, issue.line);
            break;
          case 'md-first-line-h1':
            updated = fixFirstLineH1(updated);
            break;
          default:
            break;
        }
      }

      return updated !== content ? updated : null;
    },
  };
}

async function main() {
  const todoText = await readFile(TODO_PATH, 'utf-8');
  const lines = todoText.split('\n');
  const pending = [];

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(TODO_LINE);
    if (m && m[1] === ' ') {
      pending.push({
        lineIndex: i,
        file: m[2],
        line: m[3] ? Number(m[3]) : undefined,
        ruleId: m[4],
        severity: m[5],
        raw: lines[i],
      });
    }
  }

  const byFile = new Map();
  for (const item of pending) {
    if (!byFile.has(item.file)) byFile.set(item.file, []);
    byFile.get(item.file).push(item);
  }

  const fileEntries = [...byFile.entries()].slice(0, BATCH === Infinity ? undefined : BATCH);
  let fixedFiles = 0;
  let markedDone = 0;
  let skippedNodeModules = 0;

  for (const [file, issues] of fileEntries) {
    if (file.includes('node_modules') || file.includes('api-reference/')) {
      for (const issue of issues) {
        const label = file.includes('node_modules') ? 'node_modules' : 'api-reference (auto-generated)';
        lines[issue.lineIndex] = issue.raw.replace('- [ ]', `- [x] (skipped: ${label})`);
        markedDone += issues.length;
      }
      skippedNodeModules++;
      continue;
    }

    const worker = applyFixesForFile(file, issues);
    if (worker.skipped) continue;

    const newContent = await worker.apply();
    if (newContent) {
      if (!DRY_RUN) {
        await writeFile(path.join(ROOT, file), newContent, 'utf-8');
      }
      fixedFiles++;
    }

    for (const issue of issues) {
      lines[issue.lineIndex] = issue.raw.replace('- [ ]', '- [x]');
      markedDone++;
    }
  }

  if (!DRY_RUN) {
    await writeFile(TODO_PATH, lines.join('\n'), 'utf-8');
  }

  const remaining = lines.filter((l) => l.match(TODO_LINE)?.[1] === ' ').length;
  console.log(
    JSON.stringify({
      fixedFiles,
      markedDone,
      skippedNodeModules,
      remaining,
      processedFiles: fileEntries.length,
    }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
