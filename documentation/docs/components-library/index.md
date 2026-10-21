---
description: 'Browse 30+ pre-built form components for FormEngine: inputs, selects,
  date pickers, file uploads, rich text editors, and more. All MIT-licensed and customizable.'
sidebar_label: Components library
sidebar_position: 0
title: FormEngine Component Library - 30+ Ready UI Components
---

# FormEngine Component Library - 30+ Ready UI Components

FormEngine supports multiple UI component libraries. The primary libraries available are:

## Available Component Libraries

### Material UI Components

- **Complete documentation**: [Material UI components](/components-library/material-ui).
- **Fields components**: TextField, Select, Checkbox, RadioGroup, Switch, Uploader.
- **Form components**: FormControlLabel, FormLabel.
- **Layout components**: Box, Container, Stack.
- **Navigation components**: Breadcrumbs, Link.
- **Data display components**: Card, List, ListItem, Typography, Tooltip.
- **Feedback components**: CircularProgress, LinearProgress, ErrorWrapper.
- **Button components**: Button, ButtonGroup.
- **Utility components**: ViewerWrapper.

### Mantine Components

- **Complete documentation**: [Mantine components](/components-library/mantine).
- **Input components**: TextInput, Textarea, NumberInput, PasswordInput, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch,
  SwitchGroup, Slider, RangeSlider, Rating, SegmentedControl, ColorInput, ColorPicker, JsonInput, FileInput, Dropzone.
- **Combobox components**: Select, MultiSelect, Autocomplete, TagsInput, NativeSelect.
- **Date/time components**: DatePicker, DatePickerInput, DateTimePicker, MonthPicker, MonthPickerInput, YearPicker,
  YearPickerInput, TimeInput, TimePicker.
- **Form components**: Label.
- **Layout components**: Container, Divider.
- **Typography**: Text, Title, Typography.
- **Feedback**: ErrorWrapper.
- **Overlays**: Dialog, Tooltip.
- **Button**: Button.
- **Chip components**: Chip, ChipCheckboxGroup, ChipRadioGroup.
- **Rich editor**: Tiptap (optional package).

### React Suite Components

- **Complete documentation**: [React Suite components](/components-library/rsuite-components).
- **Fields components**: Calendar, Checkbox, DatePicker, TimePicker, TagPicker, AutoComplete, Dropdown, Input, Number format, Pattern
  format, Radio group, Search, Text area, Uploader.
- **Static components**: Button, Divider, Error message, Header, Image, Label, Menu, Message, Placeholder components, Progress components,
  Static content, Tooltip.
- **Structure components**: Breadcrumb, Card, Container, Modal, Modal layout, Tab.

## Custom Components

All libraries support custom component integration. You can create your own components or integrate third-party components into the form
builder. See the [custom components documentation](/formengine-designer/features/custom-components) for more information.

## Component Categories

The components are divided into the following categories:

- **Fields** - components that store form data.
- **Static** - components for displaying information, do not contain form data.
- **Structure** - components that structure other components.
- **Templates** - template-related components, such as the Slot component.

## Choosing a Component Library

### When to use Material UI

- You want Google Material Design compliance.
- You need excellent accessibility (WCAG compliant).
- You require deep theming customization.
- Your project already uses Material UI or follows Material Design guidelines.
- You need comprehensive form controls with built-in validation states.

### When to use Mantine

- You want a modern React component library with strong TypeScript support and theming.
- You need accessible, responsive components with a clean API.
- Your project uses or plans to use Mantine for consistency across the app.
- You need date/time pickers, rich text (Tiptap), or file dropzone from the Mantine ecosystem.

### When to use React Suite

- You need a comprehensive set of components including advanced data grids, calendars, and date pickers.
- You prefer a custom design system that's not tied to Material Design.
- You want moderate bundle size.
- You need good internationalization support.

## Getting Started

1. **Choose your component library** based on your design requirements.
2. **Install the appropriate package** (Mantine, Material UI, or React Suite).
3. **Configure the form builder** to use your chosen components.
4. **Start building forms** with the available components.

For detailed documentation on individual components, refer to:

