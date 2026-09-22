# Type Alias: DefinerData\<T\>

> **DefinerData**\<`T`\> = `object`

Definer class data.

## Type Parameters

### T

`T` *extends* `object`

React component property type.

## Properties

### actionsInitializer?

> `readonly` `optional` **actionsInitializer?**: [`ActionsInitializer`](ActionsInitializer.md)

The function that initializes an actions on a component (for internal use only).

***

### category?

> `optional` **category?**: `string`

The component category.

***

### component

> `readonly` **component**: `ComponentType`\<`T`\>

The React component.

***

### cssObject?

> `optional` **cssObject?**: [`Annotations`](Annotations.md)\<[`CSSObject`](CSSObject.md)\>

The component CSS metadata.

***

### eventListeners?

> `optional` **eventListeners?**: [`ComponentMetadataEventListeners`](../interfaces/ComponentMetadataEventListeners.md)

The component metadata event listeners.

***

### features?

> `optional` **features?**: [`ComponentFeatures`](ComponentFeatures.md)

The set of component features.

***

### icon?

> `optional` **icon?**: `ComponentType` \| `string`

The component icon or the icon name.

***

### initialJson?

> `optional` **initialJson?**: `string`

The JSON source for the component (instance of [ComponentStore](../classes/ComponentStore.md) class serialised to JSON).

***

### insertRestriction?

> `optional` **insertRestriction?**: [`InsertRestrictionFn`](InsertRestrictionFn.md)

The function that restricts the insertion of a component into another component.

***

### kind?

> `optional` **kind?**: [`ComponentKind`](ComponentKind.md)

The component kind.

***

### name?

> `optional` **name?**: `string`

The component name.

***

### properties?

> `optional` **properties?**: [`Annotations`](Annotations.md)\<`T`\>

The property metadata.

***

### typeName?

> `optional` **typeName?**: `string`

The component type name.

***

### wrapperCssObject?

> `optional` **wrapperCssObject?**: [`Annotations`](Annotations.md)\<[`CSSObject`](CSSObject.md)\>

The wrapper CSS metadata.
