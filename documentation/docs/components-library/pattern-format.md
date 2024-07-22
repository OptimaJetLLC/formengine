---
sidebar_position: 30
title: Pattern format
description: Pattern format is used for formatting and displaying numbers and numeric values according to your specified pattern
slug: /components-library/pattern-format
---

import StyleBlock from './\_style-props.mdx';
import AdditionalOptions from './\_additional-options.mdx';

## Introduction

[Pattern format](https://www.npmjs.com/package/react-number-format) represents a component that is used for formatting and displaying
numbers and numeric values according to your specified pattern. This component is a part
of [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite).

Pattern format is used to format numeric values, such as phone numbers, credit card numbers, or other types of numeric data. It takes a
provided value as input and returns a formatted string that matches your provided configuration.

By leveraging provided options and properties, you can create a customized format component that meets your specific use case and enhances
your form.

## Main properties

The properties located within the _Main_ tab. These allow you to provide general
format configuration:

| Name                   | Type      | Description                                                                                                                                                                                                                                                                                                                                  |
|:-----------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Label                  | `string`  | Provide a name for your input field                                                                                                                                                                                                                                                                                                          |
| Value                  | `string`  | Enter default value for the input field                                                                                                                                                                                                                                                                                                      |
| Placeholder            | `string`  | Specify placeholder for the input field. Will not visible if a _Value_ is provided                                                                                                                                                                                                                                                           |
| Size                   | `choice`  | Select the component size from extra small to large                                                                                                                                                                                                                                                                                          |
| Disabled               | `boolean` | Disables the component                                                                                                                                                                                                                                                                                                                       |
| Read Only              | `boolean` | Makes the component read-only                                                                                                                                                                                                                                                                                                                |
| Format                 | `string`  | Defines the format pattern using the # (or a _Pattern char_ ) character. `#` is the placeholder character for numbers                                                                                                                                                                                                                        |
| Mask                   | `string`  | Use this to specify a mask character for each numeric position. The mask character will be displayed until a numeric character is entered. You can use different mask characters for each position by providing an array of mask characters. **Important**: Make sure the number of mask characters matches the number of pattern characters |
| Pattern char           | `string`  | Helps define the format pattern character; i.e., replace `#`                                                                                                                                                                                                                                                                                 |
| Allow empty formatting | `boolean` | By default, PatternFormat component does not apply formatting when value is empty (`null`, `undefined` or empty string). If you want to apply formatting on empty values, set this to true                                                                                                                                                   |

<AdditionalOptions/>

## Style properties

<StyleBlock/>
