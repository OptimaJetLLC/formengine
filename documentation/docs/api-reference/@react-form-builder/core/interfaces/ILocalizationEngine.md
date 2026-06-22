# Interface: ILocalizationEngine

The form localization engine.

## Properties

### language

> **language**: `` `${string}-${string}` ``

The current language.

***

### testLocalization()?

> `optional` **testLocalization**: (`localization`, `localizationStringId`, `language`, `formData`) => [`LocalizationError`](LocalizationError.md)[] \| `string`

Tests localization by formatting a message with given data.

#### Parameters

##### localization

`string`

the localization string to test.

##### localizationStringId

`string`

the ID of the localization string.

##### language

[`Language`](../classes/Language.md)

the language for the test.

##### formData

[`IFormData`](IFormData.md)

the data to use for variable substitution.

#### Returns

[`LocalizationError`](LocalizationError.md)[] \| `string`

the array of errors or the formatted result string.

## Methods

### addMessages()

> **addMessages**(`locale`, `messages`): [`LocalizationError`](LocalizationError.md)[]

Adds messages to the localization engine.

#### Parameters

##### locale

`string`

the locale for the messages.

##### messages

`Record`\<`string`, `unknown`\>

the messages to add.

#### Returns

[`LocalizationError`](LocalizationError.md)[]

the array of any localization errors that occurred.

***

### getCompatibleId()

> **getCompatibleId**(`rawId`): `string`

Gets a compatible ID for localization engine.

#### Parameters

##### rawId

`string`

the raw ID to make compatible.

#### Returns

`string`

the compatible ID.

***

### localizeErrorMessage()

> **localizeErrorMessage**(`form`, `formData`, `language`, `componentStore`, `ruleKey`): `string` \| `undefined`

Localizes error messages for validation rules.

#### Parameters

##### form

[`IForm`](IForm.md)

the form containing localization data.

##### formData

[`IFormData`](IFormData.md)

the form data for variable substitution.

##### language

[`Language`](../classes/Language.md)

the target language for localization.

##### componentStore

[`ComponentStore`](../classes/ComponentStore.md)

the component store to localize.

##### ruleKey

`string`

the validation rule key.

#### Returns

`string` \| `undefined`

the localized error message or undefined.

***

### localizeProperties()

> **localizeProperties**(`form`, `formData`, `language`, `componentStore`, `type?`): `Record`\<`string`, `any`\>

Localizes properties for a component.

#### Parameters

##### form

[`IForm`](IForm.md)

the form containing localization data.

##### formData

[`IFormData`](IFormData.md)

the form data for variable substitution.

##### language

[`Language`](../classes/Language.md)

the target language for localization.

##### componentStore

[`ComponentStore`](../classes/ComponentStore.md)

the component store to localize.

##### type?

`string`

the type of localization (default: 'component').

#### Returns

`Record`\<`string`, `any`\>

the object with localized property values.
