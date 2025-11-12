# Interface: RsImageProps

Props for the RsImage component.

## Extends

- `ComponentProps`\<`"img"`\>.`AreaProps`

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`ComponentProps.about`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`ComponentProps.accessKey`

***

### alt?

> `optional` **alt**: `string`

#### Inherited from

`ComponentProps.alt`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`ComponentProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`ComponentProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"inline"` \| `"none"` \| `"list"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`ComponentProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`ComponentProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`ComponentProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`ComponentProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`ComponentProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`ComponentProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`ComponentProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`ComponentProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`ComponentProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`ComponentProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"date"` \| `"time"` \| `"page"` \| `"true"` \| `"false"` \| `"step"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`ComponentProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`ComponentProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`ComponentProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`ComponentProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`ComponentProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"none"` \| `"link"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ComponentProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`ComponentProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`ComponentProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`ComponentProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ComponentProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"grid"` \| `"dialog"` \| `"menu"` \| `"true"` \| `"false"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`ComponentProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`ComponentProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`ComponentProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`ComponentProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`ComponentProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`ComponentProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`ComponentProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`ComponentProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`ComponentProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`ComponentProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`ComponentProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"vertical"` \| `"horizontal"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`ComponentProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`ComponentProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`ComponentProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`ComponentProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`ComponentProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`ComponentProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"all"` \| `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`ComponentProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`ComponentProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`ComponentProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`ComponentProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`ComponentProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`ComponentProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`ComponentProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`ComponentProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`ComponentProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`ComponentProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`ComponentProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`ComponentProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`ComponentProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`ComponentProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `string` & `object` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

#### Inherited from

`ComponentProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`ComponentProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`ComponentProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`ComponentProps.autoSave`

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

The background color.

#### Inherited from

`AreaProps.backgroundColor`

***

### children?

> `optional` **children**: `ReactI18NextChild` \| `Iterable`\<`ReactI18NextChild`\>

#### Inherited from

`ComponentProps.children`

***

### className?

> `optional` **className**: `string`

#### Inherited from

`ComponentProps.className`

***

### color?

> `optional` **color**: `string`

#### Inherited from

`ComponentProps.color`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`ComponentProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `"inherit"` \| `Booleanish` \| `"plaintext-only"`

#### Inherited from

`ComponentProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`ComponentProps.contextMenu`

***

### crossOrigin?

> `optional` **crossOrigin**: `CrossOrigin`

#### Inherited from

`ComponentProps.crossOrigin`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`ComponentProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`ComponentProps.datatype`

***

### decoding?

> `optional` **decoding**: `"auto"` \| `"async"` \| `"sync"`

#### Inherited from

`ComponentProps.decoding`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`ComponentProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`ComponentProps.defaultValue`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`ComponentProps.dir`

***

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`ComponentProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"done"` \| `"search"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`ComponentProps.enterKeyHint`

***

### fetchPriority?

> `optional` **fetchPriority**: `"auto"` \| `"high"` \| `"low"`

#### Inherited from

`ComponentProps.fetchPriority`

***

### height?

> `optional` **height**: `string` \| `number`

#### Inherited from

`ComponentProps.height`

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`ComponentProps.hidden`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`ComponentProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`ComponentProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`ComponentProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`ComponentProps.inputMode`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`ComponentProps.is`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`ComponentProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`ComponentProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`ComponentProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`ComponentProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`ComponentProps.itemType`

***

### key?

> `optional` **key**: `null` \| `Key`

#### Inherited from

`ComponentProps.key`

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`ComponentProps.lang`

***

### loading?

> `optional` **loading**: `"lazy"` \| `"eager"`

#### Inherited from

`ComponentProps.loading`

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`ComponentProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`ComponentProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`ComponentProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onResetCapture`

***

### onResize?

> `optional` **onResize**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onResize`

***

### onResizeCapture?

> `optional` **onResizeCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onResizeCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onScrollCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLImageElement`\>

#### Inherited from

`ComponentProps.onWheelCapture`

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"`

#### Inherited from

`ComponentProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`ComponentProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`ComponentProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`ComponentProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`ComponentProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`ComponentProps.radioGroup`

***

### ref?

> `optional` **ref**: `Ref`\<`HTMLImageElement`\>

Allows getting a ref to the component instance.
Once the component unmounts, React will set `ref.current` to `null`
(or call the ref with `null` if you passed a callback ref).

#### See

[React Docs](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)

#### Inherited from

`ComponentProps.ref`

***

### referrerPolicy?

> `optional` **referrerPolicy**: `HTMLAttributeReferrerPolicy`

#### Inherited from

`ComponentProps.referrerPolicy`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`ComponentProps.rel`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`ComponentProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`ComponentProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`ComponentProps.rev`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`ComponentProps.role`

***

### security?

> `optional` **security**: `string`

#### Inherited from

`ComponentProps.security`

***

### sizes?

> `optional` **sizes**: `string`

#### Inherited from

`ComponentProps.sizes`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`ComponentProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`ComponentProps.spellCheck`

***

### src?

> `optional` **src**: `string`

#### Inherited from

`ComponentProps.src`

***

### srcSet?

> `optional` **srcSet**: `string`

#### Inherited from

`ComponentProps.srcSet`

***

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`ComponentProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`ComponentProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`ComponentProps.suppressHydrationWarning`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`ComponentProps.tabIndex`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`ComponentProps.title`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`ComponentProps.translate`

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`ComponentProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`ComponentProps.unselectable`

***

### useMap?

> `optional` **useMap**: `string`

#### Inherited from

`ComponentProps.useMap`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`ComponentProps.vocab`

***

### width?

> `optional` **width**: `string` \| `number`

#### Inherited from

`ComponentProps.width`
