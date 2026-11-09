# Interface: RsAccordionProps

Props for the RsAccordion component.

## Extends

- `Omit`\<`PanelGroupProps`, `"accordion"` \| `"activeKey"` \| `"defaultActiveKey"`\>

## Properties

### accordion?

> `optional` **accordion?**: `boolean`

Whether only one panel can be expanded at a time.

***

### activeKey?

> `optional` **activeKey?**: [`AccordionActiveKey`](../type-aliases/AccordionActiveKey.md)

Expanded panel event key(s). When `accordion` is false, an array expands every matching panel.

***

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`Omit.as`

***

### bordered?

> `optional` **bordered?**: `boolean`

Show border

#### Inherited from

`Omit.bordered`

***

### children?

> `optional` **children?**: `ReactNode`

Accordion panel children.

#### Overrides

`Omit.children`

***

### className?

> `optional` **className?**: `string`

CSS class name.

#### Overrides

[`RsBreadcrumbProps`](RsBreadcrumbProps.md).[`className`](RsBreadcrumbProps.md#classname)

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`classPrefix`](RsAutoCompleteProps.md#classprefix)

***

### defaultActiveKey?

> `optional` **defaultActiveKey?**: [`AccordionActiveKey`](../type-aliases/AccordionActiveKey.md)

Initially expanded panel event key(s) when `activeKey` is unset.
When `accordion` is false, an array expands every matching panel on mount.

***

### onSelect?

> `optional` **onSelect?**: (`eventKey`, `event`) => `void`

Toggles the callback function for the expand panel

#### Parameters

##### eventKey

`KeyType` \| `undefined`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`Omit.onSelect`

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

[`RsBreadcrumbProps`](RsBreadcrumbProps.md).[`style`](RsBreadcrumbProps.md#style)
