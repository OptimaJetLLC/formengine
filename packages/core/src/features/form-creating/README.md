# Create form

The proposal of future feature for runtime creating form.

```typescript jsx
type ViewMap = {
  string: Definition,
  number: Definition,
  //...
  oneOf: Definition,
}

const createForm = (view: View, mapper: (view) => ViewMap, form: Record<string, AnnotationBuilder<any>>) => {}
```

Метод `createForm` принимает view, mapper, чтобы понять какие компоненты использовать для аннотаций, и определение самой формы.

Два первых аргумента можно инкапсулировать в `View`.

```typescript jsx
const Form = createForm(Rsuite, (view) => ({
  string: view.get('input')
}), {
  head: any('header')((props) => {
    props.content = 'App form'
    props.subheader = 'Make it easier'
  }),
  firstName: string,
  country: oneOf('Poland', 'England'),
})
```
