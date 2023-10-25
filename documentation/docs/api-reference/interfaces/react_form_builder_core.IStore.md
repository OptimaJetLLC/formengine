---
id: "react_form_builder_core.IStore"
title: "Interface: IStore"
sidebar_label: "IStore"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).IStore

The form viewer settings interface.

## Implemented by

- [`Store`](../classes/react_form_builder_core.Store.md)
- [`Store`](../classes/react_form_builder_core.Store.md)

## Properties

### dispose

• **dispose**: () => `void`

#### Type declaration

▸ (): `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

##### Returns

`void`

___

### form

• **form**: [`Form`](../classes/react_form_builder_core.Form.md)

The displayed form.

___

### localizeErrorMessages

• **localizeErrorMessages**: (`componentStore`: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md), `validationResults?`: [`ValidationResult`](../modules/react_form_builder_core.md#validationresult)[]) => `undefined` \| `string`

#### Type declaration

▸ (`componentStore`, `validationResults?`): `undefined` \| `string`

The function to localize the validation error message.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) | the component settings. |
| `validationResults?` | [`ValidationResult`](../modules/react_form_builder_core.md#validationresult)[] | the results of the validation. |

##### Returns

`undefined` \| `string`

___

### reduceScreen

• **reduceScreen**: <T\>(`callback`: (`accumulator`: `T`, `current`: [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)) => `T`, `initialValue`: `T`) => `T`

#### Type declaration

▸ <`T`\>(`callback`, `initialValue`): `T`

Performs the callback function on each element of the component tree, accumulates the return values.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`accumulator`: `T`, `current`: [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)) => `T` | the function that calculates the value for the accumulator. |
| `initialValue` | `T` | the initial value for the accumulator. |

##### Returns

`T`

the accumulated value.

## Accessors

### initialDataSlice

• `get` **initialDataSlice**(): `undefined` \| `Record`<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`<`string`, `unknown`\>

the slice of the initial data in accordance with the Store hierarchy.
