---
title: Material UI components
description: The list of Material UI components used in the FormEngine library.
sidebar_label: Material UI components
sidebar_position: 10000
---

import CustomComponents from '../_custom-components.mdx'

export const MaterialUIComponentsDocItem = ({link, caption}) => {
  return !link ? caption : <a target="_blank" href={`https://mui.com/material-ui${link}`}>{caption}</a>
}

export const ComponentLink = ({tag, link}) => {
  const caption = `<${tag}>`
  return !link ? caption : <MaterialUIComponentsDocItem link={link} caption={caption}/>
}

# Material UI components

[Material UI](https://mui.com/material-ui/) is a comprehensive React component library that implements Google's Material Design. It provides
a rich set of components for building modern web applications. The FormEngine [component library](/components-library/) includes Material UI
components as an alternative to React Suite components.

Here is a list of the Material UI components available in the FormEngine library.

## Input Components

These components are used for data entry and user input:

| Component                                                        | Description                                        | Material UI Documentation                                                         |
|:-----------------------------------------------------------------|:---------------------------------------------------|:----------------------------------------------------------------------------------|
| **[MuiDatePicker](/components-library/material-ui/date-picker)** | The Date Picker component lets users select a date | [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)                   |
| **[MuiTextField](/components-library/material-ui/text-field)**   | Text input field for single or multi-line text     | <MaterialUIComponentsDocItem link="/react-text-field/" caption="TextField" />     |
| **[MuiSelect](/components-library/material-ui/select)**          | Dropdown selection component                       | <MaterialUIComponentsDocItem link="/react-select/" caption="Select" />            |
| **[MuiCheckbox](/components-library/material-ui/checkbox)**      | Checkbox for binary choices                        | <MaterialUIComponentsDocItem link="/react-checkbox/" caption="Checkbox" />        |
| **[MuiRadioGroup](/components-library/material-ui/radio-group)** | Radio button group for single selection            | <MaterialUIComponentsDocItem link="/react-radio-button/" caption="Radio Group" /> |
| **[MuiRadioItem](/components-library/material-ui/radio-item)**   | Single radio button option with label              | Custom component for individual radio items                                       |
| **[MuiSwitch](/components-library/material-ui/switch)**          | Toggle switch for on/off states                    | <MaterialUIComponentsDocItem link="/react-switch/" caption="Switch" />            |
| **[MuiUploader](/components-library/material-ui/uploader)**      | File upload component with Material UI styling     | Preset component (combines multiple MUI components)                               |

## Form Components

Components for form layout and structure:

| Component                                                                     | Description                           | Material UI Documentation                                                                  |
|:------------------------------------------------------------------------------|:--------------------------------------|:-------------------------------------------------------------------------------------------|
| **[MuiFormControlLabel](/components-library/material-ui/form-control-label)** | Wrapper for form controls with labels | <MaterialUIComponentsDocItem link="/api/form-control-label/" caption="FormControlLabel" /> |
| **[MuiFormLabel](/components-library/material-ui/form-label)**                | Label component for form controls     | <MaterialUIComponentsDocItem link="/api/form-label/" caption="FormLabel" />                |

## Layout Components

Components for page and content layout:

| Component                                                     | Description                                      | Material UI Documentation                                                    |
|:--------------------------------------------------------------|:-------------------------------------------------|:-----------------------------------------------------------------------------|
| **[MuiBox](/components-library/material-ui/box)**             | Generic box component for layout                 | <MaterialUIComponentsDocItem link="/react-box/" caption="Box" />             |
| **[MuiContainer](/components-library/material-ui/container)** | Container for centering and constraining content | <MaterialUIComponentsDocItem link="/react-container/" caption="Container" /> |
| **[MuiStack](/components-library/material-ui/stack)**         | Layout component for stacking items              | <MaterialUIComponentsDocItem link="/react-stack/" caption="Stack" />         |

## Navigation Components

Components for navigation and wayfinding:

| Component                                                         | Description                     | Material UI Documentation                                                        |
|:------------------------------------------------------------------|:--------------------------------|:---------------------------------------------------------------------------------|
| **[MuiBreadcrumbs](/components-library/material-ui/breadcrumbs)** | Breadcrumb navigation component | <MaterialUIComponentsDocItem link="/react-breadcrumbs/" caption="Breadcrumbs" /> |
| **[MuiLink](/components-library/material-ui/link)**               | Hyperlink component             | <MaterialUIComponentsDocItem link="/react-link/" caption="Link" />               |

## Data Display Components

Components for displaying data and content:

| Component                                                       | Description                           | Material UI Documentation                                                      |
|:----------------------------------------------------------------|:--------------------------------------|:-------------------------------------------------------------------------------|
| **[MuiCard](/components-library/material-ui/card)**             | Card component for content containers | <MaterialUIComponentsDocItem link="/react-card/" caption="Card" />             |
| **[MuiList](/components-library/material-ui/list)**             | List component for displaying items   | <MaterialUIComponentsDocItem link="/react-list/" caption="List" />             |
| **[MuiListItem](/components-library/material-ui/list-item)**    | Item component for lists              | <MaterialUIComponentsDocItem link="/api/list-item/" caption="ListItem" />      |
| **[MuiTypography](/components-library/material-ui/typography)** | Typography component for text styling | <MaterialUIComponentsDocItem link="/react-typography/" caption="Typography" /> |
| **[MuiTooltip](/components-library/material-ui/tooltip)**       | Tooltip for additional information    | <MaterialUIComponentsDocItem link="/react-tooltip/" caption="Tooltip" />       |

## Feedback Components

Components for providing user feedback:

| Component                                                                    | Description                 | Material UI Documentation                                                          |
|:-----------------------------------------------------------------------------|:----------------------------|:-----------------------------------------------------------------------------------|
| **[MuiCircularProgress](/components-library/material-ui/circular-progress)** | Circular progress indicator | <MaterialUIComponentsDocItem link="/react-progress/" caption="CircularProgress" /> |
| **[MuiLinearProgress](/components-library/material-ui/linear-progress)**     | Linear progress indicator   | <MaterialUIComponentsDocItem link="/react-progress/" caption="LinearProgress" />   |
| **[MuiErrorWrapper](/components-library/material-ui/error-wrapper)**         | Error display wrapper       | Custom component for error handling                                                |

## Dialog Components

Components for modal dialogs and overlays:

| Component                                                                       | Description                   | Material UI Documentation                                                                    |
|:--------------------------------------------------------------------------------|:------------------------------|:---------------------------------------------------------------------------------------------|
| **[MuiDialog](/components-library/material-ui/dialog)**                         | Main dialog container         | <MaterialUIComponentsDocItem link="/react-dialog/" caption="Dialog" />                       |
| **[MuiDialogTitle](/components-library/material-ui/dialog-title/)**             | Dialog title component        | <MaterialUIComponentsDocItem link="/api/dialog-title/" caption="DialogTitle" />              |
| **[MuiDialogContent](/components-library/material-ui/dialog-content)**          | Dialog content container      | <MaterialUIComponentsDocItem link="/api/dialog-content/" caption="DialogContent" />          |
| **[MuiDialogContentText](/components-library/material-ui/dialog-content-text)** | Dialog text content           | <MaterialUIComponentsDocItem link="/api/dialog-content-text/" caption="DialogContentText" /> |
| **[MuiDialogActions](/components-library/material-ui/dialog-actions)**          | Dialog actions container      | <MaterialUIComponentsDocItem link="/api/dialog-actions/" caption="DialogActions" />          |
| **[MuiDialogLayout](/components-library/material-ui/dialog-layout)**            | Complete dialog layout preset | Preset component (combines multiple dialog components)                                       |

## Button Components

Components for user actions:

| Component                                                          | Description                       | Material UI Documentation                                                         |
|:-------------------------------------------------------------------|:----------------------------------|:----------------------------------------------------------------------------------|
| **[MuiButton](/components-library/material-ui/button)**            | Button component for user actions | <MaterialUIComponentsDocItem link="/react-button/" caption="Button" />            |
| **[MuiButtonGroup](/components-library/material-ui/button-group)** | Group of buttons                  | <MaterialUIComponentsDocItem link="/react-button-group/" caption="ButtonGroup" /> |

## Utility Components

Specialized utility components:

| Component                                                   | Description                   | Material UI Documentation               |
|:------------------------------------------------------------|:------------------------------|:----------------------------------------|
| **MuiViewerWrapper**                                        | Wrapper component for viewers | Custom component for viewer integration |

## Getting Started with Material UI Components

### Installation

Material UI components are available in the `@react-form-builder/components-material-ui` package:

```bash
npm install @react-form-builder/components-material-ui
```

## Additional Resources

- [Material UI Official Documentation](https://mui.com/material-ui/)
- [Material Design Guidelines](https://material.io/design)
- [Material UI GitHub Repository](https://github.com/mui/material-ui)
- [Material UI Component Examples](https://mui.com/material-ui/getting-started/usage/)

## Support

For issues with Material UI components in FormEngine:

- Check the [FormEngine GitHub issues](https://github.com/optimajet/formengine/issues)
- Refer to [Material UI documentation](https://mui.com/material-ui/getting-started/installation/)
- Join the [FormEngine community discussions](https://github.com/optimajet/formengine/discussions)

Material UI components provide a robust, accessible, and visually consistent way to build forms and interfaces in FormEngine applications.
With full Material Design compliance and extensive customization options, they're an excellent choice for projects that require modern,
professional UI components.
