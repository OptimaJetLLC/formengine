# Interface: IDataContext

The context for working with data.

## Extends

- [`IDataRootProvider`](IDataRootProvider.md)

## Accessors

### dataRoot

#### Get Signature

> **get** **dataRoot**(): [`ComponentData`](../classes/ComponentData.md)

##### Returns

[`ComponentData`](../classes/ComponentData.md)

the root component for the data in the component tree.

#### Inherited from

[`IDataRootProvider`](IDataRootProvider.md).[`dataRoot`](IDataRootProvider.md#dataroot)

***

### initialData

#### Get Signature

> **get** **initialData**(): `unknown`

##### Returns

`unknown`

the initial data.

## Methods

### calculateValue()

> **calculateValue**(`component`, `key`): [`boolean`, `any?`]

Calculates the value for the field.

#### Parameters

• **component**: [`ComponentStore`](../classes/ComponentStore.md)

the component settings.

• **key**: `string`

the field's key.

#### Returns

[`boolean`, `any?`]

***

### createDataValidator()

> **createDataValidator**(`componentStore`, `valueType`, `onError`): [`DataValidator`](../classes/DataValidator.md)

Creates a data validator for the field.

#### Parameters

• **componentStore**: [`ComponentStore`](../classes/ComponentStore.md)

the component settings.

• **valueType**: keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)

the field's data type.

• **onError**: [`Setter`](../type-aliases/Setter.md)\<`undefined` \| `string`\>

the callback function called when the validation error text is set.

#### Returns

[`DataValidator`](../classes/DataValidator.md)
