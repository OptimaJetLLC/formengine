# Testing

### Test recorder

You can use the built-in tape recorder to record tests or third-party solutions.
But their functionality is limited and often fails.
It is better to study documentation on [locators](https://playwright.dev/docs/api/class-locator)

### Test files

The tests are located in tests/e2e/tests/{project}/*.spec.ts

### Debugging the locator

You can output to the console or use the recorder interface.

Start interactive mode

```shell
TEST_TESTS_PATH=designer npx playwright test --ui
TEST_TESTS_PATH=viewer npx playwright test --ui
```

### Drag and drop

Use the `dragAndDrop` helper from `tests/e2e/tests/designer/dragAndDrop.ts` to emulate dragging a component to the form.
It places the pointer on the source element, moves the mouse to the target in several steps and releases it.

https://github.com/microsoft/playwright/issues/19892
https://stackoverflow.com/questions/64718915/playwright-drag-and-drop
https://playwright.dev/docs/input#drag-and-drop

## Launch and debugging

### CLI

From the repository root, run the full matrix (viewer and designer on React 18 and 19):

```shell
npm run test:e2e
```

`npm run test:e2e` always goes through `runner.js` and does not accept a file filter.

### Run one test file

Call Playwright with this package's config and the host env. Playwright starts the matching Vite app via `webServer`.

The repo root has no `playwright.config.ts`. If you run `npx playwright test` from the root without `-c`, Playwright uses
defaults: no `baseURL`, no `webServer`. Then `page.goto('/')` fails with `Cannot navigate to invalid URL`, and tags show
`@undefined` because `TEST_TEMPLATE` is missing.

Pass a path under `testDir` (`./tests/designer` or `./tests/viewer` after the config `chdir`s to the repo root). Do **not**
prefix with `tests/e2e/`.

From `tests/e2e` (loads `./playwright.config.ts`):

```shell
cd tests/e2e
TEST_PROJECT=../react-18 \
TEST_TEMPLATE=react-18 \
TEST_TESTS_PATH=designer \
TEST_PORT=15002 \
TEST_START_CMD='npm run start:designer' \
TEST_REACT_VERSION=18.3.1 \
npx playwright test tests/designer/component-preset.spec.ts
```

From the repository root, pass the config explicitly (same `TEST_*` env vars):

```shell
TEST_PROJECT=tests/react-18 \
TEST_TEMPLATE=react-18 \
TEST_TESTS_PATH=designer \
TEST_PORT=15002 \
TEST_START_CMD='npm run start:designer' \
TEST_REACT_VERSION=18.3.1 \
npx playwright test -c tests/e2e/playwright.config.ts tests/designer/component-preset.spec.ts
```

Viewer uses `TEST_TESTS_PATH=viewer`, `TEST_PORT=15001`, and `TEST_START_CMD='npm run start:viewer'`. For React 19, point
`TEST_PROJECT` / `TEST_TEMPLATE` at `react-19` and set `TEST_REACT_VERSION` to the version installed in that host package.

Filter by title within a file:

```shell
npx playwright test tests/designer/component-preset.spec.ts -g "can be created"
```

### Debugging the test code

`npm run test:dbg`

### Interactive mode

`npm run ui`

Installing additional browsers:

```shell
npx playwright install msedge
npx playwright install chrome
```

### Focus a single test in source

```typescript
test.only('focus this test', async ({page}) => {
  // Run only focused tests in the entire project.
});
```

This won't work on CI, you need to disable the check in `playwright.config.ts`

```typescript
    forbidOnly: false
```

```typescript
export default defineConfig({
  // ...
  testMatch: /hello\.spec\.ts/,
  // ...
})
```

Test grouping

```typescript
test.describe('two tests', {
  tag: '@auth'
}, () => {
  test('one', async ({page}) => {
    // ...
  });

  test('two', async ({page}) => {
    // ...
  });
});
```

## Some docs

### Parallel execution

- https://playwright.dev/docs/test-sharding

### Locators

- https://playwright.dev/docs/api/class-locator

### Debug

- https://playwright.dev/docs/debug

Run code debugger using:

`npm run test:dbg`

Start interactive UI using:

`npm run ui`

### Examples

- https://github.com/nrwl/tic-tac-toe-playwright
- https://playwright.dev/docs/intro#first-test

### Snapshot-testing

- https://playwright.dev/docs/test-snapshots
- https://playwright.dev/docs/api/class-snapshotassertions

### Screenshots

- https://github.com/microsoft/playwright/issues/14854#issuecomment-1155667859

### Test grouping

- https://playwright.dev/docs/test-annotations

### Misc

- https://playwright.dev/docs/trace-viewer
- https://www.the-koi.com/projects/how-to-run-playwright-within-vitest/
- https://vitest.dev/guide/browser/
- https://playwright.dev/docs/test-fixtures
- https://vitest.dev/guide/test-context
- https://vitest.dev/guide/workspace.html
- https://stackblitz.com/edit/vitest-dev-vitest-dbyv73?file=package.json&initialPath=**vitest**/
- https://dev.to/samuel_kinuthia/end-to-end-testing-react-components-with-playwright-part-1-3c15

## Useful extensions

### Chrome

- https://chromewebstore.google.com/detail/playwright-crx/jambeljnbnfbkcpnoiaedcabbgmnnlcd?hl=en
- https://chromewebstore.google.com/detail/playwright-chrome-recorde/bfnbgoehgplaehdceponclakmhlgjlpd
- https://chromewebstore.google.com/detail/ph-playwright-helper/jckkjbhilhnbdoamfbemafahjcdmpakd

### Idea

- https://plugins.jetbrains.com/plugin/18100-maestro
- https://www.jetbrains.com/aqua/

### Workflows

- https://danteukraine.github.io/playwright-elements/
- https://github.com/hdorgeval/playwright-fluent
- https://github.com/codeceptjs/CodeceptJS
- https://github.com/OctoMind-dev
- https://serenity-js.org/handbook/getting-started/architecture/#serenityjs-screenplay-pattern-apis

### Reports

- https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright
- https://github.com/cenfun/monocart-reporter

### Misc

- https://www.npmjs.com/package/playwright-cleanup
- https://www.npmjs.com/package/playwright-performance
- https://github.com/playwright-community/eslint-plugin-playwright
