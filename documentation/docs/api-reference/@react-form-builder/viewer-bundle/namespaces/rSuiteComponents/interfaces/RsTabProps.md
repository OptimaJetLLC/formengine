# Interface: RsTabProps

Props for the RsTab component.

## Extends

- `NavProps`

## Properties

### about?

> `optional` **about?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`about`](RsImageProps.md#about)

***

### accessKey?

> `optional` **accessKey?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`accessKey`](RsImageProps.md#accesskey)

***

### activeKey?

> `optional` **activeKey?**: `any`

The active key of the Nav component.

#### Inherited from

`NavProps.activeKey`

***

### appearance?

> `optional` **appearance?**: `"default"` \| `"pills"` \| `"subtle"` \| `"tabs"`

The appearance style of the Nav component.

#### Default

```ts
'default'
```

#### Version

'pills' is supported in version 5.68.0

#### Inherited from

`NavProps.appearance`

***

### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-activedescendant`](RsImageProps.md#aria-activedescendant)

***

### aria-atomic?

> `optional` **aria-atomic?**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-atomic`](RsImageProps.md#aria-atomic)

***

### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-autocomplete`](RsImageProps.md#aria-autocomplete)

***

### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-braillelabel`](RsImageProps.md#aria-braillelabel)

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-brailleroledescription`](RsImageProps.md#aria-brailleroledescription)

***

### aria-busy?

> `optional` **aria-busy?**: `Booleanish`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-busy`](RsImageProps.md#aria-busy)

***

### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-checked`](RsImageProps.md#aria-checked)

***

### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-colcount`](RsImageProps.md#aria-colcount)

***

### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-colindex`](RsImageProps.md#aria-colindex)

***

### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-colindextext`](RsImageProps.md#aria-colindextext)

***

### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-colspan`](RsImageProps.md#aria-colspan)

***

### aria-controls?

> `optional` **aria-controls?**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-controls`](RsImageProps.md#aria-controls)

***

### aria-current?

> `optional` **aria-current?**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-current`](RsImageProps.md#aria-current)

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-describedby`](RsImageProps.md#aria-describedby)

***

### aria-description?

> `optional` **aria-description?**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-description`](RsImageProps.md#aria-description)

***

### aria-details?

> `optional` **aria-details?**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-details`](RsImageProps.md#aria-details)

***

### aria-disabled?

> `optional` **aria-disabled?**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-disabled`](RsImageProps.md#aria-disabled)

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-dropeffect`](RsImageProps.md#aria-dropeffect)

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-errormessage`](RsImageProps.md#aria-errormessage)

***

### aria-expanded?

> `optional` **aria-expanded?**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-expanded`](RsImageProps.md#aria-expanded)

***

### aria-flowto?

> `optional` **aria-flowto?**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-flowto`](RsImageProps.md#aria-flowto)

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-grabbed`](RsImageProps.md#aria-grabbed)

***

### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-haspopup`](RsImageProps.md#aria-haspopup)

***

### aria-hidden?

> `optional` **aria-hidden?**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-hidden`](RsImageProps.md#aria-hidden)

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-invalid`](RsImageProps.md#aria-invalid)

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-keyshortcuts`](RsImageProps.md#aria-keyshortcuts)

***

### aria-label?

> `optional` **aria-label?**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-label`](RsImageProps.md#aria-label)

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-labelledby`](RsImageProps.md#aria-labelledby)

***

### aria-level?

> `optional` **aria-level?**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-level`](RsImageProps.md#aria-level)

***

### aria-live?

> `optional` **aria-live?**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-live`](RsImageProps.md#aria-live)

***

### aria-modal?

> `optional` **aria-modal?**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-modal`](RsImageProps.md#aria-modal)

***

### aria-multiline?

> `optional` **aria-multiline?**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-multiline`](RsImageProps.md#aria-multiline)

***

### aria-multiselectable?

> `optional` **aria-multiselectable?**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-multiselectable`](RsImageProps.md#aria-multiselectable)

***

### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-orientation`](RsImageProps.md#aria-orientation)

***

### aria-owns?

> `optional` **aria-owns?**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-owns`](RsImageProps.md#aria-owns)

***

### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-placeholder`](RsImageProps.md#aria-placeholder)

***

### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-posinset`](RsImageProps.md#aria-posinset)

***

### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-pressed`](RsImageProps.md#aria-pressed)

***

### aria-readonly?

> `optional` **aria-readonly?**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-readonly`](RsImageProps.md#aria-readonly)

***

### aria-relevant?

> `optional` **aria-relevant?**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-relevant`](RsImageProps.md#aria-relevant)

***

### aria-required?

> `optional` **aria-required?**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-required`](RsImageProps.md#aria-required)

***

### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-roledescription`](RsImageProps.md#aria-roledescription)

***

### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-rowcount`](RsImageProps.md#aria-rowcount)

***

### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-rowindex`](RsImageProps.md#aria-rowindex)

***

### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-rowindextext`](RsImageProps.md#aria-rowindextext)

***

### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-rowspan`](RsImageProps.md#aria-rowspan)

***

### aria-selected?

> `optional` **aria-selected?**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-selected`](RsImageProps.md#aria-selected)

***

### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-setsize`](RsImageProps.md#aria-setsize)

***

### aria-sort?

> `optional` **aria-sort?**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-sort`](RsImageProps.md#aria-sort)

***

### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-valuemax`](RsImageProps.md#aria-valuemax)

***

### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-valuemin`](RsImageProps.md#aria-valuemin)

***

### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-valuenow`](RsImageProps.md#aria-valuenow)

***

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-valuetext`](RsImageProps.md#aria-valuetext)

***

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`NavProps.as`

***

### autoCapitalize?

> `optional` **autoCapitalize?**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`autoCapitalize`](RsImageProps.md#autocapitalize)

***

### autoCorrect?

> `optional` **autoCorrect?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`autoCorrect`](RsImageProps.md#autocorrect)

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`autoFocus`](RsImageProps.md#autofocus)

***

### autoSave?

> `optional` **autoSave?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`autoSave`](RsImageProps.md#autosave)

***

### children?

> `optional` **children?**: `ReactNode`

Primary content

#### Inherited from

`NavProps.children`

***

### className?

> `optional` **className?**: `string`

Additional classes

#### Inherited from

`NavProps.className`

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

`NavProps.classPrefix`

***

### color?

> `optional` **color?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`color`](RsImageProps.md#color)

***

### content?

> `optional` **content?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`content`](RsImageProps.md#content)

***

### contentEditable?

> `optional` **contentEditable?**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`contentEditable`](RsImageProps.md#contenteditable)

***

### contextMenu?

> `optional` **contextMenu?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`contextMenu`](RsImageProps.md#contextmenu)

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`NavProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`datatype`](RsImageProps.md#datatype)

***

### defaultActiveKey?

> `optional` **defaultActiveKey?**: `any`

The default active key of the Nav component.

#### Inherited from

`NavProps.defaultActiveKey`

***

### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`defaultChecked`](RsImageProps.md#defaultchecked)

***

### defaultValue?

> `optional` **defaultValue?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`defaultValue`](RsImageProps.md#defaultvalue)

***

### dir?

> `optional` **dir?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`dir`](RsImageProps.md#dir)

***

### draggable?

> `optional` **draggable?**: `Booleanish`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`draggable`](RsImageProps.md#draggable)

***

### enterKeyHint?

> `optional` **enterKeyHint?**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`enterKeyHint`](RsImageProps.md#enterkeyhint)

***

### exportparts?

> `optional` **exportparts?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`exportparts`](RsImageProps.md#exportparts)

***

### hidden?

> `optional` **hidden?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`hidden`](RsImageProps.md#hidden)

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`id`](RsImageProps.md#id)

***

### inert?

> `optional` **inert?**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`inert`](RsImageProps.md#inert)

***

### inlist?

> `optional` **inlist?**: `any`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`inlist`](RsImageProps.md#inlist)

***

### inputMode?

> `optional` **inputMode?**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`inputMode`](RsImageProps.md#inputmode)

***

### is?

> `optional` **is?**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`is`](RsImageProps.md#is)

***

### itemID?

> `optional` **itemID?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`itemID`](RsImageProps.md#itemid)

***

### itemProp?

> `optional` **itemProp?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`itemProp`](RsImageProps.md#itemprop)

***

### itemRef?

> `optional` **itemRef?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`itemRef`](RsImageProps.md#itemref)

***

### items?

> `optional` **items?**: [`RsTabItem`](../type-aliases/RsTabItem.md)[]

Items for the tab.

***

### itemScope?

> `optional` **itemScope?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`itemScope`](RsImageProps.md#itemscope)

***

### itemType?

> `optional` **itemType?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`itemType`](RsImageProps.md#itemtype)

***

### justified?

> `optional` **justified?**: `boolean`

Whether the Nav component is justified.

#### Inherited from

`NavProps.justified`

***

### lang?

> `optional` **lang?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`lang`](RsImageProps.md#lang)

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`nonce`](RsImageProps.md#nonce)

***

### onAbort?

> `optional` **onAbort?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput?**: `InputEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle?**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture?**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onChangeCapture`

***

### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCopyCapture`

***

### onCut?

> `optional` **onCut?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onEndedCapture`

***

### onError?

> `optional` **onError?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture?**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`NavProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`NavProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture?**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPasteCapture`

***

### onPause?

> `optional` **onPause?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll?**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture?**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd?**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect?**: (`eventKey`, `event`) => `void`

Event handler for selecting a Nav item.

#### Parameters

##### eventKey

`any`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`NavProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture?**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle?**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture?**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel?**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture?**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`NavProps.onWheelCapture`

***

### pane

> **pane**: `ReactNode`

Pane content for the tab.

***

### part?

> `optional` **part?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`part`](RsImageProps.md#part)

***

### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`popover`](RsImageProps.md#popover)

***

### popoverTarget?

> `optional` **popoverTarget?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`popoverTarget`](RsImageProps.md#popovertarget)

***

### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`popoverTargetAction`](RsImageProps.md#popovertargetaction)

***

### prefix?

> `optional` **prefix?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`prefix`](RsImageProps.md#prefix)

***

### property?

> `optional` **property?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`property`](RsImageProps.md#property)

***

### pullRight?

> `optional` **pullRight?**: `boolean`

Whether the Nav component is pulled to the right.

#### Inherited from

`RsTabProps`.[`pullRight`](#pullright)

***

### radioGroup?

> `optional` **radioGroup?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`radioGroup`](RsImageProps.md#radiogroup)

***

### rel?

> `optional` **rel?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`rel`](RsImageProps.md#rel)

***

### resource?

> `optional` **resource?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`resource`](RsImageProps.md#resource)

***

### results?

> `optional` **results?**: `number`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`results`](RsImageProps.md#results)

***

### rev?

> `optional` **rev?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`rev`](RsImageProps.md#rev)

***

### reversed?

> `optional` **reversed?**: `boolean`

Whether the Nav component is reversed.

#### Inherited from

`NavProps.reversed`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`role`](RsImageProps.md#role)

***

### security?

> `optional` **security?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`security`](RsImageProps.md#security)

***

### showNavigation?

> `optional` **showNavigation?**: `boolean`

Whether to show navigation.

***

### slot?

> `optional` **slot?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`slot`](RsImageProps.md#slot)

***

### spellCheck?

> `optional` **spellCheck?**: `Booleanish`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`spellCheck`](RsImageProps.md#spellcheck)

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

`NavProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`suppressContentEditableWarning`](RsImageProps.md#suppresscontenteditablewarning)

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`suppressHydrationWarning`](RsImageProps.md#suppresshydrationwarning)

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`tabIndex`](RsImageProps.md#tabindex)

***

### title?

> `optional` **title?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`title`](RsImageProps.md#title)

***

### translate?

> `optional` **translate?**: `"no"` \| `"yes"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`translate`](RsImageProps.md#translate)

***

### typeof?

> `optional` **typeof?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`typeof`](RsImageProps.md#typeof)

***

### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`unselectable`](RsImageProps.md#unselectable)

***

### vertical?

> `optional` **vertical?**: `boolean`

Whether the Nav component is vertical.

#### Inherited from

`NavProps.vertical`

***

### vocab?

> `optional` **vocab?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`vocab`](RsImageProps.md#vocab)
