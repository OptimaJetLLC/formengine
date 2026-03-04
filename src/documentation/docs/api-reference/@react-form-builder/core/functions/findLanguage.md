# Function: findLanguage()

> **findLanguage**(`languages`, `language`): [`Language`](../classes/Language.md) \| `undefined`

Finds [Language](../classes/Language.md) by language code.

## Parameters

### languages

[`Language`](../classes/Language.md)[]

the array of languages to look in.

### language

`` `${string}-${string}` ``

the language code.

## Returns

[`Language`](../classes/Language.md) \| `undefined`

found [Language](../classes/Language.md), or the default Language if no Language exists for the language code.
