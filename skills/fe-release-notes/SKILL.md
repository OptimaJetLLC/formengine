---
name: fe-release-notes
description: Prepares FormEngine release notes (Docusaurus + GitHub), updates versions, and runs local release scripts defined in AGENTS.md. The user must review and adjust the draft release notes before any generators or version updates run. Use when preparing a FormEngine release, writing release notes for a version, running version-update or docs build, or when the user mentions release tickets, YouTrack fix versions, or rc branches.
compatibility: YouTrack REST API (YT_TOKEN in skills/fe-release-notes/scripts/.env); Chrome DevTools MCP optional when API output is insufficient or token access is missing
---

# FE release

_FormEngine release notes + local release scripts._

**Location:** `skills/fe-release-notes/SKILL.md` (this repo). If your workspace symlinks `skills` to another folder, resolve the same file there.

## Mandatory first step

**Before doing anything else**, obtain the **YouTrack release ticket** for the FormEngine project. Accept either:

- a readable issue ID (recommended for prompts), for example `FE-1892`
- a full issue URL, for example `https://track.optimajet.com/issue/FE-1894/Release-FormEngine-7.14.0`

If the user provides only a version number, ask for the exact readable issue ID (for example `FE-1894`) or a full ticket URL.

Prompt example:

`cursor-agent --approve-mcps '@./skills/fe-release-notes/SKILL.md Use this skill. Release ticket: FE-1892'`

Do not assume the URL or ID without confirmation when it would change scope.

---

## YouTrack API (preferred)

Load credentials from **`skills/fe-release-notes/scripts/.env`**. Do not commit this file.

- **`YT_TOKEN`** (required for API calls): permanent token from YouTrack (Profile → Account Security → New token), scope **YouTrack**.
- **`YT_BASE`** (optional): instance base URL with no trailing slash. Default: `https://track.optimajet.com`.

Example `.env` (values illustrative only):

```env
YT_TOKEN=perm:...
YT_BASE=https://track.optimajet.com
```

### How to load `.env` in a shell

From the repo root:

```bash
set -a
# shellcheck source=/dev/null
. skills/fe-release-notes/references/.env
set +a
```

### Auth and headers

Use the permanent token as a Bearer token:

- `Authorization: Bearer ${YT_TOKEN}`
- `Accept: application/json`

### Resolve the issue ID from a ticket URL

Path shape: `https://track.optimajet.com/issue/<ISSUE_ID>/...` — use `<ISSUE_ID>` (readable ID, for example `FE-1894`) in API paths below.

### Fetch the release ticket

