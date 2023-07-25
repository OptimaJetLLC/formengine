---
id: "react_form_builder_core.LocalizationStore"
title: "Class: LocalizationStore"
sidebar_label: "LocalizationStore"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).LocalizationStore

Observable storage of localization.

## Constructors

### constructor

• **new LocalizationStore**(`value?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `LocalizationValue` | the initial localization value. |

## Properties

### #disposers

• `Private` **#disposers**: `IReactionDisposer`[]

___

### localizationCache

• **localizationCache**: `Map`<`string`, `FluentBundle`\>

___

### value

• `Readonly` **value**: `LocalizationValue` = `{}`

## Methods

### #compileFluentBundle

▸ `Private` **#compileFluentBundle**(`languageFullCode`, `localization`): `FluentBundle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `languageFullCode` | `string` |
| `localization` | [`LocalizationStore`](react_form_builder_core.LocalizationStore.md) |

#### Returns

`FluentBundle`

___

### destroy

▸ **destroy**(): `void`

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

▸ **getLocalization**(`languageFullCode`, `componentKey`, `propertyName`): `undefined` \| `string`

Returns value of localization constant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language we are looking to localize. |
| `componentKey` | `string` | the component we are looking to localize. |
| `propertyName` | `string` | the property name we are looking to localize. |

#### Returns

`undefined` \| `string`

the value of localization constant.

___

### getLocalizationItems

▸ **getLocalizationItems**(`languageFullCode`): `string`[]

Returns all localization constants for the specified languageFullCode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language we are looking to localize. |

#### Returns

`string`[]

all localization constants for the specified languageFullCode.

___

### hasComponentProperty

▸ **hasComponentProperty**(`componentKey`, `propertyName`): `boolean`

Check whether the component has localization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentKey` | `string` | the key of checked component. |
| `propertyName` | `string` | the component's property name to be checked. |

#### Returns

`boolean`

true if the specified component property has a localization constant.

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

### setLocalization

▸ **setLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `value`): `void`

Sets localization for component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageFullCode` | `string` | the full code (en-US, en-GB etc.) of the language in which localization will be set. |
| `componentKey` | `string` | the component key that requires localization. |
| `propertyName` | `string` | the component's property name to be localized. |
| `value` | `string` | the localization value. |

#### Returns

`void`
