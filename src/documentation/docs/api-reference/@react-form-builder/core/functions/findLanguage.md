# Function: findLanguage()

> **findLanguage**(`languages`, `language`): `undefined` \| [`Language`](../classes/Language.md)

Finds [Language](../classes/Language.md) by language code.

## Parameters

### languages

[`Language`](../classes/Language.md)[]

the array of languages to look in.

### language

`` `${string}-${string}` ``

the language code.

## Returns

`undefined` \| [`Language`](../classes/Language.md)

found [Language](../classes/Language.md), or the default Language if no Language exists for the language code.
