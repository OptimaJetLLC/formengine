---
sidebar_position: 2
title: Getting form data
slug: /getting-form-data
---

# Getting form data in a React component

If you need to retrieve data from a form when the user fills it out, you can
get [formData](/api-reference/interfaces/react_form_builder_core.IFormViewer#formdata) field from the `FormViewer` ref, and also
use [onFormDataChange](/api-reference/interfaces/react_form_builder_core.FormViewerProps#onformdatachange) callback in `FormViewer` props.

```tsx
export const Viewer = () => {
  const ref = useRef<IFormViewer>()

  const setRef = (viewer: IFormViewer | null) => {
    if (viewer) {
      ref.current = viewer
      const formJSON = JSON.stringify(ref.current.formData)
      console.log('formJSON ', ref.current)
    }
  }

  return (
    <FormViewer
      onFormDataChange={({data, errors}) => {
        const formJSON = JSON.stringify(data)
        console.log('onFormDataChange', formJSON)
      }}
      viewerRef={setRef}
      {...otherProps}
    />
  )
}
```
