---
id: "ActionEventArgs"
title: "Class: ActionEventArgs"
sidebar_label: "ActionEventArgs"
sidebar_position: 0
custom_edit_url: null
---

Arguments passed to the event handler.

## Constructors

### constructor

• **new ActionEventArgs**(`type`, `sender`, `store`, `args`, `state`)

Creates arguments for the event handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the event type. |
| `sender` | [`ComponentData`](ComponentData.md) | the component that triggered the event. |
| `store` | [`Store`](Store.md) | the form viewer settings. |
| `args` | `any`[] | the event arguments. |
| `state` | [`ComponentState`](ComponentState.md) | the [ComponentState](ComponentState.md) instance. |

## Properties

### args

• `Readonly` **args**: `any`[]

the event arguments.

___

### renderedProps

• **renderedProps**: `Record`<`string`, `any`\>

The component properties that were used to render the sender component.

___

### sender

• `Readonly` **sender**: [`ComponentData`](ComponentData.md)

the component that triggered the event.

___

### store

• `Readonly` **store**: [`Store`](Store.md)

the form viewer settings.

___

### type

• `Readonly` **type**: `string`

the event type.

## Accessors

### event

• `get` **event**(): ``null`` \| `SyntheticEvent`<`Element`, `Event`\>

#### Returns

``null`` \| `SyntheticEvent`<`Element`, `Event`\>

the event handled by the event handler.

___

### value

• `get` **value**(): `any`

#### Returns

`any`

the first element of the event argument array, which is treated as a value.

## Methods

### #isEvent

▸ `Private` **#isEvent**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

___

### #isNotEvent

▸ `Private` **#isNotEvent**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

___

### setUserDefinedProps

▸ **setUserDefinedProps**(`props?`): `void`

Sets user-defined properties for the React component that override other properties of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props?` | `Record`<`string`, `any`\> | the component properties. |

#### Returns

`void`
