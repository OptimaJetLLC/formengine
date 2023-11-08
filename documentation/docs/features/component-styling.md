---
sidebar_position: 3
title: Component styling
slug: /component-styling
---

# Component styling

Styling of components in Form Builder is quite simple - you can customize styles for a component on the "Style" tab. The styles will be
compiled into a CSS class. The name of this CSS class will be passed to the component's rendering function as the `className` property.

## Styling a header component

Stylize the simple `Header` component on the demo page. Open a browser at [demo.formengine.io](https://demo.formengine.io/). Select
the `Subheader` component and click on the "Style" tab as in the screenshot below:

![Component styling 06](/assets/component-styling/component-styling-06.png)

Now select the "Center" value in the "Alignment" property. In the style code editor, copy the value of the **selected** lines:

```scss
element.style {
  // highlight-start
  font-size: 64px;
  padding: 20px;
  color: rgba(0, 3, 4, 0.596);
  background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)
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

Form Builder provides a style editing interface on the "Style" tab. In the "For device" drop-down menu, you can select the device for which
the styles will be applied. The device is determined by the width of the window:

1. **Any** - these styles are applied to all devices, regardless of window width.
2. **Desktop** - for desktop devices with a window width greater than 900 pixels.
3. **Mobile** - for mobile devices where the window width is less than or equal to 600 pixels.
4. **Tablet** - for tablet devices where the window width is less than or equal to 900 pixels.

Below the "For device" drop-down menu, there are elements for setting a number of typical CSS properties. Below that is the CSS code
editor, where you can enter arbitrary CSS properties.

Let's take a look at how this works. To demonstrate, we'll set the following style parameters:

1. For **Any** devices, let's set the height to 200 pixels and "background-color" to "aqua".
2. For **Mobile** type devices, we'll set the "background-color" to "bisque".
3. For **Tabled** devices, set "background-color" to "chartreuse".

You can simply copy and paste the form JSON into the JSON form editor. Click the **&lt;/&gt;** button, then paste the code below and close
the "Edit JSON" window.

```json
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "StyledDiv 1",
        "type": "StyledDiv",
        "props": {},
        "wrapperCss": {
          "any": {
            "object": {
              "height": "200px"
            },
            "string": "  background-color: aqua;"
          },
          "mobile": {
            "string": "  background-color: bisque;"
          },
          "tablet": {
            "string": "  background-color: chartreuse;"
          }
        }
      }
    ]
  },
  "localization": {},
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

![Component styling 02](/assets/component-styling/component-styling-02.png)

You can now use the device change buttons to view the form in different for different devices. This is how the form will look on the Desktop
device:

![Component styling 03](/assets/component-styling/component-styling-03.png)

Mobile device:

![Component styling 04](/assets/component-styling/component-styling-04.png)

Tablet device:

![Component styling 05](/assets/component-styling/component-styling-05.png)

### Custom style properties

You can also bind CSS properties using the [css](/api-reference/classes/react_form_builder_core.Definer#css) annotation. Take a look at the
code below:

```tsx title='StyledDiv.tsx'
import {define, oneOf, size} from '@react-form-builder/core'
import type {ReactNode} from 'react'

//...

export const styledDiv = define(StyledDiv, 'StyledDiv')
  .name('StyledDiv')
  // highlight-start
  .css({
    gap: size.default('10px'),
    alignItems: oneOf('start', 'center', 'baseline', 'end', 'stretch'),
    justifyContent: oneOf('flex-start', 'flex-end', 'center', 'space-between', 'space-around',
      'space-evenly', 'start', 'end', 'left', 'right'),
    flexWrap: oneOf('wrap', 'nowrap', 'wrap-reverse'),
  })
// highlight-end
```

Use the [css](/api-reference/classes/react_form_builder_core.Definer#css) annotation to describe the CSS styles of the component for the
designer. After description is added - the style editors will appear on the "Style" tab:

![Component styling 08](/assets/component-styling/component-styling-08.png)