Single issue (adjust `fields` as needed; add fields from the [YouTrack REST API](https://www.jetbrains.com/help/youtrack/devportal/youtrack-rest-api.html) reference):

```bash
ISSUE_ID={issue_id} node skills/fe-release-notes/scripts/fetch-release-ticket.js
# for example
ISSUE_ID=FE-1894 node skills/fe-release-notes/scripts/fetch-release-ticket.js
```

Use the JSON response for: title/summary, description, fix version or release metadata in **custom fields**, and **links** to follow internal release instructions (URLs in linked issues or description).

### Search issues for a fix version

When you need all issues for a version, use the issue search API with a `query` that matches your team’s conventions (example — verify against project field names):

```bash
FIX_VERSION={release_version} node skills/fe-release-notes/scripts/search-issues-by-fix-version.js
# for example
FIX_VERSION=7.14.0 node skills/fe-release-notes/scripts/search-issues-by-fix-version.js
```

Tune the `query` string to match how FormEngine encodes versions in YouTrack (fix version, project, tags, etc.).

### When the API is not enough

- If **`YT_TOKEN` is missing or requests return 401/403**, tell the user to add or refresh the token in `skills/fe-release-notes/references/.env`.
- If some content exists only in the web UI or the API payload is incomplete, use **browser tools** (Chrome DevTools MCP) as a supplement — e.g. navigate to the ticket URL and follow links. If the browser session is logged out, wait for the user to sign in.

Identify potential release highlights and ask the user to refine them. Draft release notes only after this step.

---

## After the ticket is identified

0. **Discover release instructions** from `references/release-notes-guidelines-combined.md`.
1. **Infer the target version** from the ticket (title, fix version, or linked issues query). Confirm with the user if ambiguous.
2. **Collect issues** for that release (same fix version in YouTrack). Prefer API search; use the browser if needed. Do not run remote git commands or `git push`.
3. **Draft release notes** in English only (see repository `AGENTS.md`). Follow structure, changelog sections, and tone in **`skills/fe-release-notes/references/release-notes-guidelines-combined.md`**.
   - Create or edit **`src/documentation/docs/release-notes/X.Y.Z.md`** (YAML frontmatter, internal doc links).
   - When describing added or updated **fields**, **methods**, **properties**, or other public API members, **always include links** to the relevant documentation pages or anchors (see **Constraints**).
   - Optionally set **`NpmVersion=X.Y.Z`** in **`scripts/version.txt`** so the draft matches the intended version (or wait until after approval).
4. **Human verification (mandatory gate before automation)**  
   **Stop** and ask the user to **read the draft** `X.Y.Z.md` and **confirm or adjust**:
   - Version, **release date** line, overview, key features, and every changelog subsection (including dependency bullets if present).
   - Internal doc links and slugs (Docusaurus fails the build on broken links).
   Apply any edits the user requests. **Do not** run `generate:github-release-notes`, `generate:changelog`, `version-update`, or `docs:build` until the user **explicitly confirms** the release notes are ready (or asks you to proceed). If the user wants to edit the file themselves, wait until they say they are done.
5. **After the draft is approved**, run automation in order:
   - Ensure **`scripts/version.txt`** has **`NpmVersion=X.Y.Z`**.
   - From **`src`**, run **`npm run version-update`** (updates Lerna package versions, internal dependency pins, and invokes **`update-release-date`** for `common-designer` when configured in `scripts/version-update.ts`).
   - From **`src`**, run **`npm run generate:github-release-notes`** and **`npm run generate:changelog`**. Generated GitHub notes under **`scripts/github-release-notes/`** must use absolute links starting with **`https://formengine.io/documentation/...`** (the script rewrites relative paths).
   - From **`src`**, run **`npm run docs:build`** for `@react-form-builder/docs` (or the project’s documented docs build).
6. **At the end**, provide a list of ticket URLs that have linked issues in the `SUPPORT` project.

---

## Constraints

- **No `git push`** and no server-side or CI triggers unless the user explicitly asks.
- **All repository text in English** (release notes, bullets, comments).
- Do not include issues list.
- Match existing release-note style in `src/documentation/docs/release-notes/` (overview, key features, changelog sections, resources as needed). Prefer instructions from **`skills/fe-release-notes/references/release-notes-guidelines-combined.md`**.
- **Documentation links for API changes**: When release notes mention **added**, **updated**, or **removed** **fields**, **methods**, **properties**, **events**, or similar public API surface, **always** include a markdown link to the **documentation** that describes them (Docusaurus path under `src/documentation/docs/`, same linking style as other release notes). Prefer page anchors when the change targets a specific member.
- **Markdown links**: avoid nesting backticks inside link labels in Docusaurus if links render as broken; prefer plain link text or HTML `<a>` when needed for npm package URLs.
- For dependency updates in `examples`, mention `examples` only. Do not include a full package path or folder name.
- **Package update bullets** (Security, Dependencies, etc.): State only the package and versions. Do **not** suffix with *in `src`*, full repo paths, or “monorepo root” — updates under `src` are assumed and must not be called out.
- If an issue has the `breaking` tag, include it in the **Breaking** section.
- In the **Breaking** section, do not prefix item descriptions with `Breaking`.

  Wrong:

  ```markdown
  ### Security

  * Bumped `handlebars` from `4.7.8` to `4.7.9` in `src`.
  ```

  Correct:

  ```markdown
  ### Security

  * Bumped `handlebars` from `4.7.8` to `4.7.9`.
  ```
- **Secrets:** never paste `YT_TOKEN` into chat, release notes, or commits. Read it only from `.env` for local API calls.

---

## If something fails

- If `version-update` fails on a missing example path, check **`PACKAGE_LIST`** in **`scripts/version-update.ts`** against the repo (e.g. Angular examples under `examples/premium/with-angular-forms/...`).
- If `update-release-date` is missing, note it and continue; do not invent scripts.
- If YouTrack returns **404** for an issue ID, double-check the readable ID and verify that the token user can access the project.

---

## Quick reference (paths)

| Item                   | Location                                                                  |
|------------------------|---------------------------------------------------------------------------|
| Release notes guide    | `skills/fe-release-notes/references/release-notes-guidelines-combined.md` |
| YouTrack credentials   | `skills/fe-release-notes/scripts/.env` (`YT_TOKEN`, optional `YT_BASE`)   |
| API helper scripts     | `skills/fe-release-notes/scripts/`                             |
| Version file           | `scripts/version.txt`                                                     |
| Version bump           | from `src`: `npm run version-update` → `scripts/version-update.ts`        |
| Docs site              | `src/documentation/website` (Docusaurus)                                  |
| Release notes (docs)   | `src/documentation/docs/release-notes/`                                   |
| Release notes (GitHub) | `scripts/github-release-notes/`                                           |

For full project standards, read `AGENTS.md` at the repository root.
