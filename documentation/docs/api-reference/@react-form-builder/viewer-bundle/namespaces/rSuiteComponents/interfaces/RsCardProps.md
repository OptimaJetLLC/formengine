# Interface: RsCardProps

Props for the RsCard component.

## Extends

- `PanelProps`

## Properties

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`PanelProps.as`

***

### bodyFill?

> `optional` **bodyFill**: `boolean`

Content area filled with containers

#### Inherited from

`PanelProps.bodyFill`

***

### bodyProps?

> `optional` **bodyProps**: `HTMLAttributes`\<`HTMLDivElement`\>

Custom body style

#### Inherited from

`PanelProps.bodyProps`

***

### bordered?

> `optional` **bordered**: `boolean`

Show border

#### Inherited from

`PanelProps.bordered`

***

### caretAs?

> `optional` **caretAs**: `ElementType`\<`any`, keyof IntrinsicElements\>

The icon on the right side of the title

#### Inherited from

`PanelProps.caretAs`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`PanelProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`PanelProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`PanelProps.classPrefix`

***

### collapsible?

> `optional` **collapsible**: `boolean`

Whether it is a collapsible panel

#### Inherited from

`PanelProps.collapsible`

***

### defaultExpanded?

> `optional` **defaultExpanded**: `boolean`

Expand then panel by default

#### Inherited from

`PanelProps.defaultExpanded`

***

### disabled?

> `optional` **disabled**: `boolean`

Whether the panel is disabled

#### Inherited from

`PanelProps.disabled`

***

### eventKey?

> `optional` **eventKey**: `number` \| `string`

The event key corresponding to the panel

#### Inherited from

`PanelProps.eventKey`

***

### expanded?

> `optional` **expanded**: `boolean`

Expand then panel

#### Inherited from

`PanelProps.expanded`

***

### header?

> `optional` **header**: `ReactNode`

The head displays information

#### Inherited from

`PanelProps.header`

***

### headerRole?

> `optional` **headerRole**: `string`

The role attribute of the header

#### Inherited from

`PanelProps.headerRole`

***

### headerSize

> **headerSize**: `string`

Header size for the card.

***

### id?

> `optional` **id**: `string`

The id attribute of the panel

#### Inherited from

`PanelProps.id`

***

### onEnter()?

> `optional` **onEnter**: (`node`) => `void`

Callback fired before the Modal transitions in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onEnter`

***

### onEntered()?

> `optional` **onEntered**: (`node`) => `void`

Callback fired after the Modal finishes transitioning in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onEntered`

***

### onEntering()?

> `optional` **onEntering**: (`node`) => `void`

Callback fired as the Modal begins to transition in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onEntering`

***

### onExit()?

> `optional` **onExit**: (`node`) => `void`

Callback fired right before the Modal transitions out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onExit`

***

### onExited()?

> `optional` **onExited**: (`node`) => `void`

Callback fired after the Modal finishes transitioning out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onExited`

***

### onExiting()?

> `optional` **onExiting**: (`node`) => `void`

Callback fired as the Modal begins to transition out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`PanelProps.onExiting`

***

### onSelect()?

> `optional` **onSelect**: (`eventKey`, `event`) => `void`

Called when the panel is selected

#### Parameters

##### eventKey

`number` | `string` | `undefined`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`PanelProps.onSelect`

***

### panelRole?

> `optional` **panelRole**: `string`

The role attribute of the panel

#### Inherited from

`PanelProps.panelRole`

***

### scrollShadow?

> `optional` **scrollShadow**: `boolean`

The shadow of the content when scrolling

#### Inherited from

`PanelProps.scrollShadow`

***

### shaded?

> `optional` **shaded**: `boolean`

Whether there is a shadow

#### Inherited from

`PanelProps.shaded`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`PanelProps.style`

***

### title?

> `optional` **title**: `string`

Title for the card.
