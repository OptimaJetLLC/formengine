## Tests

For tests are used [Jest](https://jestjs.io/docs/getting-started) and [Testing Library](https://testing-library.com/docs/)

Jest global setup stored in scripts/jest/jest-setup.ts

Rules:

* Test file is creating nearby tested file in one folder
* Name of test file: `[name of tested file].spec.ts/tsx`. Например: для `FormViewer.tsx` - `FormViewer.spec.tsx`
* No use `fireEvent` - use [user-event](https://testing-library.com/docs/user-event/intro)
* Use the faker library for generate random data in test runtime
* Use correct validate method of expect - not only toBe or toEqual

### Test template:

```typescript
//Types: Utility, Component, Hook, etc.
describe(`[Type]: [name of tested]`, () => {

  it('should do this thing', () => {
    //..your code
    //expect(...).to...
  })

  it('does this thing', async () => {
    //..your code
  })
})
```
