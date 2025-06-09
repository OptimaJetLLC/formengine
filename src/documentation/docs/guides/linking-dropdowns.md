---
sidebar_position: 100
title: Linking dropdown components
description: Describes how to link dropdown components.
slug: /linking-dropdowns
---

# Linking dropdown components

Linking components refers to establishing relationships between different components within your form via specific functions. Namely, you
can define an action that updates the value of one component based on the value of another component. Therefore, your form can feature more
complex workflows and provide better user experience.

The following guide showcases how to link two dropdown components using an `onChange` action. Once the value of the first dropdown list is
configured, the value of the second dropdown list will be updated automatically.

## Linking dropdown lists example

This example incorporates two dropdown components: _country_ and _city_. The __city__ dropdown component's options depend on the selected
value of the __country__ dropdown component. When the user selects a country, the options in the city dropdown should update accordingly:

```json
{
  "version": "1",
  "actions": {
    "onCountryChange": {
      "body": "  e.data.city = undefined",
      "params": {}
    }
  },
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "country",
        "type": "RsDropdown",
        "props": {
          "data": {
            "value": [
              {
                "value": "at",
                "label": "Austria"
              },
              {
                "value": "cn",
                "label": "China"
              },
              {
                "label": "Turkey",
                "value": "tr"
              },
              {
                "label": "USA",
                "value": "us"
              }
            ]
          },
          "label": {
            "value": "Country"
          },
          "creatable": {
            "value": true
          }
        },
        "events": {
          "onChange": [
            {
              "name": "onCountryChange",
              "type": "code"
            }
          ]
        }
      },
      {
        "key": "city",
        "type": "RsDropdown",
        "props": {
          "label": {
            "value": "City"
          },
          "data": {
            "value": [],
            "computeType": "function",
            "fnSource": "    const cities = {\n    'at': [\n      {label: 'Innsbruck', value: 'Innsbruck'},\n      {label: 'Salzburg', value: 'Salzburg'},\n      {label: 'Vienna', value: 'Vienna'},\n    ],\n    'cn': [\n      {label: 'Shanghai', value: 'Shanghai'},\n      {label: 'Beijing', value: 'Beijing'},\n      {label: 'Guangzhou', value: 'Guangzhou'},\n    ],\n    'tr': [\n      {label: 'Istanbul', value: 'Istanbul'},\n      {label: 'Antalya', value: 'Antalya'},\n      {label: 'Izmir', value: 'Izmir'},\n      {label: 'Ankara', value: 'Ankara'},\n    ],\n    'us': [\n      {label: 'New York', value: 'New York'},\n      {label: 'Los Angeles', value: 'Los Angeles'},\n      {label: 'Washington', value: 'Washington'},\n    ],\n  }\n\nconsole.log('recalc values for ', form.data.country, cities[form.data.country] ?? [])\n  return cities[form.data.country] ?? []"
          },
          "creatable": {
            "value": true
          }
        },
        "events": {
          "onLoadData": []
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

Two features of this form are noteworthy:

1. Upon changing the value in the dropdown list of countries, the `onCountryChange` action code is triggered.
2. The `Data` property, which represents the list of possible values for the **city** dropdown, is a computed field that assumes different
   values based on the value of the **country** field.

When the **country** dropdown value changes, the `onCountryChange` action is executed. Inside the action, the value of the `city` dropdown
is set to `undefined`. This ensures that the selected city is reset whenever the country changes. Here's the code:

```javascript title='onCountryChange' {6}
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  e.data.city = undefined
}
```

By attaching the `onCountryChange` action to the `onChange` event of the country dropdown, the action is automatically triggered whenever
the user selects a different country. This allows the `city` dropdown to be dynamically updated with the cities corresponding to the
selected country, creating a linked relationship between the two dropdowns.

When the value in **country** changes, the list of possible values in the **city** field is automatically recalculated. Here is the code of
the calculated field:

```javascript {31}
/**
 * @param {IFormData} form
 * @return {array}
 */
function Calculation(form) {
  const cities = {
    'at': [
      {label: 'Innsbruck', value: 'Innsbruck'},
      {label: 'Salzburg', value: 'Salzburg'},
      {label: 'Vienna', value: 'Vienna'},
    ],
    'cn': [
      {label: 'Shanghai', value: 'Shanghai'},
      {label: 'Beijing', value: 'Beijing'},
      {label: 'Guangzhou', value: 'Guangzhou'},
    ],
    'tr': [
      {label: 'Istanbul', value: 'Istanbul'},
      {label: 'Antalya', value: 'Antalya'},
      {label: 'Izmir', value: 'Izmir'},
      {label: 'Ankara', value: 'Ankara'},
    ],
    'us': [
      {label: 'New York', value: 'New York'},
      {label: 'Los Angeles', value: 'Los Angeles'},
      {label: 'Washington', value: 'Washington'},
    ],
  }

  console.log('recalc values for ', form.data.country, cities[form.data.country] ?? [])
  return cities[form.data.country] ?? []
}
```

By following this example, you can link your own dropdown components together and update the options of one dropdown based on the selection
of the other dropdown.
