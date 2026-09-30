# React Form Builder Agent Guidelines

## Project Overview

React Form Builder is a monorepository using Lerna for package management. The project consists of several main packages:

- **core** - core logic and types
- **designer** - form designer
- **viewer** - form viewer
- **views** - components for various UI libraries

## Language Requirement

**All code, documentation, comments, and tests in this repository MUST be written in English only.** This includes:

- Source code files (.ts, .tsx, .js, .jsx)
- Documentation files (.md, .mdx)
- Test files (.test.ts, .test.tsx)
- Configuration files
- Commit messages
- Code comments
- Variable and function names
- Error messages

## Project Structure

```
fb/
├── packages/               # Main packages
├── tests/                  # Tests
├── documentation/          # Documentation
├── scripts/                # Utility scripts
└── examples/               # Usage examples
```

## Commands for Development

Run the commands from the repository root.

### Basic Commands

```bash
# Install dependencies
npm install

# Start form builder
npm run start:builder

# Start form viewer
npm run start:viewer

# Build all packages
npm run build

# Create bundles
npm run pack
```

## Task Completion

**Always run `npm run check-all` from the repository root before reporting a task as done.** Focused tests, a single ESLint file, or
`check:tsc` alone are not a substitute. Do not claim the work is complete, fixed, or ready for review until `check-all` has finished and
every error caused by the change is fixed.

This includes:

- Circular dependencies (`check:circular-deps`)
- TypeScript errors (`check:tsc`)
- Unused exports (`check:unused-exports`)
- ESLint errors (`check:eslint`)
- Formatting issues (`check:format`)
- Biome lint (`check:format`)
- docs MDX, distribution `package.json`, and license expiry checks that `check-all` runs

If errors are pre-existing and unrelated to the change, say so in the completion report. Run `check-all` again after any follow-up fix
before reporting done.

The same command is required before committing or pushing.

## Code Quality Commands

```bash
# TypeScript check
npm run check:tsc

# ESLint check
npm run check:eslint

# Auto-fix ESLint errors
npm run eslint-fix

# Format code with BiomeJS
npm run format

# Check code formatting
npm run format:check

# Check circular dependencies
npm run check:circular-deps

# Find unused exports
npm run check:unused-exports

# Find TODO comments
npm run todo
```

### Testing

```bash
# Run all tests
npm run test

# Module tests
npm run test:module

# Component tests
npm run test:component

# E2E tests
npm run test:e2e

# Browser tests
npm run test:browser
```

### Documentation

```bash
# Start documentation
npm run docs:start

# Build documentation
npm run docs:build

# Generate documentation bundles
npm run docs:generate-bundles
```

## Development Standards

### TypeScript

- Use strict TypeScript mode (`strict: true`)
- Always specify types for function parameters and return values
- Use interfaces for data structures
- Avoid using `any` - use `unknown` or specific types instead

```typescript
// ✅ Correct
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ Incorrect
function getUser(id: any): any {
  // ...
}
```

In `switch` statements over discriminated unions or enums, unhandled variants must fail at compile time. Prefer handling every variant and
using the last remaining member as the final return. A new variant then fails type-checking without a
`default` branch.

When the function must not return the unmatched value (it returns a fallback such as `undefined`), type the unused argument as `never` and
return the fallback. Do not `return value satisfies never` unless `never` is a valid result. Do not assign the unmatched value to a `never`
variable.

```typescript
// Preferred when all variants are handled
if (resolved.type === 'internal') {
  return createInternal(resolved.definition)
}
return createCustom(resolved.definition)

// Fallback when the runtime value may be outside the union
switch (validatorType) {
  case 'internal':
    return lookupInternal()
  case 'custom':
    return lookupCustom()
  default:
    return unhandledValidatorType(validatorType)
}

function unhandledValidatorType(_type: never): undefined {
  return undefined
}
```

### React Components

- Use functional components with hooks
- Name components in PascalCase
- Export prop types separately

```tsx
// ✅ Correct
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({onClick, children}) => {
  return <button onClick={onClick}>{children}</button>;
};

export type {ButtonProps};
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`
- Types: `types.ts` or `interfaces.ts`

### Scripts

