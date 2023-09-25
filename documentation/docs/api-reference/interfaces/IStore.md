---
id: "IStore"
title: "Interface: IStore"
sidebar_label: "IStore"
sidebar_position: 0
custom_edit_url: null
---

The form viewer settings interface.

## Implemented by

- [`Store`](../classes/Store.md)
- [`Store`](../classes/Store.md)

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

• **form**: [`Form`](../classes/Form.md)

___

### localizeErrorMessages

• **localizeErrorMessages**: (`componentStore`: [`ComponentStore`](../classes/ComponentStore.md), `validationResults?`: [`ValidationResult`](../modules.md#validationresult)[]) => `undefined` \| `string`

#### Type declaration

▸ (`componentStore`, `validationResults?`): `undefined` \| `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](../classes/ComponentStore.md) |
| `validationResults?` | [`ValidationResult`](../modules.md#validationresult)[] |

##### Returns

`undefined` \| `string`

___

### reduceScreen

• **reduceScreen**: <T\>(`callback`: (`accumulator`: `T`, `current`: [`ComponentData`](../classes/ComponentData.md)) => `T`, `initialValue`: `T`) => `T`

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
| `callback` | (`accumulator`: `T`, `current`: [`ComponentData`](../classes/ComponentData.md)) => `T` | the function that calculates the value for the accumulator. |
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
