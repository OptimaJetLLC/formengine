# Interface: MuiCardProps

Props for the MuiCard component.

## Extends

- `CardProps`.`DisabledProps`.`ReadOnlyProps`

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`CardProps.about`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`CardProps.accessKey`

***

### actions

> **actions**: `ReactNode`

Actions content.

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`CardProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`CardProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"both"` \| `"inline"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`CardProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`CardProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`CardProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`CardProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`CardProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`CardProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`CardProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`CardProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`CardProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`CardProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"date"` \| `"time"` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`CardProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`CardProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`CardProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`CardProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`CardProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"link"` \| `"none"` \| `"copy"` \| `"move"` \| `"execute"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`CardProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`CardProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`CardProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`CardProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`CardProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"menu"` \| `"grid"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`CardProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`CardProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`CardProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`CardProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`CardProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`CardProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`CardProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`CardProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`CardProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`CardProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`CardProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`CardProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`CardProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`CardProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`CardProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`CardProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`CardProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"text"` \| `"all"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`CardProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`CardProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`CardProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`CardProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`CardProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`CardProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`CardProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`CardProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`CardProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`CardProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`CardProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`CardProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`CardProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`CardProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `string` & `object` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

#### Inherited from

`CardProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`CardProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`CardProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`CardProps.autoSave`

***

### children?

> `optional` **children**: `ReactNode`

The content of the component.

#### Inherited from

`CardProps.children`

***

### classes?

> `optional` **classes**: `Partial`\<`CardClasses`\> & `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`CardProps.classes`

***

### className?

> `optional` **className**: `string`

#### Inherited from

`CardProps.className`

***

### color?

> `optional` **color**: `string`

#### Inherited from

`CardProps.color`

***

### component?

> `optional` **component**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`CardProps.component`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`CardProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `"inherit"` \| `Booleanish` \| `"plaintext-only"`

#### Inherited from

`CardProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`CardProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`CardProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`CardProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`CardProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`CardProps.defaultValue`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`CardProps.dir`

***

### disabled?

> `optional` **disabled**: `boolean`

If true, the component will be disabled.

#### Inherited from

`DisabledProps.disabled`

***

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`CardProps.draggable`

***

### elevation?

> `optional` **elevation**: `number`

Shadow depth, corresponds to `dp` in the spec.
It accepts values between 0 and 24 inclusive.

#### Default

```ts
1
```

#### Inherited from

`CardProps.elevation`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`CardProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`CardProps.exportparts`

***

### header

> **header**: `ReactNode`

Header content to display.

***

### headerAction

> **headerAction**: `ReactNode`

Header action content.

***

### headerAvatar

> **headerAvatar**: `ReactNode`

Header avatar content.

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`CardProps.hidden`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`CardProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`CardProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`CardProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"search"` \| `"none"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`CardProps.inputMode`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`CardProps.is`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`CardProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`CardProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`CardProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`CardProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`CardProps.itemType`

***

### key?

> `optional` **key**: `null` \| `Key`

#### Inherited from

`CardProps.key`

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`CardProps.lang`

***

### media

> **media**: `ReactNode`

Media content.

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`CardProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`CardProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`CardProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`CardProps.onWheelCapture`

***

### part?

> `optional` **part**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`CardProps.part`

***

### popover?

> `optional` **popover**: `""` \| `"hint"` \| `"auto"` \| `"manual"`

#### Inherited from

`CardProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`CardProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`CardProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`CardProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`CardProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`CardProps.radioGroup`

***

### raised?

> `optional` **raised**: `boolean`

If `true`, the card will use raised styling.

#### Default

```ts
false
```

#### Inherited from

`CardProps.raised`

***

### readOnly?

> `optional` **readOnly**: `boolean`

If true, the component will be read-only.

#### Inherited from

`ReadOnlyProps.readOnly`

***

### ref?

> `optional` **ref**: `Ref`\<`HTMLDivElement`\>

Allows getting a ref to the component instance.
Once the component unmounts, React will set `ref.current` to `null`
(or call the ref with `null` if you passed a callback ref).

#### See

[React Docs](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)

#### Inherited from

`CardProps.ref`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`CardProps.rel`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`CardProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`CardProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`CardProps.rev`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`CardProps.role`

***

### security?

> `optional` **security**: `string`

#### Inherited from

`CardProps.security`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`CardProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`CardProps.spellCheck`

***

### square?

> `optional` **square**: `boolean`

If `true`, rounded corners are disabled.

#### Default

```ts
false
```

#### Inherited from

`CardProps.square`

***

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`CardProps.style`

***

### subHeader

> **subHeader**: `ReactNode`

Subheader content.

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`CardProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`CardProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`CardProps.sx`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`CardProps.tabIndex`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`CardProps.title`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`CardProps.translate`

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`CardProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`CardProps.unselectable`

***

### useActions?

> `optional` **useActions**: `boolean`

Whether to show actions section.

***

### useCardActionArea?

> `optional` **useCardActionArea**: `boolean`

Whether to use card action area wrapper.

***

### useHeader?

> `optional` **useHeader**: `boolean`

Whether to show the card header.

***

### useHeaderAction?

> `optional` **useHeaderAction**: `boolean`

Whether to show header action area.

***

### useHeaderAvatar?

> `optional` **useHeaderAvatar**: `boolean`

Whether to show header avatar.

***

### useMedia?

> `optional` **useMedia**: `boolean`

Whether to show media section.

***

### useSubheader?

> `optional` **useSubheader**: `boolean`

Whether to show subheader.

***

### variant?

> `optional` **variant**: `OverridableStringUnion`\<`"outlined"` \| `"elevation"`, `PaperPropsVariantOverrides`\>

The variant to use.

#### Default

```ts
'elevation'
```

#### Inherited from

`CardProps.variant`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`CardProps.vocab`
