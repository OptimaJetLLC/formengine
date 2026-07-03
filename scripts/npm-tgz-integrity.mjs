#!/usr/bin/env node
/**
 * npm integrity (sha512-...) for .tgz files — same as package-lock / npm.
 *
 * Modes (auto-detected from arguments after flags):
 * 1) Only .tgz files — writes <basename>.integrity in cwd (or --stdout; --out not used)
 * 2) Only non-tgz files — each is a list (one .tgz path per line, # comments; relative to list file) → "path - hash"
 * 3) Only directories — Markdown pipe table (stdout / --out): columns = directory basename, rows = tgz name, cells = hash or empty
 *
 * Flags: --stdout  --out <file>
 */

import fs from "node:fs";
import path from "node:path";

import { integrityForTgz } from "./npm-tgz-integrity.ts";

function resolveFromCwd(p, cwd) {
  return path.isAbsolute(p) ? p : path.resolve(cwd, p);
}

function safeStat(abs) {
  try {
    return fs.statSync(abs);
  } catch {
    return null;
  }
}

function readListFile(listPath, cwd) {
  const abs = resolveFromCwd(listPath, cwd);
  const st = safeStat(abs);
  if (!st || !st.isFile()) {
    throw new Error(`List file not found: ${abs}`);
  }
  const text = fs.readFileSync(abs, "utf8");
  const listDir = path.dirname(abs);
  const lines = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const p = path.isAbsolute(t) ? t : path.resolve(listDir, t);
    lines.push(p);
  }
  return { abs, lines };
}

function isTgzPath(arg) {
  return arg.toLowerCase().endsWith(".tgz");
}

/**
 * @param {string[]} relArgs paths as given on CLI
 * @param {string} cwd
 * @returns {'tgz'|'lists'|'dirs'|'error'}
 */
function detectMode(relArgs, cwd) {
  if (relArgs.length === 0) return "error";
  const types = relArgs.map((arg) => {
    const abs = resolveFromCwd(arg, cwd);
    const st = safeStat(abs);
    if (!st) return "missing";
    if (st.isDirectory()) return "dir";
    if (st.isFile()) {
      return isTgzPath(arg) ? "tgz" : "listfile";
    }
    return "other";
  });
  if (types.includes("missing") || types.includes("other")) return "error";
  if (types.every((t) => t === "tgz")) return "tgz";
  if (types.every((t) => t === "dir")) return "dirs";
  if (types.every((t) => t === "listfile")) return "lists";
  return "error";
}

function collectTgzInDir(dirAbs) {
  const out = new Map();
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!e.name.toLowerCase().endsWith(".tgz")) continue;
    out.set(e.name, path.join(dirAbs, e.name));
  }
  return out;
}

/** Escape cell text for a Markdown pipe table. */
function mdCell(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ");
}

/**
 * @param {string[]} colNames
 * @param {string[]} rowNames
 * @param {string[][]} rowsBody each row: cell strings (same length as colNames)
 */
function formatMarkdownTable(colNames, rowNames, rowsBody) {
  const n = colNames.length + 1;
  const headerCells = ["filename", ...colNames].map(mdCell);
  const dataRows = rowNames.map((fname, i) => [
    mdCell(fname),
    ...rowsBody[i].map(mdCell),
  ]);
  const widths = new Array(n).fill(0);
  for (const row of [headerCells, ...dataRows]) {
    for (let j = 0; j < n; j++) {
      widths[j] = Math.max(widths[j], row[j].length);
    }
  }
  const pad = (c, j) => c.padEnd(widths[j], " ");
  const line = (cells) => `| ${cells.map((c, j) => pad(c, j)).join(" | ")} |`;
  const sep = widths.map((w) => "-".repeat(Math.max(3, w)));
  const lines = [line(headerCells), `| ${sep.join(" | ")} |`];
  for (const r of dataRows) {
    lines.push(line(r));
  }
  return `${lines.join("\n")}\n`;
}

/**
 * @param {string} text
 * @param {string | null} outFile resolved path
 * @param {boolean} toStdout also print to stdout
 */
