# Class: OneOfBuilder\<T\>

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be selected from one of the predefined values.

## Extends

- [`QuantifierBuilder`](QuantifierBuilder.md)\<`T`\>

## Type Parameters

• **T**

the property type.

## Constructors

### new OneOfBuilder()

> **new OneOfBuilder**\<`T`\>(): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`constructor`](QuantifierBuilder.md#constructors)

## Properties

### annotation

> **annotation**: [`PreAnnotation`](../type-aliases/PreAnnotation.md)

Partial metadata for a component property.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`annotation`](QuantifierBuilder.md#annotation)

***

### labels?

> `optional` **labels**: `string`[]

Labels for the possible values of the property.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`labels`](QuantifierBuilder.md#labels)

***

### options

> **options**: [`BuilderOptions`](BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`options`](QuantifierBuilder.md#options)

***

### values

> **values**: (`string` \| `number`)[]

Possible values for the property.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`values`](QuantifierBuilder.md#values)

## Accessors

### dataBound

#### Get Signature

> **get** **dataBound**(): `this`

##### Returns

`this`

the main property of the component that uses the form data as data (one-way data binding).

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`dataBound`](QuantifierBuilder.md#databound)

***

### localize

#### Get Signature

> **get** **localize**(): `this`

##### Returns

`this`

the component property that can be localized.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`localize`](QuantifierBuilder.md#localize)

***

### notLocalize

#### Get Signature

> **get** **notLocalize**(): `this`

##### Returns

`this`

the non-localizable component property.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`notLocalize`](QuantifierBuilder.md#notlocalize)

***

### required

#### Get Signature

> **get** **required**(): [`QuantifierBuilder`](QuantifierBuilder.md)\<`NonNullable`\<`T`\>\>

Marks the component property as required.

##### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)\<`NonNullable`\<`T`\>\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`required`](QuantifierBuilder.md#required)

***

### valued

#### Get Signature

> **get** **valued**(): `this`

##### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`valued`](QuantifierBuilder.md#valued)

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

[`QuantifierBuilder`](QuantifierBuilder.md).[`build`](QuantifierBuilder.md#build)

***

### calculable()

> **calculable**(`calculable`): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Marks the component property as calculable.

#### Parameters

• **calculable**: `boolean`

true if the property is calculable.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`calculable`](QuantifierBuilder.md#calculable)

***

### clone()

> **clone**(): `this`

Clones the instance of the builder.

#### Returns

`this`

the cloned instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`clone`](QuantifierBuilder.md#clone)

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

#### Overrides

[`QuantifierBuilder`](QuantifierBuilder.md).[`default`](QuantifierBuilder.md#default)

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

[`QuantifierBuilder`](QuantifierBuilder.md).[`getName`](QuantifierBuilder.md#getname)

***

### hideEditor()

> **hideEditor**(): `this`

Hides the component property editor.

#### Returns

`this`

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`hideEditor`](QuantifierBuilder.md#hideeditor)

***

### hinted()

> **hinted**(`hint`): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Adds the hint to the property name of the component.

#### Parameters

• **hint**: `ReactNode`

the hint.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`hinted`](QuantifierBuilder.md#hinted)

***

### labeled()

> **labeled**(...`labels`): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Sets the labels for predefined values.

#### Parameters

• ...**labels**: `string`[]

the labels.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`labeled`](QuantifierBuilder.md#labeled)

***

### named()

> **named**(`name`): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Specifies the name of the component property.

#### Parameters

• **name**: `string`

the property name.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`named`](QuantifierBuilder.md#named)

***

### radio()

> **radio**(): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Sets the radio buttons as the component's property editor.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

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

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`setup`](QuantifierBuilder.md#setup)

***

### uncontrolledValue()

> **uncontrolledValue**(`uncontrolledValue`): [`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

Sets the value for the property that prevents uncontrolled state.

#### Parameters

• **uncontrolledValue**: `unknown`

the value for the uncontrolled state.

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)\<`T`\>

the modified instance of the builder.

#### Inherited from

[`QuantifierBuilder`](QuantifierBuilder.md).[`uncontrolledValue`](QuantifierBuilder.md#uncontrolledvalue)

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

[`QuantifierBuilder`](QuantifierBuilder.md).[`validated`](QuantifierBuilder.md#validated)

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

[`QuantifierBuilder`](QuantifierBuilder.md).[`withEditorProps`](QuantifierBuilder.md#witheditorprops)
