# Test Guidance

The test workspaces exercise packaged FormEngine entry points and supported React host versions.

## Suite ownership

| Directory    | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| `common/`    | Shared helpers, fixtures, test applications, and license validation   |
| `module/`    | Vitest integration tests against package public entry points          |
| `component/` | Component scenarios shared by the React host workspaces               |
| `e2e/`       | Playwright scenarios for the example designer and viewer applications |
| `react-18/`  | React 18 host and browser/component test runner                       |
| `react-19/`  | React 19 host and browser/component test runner                       |

## Test design

- Put a regression test in the narrowest suite that exercises the affected public behavior.
- Import workspace packages through their public entry points in module and integration tests.
- Follow neighboring Vitest, Testing Library, and Playwright patterns instead of introducing a second test style.
- Assert observable behavior. Avoid tests that only repeat implementation details.
- Update shared fixtures deliberately because they can affect multiple React hosts and suites.

## Commands

Run the relevant focused suite from the repository root:

```bash
npm run test:module
npm run test:component
npm run test:browser
npm run test:e2e
```

The E2E runner starts the configured viewer and designer hosts for React 18 and React 19. Use the `TEST_*` variables documented in
[e2e/playwright.config.ts](e2e/playwright.config.ts) only when overriding that orchestration.
