# Interface: ILocalizationStore

Localization of the form.

## Properties

### engine

> `readonly` **engine**: [`ILocalizationEngine`](ILocalizationEngine.md)

The localization engine.

***

### value

> `readonly` **value**: [`LocalizationValue`](../type-aliases/LocalizationValue.md)

The localization value object.

## Methods

### getItems()

> **getItems**(`languageFullCode`): `null` \| `Record`\<`string`, `unknown`\>

Returns all localization items provided by engine.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.).

#### Returns

`null` \| `Record`\<`string`, `unknown`\>

all localization items.

***

### getLocalization()

> **getLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`): `unknown`

Returns the localization value for the given language, component, property and type.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language.

##### componentKey

`string`

the component key.

##### propertyName

`string`

the component property name.

##### type

`string`

the localization type.

#### Returns

`unknown`

the localization value.

***

### getLocalizationItemId()

> **getLocalizationItemId**(`componentKey`, `propertyName`): `string`

Returns normalized localization item id for the component property.

#### Parameters

##### componentKey

`string`

the component key.

##### propertyName

`string`

the component property name.

#### Returns

`string`

normalized localization item id.

***

### hasLanguage()

> **hasLanguage**(`languageFullCode`): `boolean`

Checks if the specified language exists in localization.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language.

#### Returns

`boolean`

true if language exists.

***

### hasLocalization()

> **hasLocalization**(`componentKey`, `propertyName`, `type`): `boolean`

Returns true if at least one localization exists for the component property and type.

#### Parameters

##### componentKey

`string`

the component key.

##### propertyName

`string`

the component property name.

##### type

`string`

the localization type.

#### Returns

`boolean`

true if localization exists.

***

### removeLocalization()

> **removeLocalization**(`componentKey`): `void`

Removes localization for a component.

#### Parameters

##### componentKey

`string`

the component key.

#### Returns

`void`

***

### removeLocalizationForType()

> **removeLocalizationForType**(`componentKey`, `type`): `void`

Removes localization for a component with the specified type.

#### Parameters

##### componentKey

`string`

the component key.

##### type

`string`

the localization type.

#### Returns

`void`

***

### setLocalization()

> **setLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`, `value`): `void`

Sets localization for a component property.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language.

##### componentKey

`string`

the component key.

##### propertyName

`string`

the component property name.

##### type

`string`

the localization type.

##### value

`unknown`

the localization value.

#### Returns

`void`
