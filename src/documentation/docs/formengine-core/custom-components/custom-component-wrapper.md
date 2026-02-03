---
sidebar_position: 70
---

# Custom Component Wrapper

## Overview

A custom component wrapper is a React component that wraps the entire form viewer, allowing you to inject additional functionality, context
providers, or styling at the root level of your form. Wrappers are useful for:

- Applying theme providers (Material UI, React Suite, etc.)
- Adding localization contexts
- Providing custom styling or CSS baselines
- Injecting global state providers
- Handling language-specific layout (RTL/LTR)

## Creating a Wrapper Component

A wrapper component have to implement the [FormViewerWrapper](/api-reference/@react-form-builder/core/type-aliases/FormViewerWrapper) type,
which is a React component
accepting [FormViewerWrapperComponentProps`](/api-reference/@react-form-builder/core/interfaces/FormViewerWrapperComponentProps):

```tsx
import {createTheme, ScopedCssBaseline, ThemeProvider} from '@mui/material'
import type {ThemeOptions} from '@mui/material/styles/createTheme'
import type {FormViewerWrapper, Language} from '@react-form-builder/core'
import {useBuilderTheme} from '@react-form-builder/core'
import {useMemo} from 'react'

type Theme = 'dark' | 'light'

const createMuiTheme = (theme: Theme, language?: Language) => {
  const options: ThemeOptions = {
    cssVariables: true,
    palette: {
      mode: theme,
    }
  }
  return createTheme(options)
}

const containerStyle = {
  height: '100%',
  width: '100%'
}

export const MuiViewerWrapper: FormViewerWrapper = ({children, language}) => {
  const theme = useBuilderTheme()
  const muiTheme = useMemo(() => createMuiTheme(theme, language), [language, theme])

  return <ThemeProvider theme={muiTheme}>
    <ScopedCssBaseline style={containerStyle}>{children}</ScopedCssBaseline>
  </ThemeProvider>
}
```

### Required Props

- `language`: The current language object containing `fullCode` (e.g., 'en-US') and `bidi` (BiDi.LTR or BiDi.RTL)
- `children`: The form viewer content to be wrapped

## Registering a Wrapper

Wrappers are registered using the [withViewerWrapper](/api-reference/@react-form-builder/core/classes/View#withviewerwrapper) method on
a [View](/api-reference/@react-form-builder/core/classes/View) instance:

```typescript
import {createView} from '@react-form-builder/core'
import {myComponents} from './my-components'
import {MyWrapper} from './MyWrapper'

const view = createView(myComponents)
  .withViewerWrapper(MyWrapper)
```

### Multiple Wrappers

You can chain multiple wrappers, and they will be nested in the order they are added:

```typescript
const view = createView(components)
  .withViewerWrapper(ThemeWrapper)
  .withViewerWrapper(LocalizationWrapper)
  .withViewerWrapper(ErrorBoundaryWrapper);
```

The nesting order will be:

```tsx
<ThemeWrapper>
  <LocalizationWrapper>
    <ErrorBoundaryWrapper>
      {form}
    </ErrorBoundaryWrapper>
  </LocalizationWrapper>
</ThemeWrapper>
```

## Examples

### Simple CSS Wrapper

```tsx
import type {FormViewerWrapper} from '@react-form-builder/core'

export const CssVariablesWrapper: FormViewerWrapper = ({children}) => {
  return (
    <div
      style={{
        '--primary-color': '#007bff',
        '--secondary-color': '#6c757d',
        height: '100%',
        width: '100%',
        padding: 25,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderColor: 'var(--primary-color)',
        boxShadow: '0 4px 30px var(--secondary-color)',
        outline: '1px solid rgba(255, 255, 255, 0.1)',
        outlineOffset: -5,
        color: '#fff',
      } as any}
    >
      {children}
    </div>
  )
}
```

### Live Example

```jsx live
function App() {
  const CssVariablesWrapper = ({children}) => {
    return (
      <div
        style={{
          '--primary-color': '#007bff',
          '--secondary-color': '#6c757d',
          height: '100%',
          width: '100%',
          padding: 25,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderColor: 'var(--primary-color)',
          boxShadow: '0 4px 30px var(--secondary-color)',
          outline: '1px solid rgba(255, 255, 255, 0.1)',
          outlineOffset: -5,
          color: '#fff',
        }}
      >
        {children}
      </div>
    )
  }

  const view = useMemo(() => {
    const result = createView([...muiView.all()])
    result.withViewerWrapper(CssVariablesWrapper)
    return result
  }, [])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField"
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Best Practices

1. **Keep Wrappers Focused**: Each wrapper should have a single responsibility (theme, localization, error handling, etc.).
2. **Performance**: Use `useMemo` or `React.memo` for expensive calculations in wrappers that might re-render frequently.
3. **Order Matters**: Add wrappers in the order they should be nested. Context-dependent wrappers (like theme) should be inside wrappers
   that might affect them.
4. **Height and Width**: Ensure your wrapper sets `height: '100%'` and `width: '100%'` to properly contain the form.
5. **Type Safety**: Always import and use the `FormViewerWrapper` type for better TypeScript support.
6. **Language Awareness**: Use the `language` prop to adjust RTL/LTR layouts or apply locale-specific settings.

## Common Use Cases

### Theme Integration

Wrap your form with theme providers from popular UI libraries:

- Material UI `ThemeProvider`
- React Suite `CustomProvider`

### Localization

Apply locale settings for date pickers, number formatting, and text direction.

### Error Boundaries

Wrap forms with error boundaries to catch and handle rendering errors gracefully.

### Custom Styling

Apply global CSS variables, custom fonts, or brand-specific styling.

## Troubleshooting

### Wrapper Not Applied

- Ensure you call `withViewerWrapper` on the correct view instance
- Verify the wrapper component is properly exported and imported
- Check that the wrapper returns valid JSX with `children` rendered

### Styling Issues

- Ensure your wrapper sets `height: '100%'` and `width: '100%'`
- Check for CSS conflicts between nested wrappers
- Verify theme providers are properly configured

### Performance Problems

- Wrap expensive calculations in `useMemo`
- Avoid unnecessary re-renders with `React.memo`
- Keep wrapper logic minimal and focused

## Related Topics

- [Localization](../localization) - Learn about language and RTL/LTR support
- [Styling](../styling-components-and-forms) - Form styling options
