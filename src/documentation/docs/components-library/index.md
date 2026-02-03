---
title: Components library
sidebar_label: Components library
sidebar_position: 0
---

# Components library

FormEngine supports multiple UI component libraries. The primary libraries available are:

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
npm install @mui/material@^7.3.2 @emotion/react@^11.11.0 @emotion/styled@^11.11.0 --save-exact
```

:::

An example of connecting components to `FormBuilder`:

```typescript jsx
import {builderView} from '@react-form-builder/components-material-ui'
import {FormBuilder} from '@react-form-builder/designer'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'muiButton1',
        type: 'MuiButton',
        props: {
          children: {
            value: 'Ok'
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

An example of connecting components to `FormViewer`:

```typescript jsx
import {view} from '@react-form-builder/components-material-ui'
import {FormViewer, namedObserver} from '@react-form-builder/core'

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'muiButton1',
        type: 'MuiButton',
        props: {
          children: {
            value: 'Ok'
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
npm install @emotion/css@11.10.5 @emotion/react@11.10.5 @emotion/styled@11.10.5 @rsuite/icons@1.0.2 react-number-format@5.1.4 rsuite@5.59.1 --save-exact
```

:::

## Component Categories

The components are divided into the following categories:

- **Fields** - components that store form data.
- **Static** - components for displaying information, do not contain form data.
- **Structure** - components that structure other components.
- **Templates** - template-related components, such as the Slot component.

## Available Component Libraries

### React Suite Components

- **Complete documentation**: [React Suite components](/components-library/rsuite-components).
- **Fields components**: Calendar, Checkbox, DatePicker, TimePicker, TagPicker, AutoComplete, Dropdown, Input, Number format, Pattern
  format, Radio group, Search, Text area, Uploader.
- **Static components**: Button, Divider, Error message, Header, Image, Label, Menu, Message, Placeholder components, Progress components,
  Static content, Tooltip.
- **Structure components**: Breadcrumb, Card, Container, Modal, Modal layout, Tab.

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

## Choosing a Component Library

### When to use Material UI

- You want Google Material Design compliance.
- You need excellent accessibility (WCAG compliant).
- You require deep theming customization.
- Your project already uses Material UI or follows Material Design guidelines.
- You need comprehensive form controls with built-in validation states.

### When to use React Suite

- You need a comprehensive set of components including advanced data grids, calendars, and date pickers.
- You prefer a custom design system that's not tied to Material Design.
- You want moderate bundle size.
- You need good internationalization support.

## Getting Started

1. **Choose your component library** based on your design requirements.
2. **Install the appropriate package** (React Suite or Material UI).
3. **Configure the form builder** to use your chosen components.
4. **Start building forms** with the available components.

For detailed documentation on individual components, refer to:

- [Material UI components documentation](/components-library/material-ui).
- [React Suite components documentation](/components-library/rsuite-components).
- [Fields components](/components-library/fields-components).
- [Static components](/components-library/static-components).
- [Structure components](/components-library/structure-components).
- [Template components](/components-library/templates-components).

## Custom Components

Both libraries support custom component integration. You can create your own components or integrate third-party components into the form
builder. See the [custom components documentation](/formengine-designer/features/custom-components) for more information.

## Support and Resources

- [Material UI Documentation](https://mui.com/material-ui/)
- [React Suite Documentation](https://rsuitejs.com/)
- [GitHub Repository](https://github.com/optimajet/formengine)
- [Community Discussions](https://github.com/optimajet/formengine/discussions)
