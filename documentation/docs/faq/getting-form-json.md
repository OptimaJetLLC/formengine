---
sidebar_position: 3
title: Getting form JSON
description: Getting form JSON.
slug: /getting-form-json
---

# Getting JSON form in React component

## Using FormBuilder ref

If you need JSON that contains the form model in `FormBuilder`, you can
use [formAsString](/api-reference/interfaces/react_form_builder_designer.IFormBuilder#formasstring) method from the `FormBuilder` ref:

```tsx
const FormBuilderApp = () => {
  const builderRef = useRef<IFormBuilder>()

  const setRef = (builder: IFormBuilder | null) => {
    if (builder) {
      builderRef.current = builder
      const formJSON = builder.formAsString
      console.log(formJSON)
    }
  }

  return <FormBuilder
    builderRef={setRef}
    {...otherProps}
  />
}
```

## Using FormStorage

You can also use [formStorage](/form-storage#example-of-iformstorage-working-with-indexeddb).
In this case, you will receive the form that was saved the last time you clicked the Save button. Please be aware that the layout may have
changed since then, and the resulting form may differ from its current state.

```tsx
const formStorage = new IndexedDbFormStorage('form-builder-store', 'form-store')

const FormBuilderApp = () => {
  const handleClick = async () => {
    const form = await formStorage?.getForm(sampleFormName)
    console.log(form)
  }
  return <div>
    <button onClick={handleClick}>Get form</button>
    <FormBuilder formStorage={formStorage} {...otherProps}/>
  </div>
}
```
