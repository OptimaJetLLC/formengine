---
sidebar_position: 7
title: Localization
slug: /formengine-designer/features/localization
---

# Localization

## Overview

Some component properties can be localized. In order for a component property to be localizable, the following conditions must be met - the
property must be of type [string](/api-reference/@react-form-builder/core/variables/string) and
the [notLocalize](/api-reference/@react-form-builder/core/classes/BaseBuilder#notlocalize) method has not been called for this property.

Here is an example of a component where the `name` property is localized, but the `value` property is not:

```typescript jsx title='MyComponent.tsx'
import {define, string} from '@react-form-builder/core'

interface MyComponentProps {
  name: string
  value: string
}

const MyComponent = (props: MyComponentProps) => {
  return <span>
    {props.name}: {props.value}
  </span>
}

export const myComponent = define(MyComponent)
  .name('MyComponent')
  .type('MyComponent')
  .props({
    name: string,
    value: string.notLocalize
  })
```

## Example of localization

The form builder uses the [Fluent](https://projectfluent.org/) library to localize component properties. We recommend that you follow this
link and familiarize yourself with the capabilities of this library.

For the example, we will create a form to display the data as in the example on the Fluent website. The form will have a field for entering
the username, fields for entering the number of photos and selecting the gender. At the bottom of the form there will be two static fields
to display localized data.

You can simply copy the JSON below and upload it to the public [demo](https://demo.formengine.io/).

```json {9,18,27,58-61,68-71,80,85,92,99,127} showLineNumbers
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "userName",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "User name"
          }
        }
      },
      {
        "key": "photoCount",
        "type": "RsNumberFormat",
        "props": {
          "label": {
            "value": "Photo count"
          }
        }
      },
      {
        "key": "userGender",
        "type": "RsRadioGroup",
        "props": {
          "name": {
            "value": "Gender"
          },
          "label": {
            "value": "Gender"
          },
          "items": {
            "value": [
              {
                "value": "male",
                "label": "Male"
              },
              {
                "value": "female",
                "label": "Female"
              },
              {
                "value": "unspecified",
                "label": "Unspecified"
              }
            ]
          }
        }
      },
      {
        "key": "RsStaticContent 1",
        "type": "RsStaticContent",
        "props": {
          "content": {
            "value": "Greetings",
            "computeType": "localization"
          }
        }
      },
      {
        "key": "RsStaticContent 2",
        "type": "RsStaticContent",
        "props": {
          "content": {
            "value": "shared photos",
            "computeType": "localization"
          }
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "RsStaticContent_1": {
        "component": {
          "content": "Hello, {$userName}!"
        }
      },
      "RsStaticContent_2": {
        "component": {
          "content": "{$userName} {$photoCount ->\n        [one] added a new photo\n       *[other] added {$photoCount} new photos\n    } to {$userGender ->\n        [male] his stream\n        [female] her stream\n       *[other] their stream\n    }."
        }
      }
    },
    "de-DE": {
      "RsStaticContent_1": {
        "component": {
          "content": "Hallo, {$userName}!"
        }
      }
    },
    "fr-FR": {
      "RsStaticContent_1": {
        "component": {
          "content": "Bonjour, {$userName}!"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "de",
      "dialect": "DE",
      "name": "Deutsch",
      "description": "German",
      "bidi": "ltr"
    },
    {
      "code": "fr",
      "dialect": "FR",
      "name": "Français",
      "description": "French",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

Click on the "Preview" button to test the form. The form language switch is set to "English", which means that localization for English will
be applied. The default language for the form is also set to English, see line 127 in JSON.

![Localization 01](/assets/localization/localization-01.png)

Let's enter the data into the form. In the "User name" field enter the value "Mark", in the "Photo count" field set the value "3", and in
the "Gender" field select "Male".

As you enter data, you will see how the value in the text at the bottom of the form changes. After entering the data, you should get a form
like this:

![Localization 02](/assets/localization/localization-02.png)

Great, let's now switch the language to German in the language switcher on the toolbar. Notice that only the welcome text has changed. This
is because only the welcome text is translated into 3 languages - English, German and French (lines 80, 92, 99 in JSON respectively).

![Localization 03](/assets/localization/localization-03.png)

Switch the language of the form to French, and the welcome text will change as well.

![Localization 04](/assets/localization/localization-04.png)

You can also try switching the form language to other languages and see what happens. If there is no localization for some language - the
localization for the default language will work.

## Localization editing

Click the "Edit" button to return to editing the form. In the panel on the left you can switch to the "Settings" section, where the form
settings are located. In the "Language settings" section you can see the default language settings.

![Localization 05](/assets/localization/localization-05.png)

Now select the "RsStaticContent 2" component on the form. In the right pane you can see a blue globe icon next to the "Content" property -
this means that the property is defined using localization.

![Localization 06](/assets/localization/localization-06.png)

Click on the blue globe icon. And switch to English in the language switcher under the code editor. This language switch changes the
language for the localization editor. On the right is a panel with test form data, where you can change the data and check how this or that
localization will work.

![Localization 07](/assets/localization/localization-07.png)

Switch the language under the code editor to German and paste the text "Vielen Dank!" as in the screenshot below. On the right side you can
click the "Run" button to get the localization result. Or select the "Autorun" checkbox to have the localization result recalculated
automatically when the data changes. To save the data - click the "Save" button.

![Localization 08](/assets/localization/localization-08.png)

Also if you need to access data within nested objects, you can do so using dot notation. This method allows you to retrieve values at deeper
levels by specifying the full path.

![Localization 09](/assets/localization/localization-09.png)

Click the "Close" button to close the localization editor. Change the language of the form in the switch above, as on the screenshot - the
text will change to the one we just wrote.

![Localization 09](/assets/localization/localization-10.png)

## Custom localization

If you want to use your localization system, you can plug it in. To do this, you need to pass the localization function through
the [localize](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localize) property.
The [parameters](/api-reference/@react-form-builder/core/type-aliases/ComponentLocalizer) are passed to the function input:

- localization language.
- component settings.

Your function should return a `Record` with the localized values of the component's properties. If the function does not localize the
component properties, it should return an empty object. A simple example of a localization function:

```typescript
function localizer(componentStore: ComponentStore, language: Language): Record<string, any> {
  return componentStore.key === 'comment'
    ? {'placeholder': `${language?.fullCode || 'default language'}`}
    : {}
}
```

This function localizes only the `placeholder` property and only on a component with the `comment` key. The `placeholder` property is set to
the full code of the selected language. You can pass the current language through
the [language](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language) property.

## Additional localization functions

In addition to localization properties and functions mentioned above, there are several functions that allow you to customize specific
aspects of localization. For example, such functions can determine the direction of text, which is crucial for certain languages.

### withViewerWrapper

The [withViewerWrapper](/api-reference/@react-form-builder/core/classes/View#withviewerwrapper) allows you to add a
wrapper to the form viewer. This wrapper can be utilized to modify various localization properties and provide a customized experience
for different languages or locales. The wrapper component accepts properties of
type [FormViewerWrapperComponentProps](/api-reference/@react-form-builder/core/interfaces/FormViewerWrapperComponentProps). You can define
your own wrapper for your component library and pass it to the `withViewerWrapper` function.

One practical example of using the `withViewerWrapper` function is by implementing
the [RsLocalizationWrapper](/api-reference/@react-form-builder/components-rsuite/functions/RsLocalizationWrapper) for React Suite
components, i.e.:

```typescript
view.withViewerWrapper(RsLocalizationWrapper)
```

This wrapper allows you to configure localization settings for components. For example, this is how the `RsLocalizationWrapper` component
implementation looks like:

```tsx
export const RsLocalizationWrapper = ({language, children}: FormViewerWrapperComponentProps) => {
  return <CustomProvider rtl={language.bidi === 'rtl'}
                         locale={rSuiteLocales[language.fullCode] ?? defaultComponentsLocale}>
    {children}
  </CustomProvider>
}
```

Let's take a closer look at what this code does. The `RsLocalizationWrapper` function returns
the [CustomProvider](https://rsuitejs.com/components/custom-provider/#custom-provider) component, setting the `rtl` property to `true` if
the language has the [bidi](/api-reference/@react-form-builder/core/classes/Language#bidi) property set to `rtl`, and also sets the locale
for the components. The `children` are the child components to be wrapped.

You can write a similar wrapper if you use [MUI components](https://mui.com/material-ui/customization/right-to-left/), for example.

### withCssLoader

The [withCssLoader](/api-reference/@react-form-builder/core/classes/View#withcssloader) allows you to apply a CSS loader to the
component based on the BiDi (Bidirectional) layout. This enables you to load specific CSS styles based on the text direction and provides
flexibility in customizing the component's appearance.

Here are examples of how the withCssLoader function can be implemented:

```typescript
view
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)
```

The first loader, [ltrCssLoader](/api-reference/@react-form-builder/components-rsuite/functions/ltrCssLoader), provides a CSS loader for
left-to-right (LTR) text direction. This loader will be applied to the component when the text direction is LTR. Similarly, on the next line
is a CSS loader for right-to-left (RTL) text
direction, [rtlCssLoader](/api-reference/@react-form-builder/components-rsuite/functions/rtlCssLoader). This loader will be applied when the
text direction is RTL. Finally, the last line specifies a CSS loader named
[formEngineRsuiteCssLoader](/api-reference/@react-form-builder/components-rsuite/functions/formEngineRsuiteCssLoader), which is loaded
regardless of the text direction.

The following snippet showcases how the loaders can be implemented:

```typescript
/**
 * Represents a relationship attribute value used in HTML.
 */
export type Rel = 'stylesheet' | string

/**
 * Loads a resource into the document head asynchronously.
 * @param id the identifier of the resource.
 * @param href represents a URL to the resource.
 * @param rel the relationship of the resource to the document.
 * @returns the promise that resolves when the resource has been loaded successfully.
 */
export const loadResource = (id: string, href: string, rel: Rel) => {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById(id)) return resolve()

    const link = document.createElement('link')
    link.id = id
    link.rel = rel
    link.href = href
    link.onload = () => {
      resolve()
    }
    link.onerror = reject

    document.head.appendChild(link)
  })
}

