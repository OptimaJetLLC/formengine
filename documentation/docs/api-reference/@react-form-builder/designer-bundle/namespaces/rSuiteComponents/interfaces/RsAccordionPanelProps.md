# Interface: RsAccordionPanelProps

Props for the RsAccordionPanel component.

## Extends

- `Omit`\<`PanelProps`, `"header"`\>

## Properties

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`Omit.as`

***

### bodyFill?

> `optional` **bodyFill?**: `boolean`

Content area filled with containers

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`bodyFill`](RsCardProps.md#bodyfill)

***

### bodyProps?

> `optional` **bodyProps?**: `HTMLAttributes`\<`HTMLDivElement`\>

Custom body style

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`bodyProps`](RsCardProps.md#bodyprops)

***

### bordered?

> `optional` **bordered?**: `boolean`

Show border

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`bordered`](RsCardProps.md#bordered)

***

### caretAs?

> `optional` **caretAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

The icon on the right side of the title

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`caretAs`](RsCardProps.md#caretas)

***

### children?

> `optional` **children?**: `ReactNode`

Panel body content.

#### Overrides

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`children`](RsAutoCompleteProps.md#children)

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

### collapsible?

> `optional` **collapsible?**: `boolean`

Whether it is a collapsible panel

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`collapsible`](RsCardProps.md#collapsible)

***

### defaultExpanded?

> `optional` **defaultExpanded?**: `boolean`

Expand then panel by default

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`defaultExpanded`](RsCardProps.md#defaultexpanded)

***

### disabled?

> `optional` **disabled?**: `boolean`

Whether the panel is disabled

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`disabled`](RsCardProps.md#disabled)

***

### eventKey?

> `optional` **eventKey?**: `number` \| `string`

The event key corresponding to the panel

#### Inherited from

`Omit.eventKey`

***

### expanded?

> `optional` **expanded?**: `boolean`

Expand then panel

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`expanded`](RsCardProps.md#expanded)

***

### header?

> `optional` **header?**: `ReactNode`

Panel header text.

***

### headerRole?

> `optional` **headerRole?**: `string`

The role attribute of the header

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`headerRole`](RsCardProps.md#headerrole)

***

### id?

> `optional` **id?**: `string`

The id attribute of the panel

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`id`](RsCardProps.md#id)

***

### onEnter?

> `optional` **onEnter?**: (`node`) => `void`

Callback fired before the Modal transitions in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEnter`](RsAutoCompleteProps.md#onenter)

***

### onEntered?

> `optional` **onEntered?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEntered`](RsAutoCompleteProps.md#onentered)

***

### onEntering?

> `optional` **onEntering?**: (`node`) => `void`

Callback fired as the Modal begins to transition in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEntering`](RsAutoCompleteProps.md#onentering)

***

### onExit?

> `optional` **onExit?**: (`node`) => `void`

Callback fired right before the Modal transitions out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExit`](RsAutoCompleteProps.md#onexit)

***

### onExited?

> `optional` **onExited?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExited`](RsAutoCompleteProps.md#onexited)

***

### onExiting?

> `optional` **onExiting?**: (`node`) => `void`

Callback fired as the Modal begins to transition out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExiting`](RsAutoCompleteProps.md#onexiting)

***

### onSelect?

> `optional` **onSelect?**: (`eventKey`, `event`) => `void`

Called when the panel is selected

#### Parameters

##### eventKey

`number` \| `string` \| `undefined`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`Omit.onSelect`

***

### panelRole?

> `optional` **panelRole?**: `string`

The role attribute of the panel

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`panelRole`](RsCardProps.md#panelrole)

***

### scrollShadow?

> `optional` **scrollShadow?**: `boolean`

The shadow of the content when scrolling

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`scrollShadow`](RsCardProps.md#scrollshadow)

***

### shaded?

> `optional` **shaded?**: `boolean`

Whether there is a shadow

#### Inherited from

[`RsCardProps`](RsCardProps.md).[`shaded`](RsCardProps.md#shaded)

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

[`RsBreadcrumbProps`](RsBreadcrumbProps.md).[`style`](RsBreadcrumbProps.md#style)
