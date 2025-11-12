# Class: NoopLocalizationEngine

A no-operation localization engine that provides empty implementations.
Used when localization is not needed or as a fallback.

## Implements

- [`ILocalizationEngine`](../interfaces/ILocalizationEngine.md)

## Constructors

### Constructor

> **new NoopLocalizationEngine**(`locale?`): `NoopLocalizationEngine`

#### Parameters

##### locale?

`` `${string}-${string}` ``

#### Returns

`NoopLocalizationEngine`

#### Inherit Doc

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

> **addMessages**(): `never`[]

Adds messages to the localization engine.

#### Returns

`never`[]

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

> **localizeErrorMessage**(): `undefined`

Localizes error messages for validation rules.

#### Returns

`undefined`

the localized error message or undefined.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`localizeErrorMessage`](../interfaces/ILocalizationEngine.md#localizeerrormessage)

***

### localizeProperties()

> **localizeProperties**(): `object`

Localizes properties for a component.

#### Returns

`object`

the object with localized property values.

#### Implementation of

[`ILocalizationEngine`](../interfaces/ILocalizationEngine.md).[`localizeProperties`](../interfaces/ILocalizationEngine.md#localizeproperties)
