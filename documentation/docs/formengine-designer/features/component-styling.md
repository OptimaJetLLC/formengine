---
sidebar_position: 3
title: Component styling
slug: /formengine-designer/features/component-styling
description: Styling of components in Form Builder is quite simple, you can customize styles for a component on the "Style" tab
---

:::info For form authors

Change fonts, colors, and spacing on the **Style** tab for each selected component.

[Full guide →](designer-guide:appearance-and-readability/style-tab-basics/)
:::

## Component styling

## Overview

Styling of components in Form Builder is quite simple - you can customize styles for a component on the "Style" tab. The styles will be
compiled into a CSS class. The name of this CSS class will be passed to the component's rendering function as the `className` property.
Also, you can to set different styles for [different layouts](/formengine-core/adaptive-layout).

![Component styling 10](/assets/component-styling/component-styling-10.png)

### Structure

Each component (except Containers) in the form is placed in an outer wrapper, a tooltip and a wrapper for displaying errors during
rendering. This is what the nesting structure of a regular component looks like:

```tsx
<Wrapper className="wrapperCss">
  <Tooltip>
    <ErrorWrapper>
      <Component className="componentCss"/>
    </ErrorWrapper>
  </Tooltip>
</Wrapper>
```

Styles specific to different HTML elements (for
example `font-size` for the `Label` component or `fit` for the `Image` component) are applied directly to it. These properties can be edited
on the `Style` tab, under the `Component` heading.

The sizing, padding, positioning and other
styles inherent in all components are applied to the outer wrapper of the component. They are located under the `Wrapper` heading.

You can also enter the CSS code for the component or wrapper into the editor at the bottom. There you can use all CSS properties such
selectors, pseudo-classes, etc.

![Component styling 09](/assets/component-styling/component-styling-09.png)

![Component styling 11](/assets/component-styling/component-styling-11.png)

The `Container` components has no outer wrappers, and all styles are attached to it:

```tsx
<Container className="css">
  {children}
</Container>
```

## Styling a header component

Stylize the simple `Header` component on the demo page. Open a browser at [demo.formengine.io](https://demo.formengine.io/). Select
the `Subheader` component and click on the "Style" tab as in the screenshot below:

![Component styling 06](/assets/component-styling/component-styling-06.png)

Now select the "Center" value in the "Alignment" property. In the Component style code editor, copy the value of the **selected** lines:

```css
element.style {
  // highlight-start
  font-size: 48px;
  padding: 20px;
  color: rgba(0, 3, 4, 0.596);
  background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
  // highlight-end
}
```

As a result, the component will be styled roughly as in the screenshot:

![Component styling 07](/assets/component-styling/component-styling-07.png)

Now let's look at how styling works for custom components.

## Styling a simple component

First, let's make a simple component that will render `div`:

```tsx title='StyledDiv.tsx'
import {define} from '@react-form-builder/core'
import type {ReactNode} from 'react'

export interface StyledDivProps {
  children?: ReactNode
  // highlight-next-line
  className?: string
}

export const StyledDiv = (props: StyledDivProps) => {
  return <div
    // highlight-next-line  
    className={props.className}
    // highlight-next-line
    style={{flex: 1}}
  >{props.children}</div>
}

export const styledDiv = define(StyledDiv, 'StyledDiv')
  .name('StyledDiv')
```

In the properties of the `StyledDivProps` component, the `className` property is defined, which is responsible for the name of the CSS
class. In the component's rendering function, the `className` property was passed to `div`. It's simple.

Let's add a component to the application. For simplicity, we will have a designer with only one component:

```tsx title='App.tsx'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {styledDiv} from './StyledDiv.tsx'

const builderView = new BuilderView([styledDiv.build()])

export const App = () => {
  return <FormBuilder view={builderView}/>
}

export default App
```

Open your application and add the `StyledDiv` component to the form. Then switch to the "Styled" tab in the right pane. You should see
something like this:

![Component styling 01](/assets/component-styling/component-styling-01.png)

### Custom style properties

You can also bind CSS properties using the [css](/api-reference/@react-form-builder/core/interfaces/Definer#css) annotation. Take a look at
the code below:

```tsx title='StyledDiv.tsx'
import {define, oneOf, size} from '@react-form-builder/core'
import type {ReactNode} from 'react'

//...

export const styledDiv = define(StyledDiv, 'StyledDiv')
  .name('StyledDiv')
  // highlight-start
  .css({
    borderStyle: oneOf('solid', 'dashed', 'dotted', 'double', 'center', 'groove').default('solid'),
    borderWidth: size.default('1px'),
    borderRadius: number.default(0),
    borderColor: color.default('black'),
    textAlign: oneOf('start', 'end', 'left', 'right', 'center', 'justify')
  })
// highlight-end
```

Use the [css](/api-reference/@react-form-builder/core/interfaces/Definer#css) annotation to describe the CSS styles of the component for the
designer. After description is added - the style editors will appear on the "Style" tab:

![Component styling 08](/assets/component-styling/component-styling-08.png)

## Passing styles to the style attribute

In some rare cases, you may need to pass CSS styles to the `style` property of a component. For example, a base component does not support
the `className` property, but can accept styles via the `style` property. Or perhaps you want to pass some styles via the `className`
property and some via the `style` property.

By default, the editor for the `style` property is hidden, while the editor for the `className` property is displayed. You can change the
display of these editors using
the [showInlineStylesEditor](/api-reference/@react-form-builder/core/interfaces/Definer#showinlinestyleseditor)
and [showClassNameStylesEditor](/api-reference/@react-form-builder/core/interfaces/Definer#showclassnamestyleseditor) methods, respectively.

```typescript jsx title='Component example' {14,15}
import {define, string} from '@react-form-builder/core'
import type {ButtonProps} from 'rsuite'
import {Button} from 'rsuite'

export const MyButton = (props: ButtonProps) => {
  return <Button {...props}/>
}

export const myButton = define(MyButton, 'MyButton')
  .name('My button')
  .props({
    children: string.required.named('Content').default('Button'),
  })
  .showClassNameStylesEditor(false)
  .showInlineStylesEditor(true)
```

Styles will be compiled from CSS into `CSSProperties` and passed to the component's `style` property.

![Component styled with the style property](/assets/component-styling/component-styling-12.png "Component styled with the style property")
