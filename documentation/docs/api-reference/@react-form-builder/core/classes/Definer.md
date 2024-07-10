# Class: Definer\<T\>

The builder class to define the metadata of the form builder component.

## Type Parameters

• **T** *extends* `object`

React component property type.

## Properties

### data

> **data**: [`DefinerData`](../type-aliases/DefinerData.md)\<`T`\>

Definer class data.

#### Template

React component property type.

## Methods

### actions()

> **actions**(`fn`): [`Definer`](Definer.md)\<`T`\>

Adds the metadata of the component's actions. **Internal use only.**

#### Parameters

• **fn**: [`ActionsInitializer`](../type-aliases/ActionsInitializer.md)

the function that initializes an actions on a component.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### build()

> **build**(): [`BuilderComponent`](../interfaces/BuilderComponent.md)

Creates component metadata for the form builder and form viewer.

#### Returns

[`BuilderComponent`](../interfaces/BuilderComponent.md)

component metadata for the form builder and form viewer.

***

### category()

> **category**(`category`): [`Definer`](Definer.md)\<`T`\>

Sets the category of the component.

#### Parameters

• **category**: `string`

the component category.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### css()

> **css**(`css`): [`Definer`](Definer.md)\<`T`\>

Sets the component CSS metadata.

#### Parameters

• **css**: [`Annotations`](../type-aliases/Annotations.md)\<`CSSObject`\>

the component CSS metadata.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### getType()

> **getType**(): `string`

#### Returns

`string`

the component type name.

***

### icon()

> **icon**(`icon`): [`Definer`](Definer.md)\<`T`\>

Sets the icon of the component.

#### Parameters

• **icon**: `ComponentType`

the component icon.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### kind()

> **kind**(`kind`): [`Definer`](Definer.md)\<`T`\>

Sets the kind of the component.

#### Parameters

• **kind**: [`ComponentKind`](../type-aliases/ComponentKind.md)

the component kind.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### name()

> **name**(`name`): [`Definer`](Definer.md)\<`T`\>

Sets the name of the component.

#### Parameters

• **name**: `string`

the component name.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### preview()

> **preview**(`customPreview`): [`Definer`](Definer.md)\<`T`\>

Adds the custom component to be displayed in the component list. **Internal use only.**

#### Parameters

• **customPreview**: `ReactNode`

the custom component.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### props()

> **props**(`properties`): [`Definer`](Definer.md)\<`T`\>

Sets the metadata of the component's properties.

#### Parameters

• **properties**: [`Annotations`](../type-aliases/Annotations.md)\<`T`\>

the metadata of the component's properties.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### type()

> **type**(`type`): [`Definer`](Definer.md)\<`T`\>

Sets the type of the component.

#### Parameters

• **type**: `string`

the component type.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the modified Definer class instance.

***

### define()

> `static` **define**\<`T`\>(`component`, `displayName`?): [`Definer`](Definer.md)\<`T`\>

Static method to create an instance of the component's metadata builder class.

#### Type Parameters

• **T** *extends* `object`

#### Parameters

• **component**: `ComponentType`\<`T`\>

the React component.

• **displayName?**: `string`

the display name for the anonymous component.

#### Returns

[`Definer`](Definer.md)\<`T`\>

the instance of the [Definer](Definer.md) class.
