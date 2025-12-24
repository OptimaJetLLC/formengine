# Bundle Size Comparison Monorepo

This monorepo contains multiple applications for comparing bundle sizes of different form builder libraries.

## Structure

- **formengine** - React Form Builder bundle size application
- **rjsf** - React JSON Schema Form bundle size application
- **survey** - SurveyJS bundle size application
- **vueform** - VueForm bundle size application
- **bundlers** - Utility scripts for testing different bundlers

## Setup

Install all dependencies from the root:

```bash
npm install
```

This will install all dependencies and hoist common ones to the root `node_modules`.

## Running Applications

Run all applications in development mode:

```bash
npm run dev
```

Run a specific application:

```bash
cd formengine && npm run dev
cd rjsf && npm run dev
cd survey && npm run dev
cd vueform && npm run dev
```

## Building

Build all applications:

```bash
npm run build
```

## Bundle Size Analysis

Build all applications first:

```bash
npm run build
```

Then analyze bundle sizes for all applications:

```bash
npm run bundle-size
```

This will read the `vite-stat.json` files from each app's `dist` directory and display a comparison table showing:
- Total bundle size for each app
- Number of chunks
- Detailed chunk information sorted by size

The script will automatically find and compare bundle sizes across all apps in the monorepo.

## Workspaces

This monorepo uses npm workspaces. Common dependencies are hoisted to the root `package.json`:

- `react` and `react-dom` (shared by React-based apps)
- `vite` and related plugins
- `typescript` and TypeScript tooling
- `eslint` and ESLint plugins
- `vite-bundle-visualizer` for bundle analysis

Each workspace maintains its own specific dependencies.
