# Interface: RsRadioGroupProps

Props for the RsRadioGroup component.

## Extends

- `RadioGroupProps`\<`string`\>

## Properties

### appearance?

> `optional` **appearance**: `"default"` \| `"picker"`

A radio group can have different appearances

#### Inherited from

`RadioGroupProps.appearance`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`RadioGroupProps.as`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`RadioGroupProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`RadioGroupProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`RadioGroupProps.classPrefix`

***

### defaultValue?

> `optional` **defaultValue**: `string`

Initial value

#### Inherited from

`RadioGroupProps.defaultValue`

***

### disabled?

> `optional` **disabled**: `boolean`

Set the component to be disabled and cannot be entered

#### Inherited from

`RadioGroupProps.disabled`

***

### inline?

> `optional` **inline**: `boolean`

Inline layout

#### Inherited from

`RadioGroupProps.inline`

***

### items

> **items**: [`LabeledValue`](../../../../core/interfaces/LabeledValue.md)[]

The items for the radio group.

***

### label?

> `optional` **label**: `string`

The label for the radio group.

***

### name?

> `optional` **name**: `string`

Name to use for form

#### Inherited from

`RadioGroupProps.name`

***

### onChange()?

> `optional` **onChange**: (`value`) => `void`

Called after the value has been changed.

#### Parameters

##### value

`string`

the value.

#### Returns

`void`

#### Overrides

`RadioGroupProps.onChange`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Render the control as plain text

#### Inherited from

`RadioGroupProps.plaintext`

***

### readOnly?

> `optional` **readOnly**: `boolean`

Make the control readonly

#### Inherited from

`RadioGroupProps.readOnly`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`RadioGroupProps.style`

***

### value?

> `optional` **value**: `string`

Current value of the component. Creates a controlled component

#### Inherited from

`RadioGroupProps.value`
