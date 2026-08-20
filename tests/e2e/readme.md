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

### Screenshots

To emulate drag and drop, you need to do the following:

- come up with a locator for the element

https://github.com/microsoft/playwright/issues/19892
https://stackoverflow.com/questions/64718915/playwright-drag-and-drop
https://playwright.dev/docs/input#drag-and-drop

## Launch and debugging

### CLI

`npm run test:e2e`

### Debugging the test code

`npm run test:dbg`

### Interactive mode

`npm run ui`

Installing additional browsers:

```shell
npx playwright install msedge
npx playwright install chrome
```

Run one test

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
- https://stackblitz.com/edit/vitest-dev-vitest-dbyv73?file=package.json&initialPath=__vitest__/
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
