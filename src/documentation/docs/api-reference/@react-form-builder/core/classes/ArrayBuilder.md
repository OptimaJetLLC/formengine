# Class: ArrayBuilder\<T\>

The builder class to define the metadata property of the form builder component.
Used for properties where the property value is an array.

## Extends

- [`TypedBuilder`](TypedBuilder.md)\<`T`\>

## Type Parameters

• **T**

the property type.

## Constructors

### new ArrayBuilder()

> **new ArrayBuilder**\<`T`\>(): [`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`constructor`](TypedBuilder.md#constructors)

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`annotation`](TypedBuilder.md#annotation)

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`options`](TypedBuilder.md#options)

***

### subType?

> `optional` **subType**: keyof SchemaTypeMap

## Accessors

### dataBound

#### Get Signature

> **get** **dataBound**(): `this`

##### Returns

`this`

the main property of the component that uses the form data as data (one-way data binding).

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`dataBound`](TypedBuilder.md#databound)

***

### localize

#### Get Signature

> **get** **localize**(): `this`

##### Returns

`this`

the component property that can be localized.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`localize`](TypedBuilder.md#localize)

***

### notLocalize

#### Get Signature

> **get** **notLocalize**(): `this`

##### Returns

`this`

the non-localizable component property.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`notLocalize`](TypedBuilder.md#notlocalize)

***

### ofObject

#### Get Signature

> **get** **ofObject**(): [`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `object`[]\>

Sets the component's value type to an array of objects.

##### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `object`[]\>

the modified instance of the builder.

***

### ofString

#### Get Signature

> **get** **ofString**(): [`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `string`[]\>

Sets the component's value type to an array of strings.

##### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`undefined` \| `string`[]\>

the modified instance of the builder.

***

### required

#### Get Signature

> **get** **required**(): [`TypedBuilder`](TypedBuilder.md)\<`NonNullable`\<`T`\>\>

Marks the component property as required.

##### Returns

[`TypedBuilder`](TypedBuilder.md)\<`NonNullable`\<`T`\>\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`required`](TypedBuilder.md#required)

***

### valued

#### Get Signature

> **get** **valued**(): `this`

##### Returns

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

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`build`](TypedBuilder.md#build)

***

### calculable()

> **calculable**(`calculable`): [`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

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

• **value**: `T`

the default value.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

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

### hideEditor()

> **hideEditor**(): `this`

Hides the component property editor.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`hideEditor`](TypedBuilder.md#hideeditor)

***

### hinted()

> **hinted**(`hint`): [`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`hinted`](TypedBuilder.md#hinted)

***

### named()

> **named**(`name`): [`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

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

### uncontrolledValue()

> **uncontrolledValue**(`uncontrolledValue`): [`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

Sets the value for the property that prevents uncontrolled state.

#### Parameters

• **uncontrolledValue**: `unknown`

the value for the uncontrolled state.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`TypedBuilder`](TypedBuilder.md).[`uncontrolledValue`](TypedBuilder.md#uncontrolledvalue)

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
