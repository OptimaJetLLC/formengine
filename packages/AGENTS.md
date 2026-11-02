# Package Development Guidance

This directory contains the runtime, designer, bundles, applications, storage integrations, schema tooling, and component libraries.

## Public APIs and imports

- Prefer named exports and `import type` for type-only imports.
- Import another workspace package through its public entry point. Never import through another package's `src` tree.
- Add or re-export a function, component, or type only when consumers need it as public API.
- Follow the package's existing entry-point and `package.json` export structure when changing its public surface.

## File naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`
- Types: `types.ts` or `interfaces.ts`

## JSDoc

ESLint `jsdoc/require-jsdoc` requires docs on public APIs. Match neighboring TSDoc style:

- End summary sentences with a period.
- Start `@param` and `@returns` descriptions with a lowercase letter.
- Prefer the definite article "the" in those descriptions where it reads naturally.
- Write `@param name description` with a space after the name, not a dash.

```typescript
/**
 * Creates a new form with the specified configuration.
 * @param config the form configuration
 * @returns the form object with management methods
 */
export function createForm(config: FormConfig): Form {
  // ...
}
```

## TypeScript and React

- Prefer specific types or `unknown` to `any`. Preserve `any` only where the surrounding API genuinely requires it.
- Use interfaces for public data shapes when they match the neighboring API style.
- Implement React UI with function components and hooks. Name components in PascalCase and keep their prop types explicit.
- Follow nearby files for component declaration and export style; do not introduce `React.FC` solely to annotate a component.

Handle discriminated unions and enums exhaustively so new variants fail type-checking. When every variant produces a result, handle all but
the final variant explicitly and let the final return accept the remaining member. Do not add a `default` branch that hides new variants.

When a runtime value may fall outside the TypeScript union and the function returns a fallback, route the unmatched value through a helper
whose unused argument is `never`:

```typescript
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