Prefer TypeScript (`.ts`) for new Node scripts, including `scripts/`, `documentation/website/scripts/`, and `designer-guide/scripts/`. Match
neighboring `.ts` scripts (run with `node path/to/script.ts`, import local files with a `.ts` extension). Use `.mjs` or `.js` only when
TypeScript cannot run in that context (for example an existing toolchain that does not load `.ts`).

### Imports and Exports

- Use named exports instead of default exports
- Group imports: third-party libraries, internal modules, types
- Use type imports for types
- Do not use `import React from "react";`
- Do not export or reexport any function, component or type if is not absolutely required.

```typescript
// ✅ Correct
import {Button} from "@react-form-builder/core";
import type {FormConfig} from "@react-form-builder/types";

// ❌ Incorrect
import Button from "@react-form-builder/core/Button";
```

## Code Documentation

### Code Formatting with BiomeJS

The project uses BiomeJS for code formatting and linting. BiomeJS is configured to match the existing code style and has been tested to
ensure it doesn't change the current formatting:

- **Indentation**: 2 spaces
- **Line width**: 140 characters
- **Maximum line length**: Keep code and documentation lines at or under 140 characters.
- **Quotes**: Single quotes for JavaScript, double quotes for JSX
- **Semicolons**: Only where needed (`asNeeded`), with a leading `;` before statements starting with `(` or `[` to protect against ASI
- **Trailing commas**: ES5 style
- **Arrow function parentheses**: Only where needed (`asNeeded`)

#### Configuration Details

BiomeJS is configured with the following settings that match the project's existing style:

- **Indentation**: 2 spaces (matching current codebase)
- **Line width**: 140 characters (matching current codebase)
- **Quotes**: Single quotes for JavaScript, double quotes for JSX (matching current codebase)
- **Semicolons**: Only where needed (`asNeeded`), with a leading `;` before statements starting with `(` or `[` (matching current codebase)
- **Trailing commas**: ES5 style (matching current codebase)
- **Arrow function parentheses**: Only where needed (`asNeeded`) (matching current codebase)

#### Formatting Commands

```bash
# Format all code
npm run format

# Check formatting without applying changes
npm run format:check

# Lint code for style and correctness issues
npm run lint

# Fix lint issues automatically
npm run lint:fix
```

#### Form JSON Hygiene

- Do not include the top-level `version` field in form examples.
- Only include `localization`, `languages`, or `defaultLanguage` when the example is about localization.
- For multi-line `fnSource` values in JS/TS examples, prefer template literals over string concatenation and align subsequent lines with
  leading spaces so the code appears vertically aligned in the snippet.
- For multi-line `fnSource` values in JSON examples, use `\n` escapes with no extra leading spaces and place the string value on the next
  line after the `fnSource` key when it improves readability.

#### Before Commit

Always run `npm run check-all` from the repository root. Do not report the formatting or linting work as done until it passes.

### JSDoc/TSDoc Comments

Document all public functions, interfaces, and classes following these formatting rules:

- **End sentences with periods**: Always use proper punctuation at the end of descriptions
- **Avoid dashes before parameters**: Use spaces instead of dashes in `@param` tags
- **Prefer definite article "the"**: Use "the" where applicable for better readability
- **Start descriptions with lowercase**: Parameter and return value descriptions should begin with lowercase letters
- **Use consistent formatting**: Follow the established pattern for all documentation

```typescript
/**
 * Creates a new form with the specified configuration.
 * @param config form configuration
 * @returns form object with management methods
 * @example
 * const form = createForm({ fields: [...] });
 */
export function createForm(config: FormConfig): Form {
  // ...
}

/**
 * Validates the form data against the schema.
 * @param data form data to validate
 * @param schema validation schema
 * @returns validation result with errors if any
 */
export function validateForm(data: FormData, schema: Schema): ValidationResult {
  // ...
}
```

### Code Comments

- Use comments to explain complex logic
- Avoid obvious comments
- Update comments when code changes

```typescript
// ✅ Good comment
// Using memoization to optimize rendering of large lists
const memoizedList = useMemo(() => items.map(processItem), [items]);

// ❌ Bad comment
// Set value
setValue(value);
```

## Testing

### Test Suites Layout

All automated tests live under `tests/`, and each suite is an isolated package with its own tooling:

