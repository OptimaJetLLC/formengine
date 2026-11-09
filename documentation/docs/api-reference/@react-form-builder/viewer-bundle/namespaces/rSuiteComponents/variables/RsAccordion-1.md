# Variable: RsAccordion

> `const` **RsAccordion**: `ForwardRefExoticComponent`\<[`RsAccordionProps`](../interfaces/RsAccordionProps.md)\> \| `ForwardRefExoticComponent`\<[`RsAccordionProps`](../interfaces/RsAccordionProps.md) & `RefAttributes`\<`HTMLDivElement`\>\>

Accordion component based on RSuite PanelGroup accordion effect.
In builder mode all panels stay expanded so their contents remain editable.

## Param

**props**

the component props.

## Param

**props.accordion**

whether only one panel can be expanded (default true).

## Param

**props.activeKey**

the expanded panel event key, or keys when `accordion` is false.

## Param

**props.defaultActiveKey**

the default expanded panel event key, or keys when `accordion` is false.

## Param

**props.bordered**

whether to show a border around the group.

## Param

**props.onSelect**

callback when a panel is expanded or collapsed.

## Param

**props.className**

the CSS class name.

## Param

**props.children**

accordion panel children.

## Param

**ref**

the forwarded ref to the panel group element.

## Returns

the React element.

## See

https://www.rsuitejs.com/components/panel/#accordion-effect
