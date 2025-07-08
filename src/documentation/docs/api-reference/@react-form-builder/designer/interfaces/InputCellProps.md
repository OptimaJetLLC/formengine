# Interface: InputCellProps

The properties of InputCell component.

## Extends

- `InnerCellProps`\<`RowDataType`, `string` \| `number`\>

## Extended by

- [`SelectCellProps`](SelectCellProps.md)

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`InnerCellProps.about`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`InnerCellProps.accessKey`

***

### align?

> `optional` **align**: `JustifyContent`

#### Inherited from

`InnerCellProps.align`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`InnerCellProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`InnerCellProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`InnerCellProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`InnerCellProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`InnerCellProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`InnerCellProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`InnerCellProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`InnerCellProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`InnerCellProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`InnerCellProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`InnerCellProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`InnerCellProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"time"` \| `"date"` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`InnerCellProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`InnerCellProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`InnerCellProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`InnerCellProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`InnerCellProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`InnerCellProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`InnerCellProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`InnerCellProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`InnerCellProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`InnerCellProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"dialog"` \| `"menu"` \| `"true"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`InnerCellProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`InnerCellProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`InnerCellProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`InnerCellProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`InnerCellProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`InnerCellProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`InnerCellProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`InnerCellProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`InnerCellProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`InnerCellProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`InnerCellProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`InnerCellProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`InnerCellProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`InnerCellProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`InnerCellProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`InnerCellProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`InnerCellProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"text"` \| `"all"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`InnerCellProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`InnerCellProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`InnerCellProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`InnerCellProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`InnerCellProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`InnerCellProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`InnerCellProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`InnerCellProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`InnerCellProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`InnerCellProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`InnerCellProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`InnerCellProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`InnerCellProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`InnerCellProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `string` & `object` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

#### Inherited from

`InnerCellProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`InnerCellProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`InnerCellProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`InnerCellProps.autoSave`

***

### children?

> `optional` **children**: `ReactNode` \| (`rowData`, `rowIndex`?) => `ReactNode`

#### Inherited from

`InnerCellProps.children`

***

### className?

> `optional` **className**: `string`

#### Inherited from

`InnerCellProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

CSS class prefix for component styling customization

#### Inherited from

`InnerCellProps.classPrefix`

***

### color?

> `optional` **color**: `string`

#### Inherited from

`InnerCellProps.color`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`InnerCellProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `"inherit"` \| `Booleanish` \| `"plaintext-only"`

#### Inherited from

`InnerCellProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`InnerCellProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`InnerCellProps.dangerouslySetInnerHTML`

***

### dataKey

> **dataKey**: `string`

The cell data key.

#### Overrides

`InnerCellProps.dataKey`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`InnerCellProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`InnerCellProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`InnerCellProps.defaultValue`

***

### depth?

> `optional` **depth**: `number`

#### Inherited from

`InnerCellProps.depth`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`InnerCellProps.dir`

***

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`InnerCellProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`InnerCellProps.enterKeyHint`

***

### expanded?

> `optional` **expanded**: `boolean`

#### Inherited from

`InnerCellProps.expanded`

***

### firstColumn?

> `optional` **firstColumn**: `boolean`

#### Inherited from

`InnerCellProps.firstColumn`

***

### fullText?

> `optional` **fullText**: `boolean`

#### Inherited from

`InnerCellProps.fullText`

***

### hasChildren?

> `optional` **hasChildren**: `boolean`

#### Inherited from

`InnerCellProps.hasChildren`

***

### headerHeight?

> `optional` **headerHeight**: `number`

#### Inherited from

`InnerCellProps.headerHeight`

***

### height?

> `optional` **height**: `number` \| (`rowData`) => `number`

#### Inherited from

