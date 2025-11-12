# Class: FluentLocalizationEngine

Fluent.js implementation of [ILocalizationEngine](../interfaces/ILocalizationEngine.md).

## Implements

- [`ILocalizationEngine`](../interfaces/ILocalizationEngine.md)

## Constructors

### Constructor

> **new FluentLocalizationEngine**(`locale?`): `FluentLocalizationEngine`

Constructor.

#### Parameters

##### locale?

`` `${string}-${string}` ``

the language full code, i.e. 'en-US'.

#### Returns

`FluentLocalizationEngine`

## Accessors

### language

#### Get Signature

> **get** **language**(): `` `${string}-${string}` ``

The current language.

##### Returns

`` `${string}-${string}` ``

#### Set Signature

> **set** **language**(`locale`): `void`

The current language.

##### Parameters

###### locale

`` `${string}-${string}` ``

##### Returns

`void`

The current language.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`language`](../interfaces/ILocalizationEngine.md#language)

## Methods

### addMessages()

> **addMessages**(`locale`, `messages`): [`LocalizationError`](../interfaces/LocalizationError.md)[]

Adds messages to the localization engine.

#### Parameters

##### locale

`` `${string}-${string}` ``

the locale for the messages.

##### messages

`Record`\<`string`, `string`\>

the messages to add.

#### Returns

[`LocalizationError`](../interfaces/LocalizationError.md)[]

the array of any localization errors that occurred.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`addMessages`](../interfaces/ILocalizationEngine.md#addmessages)

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

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`getCompatibleId`](../interfaces/ILocalizationEngine.md#getcompatibleid)

***

### localizeErrorMessage()

> **localizeErrorMessage**(`form`, `formData`, `language`, `componentStore`, `ruleKey`): `undefined` \| `string`

Localizes error messages for validation rules.

#### Parameters

##### form

[`IForm`](../interfaces/IForm.md)

the form containing localization data.

##### formData

[`ComponentData`](ComponentData.md)

the form data for variable substitution.

##### language

[`Language`](Language.md)

the target language for localization.

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component store to localize.

##### ruleKey

`string`

the validation rule key.

#### Returns

`undefined` \| `string`

the localized error message or undefined.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`localizeErrorMessage`](../interfaces/ILocalizationEngine.md#localizeerrormessage)

***

### localizeProperties()

> **localizeProperties**(`form`, `formData`, `language`, `componentStore`, `type`): `Record`\<`string`, `any`\>

Localizes properties for a component.

#### Parameters

##### form

[`IForm`](../interfaces/IForm.md)

the form containing localization data.

##### formData

[`IFormData`](../interfaces/IFormData.md)

the form data for variable substitution.

##### language

[`Language`](Language.md)

the target language for localization.

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component store to localize.

##### type

`string` = `'component'`

the type of localization (default: 'component').

#### Returns

`Record`\<`string`, `any`\>

the object with localized property values.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`localizeProperties`](../interfaces/ILocalizationEngine.md#localizeproperties)

***

### testLocalization()

> **testLocalization**(`localization`, `localizationStringId`, `language`, `formData`): `string` \| [`LocalizationError`](../interfaces/LocalizationError.md)[]

#### Parameters

##### localization

`string`

the localization string to test.

##### localizationStringId

`string`

the ID of the localization string.

##### language

[`Language`](Language.md)

the language for the test.

##### formData

[`IFormData`](../interfaces/IFormData.md)

the data to use for variable substitution.

#### Returns

`string` \| [`LocalizationError`](../interfaces/LocalizationError.md)[]

the array of errors or the formatted result string.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`testLocalization`](../interfaces/ILocalizationEngine.md#testlocalization)
