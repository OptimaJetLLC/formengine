---
sidebar_position: 140
title: Google Maps address autocomplete
description: Guide to setting up Google Maps with autocomplete functionality.
slug: /enabling-google-maps-autocomplete
---

# Google Maps address autocomplete

## Introduction

This guide explains how to set up [Google Maps](/components-library/fields-components/google-map) with autocomplete functionality for
address fields.

### Set up the Google Maps component with Autocomplete

- In your form definition, add a `GoogleMap` component to display the map.
- Fill the `API key` property with your Google Maps API key.
- Enable the `Show Map Control` property to show map control options.

![MapProperties](/assets/guides/maps-with-address-autocomplete/map-properties.png)

### Add required input fields for address details

After creating the `GoogleMap` component, add only the necessary `Input` components for each part of the address that you need, such as
_Address_, _City_, _Country_, _ZIP_, and _State_.

![AddressInputs](/assets/guides/maps-with-address-autocomplete/map-address-inputs.png)

### Define an action to populate the address fields

- Select the map component in Designer.
- Go to the _Actions_ tab.
- Create a new [code action](/actions) for the `onPlaceSelect` event.
- Choose the newly created action to handle address population.

![MapOnPlaceSelectAction](/assets/guides/maps-with-address-autocomplete/map-on-place-select-action.png)

Here's the sample action code where we fill in the form data to populate the address input fields:

```javascript
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  console.log(e);
  const addr = e.args[1];
  if (!addr) return;
  e.data.address = addr.address;
  e.data.city = addr.city;
  e.data.country = addr.country;
  e.data.postalCode = addr.postalCode;
  e.data.state = addr.state;
}
```

This action listens to the `onPlaceSelect` event from the `GoogleMap` component and updates the fields with the relevant address details.

Now, as you enter an address in the Google Maps search bar and make a selection, the input fields automatically populate with the correct
values for each part of the address.

### Map JSON form example

```json {3-7,18-20,33-35,53-58} title='MapForm.json' showLineNumbers
{
  "version": "1",
  "actions": {
    "fillAddress": {
      "body": "  console.log(e)\n  const addr = e.args[1]\n  if (!addr) return\n  e.data.address = addr.address\n  e.data.city = addr.city\n  e.data.country = addr.country\n  e.data.postalCode = addr.postalCode\n  e.data.state = addr.state",
      "params": {}
    }
  },
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "googleMap",
        "type": "GoogleMap",
        "props": {
          "apiKey": {
            "value": "Your Google Map Api Key"
          },
          "mapId": {
            "value": "DEMO_MAP_ID"
          },
          "addMarkerOnSearch": {
            "value": true
          },
          "allowChangingMarkers": {
            "value": true
          },
          "allowMultipleMarkers": {
            "value": true
          },
          "showMapControl": {
            "value": true
          },
          "gestureHandling": {
            "value": "none"
          },
          "language": {
            "value": "En"
          },
          "region": {
            "value": "En"
          },
          "colorScheme": {
            "value": "LIGHT"
          },
          "mapTypeId": {
            "value": "roadmap"
          }
        },
        "events": {
          "onPlaceSelect": [
            {
              "name": "fillAddress",
              "type": "code"
            }
          ]
        }
      },
      {
        "key": "rsContainer1",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "address",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Address"
              }
            }
          },
          {
            "key": "city",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "City"
              }
            }
          },
          {
            "key": "country",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Country"
              }
            }
          },
          {
            "key": "postalCode",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "ZIP"
              }
            }
          },
          {
            "key": "state",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "State"
              }
            }
          }
        ]
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
  
