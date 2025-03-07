# Class: TypedBuilder\<T\>

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be validated.

## Extends

- [`BaseBuilder`](BaseBuilder.md)\<`T`\>

## Extended by

- [`ArrayBuilder`](ArrayBuilder.md)
- [`QuantifierBuilder`](QuantifierBuilder.md)

## Type Parameters

• **T**

the property type.

## Constructors

### new TypedBuilder()

> **new TypedBuilder**\<`T`\>(): [`TypedBuilder`](TypedBuilder.md)\<`T`\>

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`T`\>

#### Inherited from

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

### required

#### Get Signature

> **get** **required**(): [`TypedBuilder`](TypedBuilder.md)\<`NonNullable`\<`T`\>\>

Marks the component property as required.

##### Returns

[`TypedBuilder`](TypedBuilder.md)\<`NonNullable`\<`T`\>\>

the modified instance of the builder.

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

> **calculable**(`calculable`): [`TypedBuilder`](TypedBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`T`\>

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

### default()

> **default**(`value`): `this`

Sets the default value for the component property.

#### Parameters

• **value**: `T`

the default value.

#### Returns

`this`

the modified instance of the builder.

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

> **hinted**(`hint`): [`TypedBuilder`](TypedBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`hinted`](BaseBuilder.md#hinted)

***

### named()

> **named**(`name`): [`TypedBuilder`](TypedBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`named`](BaseBuilder.md#named)

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

### uncontrolledValue()

> **uncontrolledValue**(`uncontrolledValue`): [`TypedBuilder`](TypedBuilder.md)\<`T`\>

Sets the value for the property that prevents uncontrolled state.

#### Parameters

• **uncontrolledValue**: `unknown`

the value for the uncontrolled state.

#### Returns

[`TypedBuilder`](TypedBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`uncontrolledValue`](BaseBuilder.md#uncontrolledvalue)

***

### validated()

> **validated**(`validator`, `errorMap`): `this`

Modifies the component property metadata builder with validation properties.

#### Parameters

• **validator**: [`RuleValidator`](../type-aliases/RuleValidator.md)\<`T`\>

the validation function.

• **errorMap**: [`ErrorMap`](../type-aliases/ErrorMap.md)

the validation error settings.

#### Returns

`this`

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

#### Inherited from

[`BaseBuilder`](BaseBuilder.md).[`withEditorProps`](BaseBuilder.md#witheditorprops)
