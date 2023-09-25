---
id: "LocalizationStore"
title: "Class: LocalizationStore"
sidebar_label: "LocalizationStore"
sidebar_position: 0
custom_edit_url: null
---

Observable storage of localization.

## Constructors

### constructor

• **new LocalizationStore**(`value?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`LocalizationValue`](../modules.md#localizationvalue) | the initial localization value. |

## Properties

### #disposers

• `Private` **#disposers**: `IReactionDisposer`[]

___

### localizationCache

• **localizationCache**: `Map`<`string`, `FluentBundle`\>

___

### value

• `Readonly` **value**: [`LocalizationValue`](../modules.md#localizationvalue) = `{}`

## Methods

### #compileFluentBundle

▸ `Private` **#compileFluentBundle**(`languageFullCode`, `localization`): `FluentBundle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `languageFullCode` | `string` |
| `localization` | [`LocalizationStore`](LocalizationStore.md) |

#### Returns

`FluentBundle`

___

### #getLocalizationItems

▸ `Private` **#getLocalizationItems**(`languageFullCode`): `string`[]

Returns all localization constants for the specified languageFullCode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language we are looking to localize. |

#### Returns

`string`[]

all localization constants for the specified languageFullCode.

___

### addLocalizationWithNewKey

▸ **addLocalizationWithNewKey**(`localization`, `oldComponentKey`, `newComponentKey`): `void`

Inserts the localization values for a given component key. Replaces the old component key with the new component key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localization` | [`LocalizationValue`](../modules.md#localizationvalue) | the localization object for insertion. |
| `oldComponentKey` | `string` | the old component key that needs to be replaced. |
| `newComponentKey` | `string` | the new component key to be added. |

#### Returns

`void`

___

### changeComponentKey

▸ **changeComponentKey**(`oldComponentKey`, `newComponentKey`): `void`

Changes the component key for all languages in the value object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldComponentKey` | `string` | the old component key to be replaced. |
| `newComponentKey` | `string` | the new component key to replace the old component key. |

#### Returns

`void`

___

### dispose

▸ **dispose**(): `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

___

### getFluentBundle

▸ **getFluentBundle**(`languageFullCode`): `FluentBundle`

If the FluentBundle for the specified language is found, this function returns it.
Otherwise, an empty FluentBundle is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language to get fluent bundle. |

#### Returns

`FluentBundle`

the FluentBundle for the specified language.

___

### getLocalization

▸ **getLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`): `undefined` \| `string`

Returns value of localization constant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language we are looking to localize. |
| `componentKey` | `string` | the component we are looking to localize. |
| `propertyName` | `string` | the property name we are looking to localize. |
| `type` | `string` | the type of localization. |

#### Returns

`undefined` \| `string`

the value of localization constant.

___

### getLocalizationForComponent

▸ **getLocalizationForComponent**(`componentKey`): [`LocalizationValue`](../modules.md#localizationvalue)

Retrieves the localization values for a given component key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentKey` | `string` | the key of the component to retrieve localization for. |

#### Returns

[`LocalizationValue`](../modules.md#localizationvalue)

the object containing the localization values for the component in each supported language.

___

### hasLanguage

▸ **hasLanguage**(`languageFullCode`): `boolean`

Checks that the specified language exists in the localization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | The full code (en-US, en-GB etc.) of the language to be checked. |

#### Returns

`boolean`

true if the specified language exists in the localization.

___

### removeLocalization

▸ **removeLocalization**(`componentKey`): `void`

Removes localization for component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentKey` | `string` | the component key that requires localization removal. |

#### Returns

`void`

___

### removeLocalizationForType

▸ **removeLocalizationForType**(`componentKey`, `type`): `void`

Removes localization for component with specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentKey` | `string` | the component key that requires localization removal. |
| `type` | `string` | the localization type. |

#### Returns

`void`

___

### setLocalization

▸ **setLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`, `value`): `void`

Sets localization for component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language in which localization will be set. |
| `componentKey` | `string` | the component key that requires localization. |
| `propertyName` | `string` | the component's property name to be localized. |
| `type` | `string` | the type of localization. |
| `value` | `string` | the localization value. |

#### Returns

`void`
