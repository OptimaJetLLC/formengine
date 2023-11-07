---
sidebar_position: 9
title: Form's JSON
slug: /forms-json
---

# Form's JSON

Each form created in the form designer is JSON. With the designer, you can export a form to JSON, and you can import a form from JSON.

Let's take for example the form from the article [Getting started](/getting-started).

## Export form to JSON

To export a JSON form, go to the designer interface and click the blue menu button and select "Download".

![Form's JSON 01](/assets/forms-json/forms-json-01.png)

The form will be saved to a file with the extension `.json`.

## Import form from JSON

To import a form in JSON format, select the blue menu button in the designer, and then select "Upload".

![Form's JSON 02](/assets/forms-json/forms-json-02.png)

## Embedded JSON form editor

You can also edit the form data in JSON directly in the form designer. To do this, you need to click the "Edit JSON" button, as in the
screenshot below.

![img.png](/assets/forms-json/forms-json-03.png)

This opens the built-in JSON form code editor. After you close the form by clicking the close button in the top right corner of the screen,
the JSON with the form code will be applied in the form designer.

![img_1.png](/assets/forms-json/forms-json-04.png)

## JSON form description

Let's take a look at what a JSON form is, below is an example:

```json
{
  "version": "1",
  "actions": {
    "logValue": {
      "body": "  console.log('Name', e.data.name)",
      "params": {}
    }
  },
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Name"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "required"
            },
            {
              "key": "min",
              "args": {
                "limit": 3
              }
            }
          ]
        }
      },
      {
        "key": "RsButton 1",
        "type": "RsButton",
        "props": {
          "children": {
            "value": "Submit"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "validate",
              "type": "common"
            },
            {
              "name": "logValue",
              "type": "code"
            }
          ]
        },
        "tooltipProps": {
          "text": {
            "value": "Hello, world!"
          },
          "trigger": {
            "value": [
              "hover",
              "focus"
            ]
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

The form is represented by the [PersistedForm](/api-reference/interfaces/react_form_builder_core.PersistedForm) type. Let's take a closer
look at the parts of this JSON.

### Version

This is the version of the form saved in JSON format. The list of possible versions is listed
in [PersistedFormVersion](/api-reference/enums/react_form_builder_core.PersistedFormVersion).

```json
{
  "version": "1",
  ...
}
```

### Actions

A list of actions is simply a Record, the key in that Record is the name of the action, the value is the function body and function
parameters.

```json
{
  "actions": {
    "logValue": {
      "body": "  console.log('Name', e.data.name)",
      "params": {}
    }
  },
  ...
}
```

### Types of error and tooltip components

- `tooltipType` - the name of the component type (usually the displayName of the React component) that displays the tooltip.
- `errorType` - the name of the component type (usually the displayName of the React component) that displays the error.

```json
{
  ...
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  ...
}
```

### Form

This describes the form itself, which is represented by a component tree, see
the [ComponentStore](/api-reference/classes/react_form_builder_core.ComponentStore) type for more details. form is the root element of the
component tree.

```json
{
  ...,
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Name"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "required"
            },
            {
              "key": "min",
              "args": {
                "limit": 3
              }
            }
          ]
        }
      },
      {
        "key": "RsButton 1",
        "type": "RsButton",
        "props": {
          "children": {
            "value": "Submit"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "validate",
              "type": "common"
            },
            {
              "name": "logValue",
              "type": "code"
            }
          ]
        },
        "tooltipProps": {
          "text": {
            "value": "Hello, world!"
          },
          "trigger": {
            "value": [
              "hover",
              "focus"
            ]
          }
        }
      }
    ]
  },
  ...
}
```

### Localization

The next set of data relates to localization.

- `localization` - a form localization data (see [LocalizationValue](/api-reference/modules/react_form_builder_core#localizationvalue)).
  The [Fluent](https://projectfluent.org/) language is used for localization.
- `languages` - an array of languages that the form supports. The language is described by
  the [Language](/api-reference/classes/react_form_builder_core.Language) type.
- `defaultLanguage` - the default form language, e.g. 'en-US'.

```json
{
  ...
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
