---
sidebar_position: 70
title: Dynamic dropdown population
description: How to fill dropdown dynamically.
slug: /dynamic-dropdown-population
---

# Dynamic dropdown population

## Introduction

Dynamic dropdown population refers to the process of loading data into
a [dropdown component](/components-library/fields-components/dropdown) at runtime, based on certain conditions or user interaction. Namely,
it allows you to load dropdown options on demand, rather than preloading a fixed set of options. This approach can be particularly useful
when working with large datasets or when the options need to be filtered based on user input. By loading options dynamically, you can
improve the performance and responsiveness of your application, while also providing a more seamless user experience.

## Example of dynamic dropdown population

The following example showcases how to dynamically populate a dropdown component with a list of names. Instead of manually maintaining a
static list of names, the dropdown is designed to fetch the names from an external API endpoint:

```json
{
  "version": "1",
  "actions": {
    "loadData": {
      "body": "    const [searchValue, loadCallback, currentDataLength] = e.args\n\n    fetch ('https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json')\n        .then (data => data.json())\n        .then (data => {\n            const preparedData = data\n                .filter(value => value.toLowerCase().includes(searchValue.toLowerCase()))\n                .slice(currentDataLength, currentDataLength + 20)\n                .map(value => ({value, label: value}))\n\n            loadCallback(preparedData)        \n        })",
      "params": {}
    }
  },
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "screen 1",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsDropdown",
        "props": {
          "data": {
            "value": []
          },
          "label": {
            "value": "Name"
          }
        },
        "events": {
          "onLoadData": [
            {
              "name": "loadData",
              "type": "code"
            }
          ]
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

To dynamically load data into dropdown, the `onLoadData` event is used, to which the `loadData` handler is bound.

![Dynamic dropdown population](/assets/guides/dynamic-dropdown-population/dynamic-dropdown-population-01.png "Dynamic dropdown population")

The handler code is quite simple, pay attention to the `loadCallback` method call - this method allows you to transfer data to dropdown. The
handler code is shown below:

```javascript {8,16}
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  const [searchValue, loadCallback, currentDataLength] = e.args

  fetch('https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json')
    .then(data => data.json())
    .then(data => {
      const preparedData = data
        .filter(value => value.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(currentDataLength, currentDataLength + 20)
        .map(value => ({value, label: value}))

      loadCallback(preparedData)
    })
}
```

When the user interacts with the dropdown, the `loadData` action is triggered, which sends a request to a remote JSON file containing a list
of names. The fetched names are then dynamically displayed in the dropdown, allowing the user to easily select their desired name. The list
can also be filtered to include only names that match the user's input, and the resulting options are loaded into the dropdown.

By utilizing dynamic dropdown population, the form provides users with a seamless and efficient selection process. It eliminates the need
for manual maintenance of the dropdown options, as the form automatically fetches and updates the data in real-time.
