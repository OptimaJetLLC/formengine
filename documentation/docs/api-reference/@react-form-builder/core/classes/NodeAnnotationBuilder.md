# Class: NodeAnnotationBuilder\<T\>

The builder class to define the node metadata property.

## Extends

- [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

## Type Parameters

• **T**

the property type.

## Constructors

### new NodeAnnotationBuilder()

> **new NodeAnnotationBuilder**\<`T`\>(`editor`): [`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

Creates a component property metadata builder.

#### Parameters

• **editor**: `string`

the property editor type.

#### Returns

[`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

#### Overrides

[`AnnotationBuilder`](AnnotationBuilder.md).[`constructor`](AnnotationBuilder.md#constructors)

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`annotation`](AnnotationBuilder.md#annotation)

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`options`](AnnotationBuilder.md#options)

## Accessors

### array

#### Get Signature

> **get** **array**(): [`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `T`[]\>

Sets the property as a "array" property.

##### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `T`[]\>

the instance of the metadata property builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`array`](AnnotationBuilder.md#array)

***

### localize

#### Get Signature

> **get** **localize**(): `this`

##### Returns

`this`

the component property that can be localized.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`localize`](AnnotationBuilder.md#localize)

***

### notLocalize

#### Get Signature

> **get** **notLocalize**(): `this`

##### Returns

`this`

the non-localizable component property.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`notLocalize`](AnnotationBuilder.md#notlocalize)

***

### valued

#### Get Signature

> **get** **valued**(): `this`

##### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`valued`](AnnotationBuilder.md#valued)

## Methods

### build()

> **build**(`key`): [`Annotation`](Annotation.md)

Creates component property metadata for the form builder.

#### Parameters

• **key**: `string`

the unique key of the component property.

#### Returns

[`Annotation`](Annotation.md)

the instance of the component property metadata for the form builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`build`](AnnotationBuilder.md#build)

***

### calculable()

> **calculable**(`calculable`): [`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`calculable`](AnnotationBuilder.md#calculable)

***

### clone()

> **clone**(): `this`

Clones the instance of the builder.

#### Returns

`this`

the cloned instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`clone`](AnnotationBuilder.md#clone)

***

### getName()

> `protected` **getName**(`key`): `string`

Returns the annotation name.

#### Parameters

• **key**: `string`

the property name

#### Returns

`string`

the annotation name.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`getName`](AnnotationBuilder.md#getname)

***

### hideEditor()

> **hideEditor**(): `this`

Hides the component property editor.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`hideEditor`](AnnotationBuilder.md#hideeditor)

***

### hinted()

> **hinted**(`hint`): [`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`hinted`](AnnotationBuilder.md#hinted)

***

### named()

> **named**(`name`): [`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`named`](AnnotationBuilder.md#named)

***

### oneOf()

> **oneOf**\<`U`\>(...`values`): [`OneOfBuilder`](OneOfBuilder.md)\<`U`\>

Sets the property as a "single select" property.

#### Type Parameters

• **U** *extends* `string` \| `number`

#### Parameters

• ...**values**: `U`[]

the possible values for the property.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`U`\>

the instance of the metadata property builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`oneOf`](AnnotationBuilder.md#oneof)

***

### setup()

> **setup**(`options`): `this`

Modifies the component property metadata builder with custom options.

#### Parameters

• **options**: `Partial`\<`Partial`\<`Omit`\<[`Annotation`](Annotation.md), `"key"`\>\> & `Pick`\<[`Annotation`](Annotation.md), `"editor"`\> & [`BuilderOptions`](BuilderOptions.md)\>

the custom options.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`setup`](AnnotationBuilder.md#setup)

***

### someOf()

> **someOf**\<`U`\>(...`values`): [`SomeOfBuilder`](SomeOfBuilder.md)\<`U`\>

Sets the property as a "multiple select" property.

#### Type Parameters

• **U** *extends* `string` \| `number`

#### Parameters

• ...**values**: `U`[]

the possible values for the property.

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)\<`U`\>

the instance of the metadata property builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`someOf`](AnnotationBuilder.md#someof)

***

### typed()

> **typed**\<`T`\>(`type`): [`TypedBuilder`](TypedBuilder.md)\<`undefined` \| [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)\[`T`\]\>

Sets the field type for the component property.

#### Type Parameters

• **T** *extends* keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)

#### Parameters

• **type**: `T`

the field type.

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`undefined` \| [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)\[`T`\]\>

the instance of the metadata property builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`typed`](AnnotationBuilder.md#typed)

***

### withEditorProps()

> **withEditorProps**(`props`): `this`

Sets custom properties for the component's property editor.

#### Parameters

• **props**: `any`

the custom properties

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`withEditorProps`](AnnotationBuilder.md#witheditorprops)

***

### withSlotConditionBuilder()

> **withSlotConditionBuilder**(`slotConditionBuilder`): `this`

Specifies a function that will create conditions that check if a child component can be bound to a parent slot.

#### Parameters

• **slotConditionBuilder**

the function that returns a string containing the source code of the function to bind child components.

#### Returns

`this`

the instance of the metadata property builder.

***

### create()

> `static` **create**\<`T`\>(`editor`): [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

Creates a component property metadata builder.

#### Type Parameters

• **T**

the property type.

#### Parameters

• **editor**: `string`

the property editor type.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

the component property metadata builder.

#### Inherited from

[`AnnotationBuilder`](AnnotationBuilder.md).[`create`](AnnotationBuilder.md#create)