function writeOrStdout(text, outFile, toStdout) {
  if (outFile) {
    const dir = path.dirname(outFile);
    if (dir && dir !== ".") {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outFile, text, "utf8");
  }
  if (toStdout || !outFile) {
    process.stdout.write(text);
  } else {
    process.stderr.write(`${outFile}\n`);
  }
}

function main() {
  const cwd = process.cwd();
  const raw = process.argv.slice(2);
  const toStdout = raw.includes("--stdout");
  const outIdx = raw.indexOf("--out");
  /** @type {string | null} */
  let outFile = null;
  if (outIdx !== -1) {
    const o = raw[outIdx + 1];
    if (!o) {
      console.error("Usage: --out requires a file path");
      process.exit(1);
    }
    outFile = path.resolve(cwd, o);
  }
  const args = raw.filter(
    (a, i) =>
      a !== "--stdout" && (outIdx === -1 || (i !== outIdx && i !== outIdx + 1)),
  );
  if (args.length === 0) {
    console.error(
      `Usage:
  node npm-tgz-integrity.mjs <a.tgz> [b.tgz ...] [--stdout]
  node npm-tgz-integrity.mjs <list1> [list2 ...] [--out f] [--stdout]  # lists of .tgz paths
  node npm-tgz-integrity.mjs <dir1> [dir2 ...] [--out f] [--stdout]   # Markdown table: filename vs dir basenames`,
    );
    process.exit(1);
  }

  const mode = detectMode(args, cwd);
  if (mode === "error") {
    console.error(
      "Invalid input: use only .tgz files, or only list files, or only directories. Missing paths are not allowed.",
    );
    process.exit(1);
  }

  if (mode === "tgz") {
    for (const arg of args) {
      const abs = resolveFromCwd(arg, cwd);
      if (!isTgzPath(arg)) {
        console.error(`Not a .tgz: ${arg}`);
        process.exit(1);
      }
      const integ = integrityForTgz(abs);
      if (toStdout) {
        console.log(integ);
      } else {
        const base = path.basename(abs, ".tgz");
        const wpath = path.join(cwd, `${base}.integrity`);
        fs.writeFileSync(wpath, `${integ}\n`, "utf8");
        console.log(wpath);
      }
    }
    if (outFile) {
      console.error("Note: --out is ignored in .tgz file mode; use per-file <name>.integrity files.");
    }
    return;
  }

  if (mode === "lists") {
    const lines = [];
    for (const listArg of args) {
      const { lines: paths } = readListFile(listArg, cwd);
      for (const p of paths) {
        const st = safeStat(p);
        if (!st || !st.isFile()) {
          lines.push(`${p} - <missing or not a file>`);
          continue;
        }
        if (!p.toLowerCase().endsWith(".tgz")) {
          lines.push(`${p} - <not a .tgz>`);
          continue;
        }
        const h = integrityForTgz(p);
        lines.push(`${p} - ${h}`);
      }
    }
    const text = lines.map((l) => `${l}\n`).join("");
    if (outFile) writeOrStdout(text, outFile, toStdout);
    else writeOrStdout(text, null, true);
    return;
  }

  if (mode === "dirs") {
    const dirAbs = args.map((a) => resolveFromCwd(a, cwd));
    for (const d of dirAbs) {
      const st = safeStat(d);
      if (!st || !st.isDirectory()) {
        console.error(`Not a directory: ${d}`);
        process.exit(1);
      }
    }
    const colNames = dirAbs.map((d) => path.basename(d));
    const byDir = dirAbs.map((d) => collectTgzInDir(d));
    const allNames = new Set();
    for (const m of byDir) {
      for (const name of m.keys()) allNames.add(name);
    }
    const rowNames = [...allNames].sort();

    const rowsBody = rowNames.map((fname) =>
      byDir.map((m) => {
        const f = m.get(fname);
        if (!f) return "";
        return integrityForTgz(f);
      }),
    );
    const text = formatMarkdownTable(colNames, rowNames, rowsBody);
    if (outFile) writeOrStdout(text, outFile, toStdout);
    else writeOrStdout(text, null, true);
  }
}

main();
