# Class: BaseBuilder\<T\>

The base builder class to define the metadata property of the form builder component.

## Extended by

- [`AnnotationBuilder`](AnnotationBuilder.md)
- [`TypedBuilder`](TypedBuilder.md)

## Type Parameters

• **T**

the property type.

## Constructors

### new BaseBuilder()

> **new BaseBuilder**\<`T`\>(): [`BaseBuilder`](BaseBuilder.md)\<`T`\>

#### Returns

[`BaseBuilder`](BaseBuilder.md)\<`T`\>

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

## Accessors

### dataBound

#### Get Signature

> **get** **dataBound**(): `this`

##### Returns

`this`

the main property of the component that uses the form data as data (one-way data binding).

***

### localize

#### Get Signature

> **get** **localize**(): `this`

##### Returns

`this`

the component property that can be localized.

***

### notLocalize

#### Get Signature

> **get** **notLocalize**(): `this`

##### Returns

`this`

the non-localizable component property.

***

### valued

#### Get Signature

> **get** **valued**(): `this`

##### Returns

`this`

the main component property that is used as form data and for validation rules.

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

***

### calculable()

> **calculable**(`calculable`): [`BaseBuilder`](BaseBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`BaseBuilder`](BaseBuilder.md)\<`T`\>

the modified instance of the builder.

***

### clone()

> **clone**(): `this`

Clones the instance of the builder.

#### Returns

`this`

the cloned instance of the builder.

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

***

### hideEditor()

> **hideEditor**(): `this`

Hides the component property editor.

#### Returns

`this`

the modified instance of the builder.

***

### hinted()

> **hinted**(`hint`): [`BaseBuilder`](BaseBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`BaseBuilder`](BaseBuilder.md)\<`T`\>

the modified instance of the builder.

***

### named()

> **named**(`name`): [`BaseBuilder`](BaseBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`BaseBuilder`](BaseBuilder.md)\<`T`\>

the modified instance of the builder.

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

***

### uncontrolledValue()

> **uncontrolledValue**(`uncontrolledValue`): [`BaseBuilder`](BaseBuilder.md)\<`T`\>

Sets the value for the property that prevents uncontrolled state.

#### Parameters

• **uncontrolledValue**: `unknown`

the value for the uncontrolled state.

#### Returns

[`BaseBuilder`](BaseBuilder.md)\<`T`\>

the modified instance of the builder.

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
