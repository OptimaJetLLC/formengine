---
sidebar_position: 50
---

# Custom Tooltip Components

Tooltip components provide contextual help and information to users when they interact with form elements. In FormEngine Core, you can
create custom tooltip components that integrate seamlessly with any UI library while maintaining consistent behavior across your forms.

## What Are Tooltip Components?

Tooltip components in FormEngine are special-purpose components that:

- Display contextual information on hover or focus
- Can be attached to any form field
- Follow consistent placement and styling patterns
- Support internationalization and localization

## The componentRole('tooltip') Feature

The key to creating tooltip components in FormEngine is
the [componentRole](/api-reference/@react-form-builder/core/interfaces/Definer#componentrole)('tooltip') feature. This tells FormEngine that
a component should be treated as a tooltip, enabling special handling:

- Integration with form field tooltip properties
- Proper positioning relative to target elements

```typescript
import {define} from '@react-form-builder/core'

export const myTooltip = define(MyTooltipComponent, 'MyTooltip')
  .props({
    // Tooltip properties here
  })
  .componentRole('tooltip') // ← This is crucial!
  .build()
```

## Integration examples

### Ant Design Tooltip Component

[Ant Design](https://ant.design/components/tooltip/) provides a sophisticated tooltip component with rich features. Here's how to integrate
it with FormEngine:

#### Installation

```bash
npm install antd
```

#### Component Implementation

```tsx
import type {WrapperProps} from '@react-form-builder/core'
import {define, node, oneOf, someOf, string} from '@react-form-builder/core'
import {Tooltip} from 'antd'

type ActionType = 'hover' | 'focus' | 'click' | 'contextMenu'
type TooltipPlacement =
  'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

interface AntTooltipProps extends WrapperProps {
  text: string
  placement: TooltipPlacement
  trigger?: ActionType | ActionType[]
}

const tooltipStyle = {width: '100%', height: '100%'}

const AntTooltip = ({text, placement, trigger, children, ...props}: AntTooltipProps) => {
  if (!children) return null

  return <Tooltip placement={placement} trigger={trigger} title={text}>
    <div style={tooltipStyle} {...props}>{children}</div>
  </Tooltip>
}

export const antTooltip = define(AntTooltip, 'AntTooltip')
  .props({
    text: string.default('Tooltip message...').dataBound,
    children: node,
    placement: oneOf('top'
      , 'left'
      , 'right'
      , 'bottom'
      , 'topLeft'
      , 'topRight'
      , 'bottomLeft'
      , 'bottomRight'
      , 'leftTop'
      , 'leftBottom'
      , 'rightTop'
      , 'rightBottom')
      .default('bottom'),
    trigger: someOf('hover', 'focus', 'click', 'contextMenu')
      .default(['hover'])
  })
  .componentRole('tooltip')
  .build()
```

### Material UI (MUI) Tooltip Component

[Material-UI](https://mui.com/material-ui/react-tooltip/) provides Material Design-styled tooltips with excellent accessibility support.

#### Installation

```bash
npm install @mui/material @emotion/react @emotion/styled
```

#### Component Implementation

```tsx
import {Tooltip} from '@mui/material'
import {boolean, define, node, number, string} from '@react-form-builder/core'

export const muiTooltip = define(Tooltip, 'MuiTooltip')
  .kind('container')
  .props({
    arrow: boolean,
    children: node,
    disableFocusListener: boolean,
    disableInteractive: boolean,
    disableHoverListener: boolean,
    disableTouchListener: boolean,
    followCursor: boolean,
    enterDelay: number,
    leaveDelay: number,
    title: string.default('Tooltip message...').dataBound,
  })
  .componentRole('tooltip')
  .build()
```

## Integrating Tooltip Components with Your View

Once you've created your tooltip component, you need to add it to your view configuration:

```typescript
import {view as baseView} from './myView';
import {antdTooltip} from '../components/custom/antdTooltipComponent.ts'
import {muiTooltip} from '../components/custom/muiTooltipComponent.ts'

// Create or extend your view
export const customView = baseView

// Add tooltip components to the view
customView.define(antdTooltip.model)
customView.define(muiTooltip.model)
```

## Common Issues and Solutions

### Tooltip Not Showing

**Problem:** Tooltip doesn't appear when hovering over field.

**Solution:**

- Check that `componentRole('tooltip')` is set
- Verify the tooltip component is added to the view
- Ensure tooltip props are correctly configured in JSON

### Wrong Tooltip Placement

**Problem:** Tooltip appears in wrong position.

**Solution:**

- Check placement prop values match UI library expectations
- Ensure there's enough space for tooltip display
- Consider using `autoPlacement` if supported by library

## Conclusion

Custom tooltip components in FormEngine Core provide powerful, flexible ways to enhance user experience across different UI libraries. By
following the patterns outlined in this guide, you can:

1. Create tooltip components for any UI library (Ant Design, MUI, etc.)
2. Integrate tooltips seamlessly with form fields

Remember the key steps:

- Use `.componentRole('tooltip')` to register tooltip components
- Add tooltip components to your view configuration

With these techniques, you can create rich forms that provide users with helpful context exactly when they need it.

## Next Steps

- Explore [FormEngine Core Tooltip API](/formengine-core/tooltip) for built-in tooltip features
- Learn about [custom modal components](/formengine-core/custom-components/custom-modal-component) for more complex overlays
