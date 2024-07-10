# Class: `abstract` QuantifierBuilder\<T\>

The abstract builder class to define the metadata property of the form builder component.
Used for properties where the property value can be selected from predefined values.

## Extends

- [`TypedBuilder`](TypedBuilder.md)\<`T`\>

## Extended by

- [`OneOfBuilder`](OneOfBuilder.md)
- [`SomeOfBuilder`](SomeOfBuilder.md)

## Type Parameters

• **T**

the property type.

## Constructors

### new QuantifierBuilder()

> **new QuantifierBuilder**\<`T`\>(): [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`constructor`](TypedBuilder.md#constructors)

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`annotation`](TypedBuilder.md#annotation)

***

### labels?

> `optional` **labels**: `string`[]

Labels for the possible values of the property.

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`options`](TypedBuilder.md#options)

***

### values

> **values**: (`string` \| `number`)[]

Possible values for the property.

## Accessors

### localize

> `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`localize`](TypedBuilder.md#localize)

***

### notLocalize

> `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`notLocalize`](TypedBuilder.md#notlocalize)

***

### required

> `get` **required**(): [`QuantifierBuilder`](QuantifierBuilder.md)\<`NonNullable`\<`T`\>\>

Marks the component property as required.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`NonNullable`\<`T`\>\>

the modified instance of the builder.

#### Overrides

[`TypedBuilder`](TypedBuilder.md).[`required`](TypedBuilder.md#required)

***

### valued

> `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`valued`](TypedBuilder.md#valued)

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

#### Overrides

[`TypedBuilder`](TypedBuilder.md).[`build`](TypedBuilder.md#build)

***

### calculable()

> **calculable**(`calculable`): [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`calculable`](TypedBuilder.md#calculable)

***

### clone()

> **clone**(): `this`

Clones the instance of the builder.

#### Returns

`this`

the cloned instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`clone`](TypedBuilder.md#clone)

***

### default()

> **default**(`value`): `this`

Sets the default value for the component property.

#### Parameters

• **value**: `T` \| `T`[]

the default value, can be an array of values.

#### Returns

`this`

the modified instance of the builder.

#### Overrides

[`TypedBuilder`](TypedBuilder.md).[`default`](TypedBuilder.md#default)

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

[`TypedBuilder`](TypedBuilder.md).[`getName`](TypedBuilder.md#getname)

***

### hinted()

> **hinted**(`hint`): [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`hinted`](TypedBuilder.md#hinted)

***

### labeled()

> **labeled**(...`labels`): [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

Sets the labels for predefined values.

#### Parameters

• ...**labels**: `string`[]

the labels.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

the modified instance of the builder.

***

### named()

> **named**(`name`): [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`named`](TypedBuilder.md#named)

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

[`TypedBuilder`](TypedBuilder.md).[`setup`](TypedBuilder.md#setup)

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

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`validated`](TypedBuilder.md#validated)

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

[`TypedBuilder`](TypedBuilder.md).[`withEditorProps`](TypedBuilder.md#witheditorprops)
