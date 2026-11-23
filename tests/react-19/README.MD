## test isolation, run a single test spec

```shell
npm run test -- ../component/tests/validation-action.spec.tsx
```

## debug in the browser with isolation

```shell
npm run test:browser:debug -- ../component/tests/validation-action.spec.tsx
```

you can also pinpoint single test by using `only`

```typescript
it.only('The validation action with a parameter should result in an error', async () => {
  const form = createForm(true)
  const getForm = () => JSON.stringify(form)
  // ...
})
```
