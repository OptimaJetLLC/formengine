---
sidebar_position: 7
title: Localization
slug: /localization
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

Click the "Close" button to close the localization editor. Change the language of the form in the switch above, as on the screenshot - the
text will change to the one we just wrote.

![Localization 09](/assets/localization/localization-09.png)

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

## Conclusion

We have shown how localization of component properties works in Form Builder. Localization works the same way
as [computed properties](/computed-properties) work, except that the Fluent language is used for localization. We also showed that
localization works reactively when data changes.