- `tests/common` contains shared helpers, fixtures, and license validation logic consumed by other suites.
- `tests/component` uses React Testing Library to exercise packaged widgets against fixture JSON located in `components/` and `tests/`.
- `tests/module` runs Vitest-driven integration checks that import the published modules (`@react-form-builder/core`, designer, indexed-db
  storage, etc.) through their real entry points.
- `tests/e2e` hosts the Playwright harness. It spins up a sample designer/viewer app and drives cross-browser scenarios, producing reports
  under `tests/e2e/reports`.
- `tests/react-17`, `tests/react-18`, and `tests/react-19` are lightweight host apps used by the test suite to verify backwards
  compatibility with multiple React majors.

### Writing Tests

```tsx
import {render, screen} from '@testing-library/react';
import {Button} from './Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

### Running Tests

From the repository root, use the provided npm scripts:

```bash
npm run test            # Executes all test configurations
npm run test:component  # Launches the component tests in tests/component
npm run test:module     # Runs Vitest inside tests/module
npm run test:e2e        # Starts the Playwright harness in tests/e2e
npm run test:browser    # Additional browser-focused checks when needed
```

When developing E2E scenarios, start the desired React host (`npm run start:designer` or `npm run start:viewer` from the relevant
`tests/react-*` directory) before invoking Playwright, or override the `TEST_*` environment variables described in
`tests/e2e/playwright.config.ts`.

## Development Process

### 1. Before Starting Work

```bash
# Ensure all dependencies are installed
npm install

# Run code quality checks
npm run check:tsc
npm run check:eslint
```

### 2. During Development

- Write tests alongside code
- Regularly run quality checks
- Monitor bundle sizes

### 3. Before Reporting Done, Committing, or Pushing

```bash
# Full quality gate; required before saying the task is done
npm run check-all
```

Run the relevant tests as well (`npm run test`, or the focused suite that covers the change). Tests do not replace `check-all`.

## Known Issues and Solutions

### ESLint Issues

The project has several types of ESLint errors:

1. **Console statements**: Remove or comment out `console.log` in production code
2. **JSDoc comments**: Add JSDoc for all public functions
3. **TODO comments**: Handle or remove TODO, WTF and FIXME comments
4. **Wrong imports**: Scoped imports that reach into a package `src/` tree are disallowed (`no-restricted-imports`); use the package public
   API instead

### TypeScript Issues

- Fix type errors before commit
- Ensure all imports are correct
- Check type compatibility between packages

## Best Practices

### Performance

- Use `React.memo` for rendering optimization
- Apply `useMemo` and `useCallback` for heavy computations
- Avoid unnecessary re-renders

### Type Safety

- Always validate input data
- Use TypeScript guards for type narrowing
- Handle edge cases

### Architecture

- Follow SOLID principles
- Separate responsibilities between components
- Use dependency injection where appropriate

## Debugging

### Development Tools

- React DevTools for component debugging
- Browser DevTools for performance

### Logging

```typescript
// Use standard console methods
console.warn("Warning: deprecated API");
console.error("Error:", error);

// For production debugging use leveled logging
const logger = {
  debug: (message: string) => process.env.NODE_ENV === "development" && console.debug(message),
  info: (message: string) => console.info(message),
  error: (message: string, error?: Error) => console.error(message, error),
};
```

## Common Problems and Solutions

### Circular Dependencies

- Use `npm run check:circular-deps` for detection
- Refactor code to eliminate cycles
- Use lazy module loading

### Large Bundles

- Analyze bundles with `vite-bundle-analyzer`
- Use code splitting
- Optimize imports

### Type Problems

- Use `npm run check:tsc` for checking
- Ensure all types are exported correctly
- Check type compatibility between packages

## Useful Links

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Documentation](https://react.dev/)
- [Testing Library](https://testing-library.com/)
- [ESLint Rules](https://eslint.org/docs/rules/)

## Documentation Style Guide

For documentation work under `documentation/docs`, follow `documentation/AGENTS.md`.

When writing **any** markdown in this repository (docs, reports, plans, README tables), **format tables with aligned columns**: pad each
cell so pipes line up vertically in the source. See the table formatting rules and examples in `documentation/AGENTS.md`.
