---
description: Create React forms based on JSON Schema definitions. Learn how to validate the form configuration using the schema in your IDE.
sidebar_class_name: formengine-core-advanced
sidebar_label: JSON Schema
sidebar_position: 360
slug: /formengine-core/json-schema
title: JSON Schema - validate the form configuration using the schema
---

# JSON Schema - validate the form configuration using the schema

JSON Schema provides a powerful way to validate your form definitions and get intelligent editing support in your IDE. By creating a schema
for your component library, you can ensure your JSON forms are correctly structured and catch errors before runtime.

In this guide, you'll learn:

- What JSON Schema is and why it's useful for form development
- How to generate a schema for your component library
- How to integrate the schema with your development environment

## What is JSON Schema?

JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. For FormEngine, a JSON Schema describes the complete
structure of a form definition, including:

- Allowed component types and their properties
- Property value types (string, number, boolean, etc.)
- Required fields and validation rules
- Component hierarchies and nesting rules

With a JSON Schema, your code editor can provide:

- **Autocomplete** for component types and properties
- **Type checking** for property values
- **Error highlighting** for invalid structures
- **Documentation tooltips** for component properties

## Generating a JSON Schema

To generate a JSON Schema for your forms, you'll use the [createSchema][api-createschema] function from the
[@react-form-builder/json-schema-generator](https://www.npmjs.com/package/@react-form-builder/json-schema-generator) package. This function
analyzes your component library and creates a comprehensive schema.

### Basic Schema Generation

Here's the simplest way to generate a schema:

```typescript
import {createSchema} from '@react-form-builder/json-schema-generator'
import {components} from '@react-form-builder/components-material-ui'

function generateBasicSchema() {
  const schema = createSchema(components)
  return JSON.stringify(schema, undefined, 2)
}
```

This creates a schema with type information for all components but without human-readable descriptions.

### Schema with Component Descriptions

To include documentation in your schema, provide component descriptions:

```typescript
import {components, materialUiComponentsDescriptions} from '@react-form-builder/components-material-ui'
import {createSchema} from '@react-form-builder/json-schema-generator'

function generateSchemaWithDescriptions() {
  const descriptions = materialUiComponentsDescriptions['en-US']
  const schema = createSchema(components, [descriptions])
  return JSON.stringify(schema, undefined, 2)
}
```

The component descriptions provide human-readable documentation that appears in your IDE's tooltips.

### Custom Component Libraries

If you have a custom component library, generate a schema for it:

```typescript
import {createSchema} from '@react-form-builder/json-schema-generator'
import {myCustomComponents} from './my-components'
import {myComponentDescriptions} from './my-descriptions'

function generateCustomSchema() {
  const schema = createSchema(myCustomComponents, [myComponentDescriptions])
  return JSON.stringify(schema, undefined, 2)
}
```

## Using the Schema in Your Development Workflow

Once you have a JSON Schema, you can integrate it into your development environment.

### Saving the Schema to a File

Save the generated schema to a file that you can reference in your projects:

```typescript title='generate-schema.js'
import {components, materialUiComponentsDescriptions} from '@react-form-builder/components-material-ui'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {writeFileSync} from 'node:fs'

const descriptions = materialUiComponentsDescriptions['en-US']
const schema = createSchema(components, [descriptions])
writeFileSync('form-schema.json', JSON.stringify(schema, undefined, 2))
```

### Configuring Your IDE

Most modern IDEs support JSON Schema validation. Here's how to configure popular editors:

**VS Code** (Zed, WebStorm/IntelliJ IDEA also support this approach): Add a `$schema` reference to your form JSON files:

```json {2} title='my-form.json'
{
  "$schema": "./form-schema.json",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "name",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Name"
          }
        }
      }
    ]
  }
}
```

## Example: Basic Form with Schema Validation

This example shows a simple form that would be validated against a JSON Schema:

```json title='user-form.json' {2}
{
  "$schema": "./form-schema.json",
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email address"
          },
          "placeholder": {
            "value": "name@example.com"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "required"
            },
            {
              "key": "email"
            }
          ]
        }
      },
      {
        "key": "subscribe",
        "type": "MuiCheckbox",
        "props": {
          "label": {
            "value": "Subscribe to newsletter"
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

With the schema in place, your IDE will:

- Autocomplete component types like `MuiTextField` and `MuiCheckbox`
- Validate that `props.label` has a `value` property
- Check that validation keys like `required` and `email` are valid
- Ensure the form structure follows the correct hierarchy

## Schema Features and Capabilities

### Component Type Validation

The schema validates that component types exist in your library:

```json lines {6-7,14-15}
{
  "form": {
    "children": [
      {
        "key": "field1",
        // ✓ Valid
        "type": "MuiTextField",
        "props": {
          // ...
        }
      },
      {
        "key": "field2",
        // ✗ Schema error
        "type": "NonExistentComponent",
        "props": {
          // ...
        }
      }
    ]
  }
}
```

### Property Type Checking

Each component property is validated for correct type:

```json lines {7-10}
{
  "form": {
    "children": [
      {
        "type": "MuiCheckbox",
        "props": {
          "checked": {
            // ✗ Should be boolean
            "value": "not-a-boolean"
          }
        }
      }
    ]
  }
}
```

### Nested Structure Validation

Component hierarchies are validated:

```json {7-17}
{
  "form": {
    "children": [
      {
        "key": "container",
        "type": "MuiContainer",
        "children": [
          {
            "key": "field",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "Nested field"
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Summary

- **JSON Schema** provides validation and autocomplete for form definitions
- Generate schemas with `createSchema` from component libraries
- Include component descriptions for better IDE documentation
- Reference schemas with `$schema` property in JSON files

JSON Schema integration transforms form development from error-prone manual editing to a guided, validated experience. By catching errors
early and providing intelligent assistance, you can build forms faster and with higher confidence.

---

For more information:

- [Form JSON Structure](/formengine-core/forms-json) - Learn about the JSON format for forms
- [Custom Components](/formengine-core/custom-components) - Create your own components

[api-createschema]: /api-reference/@react-form-builder/json-schema-generator/functions/createSchema
