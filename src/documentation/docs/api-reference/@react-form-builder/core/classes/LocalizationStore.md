# Class: LocalizationStore

Observable storage of localization. **Internal use only.**

## Constructors

### Constructor

> **new LocalizationStore**(`value`): `LocalizationStore`

The constructor.

#### Parameters

##### value

[`LocalizationValue`](../type-aliases/LocalizationValue.md) = `{}`

the initial localization value.

#### Returns

`LocalizationStore`

## Properties

### value

> `readonly` **value**: [`LocalizationValue`](../type-aliases/LocalizationValue.md) = `{}`

The localization data.

## Accessors

### langCodes

#### Get Signature

> **get** **langCodes**(): `` `${string}-${string}` ``[]

##### Returns

`` `${string}-${string}` ``[]

the available language codes.

## Methods

### addLocalizationWithNewKey()

> **addLocalizationWithNewKey**(`localization`, `oldComponentKey`, `newComponentKey`): `void`

Inserts the localization values for a given component key. Replaces the old component key with the new component key.

#### Parameters

##### localization

[`LocalizationValue`](../type-aliases/LocalizationValue.md)

the localization object for insertion.

##### oldComponentKey

`string`

the old component key that needs to be replaced.

##### newComponentKey

`string`

the new component key to be added.

#### Returns

`void`

***

### changeComponentKey()

> **changeComponentKey**(`oldComponentKey`, `newComponentKey`): `void`

Changes the component key for all languages in the value object.

#### Parameters

##### oldComponentKey

`string`

the old component key to be replaced.

##### newComponentKey

`string`

the new component key to replace the old component key.

#### Returns

`void`

***

### getFluentBundle()

> **getFluentBundle**(`languageFullCode`): `FluentBundle`

If the FluentBundle for the specified language is found, this function returns it.
Otherwise, an empty FluentBundle is returned.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language to get fluent bundle.

#### Returns

`FluentBundle`

the FluentBundle for the specified language.

***

### getLocalization()

> **getLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`): `undefined` \| `string`

Returns value of localization constant.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language we are looking to localize.

##### componentKey

`string`

the component we are looking to localize.

##### propertyName

`string`

the property name we are looking to localize.

##### type

`string`

the type of localization.

#### Returns

`undefined` \| `string`

the value of localization constant.

***

### getLocalizationForComponent()

> **getLocalizationForComponent**(`componentKey`): [`LocalizationValue`](../type-aliases/LocalizationValue.md)

Retrieves the localization values for a given component key.

#### Parameters

##### componentKey

`string`

the key of the component to retrieve localization for.

#### Returns

[`LocalizationValue`](../type-aliases/LocalizationValue.md)

the object containing the localization values for the component in each supported language.

***

### hasLanguage()

> **hasLanguage**(`languageFullCode`): `boolean`

Checks that the specified language exists in the localization.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

The full code (en-US, en-GB etc.) of the language to be checked.

#### Returns

`boolean`

true if the specified language exists in the localization.

***

### hasLocalization()

> **hasLocalization**(`componentKey`, `propertyName`, `type`): `boolean`

Checks that the specified property has localization.

#### Parameters

##### componentKey

`string`

the component we are looking to localize.

##### propertyName

`string`

the component's property name to be localized.

##### type

`string`

the type of localization.

#### Returns

`boolean`

true if the specified property has localization in at least one language.

***

### removeLocalization()

> **removeLocalization**(`componentKey`): `void`

Removes localization for component.

#### Parameters

##### componentKey

`string`

the component key that requires localization removal.

#### Returns

`void`

***

### removeLocalizationForType()

> **removeLocalizationForType**(`componentKey`, `type`): `void`

Removes localization for component with specified type.

#### Parameters

##### componentKey

`string`

the component key that requires localization removal.

##### type

`string`

the localization type.

#### Returns

`void`

***

### setLocalization()

> **setLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`, `value`): `void`

Sets localization for component property.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language in which localization will be set.

##### componentKey

`string`

the component key that requires localization.

##### propertyName

`string`

the component's property name to be localized.

##### type

`string`

the type of localization.

##### value

`string`

the localization value.

#### Returns

`void`
