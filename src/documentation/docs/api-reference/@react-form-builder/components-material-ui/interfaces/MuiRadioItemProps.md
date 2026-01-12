# Interface: MuiRadioItemProps

Props for the MuiRadioItem component.

## Extends

- `Pick`\<`RadioProps`, `"value"` \| `"color"` \| `"disabled"`\>

## Properties

### color?

> `optional` **color**: `OverridableStringUnion`\<`"error"` \| `"default"` \| `"success"` \| `"primary"` \| `"secondary"` \| `"warning"` \| `"info"`, `RadioPropsColorOverrides`\>

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

> `optional` **disabled**: `boolean`

If `true`, the component is disabled.

#### Inherited from

`Pick.disabled`

***

### label?

> `optional` **label**: `string`

The label for the control.

***

### value?

> `optional` **value**: `unknown`

The value of the component. The DOM API casts this to a string.

#### Inherited from

`Pick.value`
