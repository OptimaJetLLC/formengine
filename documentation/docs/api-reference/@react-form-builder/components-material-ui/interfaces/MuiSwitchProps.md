# Interface: MuiSwitchProps

Props for the MuiSwitch component.

## Extends

- `Pick`\<`SwitchProps`, `"checked"` \| `"color"` \| `"disabled"` \| `"size"`\>

## Properties

### checked?

> `optional` **checked?**: `boolean`

If `true`, the component is checked.

#### Inherited from

`Pick.checked`

***

### color?

> `optional` **color?**: `OverridableStringUnion`\<`"default"` \| `"error"` \| `"info"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"`, `SwitchPropsColorOverrides`\>

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

> `optional` **size?**: `OverridableStringUnion`\<`"medium"` \| `"small"`, `SwitchPropsSizeOverrides`\>

The size of the component.
`small` is equivalent to the dense switch styling.

#### Default

```ts
'medium'
```

#### Inherited from

`Pick.size`