`InnerCellProps.height`

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`InnerCellProps.hidden`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`InnerCellProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`InnerCellProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`InnerCellProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"search"` \| `"text"` \| `"none"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`InnerCellProps.inputMode`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`InnerCellProps.is`

***

### isHeaderCell?

> `optional` **isHeaderCell**: `boolean`

#### Inherited from

`InnerCellProps.isHeaderCell`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`InnerCellProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`InnerCellProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`InnerCellProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`InnerCellProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`InnerCellProps.itemType`

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`InnerCellProps.lang`

***

### lastColumn?

> `optional` **lastColumn**: `boolean`

#### Inherited from

`InnerCellProps.lastColumn`

***

### left?

> `optional` **left**: `number`

#### Inherited from

`InnerCellProps.left`

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`InnerCellProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCanPlayThroughCapture`

***

### onChange()?

> `optional` **onChange**: (`value`?, `dataKey`?, `rowIndex`?) => `void`

The callback function called when the data in a cell is changed.

#### Parameters

• **value?**: `any`

the value.

• **dataKey?**: `string`

the cell data key.

• **rowIndex?**: `number`

the cell row index.

#### Returns

`void`

#### Overrides

`InnerCellProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`InnerCellProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`InnerCellProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadStartCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLoadedMetadataCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onResetCapture`

***

### onResize?

> `optional` **onResize**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onResize`

***

### onResizeCapture?

> `optional` **onResizeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onResizeCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onScrollCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onTransitionStartCapture`

***

### onTreeToggle()?

> `optional` **onTreeToggle**: (`rowKey`?, `rowIndex`?, `rowData`?, `event`?) => `void`

#### Parameters

• **rowKey?**: `string` \| `number`

• **rowIndex?**: `number`

• **rowData?**: `RowDataType`\<`any`\>

• **event?**: `MouseEvent`\<`Element`, `MouseEvent`\>

#### Returns

`void`

#### Inherited from

`InnerCellProps.onTreeToggle`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`InnerCellProps.onWheelCapture`

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"`

#### Inherited from

`InnerCellProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`InnerCellProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`InnerCellProps.popoverTargetAction`

***

### predefinedStyle?

> `optional` **predefinedStyle**: `CSSProperties`

#### Inherited from

`InnerCellProps.predefinedStyle`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`InnerCellProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`InnerCellProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`InnerCellProps.radioGroup`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`InnerCellProps.rel`

***

### removed?

> `optional` **removed**: `boolean`

#### Inherited from

`InnerCellProps.removed`

***

### renderCell()?

> `optional` **renderCell**: (`contentChildren`) => `ReactNode`

#### Parameters

• **contentChildren**: `any`

#### Returns

`ReactNode`

#### Inherited from

`InnerCellProps.renderCell`

***

### renderTreeToggle()?

> `optional` **renderTreeToggle**: (`expandButton`, `rowData`?, `expanded`?) => `ReactNode`

#### Parameters

• **expandButton**: `ReactNode`

• **rowData?**: `RowDataType`\<`any`\>

• **expanded?**: `boolean`

#### Returns

`ReactNode`

#### Inherited from

`InnerCellProps.renderTreeToggle`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`InnerCellProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`InnerCellProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`InnerCellProps.rev`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`InnerCellProps.role`

***

### rowData

> **rowData**: `RowDataType`\<`any`\>

Rows data.

#### Overrides

`InnerCellProps.rowData`

***

### rowIndex?

> `optional` **rowIndex**: `number`

Row Number

#### Inherited from

`InnerCellProps.rowIndex`

***

### rowKey?

> `optional` **rowKey**: `string` \| `number`

#### Inherited from

`InnerCellProps.rowKey`

***

### rowSpan?

> `optional` **rowSpan**: `number`

#### Inherited from

`InnerCellProps.rowSpan`

***

### security?

> `optional` **security**: `string`

#### Inherited from

`InnerCellProps.security`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`InnerCellProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`InnerCellProps.spellCheck`

***

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`InnerCellProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`InnerCellProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`InnerCellProps.suppressHydrationWarning`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`InnerCellProps.tabIndex`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`InnerCellProps.title`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`InnerCellProps.translate`

***

### treeCol?

> `optional` **treeCol**: `boolean`

#### Inherited from

`InnerCellProps.treeCol`

***

### type

> **type**: `string`

The input type.

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`InnerCellProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`InnerCellProps.unselectable`

***

### verticalAlign?

> `optional` **verticalAlign**: `"bottom"` \| `"top"` \| `AlignItems` \| `"middle"`

#### Inherited from

`InnerCellProps.verticalAlign`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`InnerCellProps.vocab`

***

### width?

> `optional` **width**: `number`

#### Inherited from

`InnerCellProps.width`

***

### wordWrap?

> `optional` **wordWrap**: `boolean` \| `"break-all"` \| `"break-word"` \| `"keep-all"`

#### Inherited from

`InnerCellProps.wordWrap`
