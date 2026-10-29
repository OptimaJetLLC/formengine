# Interface: MuiCheckboxProps

Props for the MuiCheckbox component.

## Extends

- `Pick`\<`CheckboxProps`, `"checked"` \| `"color"` \| `"disabled"` \| `"size"`\>
- `ControlAriaProps`

## Properties

### aria-describedby?

> `optional` **aria-describedby?**: `string`

The id of the element that describes the control.

#### Inherited from

`ControlAriaProps.aria-describedby`

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

The id of the element that describes the validation error.

#### Inherited from

`ControlAriaProps.aria-errormessage`

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean`

Whether the control value is invalid.

#### Inherited from

`ControlAriaProps.aria-invalid`

***

### checked?

> `optional` **checked?**: `boolean`

If `true`, the component is checked.

#### Inherited from

`Pick.checked`

***

### color?

> `optional` **color?**: `OverridableStringUnion`\<`"default"` \| `"error"` \| `"info"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"`, `CheckboxPropsColorOverrides`\>

The color of the component.
It supports both default and custom theme colors, which can be added as shown in the
[palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).

#### Default

```ts
'primary'
```

#### Inherited from

`Pick.color`

***

### disabled?

> `optional` **disabled?**: `boolean`

If `true`, the component is disabled.

#### Default

```ts
false
```

#### Inherited from

`Pick.disabled`

***

### label?

> `optional` **label?**: `string`

The label for the radio checkbox.

***

### onChange

> **onChange**: (`checked?`) => `void`

Callback fired when the checkbox state changes.

#### Parameters

##### checked?

`boolean`

#### Returns

`void`

***

### size?

> `optional` **size?**: `OverridableStringUnion`\<`"large"` \| `"medium"` \| `"small"`, `CheckboxPropsSizeOverrides`\>

The size of the component.
`small` is equivalent to the dense checkbox styling.

#### Default

```ts
'medium'
```

#### Inherited from

`Pick.size`
