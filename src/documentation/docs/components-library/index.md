---
title: Components library
sidebar_label: Components library
sidebar_position: 0
---

# Components library

Components based on the React Suite package are available in the
package [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite).

To install the components, run the following command:

```bash
npm install @react-form-builder/components-rsuite
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install @emotion/css@11.10.5 @emotion/react@11.10.5 @emotion/styled@11.10.5 @rsuite/icons@1.0.2 react-number-format@5.1.4 rsuite@5.59.1 --save-exact
```

:::

You can see an example of connecting components to [FormBuilder](/usage#designer) in this section of the
documentation. An example of connecting components to [FormViewer](/usage#viewer) in this section of the documentation.

An example of connecting components to `FormBuilder` can be seen in [this section](/usage#designer) of the documentation.
An example of connecting components to `FormViewer` can be found in [this section](/usage#viewer) of the documentation.

The components are divided into the following categories:

- **Fields** - components that store form data.
- **Static** - components for displaying information, do not contain form data.
- **Structure** - components that structure other components.
- **Templates** - template-related components, such as the Slot component.

## Fields components

- [Calendar](https://rsuitejs.com/components/calendar/).
- [Checkbox](https://rsuitejs.com/components/checkbox/).
- [DatePicker](https://rsuitejs.com/components/date-picker/).
- [TimePicker](https://rsuitejs.com/components/date-picker/).
- [TagPicker](https://rsuitejs.com/components/tag-picker/).
- [AutoComplete](/components-library/fields-components/autocomplete).
- Dropdown is a component based on [InputPicker](https://rsuitejs.com/components/input-picker/).
- Input is a component based on [Input and InputGroup](https://rsuitejs.com/components/input/).
- Number format is a component based on [NumericFormat](https://www.npmjs.com/package/react-number-format).
- Pattern format is a component based on [PatternFormat](https://www.npmjs.com/package/react-number-format).
- Radio group is a component based on [RadioGroup](https://rsuitejs.com/components/radio/).
- Search is a component based on [InputPicker](https://rsuitejs.com/components/input-picker/).
- Text area is a component based on [Input](https://rsuitejs.com/components/input/).
- Uploader is a component based on [Uploader](https://rsuitejs.com/components/uploader/).
- [Rich text editor](/components-library/fields-components/rich-text-editor). This component is in a
  separate [package](https://www.npmjs.com/package/@react-form-builder/components-rich-text).

## Static components

- [Button](https://rsuitejs.com/components/button/).
- [Divider](https://rsuitejs.com/components/divider/).
- Error message - a component that displays a form validation error.
- Header is a component that displays HTML headers (h1-h6).
- Image is a component that displays an image.
- Label is a component that displays the HTML tag `label`.
- Menu is a component that displays menus, based on [Nav](https://rsuitejs.com/components/nav/).
- [Message](https://rsuitejs.com/components/message/).
- [Progress circle](https://rsuitejs.com/components/progress/#code-lt-progress-circle-gt-code).
- [Progress line](https://rsuitejs.com/components/progress/#code-lt-progress-line-gt-code).
- Static content - displays the text in the HTML `span` tag.
- Tooltip - displays a tooltip using [Whisper](https://rsuitejs.com/components/whisper/)
  and [Tooltip](https://rsuitejs.com/components/tooltip/).
- [QR code](/components-library/static-components/qr-code). This component is in a
  separate [package](https://www.npmjs.com/package/@react-form-builder/components-fast-qr).

## Structure components

- Breadcrumb displays the current path on the page using [Breadcrumb](https://rsuitejs.com/components/breadcrumb/).
- Card - displays a title card using [Panel](https://rsuitejs.com/components/panel/).
- Container displays the HTML `div` tag.
- Tab displays a tabbed component based on [Nav](https://rsuitejs.com/components/nav/).

## Template components

- Slot is a component used to display the components of the parent form in the child form.