- [Material UI components documentation](/components-library/material-ui).
- [Mantine components documentation](/components-library/mantine).
- [React Suite components documentation](/components-library/rsuite-components).
- [Fields components](/components-library/fields-components).
- [Static components](/components-library/static-components).
- [Structure components](/components-library/structure-components).
- [Template components](/components-library/templates-components).

## Material UI Components

Components based on the Material UI package are available in the
package [@react-form-builder/components-material-ui](https://www.npmjs.com/package/@react-form-builder/components-material-ui).

To install the Material UI components, run the following command:

```bash
npm install @react-form-builder/components-material-ui
```

:::tip

Material UI components require the following peer dependencies. If they're not installed automatically:

```bash
npm install @mui/material@^9.5.0 @mui/x-date-pickers@^9.16.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.1 dayjs@^1.11.23 --save-exact
```

:::

An example of connecting components to `FormBuilder`:

<details>
<summary>Show example</summary>

```typescript jsx
import {builderView} from '@react-form-builder/components-material-ui'
import {FormBuilder} from '@react-form-builder/designer'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'MuiButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const MuiBuilder = () => {
  return (
    <FormBuilder
      view={builderView}
      getForm={getForm}
    />
  )
}
```
</details>

An example of connecting components to `FormViewer`:

<details>
<summary>Show example</summary>

```typescript jsx
import {view} from '@react-form-builder/components-material-ui'
import {FormViewer, namedObserver} from '@react-form-builder/core'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'MuiButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const MuiViewer = () => {
  return (
    <FormViewer
      view={view}
      getForm={getForm}
    />
  )
}
```
</details>

## Mantine Components

Components based on the [Mantine](https://mantine.dev/) package are available in the
package [@react-form-builder/components-mantine](https://www.npmjs.com/package/@react-form-builder/components-mantine).

To install the Mantine components, run the following command:

```bash
npm install @react-form-builder/components-mantine
```

:::tip

Mantine components require peer dependencies. Install the Mantine packages you need:

```bash
npm install @mantine/core @mantine/dates
# Optional: @mantine/dropzone @mantine/tiptap
```

:::

An example of connecting components to `FormBuilder`:

<details>
<summary>Show example</summary>

```typescript jsx
import {builderView} from '@react-form-builder/components-mantine'
import {FormBuilder} from '@react-form-builder/designer'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'MtButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const MantineBuilder = () => {
  return (
    <FormBuilder
      view={builderView}
      getForm={getForm}
    />
  )
}
```

</details>

An example of connecting components to `FormViewer`:

<details>
<summary>Show example</summary>

```typescript jsx
import {view} from '@react-form-builder/components-mantine'
import {FormViewer} from '@react-form-builder/core'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'MtButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const MantineViewer = () => {
  return (
    <FormViewer
      view={view}
      getForm={getForm}
    />
  )
}
```

</details>

## React Suite Components

Components based on the React Suite package are available in the
package [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite).

To install the React Suite components, run the following command:

```bash
npm install @react-form-builder/components-rsuite
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install clsx@2.1.1 @rsuite/icons@1.3.2 react-number-format@5.1.4 rsuite@5.83.4 --save-exact
```

:::

An example of connecting components to `FormBuilder`:

<details>
<summary>Show example</summary>

```typescript jsx
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'RsButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const RSuiteBuilder = () => {
  return (
    <FormBuilder
      view={builderViewWithCss}
      getForm={getForm}
    />
  )
}
```

</details>

An example of connecting components to `FormViewer`:

<details>
<summary>Show example</summary>

```typescript jsx
import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'submitButton',
        type: 'RsButton',
        props: {
          children: {
            value: 'Submit'
          }
        }
      }
    ]
  }
}

const getForm = () => JSON.stringify(emptyForm)

const RSuiteViewer = () => {
  return (
    <FormViewer
      view={view}
      getForm={getForm}
    />
  )
}
```

</details>

## Support and Resources

- [Material UI Documentation](https://mui.com/material-ui/)
- [Mantine Documentation](https://mantine.dev/)
- [React Suite Documentation](https://rsuitejs.com/)
- [GitHub Repository](https://github.com/optimajet/formengine)
- [Community Discussions](https://github.com/optimajet/formengine/discussions)
