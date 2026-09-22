# Interface: RsBreadcrumbProps

Props for the RsBreadcrumb component.

## Extends

- `BreadcrumbProps`

## Properties

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`BreadcrumbProps.as`

***

### children?

> `optional` **children?**: `ReactNode`

Primary content

#### Inherited from

`BreadcrumbProps.children`

***

### className?

> `optional` **className?**: `string`

Additional classes

#### Inherited from

`BreadcrumbProps.className`

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

`BreadcrumbProps.classPrefix`

***

### ellipsis?

> `optional` **ellipsis?**: `ReactNode`

The ellipsis element.

#### Inherited from

`BreadcrumbProps.ellipsis`

***

### items

> **items**: [`RsBreadcrumbItemProps`](RsBreadcrumbItemProps.md)[]

Array of breadcrumb items to display.

***

### locale?

> `optional` **locale?**: `PickKeys`\<\{ `expandText`: `string`; \}\>

The locale of the component.

#### Inherited from

`BreadcrumbProps.locale`

***

### maxItems?

> `optional` **maxItems?**: `number`

Set the maximum number of breadcrumbs to display.
When there are more than the maximum number,
only the first and last will be shown, with an ellipsis in between.

#### Inherited from

`BreadcrumbProps.maxItems`

***

### onExpand?

> `optional` **onExpand?**: (`event`) => `void`

Callback function for clicking the ellipsis.

#### Parameters

##### event

`MouseEvent`

#### Returns

`void`

#### Inherited from

`BreadcrumbProps.onExpand`

***

### onItemClick

> **onItemClick**: (`item`) => `void`

Callback function when a breadcrumb item is clicked.

#### Parameters

##### item

[`RsBreadcrumbItemProps`](RsBreadcrumbItemProps.md)

#### Returns

`void`

***

### separator?

> `optional` **separator?**: `ReactNode`

The separator between each breadcrumb item.

#### Inherited from

`BreadcrumbProps.separator`

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

`BreadcrumbProps.style`
