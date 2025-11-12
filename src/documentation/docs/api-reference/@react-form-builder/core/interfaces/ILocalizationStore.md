# Interface: ILocalizationStore

Localization of the form.

## Methods

### getItems()

> **getItems**(`languageFullCode`): `null` \| `Record`\<`string`, `string`\>

Returns all localization items provided by engine.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.).

#### Returns

`null` \| `Record`\<`string`, `string`\>

all localization items.
