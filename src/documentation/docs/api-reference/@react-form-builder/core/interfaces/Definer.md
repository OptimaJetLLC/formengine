# Interface: Definer\<T\>

The builder class to define the metadata of the form builder component.

## Type Parameters

### T

`T` *extends* `object`

React component property type.

## Properties

### data

> **data**: [`DefinerData`](../type-aliases/DefinerData.md)\<`T`\>

Definer class data.

#### Template

React component property type.

## Methods

### actions()

> **actions**(`fn`): `Definer`\<`T`\>

Adds the metadata of the component's actions. **Internal use only.**

#### Parameters

##### fn

[`ActionsInitializer`](../type-aliases/ActionsInitializer.md)

the function that initializes an actions on a component.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### addFeature()

> **addFeature**(`name`, `value`): `Definer`\<`T`\>

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`Definer`\<`T`\>

***

### build()

> **build**(): [`BuilderComponent`](BuilderComponent.md)

Creates component metadata for the form builder and form viewer.

#### Returns

[`BuilderComponent`](BuilderComponent.md)

component metadata for the form builder and form viewer.

***

### category()

> **category**(`category`): `Definer`\<`T`\>

Sets the category of the component.

#### Parameters

##### category

`string`

the component category.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### componentRole()

> **componentRole**(`value`): `Definer`\<`T`\>

Sets the role (e.g., label, tooltip, etc.) for the component.

#### Parameters

##### value

`string`

the component role.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### css()

> **css**(`css`): `Definer`\<`T`\>

Sets the component CSS metadata.

#### Parameters

##### css

[`Annotations`](../type-aliases/Annotations.md)\<`CSSObject`\>

the component CSS metadata.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### eventListeners()

> **eventListeners**(`eventListeners?`): `Definer`\<`T`\>

Sets the component metadata event listeners.

#### Parameters

##### eventListeners?

[`ComponentMetadataEventListeners`](ComponentMetadataEventListeners.md)

the component metadata event listeners.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### getType()

> **getType**(): `string`

#### Returns

`string`

the component type name.

***

### icon()

> **icon**(`icon`): `Definer`\<`T`\>

Sets the icon of the component.

#### Parameters

##### icon

`ComponentType`

the component icon.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### initialJson()

> **initialJson**(`initialJson?`): `Definer`\<`T`\>

Sets initial component JSON.

#### Parameters

##### initialJson?

`string`

the JSON source for the component (instance of [ComponentStore](../classes/ComponentStore.md) class serialised to JSON).

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### insertRestriction()

> **insertRestriction**(`insertRestriction?`): `Definer`\<`T`\>

Sets the function that restricts the insertion of a component into another component.

#### Parameters

##### insertRestriction?

[`InsertRestrictionFn`](../type-aliases/InsertRestrictionFn.md)

the function that restricts the insertion of a component into another component.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### kind()

> **kind**(`kind`): `Definer`\<`T`\>

Sets the kind of the component.

#### Parameters

##### kind

[`ComponentKind`](../type-aliases/ComponentKind.md)

the component kind.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### name()

> **name**(`name`): `Definer`\<`T`\>

Sets the name of the component.

#### Parameters

##### name

`string`

the component name.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### preview()

> **preview**(`customPreview`): `Definer`\<`T`\>

Adds the custom component to be displayed in the component list. **Internal use only.**

#### Parameters

##### customPreview

`ReactNode`

the custom component.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### props()

> **props**(`properties`): `Definer`\<`T`\>

Sets the metadata of the component's properties.

#### Parameters

##### properties

[`Annotations`](../type-aliases/Annotations.md)\<`T`\>

the metadata of the component's properties.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### showClassNameStylesEditor()

> **showClassNameStylesEditor**(`value`): `Definer`\<`T`\>

Show or hide 'Styles for className' editor.

#### Parameters

##### value

`boolean`

if the value is `true` or `undefined`, the editor will be displayed.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### showInlineStylesEditor()

> **showInlineStylesEditor**(`value`): `Definer`\<`T`\>

Show or hide 'Inline styles' properties editor.

#### Parameters

##### value

`boolean`

if the value is `true` or `undefined`, the editor will be displayed.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.

***

### type()

> **type**(`type`): `Definer`\<`T`\>

Sets the type of the component.

#### Parameters

##### type

`string`

the component type.

#### Returns

`Definer`\<`T`\>

the modified Definer class instance.
