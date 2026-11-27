---
title: Mantine Components
description: Overview of Mantine components available in the FormEngine library.
sidebar_label: Mantine Components
sidebar_position: 20000
---

import CustomComponents from '../_custom-components.mdx'

export const MantineComponentsDocItem = ({link, caption}) => {
  return !link ? caption : <a target="_blank" rel="noopener noreferrer" href={`https://mantine.dev${link}`}>{caption}</a>
}

export const ComponentLink = ({tag, link}) => {
  const caption = `<${tag}>`
  return !link ? caption : <MantineComponentsDocItem link={link} caption={caption}/>
}

# Mantine Components

[Mantine](https://mantine.dev/) is a modern React component library with accessible, customizable components. It focuses on developer
experience, theming, and responsive design. FormEngine includes Mantine components as an alternative to Material UI and React Suite in the
[component library](/components-library/).

## Getting Started with Mantine Components

### Installation

Mantine components are available in the `@react-form-builder/components-mantine` package:

```bash
npm install @react-form-builder/components-mantine
```

Peer dependencies (Mantine packages) must also be installed as required by your usage:

```bash
npm install @mantine/core @mantine/dates
# Optional: @mantine/dropzone @mantine/tiptap
```

### Basic Mantine setup

Mantine styles must be imported manually. This is different from React Suite where the builder can use a style-loader helper
`withCssLoader` to inject styles automatically.

```tsx title='Mantine setup (manual CSS imports)'
import {builderView, view} from '@react-form-builder/components-mantine'
import {FormBuilder} from '@react-form-builder/designer'
import {FormViewer} from '@react-form-builder/core'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
// Optional packages:
// import '@mantine/dropzone/styles.css'
// import '@mantine/tiptap/styles.css'

const getForm = () => JSON.stringify({
  form: {
    key: 'Screen',
    type: 'Screen',
    children: []
  }
})

export const MantineBuilderBasic = () => <FormBuilder view={builderView} getForm={getForm}/>
export const MantineViewerBasic = () => <FormViewer view={view} getForm={getForm}/>
```

For setup details, see [Mantine Getting Started](https://mantine.dev/getting-started/).

### Basic styling and theming

Mantine default color palettes (`gray`, `grape`, `blue` and others) follow the
[Open Color](https://yeun.github.io/open-color/) scale in the default theme.

<LiveCodeWithDetails summary='Show code'>
{`
function App() {
  const [mode, setMode] = useState('vibrant')
  const previewRootRef = useRef(null)
  const colorByMode = {vibrant: 'cyan', contrast: 'grape', extreme: 'orange'}

  const themeMap = {
    vibrant: createTheme({
      fontFamily: 'Open Sans, sans-serif',
      primaryColor: 'cyan',
      defaultRadius: 'md'
    }),
    contrast: createTheme({
      fontFamily: 'Georgia, serif',
      primaryColor: 'grape',
      defaultRadius: 'xl'
    }),
    extreme: createTheme({
      primaryColor: 'orange',
      primaryShade: {light: 7, dark: 4},
      fontFamily: '"Impact", "Arial Black", sans-serif',
      defaultRadius: 'xs'
    })
  }

  const form = useMemo(() => ({
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'title',
          type: 'MtTitle',
          props: {
            order: {value: 3},
            color: {value: colorByMode[mode]},
            children: {value: 'Sign up'}
          }
        },
        {
          key: 'email',
          type: 'MtTextInput',
          props: {
            label: {value: 'Email'},
            placeholder: {value: 'you@example.com'}
          }
        },
        {
          key: 'age',
          type: 'MtSlider',
          props: {
            label: {value: 'Age'},
            color: {value: colorByMode[mode]},
            min: {value: 13},
            max: {value: 100},
            step: {value: 1}
          }
        },
        {
          key: 'terms',
          type: 'MtCheckbox',
          props: {
            label: {value: 'I agree to terms and privacy policy'},
            color: {value: colorByMode[mode]}
          }
        },
        {
          key: 'submit',
          type: 'MtButton',
          props: {
            children: {value: 'Create account'},
            color: {value: colorByMode[mode]},
            fullWidth: {value: true}
          }
        }
      ]
    }
  }), [mode])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <div id='mantine-live-root-theme' ref={previewRootRef} style={{display: 'grid', gap: 12}}>
      <label>
        Theme preset:{' '}
        <select value={mode} onChange={(event) => setMode(event.target.value)}>
          <option value='vibrant'>vibrant</option>
          <option value='contrast'>contrast</option>
          <option value='extreme'>extreme</option>
        </select>
      </label>
      <MantineProvider
        theme={themeMap[mode]}
        cssVariablesSelector='#mantine-live-root-theme'
        getRootElement={() => previewRootRef.current ?? undefined}
        withGlobalClasses={false}
      >
        <FormViewer view={mantineView} getForm={getForm}/>
      </MantineProvider>
    </div>
  )
}
`}
</LiveCodeWithDetails>

For theme and provider options, see:

- [Theme object](https://mantine.dev/theming/theme-object/)
- [MantineProvider props](https://mantine.dev/theming/mantine-provider/)
- [Colors (official setup guide)](https://mantine.dev/theming/colors/)
- [Default CSS variables list](https://mantine.dev/styles/css-variables-list/)

### Light and dark theme handling

In Mantine's color scheme model, `MantineProvider` is the central manager. It controls `light`/`dark`/`auto` behavior with
`defaultColorScheme`, persists the selected value through the manager, and applies the resolved mode through the
`data-mantine-color-scheme` attribute used by component styles.

Use `defaultColorScheme`, `forceColorScheme`, and `colorSchemeManager` on `MantineProvider` for app-wide behavior. For system preference
awareness, use `useColorScheme` from `@mantine/hooks`.

```tsx title='Light and dark setup with persistence'
import {localStorageColorSchemeManager, MantineProvider} from '@mantine/core'
import {view} from '@react-form-builder/components-mantine'
import {FormViewer} from '@react-form-builder/core'
import {useColorScheme} from '@mantine/hooks'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'example-viewer-color-scheme'
})

const getForm = () => JSON.stringify({form: {key: 'Screen', type: 'Screen', children: []}})

export const AppWithColorScheme = () => {
  const systemColorScheme = useColorScheme()

  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={systemColorScheme === 'dark' ? 'dark' : 'light'}
      // Uncomment to force one mode:
      // forceColorScheme='dark'
    >
      <FormViewer view={view} getForm={getForm}/>
    </MantineProvider>
  )
}
```

When you need immediate client-side color scheme detection (for non-SSR usage), pass `getInitialValueInEffect: true`:

```tsx
import {useColorScheme} from '@mantine/hooks'

const colorScheme = useColorScheme('light', {getInitialValueInEffect: true})
```

<LiveCodeWithDetails summary='Show code'>
{`
function App() {
  const [forceColorScheme, setForceColorScheme] = useState('none')
  const colorSchemeManager = useMemo(
    () => localStorageColorSchemeManager({key: 'docs-mantine-scheme'}),
    []
  )
  const previewRootRef = useRef(null)

  const effectiveScheme = forceColorScheme === 'none' ? undefined : forceColorScheme

  const form = useMemo(() => ({
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'title',
          type: 'MtTitle',
          props: {
            order: {value: 3},
            children: {value: 'Sign up (' + (effectiveScheme ?? 'default') + '  mode)'}
          }
        },
        {
          key: 'email',
          type: 'MtTextInput',
          props: {
            label: {value: 'Email'},
            placeholder: {value: 'you@example.com'}
          }
        },
        {
          key: 'age',
          type: 'MtSlider',
          props: {
            label: {value: 'Age'},
            min: {value: 13},
            max: {value: 100},
            step: {value: 1}
          }
        },
        {
          key: 'terms',
          type: 'MtCheckbox',
          props: {
            label: {value: 'I agree to terms and privacy policy'}
          }
        }
      ]
    }
  }), [effectiveScheme])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <div
      id='mantine-live-root-color'
      ref={previewRootRef}
      style={{
        display: 'grid',
        gap: 12,
        padding: 12,
        borderRadius: 8,
        background: 'var(--mantine-color-body)',
        color: 'var(--mantine-color-text)',
        border: '1px solid var(--mantine-color-default-border)',
        transition: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease'
      }}
    >
      <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
        <label>
          forceColorScheme:{' '}
          <select
            value={forceColorScheme}
            onChange={(event) => setForceColorScheme(event.target.value)}
          >
            <option value='none'>none</option>
            <option value='light'>light</option>
            <option value='dark'>dark</option>
          </select>
        </label>
      </div>
      <MantineProvider
        colorSchemeManager={colorSchemeManager}
        forceColorScheme={effectiveScheme}
        cssVariablesSelector='#mantine-live-root-color'
        getRootElement={() => previewRootRef.current ?? undefined}
        withGlobalClasses={false}
      >
        <FormViewer view={mantineView} getForm={getForm}/>
      </MantineProvider>
    </div>
  )
}
`}
</LiveCodeWithDetails>

For color scheme APIs, see:

- [Color schemes](https://mantine.dev/theming/color-schemes/)
- [use-color-scheme hook](https://mantine.dev/hooks/use-color-scheme/)

### BiDi support

Mantine supports BiDi setup in several ways:

1. Wrap the app with `DirectionProvider`.
2. Set `dir` on the root element (`html` in most apps).
3. Change direction at runtime with `useDirection`.
4. Add RTL-specific CSS overrides with the `rtl` mixin (when using `postcss-preset-mantine`).
5. Configure `DirectionProvider` behavior with `initialDirection` and `detectDirection`.

#### DirectionProvider

```tsx title='DirectionProvider with MantineProvider'
import {DirectionProvider, MantineProvider} from '@mantine/core'
import {view} from '@react-form-builder/components-mantine'
import {FormViewer} from '@react-form-builder/core'

const getForm = () => JSON.stringify({form: {key: 'Screen', type: 'Screen', children: []}})

export const AppWithDirection = () => (
  <DirectionProvider initialDirection='ltr'>
    <MantineProvider>
      <FormViewer view={view} getForm={getForm}/>
    </MantineProvider>
  </DirectionProvider>
)
```

#### Root dir attribute

```html
<!doctype html>
<html dir="rtl">
  <head></head>
  <body></body>
</html>
```

#### Runtime direction switch with useDirection

```tsx
import {Button, Group, useDirection} from '@mantine/core'

export const DirectionToggle = () => {
  const {dir, setDirection, toggleDirection} = useDirection()

  return (
    <Group>
      <Button variant='default' onClick={() => setDirection('ltr')}>LTR</Button>
      <Button variant='default' onClick={() => setDirection('rtl')}>RTL</Button>
      <Button onClick={toggleDirection}>Toggle ({dir})</Button>
    </Group>
  )
}
```

#### CSS RTL mixin

```css
.demo {
  text-align: left;
  padding: var(--mantine-spacing-md);

  @mixin rtl {
    text-align: right;
  }
}
```

For direction support, see [RTL direction](https://mantine.dev/styles/rtl/)

### Examples

Use these examples to run and inspect viewer and designer integrations:

#### Viewer example

<LiveCodeWithDetails summary='Show code'>
{`
function App() {
  const theme = createTheme({primaryColor: 'cyan'})
  const getForm = useCallback(() => JSON.stringify({
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'title',
          type: 'MtTitle',
          props: {
            order: {value: 3},
            children: {value: 'Viewer integration'}
          }
        },
        {
          key: 'name',
          type: 'MtTextInput',
          props: {
            label: {value: 'Name'},
            placeholder: {value: 'John Doe'}
          }
        },
        {
          key: 'submit',
          type: 'MtButton',
          props: {
            children: {value: 'Submit'},
            fullWidth: {value: true}
          }
        }
      ]
    }
  }), [])

  return (
    <MantineProvider theme={theme}>
      <FormViewer view={mantineView} getForm={getForm}/>
    </MantineProvider>
  )
}
`}
</LiveCodeWithDetails>

#### Designer example

For a full designer experience, check the public demo: https://demo.formengine.io/

```tsx title='Designer integration snippet'
import {builderView} from '@react-form-builder/components-mantine'
import {FormBuilder} from '@react-form-builder/designer'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/tiptap/styles.css'

const getForm = () => JSON.stringify({form: {key: 'Screen', type: 'Screen', children: []}})

export const MantineBuilder = () => <FormBuilder view={builderView} getForm={getForm}/>
```

## Component types

### Inputs

These components are used for data entry and user input:

| Component                                                               | Description                                      | Mantine Documentation                                                                   |
| :---------------------------------------------------------------------- | :----------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **[MtCheckbox](/components-library/mantine/checkbox)**                  | Checkbox for binary choices                      | <MantineComponentsDocItem link="/core/checkbox/" caption="Checkbox" />                  |
| **[MtCheckboxGroup](/components-library/mantine/checkbox-group)**       | Group of checkboxes for multiple selection       | <MantineComponentsDocItem link="/core/checkbox/" caption="Checkbox" />                  |
| **[MtChip](/components-library/mantine/chip)**                          | Chip for tags or filters                         | <MantineComponentsDocItem link="/core/chip/" caption="Chip" />                          |
| **[MtChipCheckboxGroup](/components-library/mantine/chip-group)**       | Chip-based checkbox group                        | <MantineComponentsDocItem link="/core/chip/" caption="Chip" />                          |
| **[MtChipRadioGroup](/components-library/mantine/chip-radio-group)**    | Chip-based radio group                           | <MantineComponentsDocItem link="/core/chip/" caption="Chip" />                          |
| **[MtColorInput](/components-library/mantine/color-input)**             | Color picker input                               | <MantineComponentsDocItem link="/core/color-input/" caption="ColorInput" />             |
| **[MtColorPicker](/components-library/mantine/color-picker)**           | Color picker with swatches                       | <MantineComponentsDocItem link="/core/color-picker/" caption="ColorPicker" />           |
| **[MtFileInput](/components-library/mantine/file-input)**               | File input with drag-and-drop                    | <MantineComponentsDocItem link="/core/file-input/" caption="FileInput" />               |
| **[MtDropzone](/components-library/mantine/dropzone)**                  | File upload dropzone                             | [Mantine Dropzone](https://mantine.dev/x/dropzone/) (optional package)                  |
| **[MtJsonInput](/components-library/mantine/json-input)**               | JSON editor input                                | <MantineComponentsDocItem link="/core/json-input/" caption="JsonInput" />               |
| **[MtLabel](/components-library/mantine/label)**                        | Label component for form controls                | <MantineComponentsDocItem link="/core/input/" caption="Input (label)" />                |
| **[MtNumberInput](/components-library/mantine/number-input)**           | Numeric input with optional stepper              | <MantineComponentsDocItem link="/core/number-input/" caption="NumberInput" />           |
| **[MtPasswordInput](/components-library/mantine/password-input)**       | Password input with visibility toggle            | <MantineComponentsDocItem link="/core/password-input/" caption="PasswordInput" />       |
| **[MtRadio](/components-library/mantine/radio)**                        | Single radio option                              | <MantineComponentsDocItem link="/core/radio/" caption="Radio" />                        |
| **[MtRadioGroup](/components-library/mantine/radio-group)**             | Radio button group for single selection          | <MantineComponentsDocItem link="/core/radio/" caption="Radio.Group" />                  |
| **[MtRangeSlider](/components-library/mantine/range-slider)**           | Slider for selecting a range of values           | <MantineComponentsDocItem link="/core/slider/" caption="RangeSlider" />                 |
| **[MtRating](/components-library/mantine/rating)**                      | Star or custom symbol rating input               | <MantineComponentsDocItem link="/core/rating/" caption="Rating" />                      |
| **[MtSegmentedControl](/components-library/mantine/segmented-control)** | Segmented control for mutually exclusive options | <MantineComponentsDocItem link="/core/segmented-control/" caption="SegmentedControl" /> |
| **[MtSlider](/components-library/mantine/slider)**                      | Slider for selecting a value from a range        | <MantineComponentsDocItem link="/core/slider/" caption="Slider" />                      |
| **[MtSwitch](/components-library/mantine/switch)**                      | Toggle switch for on/off states                  | <MantineComponentsDocItem link="/core/switch/" caption="Switch" />                      |
| **[MtSwitchGroup](/components-library/mantine/switch-group)**           | Group of switches with a shared label            | <MantineComponentsDocItem link="/core/switch/" caption="Switch.Group" />                |
| **[MtTextInput](/components-library/mantine/text-input)**               | Text input field for single-line text            | <MantineComponentsDocItem link="/core/text-input/" caption="TextInput" />               |
| **[MtTextarea](/components-library/mantine/textarea)**                  | Multi-line text input                            | <MantineComponentsDocItem link="/core/textarea/" caption="Textarea" />                  |

### Combobox and Select

Dropdown and selection components:

| Component                                                       | Description                            | Mantine Documentation                                                          |
| :-------------------------------------------------------------- | :------------------------------------- | :----------------------------------------------------------------------------- |
| **[MtAutocomplete](/components-library/mantine/autocomplete)**  | Autocomplete with suggestions          | <MantineComponentsDocItem link="/core/autocomplete/" caption="Autocomplete" /> |
| **[MtMultiSelect](/components-library/mantine/multi-select)**   | Dropdown for multiple selection        | <MantineComponentsDocItem link="/core/multi-select/" caption="MultiSelect" />  |
| **[MtNativeSelect](/components-library/mantine/native-select)** | Native HTML select styled with Mantine | <MantineComponentsDocItem link="/core/select/" caption="NativeSelect" />       |
| **[MtSelect](/components-library/mantine/select)**              | Dropdown for single selection          | <MantineComponentsDocItem link="/core/select/" caption="Select" />             |
| **[MtTagsInput](/components-library/mantine/tags-input)**       | Input for multiple tags                | <MantineComponentsDocItem link="/core/tags-input/" caption="TagsInput" />      |

### Date and Time

Components for date and time selection (require `@mantine/dates`):

| Component                                                                                 | Description                                    | Mantine Documentation                                    |
| :---------------------------------------------------------------------------------------- | :--------------------------------------------- | :------------------------------------------------------- |
| **[MtDateMultiplePicker](/components-library/mantine/date-multiple-picker)**              | Date picker for selecting multiple dates       | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDateMultiplePickerInput](/components-library/mantine/date-multiple-picker-input)**   | Date picker input for multiple dates           | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDatePicker](/components-library/mantine/date-picker)**                               | Date picker for a single date                  | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDatePickerInput](/components-library/mantine/date-picker-input)**                    | Date picker with input field for a single date | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDateRangePicker](/components-library/mantine/date-range-picker)**                    | Date picker for selecting a date range         | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDateRangePickerInput](/components-library/mantine/date-range-picker-input)**         | Date picker input for a date range             | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtDateTimePicker](/components-library/mantine/date-time-picker)**                      | Date and time picker                           | [Mantine Dates](https://mantine.dev/dates/date-picker/)  |
| **[MtMonthMultiplePicker](/components-library/mantine/month-multiple-picker)**            | Month picker for selecting multiple months     | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtMonthMultiplePickerInput](/components-library/mantine/month-multiple-picker-input)** | Month picker input for multiple months         | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtMonthPicker](/components-library/mantine/month-picker)**                             | Month picker for a single month                | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtMonthPickerInput](/components-library/mantine/month-picker-input)**                  | Month picker with input field                  | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtMonthRangePicker](/components-library/mantine/month-range-picker)**                  | Month picker for selecting a range of months   | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtMonthRangePickerInput](/components-library/mantine/month-range-picker-input)**       | Month picker input for a range of months       | [Mantine Dates](https://mantine.dev/dates/month-picker/) |
| **[MtTimeGrid](/components-library/mantine/time-grid)**                                   | Time slot grid for scheduling                  | [Mantine Dates](https://mantine.dev/dates/time-grid/)    |
| **[MtTimeInput](/components-library/mantine/time-input)**                                 | Time input field                               | [Mantine Dates](https://mantine.dev/dates/time-input/)   |
| **[MtTimePicker](/components-library/mantine/time-picker)**                               | Time picker                                    | [Mantine Dates](https://mantine.dev/dates/time-input/)   |
| **[MtYearMultiplePicker](/components-library/mantine/year-multiple-picker)**              | Year picker for selecting multiple years       | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |
| **[MtYearMultiplePickerInput](/components-library/mantine/year-multiple-picker-input)**   | Year picker input for multiple years           | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |
| **[MtYearPicker](/components-library/mantine/year-picker)**                               | Year picker for a single year                  | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |
| **[MtYearPickerInput](/components-library/mantine/year-picker-input)**                    | Year picker with input field                   | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |
| **[MtYearRangePicker](/components-library/mantine/year-range-picker)**                    | Year picker for selecting a range of years     | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |
| **[MtYearRangePickerInput](/components-library/mantine/year-range-picker-input)**         | Year picker input for a range of years         | [Mantine Dates](https://mantine.dev/dates/year-picker/)  |

### Layout

| Component                                                | Description                                      | Mantine Documentation                                                    |
| :------------------------------------------------------- | :----------------------------------------------- | :----------------------------------------------------------------------- |
| **[MtContainer](/components-library/mantine/container)** | Container for centering and constraining content | <MantineComponentsDocItem link="/core/container/" caption="Container" /> |

### Typography

| Component                                                  | Description                        | Mantine Documentation                                                      |
| :--------------------------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------- |
| **[MtText](/components-library/mantine/text)**             | Text component for body content    | <MantineComponentsDocItem link="/core/text/" caption="Text" />             |
| **[MtTitle](/components-library/mantine/title)**           | Heading component                  | <MantineComponentsDocItem link="/core/title/" caption="Title" />           |
| **[MtTypography](/components-library/mantine/typography)** | Typography with preset text styles | <MantineComponentsDocItem link="/core/typography/" caption="Typography" /> |

### Miscellaneous

Miscellaneous utility components:

---

| Component                                                       | Description                   | Mantine Documentation                                                |
| :-------------------------------------------------------------- | :---------------------------- | :------------------------------------------------------------------- |
| **[MtDivider](/components-library/mantine/divider)**            | Visual divider                | <MantineComponentsDocItem link="/core/divider/" caption="Divider" /> |
| **[MtErrorWrapper](/components-library/mantine/error-wrapper)** | Error display wrapper         | Custom component for error handling                                  |
| **MtViewerWrapper**                                             | Wrapper component for viewers | Custom component for viewer integration                              |

### Other extensions

Additional Mantine-based extensions:

| Component                                              | Description          | Mantine Documentation                                                  |
| :----------------------------------------------------- | :------------------- | :--------------------------------------------------------------------- |
| **[MtTiptap](/components-library/mantine/tiptap)**     | Rich text editor     | [Mantine Tiptap](https://mantine.dev/x/tiptap/) (optional package)     |
| **[MtDropzone](/components-library/mantine/dropzone)** | File upload dropzone | [Mantine Dropzone](https://mantine.dev/x/dropzone/) (optional package) |

### Overlays

| Component                                            | Description                 | Mantine Documentation                                                |
| :--------------------------------------------------- | :-------------------------- | :------------------------------------------------------------------- |
| **[MtTooltip](/components-library/mantine/tooltip)** | Tooltip for additional info | <MantineComponentsDocItem link="/core/tooltip/" caption="Tooltip" /> |

### Modal

| Component                                          | Description            | Mantine Documentation                                            |
| :------------------------------------------------- | :--------------------- | :--------------------------------------------------------------- |
| **[MtDialog](/components-library/mantine/dialog)** | Modal dialog container | <MantineComponentsDocItem link="/core/modal/" caption="Modal" /> |

### Buttons

| Component                                          | Description             | Mantine Documentation                                              |
| :------------------------------------------------- | :---------------------- | :----------------------------------------------------------------- |
| **[MtButton](/components-library/mantine/button)** | Button for user actions | <MantineComponentsDocItem link="/core/button/" caption="Button" /> |

## Additional Resources

- [Mantine official documentation](https://mantine.dev/)
- [Mantine Core Components](https://mantine.dev/core/package/)
- [Mantine Dates](https://mantine.dev/dates/getting-started/)
- [Mantine GitHub Repository](https://github.com/mantinedev/mantine)
- [Mantine Getting Started](https://mantine.dev/getting-started/)

## Support

For issues with Mantine components in FormEngine:

- Check the [FormEngine GitHub issues](https://github.com/OptimaJetLLC/formengine/issues)
- Refer to the [Mantine documentation](https://mantine.dev/getting-started/)
- Join the [FormEngine community discussions](https://github.com/OptimaJetLLC/formengine/discussions)

Mantine components provide a modern, accessible, and themable way to build forms and interfaces in FormEngine applications, with strong TypeScript support and responsive design out of the box.
