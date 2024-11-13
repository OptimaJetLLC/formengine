# Class: AnnotationBuilder\<T\>

The builder class to define the metadata property of the form builder component.

## Extends

- [`BaseBuilder`](BaseBuilder.md)\<`T`\>

## Extended by

- [`NodeAnnotationBuilder`](NodeAnnotationBuilder.md)

## Type Parameters

• **T**

the property type.

## Constructors

### new AnnotationBuilder()

> **new AnnotationBuilder**\<`T`\>(`editor`): [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

Creates a component property metadata builder.

#### Parameters

• **editor**: `string`

the property editor type.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

#### Overrides

[`BaseBuilder`](BaseBuilder.md).[`constructor`](BaseBuilder.md#constructors)

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`annotation`](BaseBuilder.md#annotation)

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`options`](BaseBuilder.md#options)

## Accessors

### array

#### Get Signature

> **get** **array**(): [`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `T`[]\>

Sets the property as a "array" property.

##### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `T`[]\>

the instance of the metadata property builder.

***

### localize

#### Get Signature

> **get** **localize**(): `this`

##### Returns

`this`

the component property that can be localized.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`localize`](BaseBuilder.md#localize)

***

### notLocalize

#### Get Signature

> **get** **notLocalize**(): `this`

##### Returns

`this`

the non-localizable component property.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`notLocalize`](BaseBuilder.md#notlocalize)

***

### valued

#### Get Signature

> **get** **valued**(): `this`

##### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`valued`](BaseBuilder.md#valued)

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

[`BaseBuilder`](BaseBuilder.md).[`build`](BaseBuilder.md#build)

***

### calculable()

> **calculable**(`calculable`): [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`calculable`](BaseBuilder.md#calculable)

***

### clone()

> **clone**(): `this`

Clones the instance of the builder.

#### Returns

`this`

the cloned instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`clone`](BaseBuilder.md#clone)

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

[`BaseBuilder`](BaseBuilder.md).[`getName`](BaseBuilder.md#getname)

***

### hideEditor()

> **hideEditor**(): `this`

Hides the component property editor.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`hideEditor`](BaseBuilder.md#hideeditor)

***

### hinted()

> **hinted**(`hint`): [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`hinted`](BaseBuilder.md#hinted)

***

### named()

> **named**(`name`): [`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`named`](BaseBuilder.md#named)

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

[`BaseBuilder`](BaseBuilder.md).[`setup`](BaseBuilder.md#setup)

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

[`BaseBuilder`](BaseBuilder.md).[`withEditorProps`](BaseBuilder.md#witheditorprops)

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