/**
 * Unloads a resource from the DOM based on its ID.
 * @param id the ID of the resource to unload.
 */
export const unloadResource = (id: string) => {
  const link = document.getElementById(id)
  link?.parentNode?.removeChild(link)
}

export const ltrCssLoader = async () => {
  const href = (await import('../public/css/rsuite-no-reset.min.css?url')).default
  await loadResource(resourceIds[BiDi.LTR], href, 'stylesheet')
  unloadResource(resourceIds[BiDi.RTL])
}

export const rtlCssLoader = async () => {
  const href = (await import('../public/css/rsuite-no-reset-rtl.min.css?url')).default
  await loadResource(resourceIds[BiDi.RTL], href, 'stylesheet')
  unloadResource(resourceIds[BiDi.LTR])
}

export const formEngineRsuiteCssLoader = async () => {
  const href = (await import('../public/css/formengine-rsuite.css?url')).default
  await loadResource('form-engine-css', href, 'stylesheet')
}
```

In the example above, the `ltrCssLoader` function loads the Left-To-Right (LTR) CSS for the React Suite library. It imports the CSS file and
uses the `loadResource` function to load the CSS dynamically. Similarly, the `rtlCssLoader` function loads the Right-to-Left (RTL) CSS for
the React Suite library. It imports the RTL CSS file and uses the `loadResource` function to load it. The `formEngineRsuiteCssLoader`
function loads custom styles for the FormEngine over the React Suite library.

## Setting the form language

To set the language of the form, you can pass the current language through
the [language](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language) property:

```tsx
<FormViewer
  language={language}
  {...otherProps}
/>
```

## Conclusion

We have shown how localization of component properties works in Form Builder. Localization works the same way
as [computed properties](/formengine-designer/features/computed-properties) work, except that the Fluent language is used for localization.
We also showed that localization works reactively when data changes.
