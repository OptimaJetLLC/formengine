# Interface: RsTextAreaProps

Props for the RsTextArea component.

## Extends

- `InputProps`

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`InputProps.about`

***

### accept?

> `optional` **accept**: `string`

#### Inherited from

`InputProps.accept`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`InputProps.accessKey`

***

### alt?

> `optional` **alt**: `string`

#### Inherited from

`InputProps.alt`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`InputProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`InputProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`InputProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`InputProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`InputProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`InputProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`InputProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`InputProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`InputProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`InputProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`InputProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`InputProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"date"` \| `"time"` \| `"page"` \| `"true"` \| `"false"` \| `"step"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`InputProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`InputProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`InputProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`InputProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`InputProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"none"` \| `"link"` \| `"copy"` \| `"move"` \| `"execute"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`InputProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`InputProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`InputProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`InputProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`InputProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"grid"` \| `"dialog"` \| `"menu"` \| `"true"` \| `"false"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`InputProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`InputProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`InputProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`InputProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`InputProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`InputProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`InputProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`InputProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`InputProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`InputProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`InputProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`InputProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`InputProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`InputProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`InputProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`InputProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`InputProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"all"` \| `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`InputProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`InputProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`InputProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`InputProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`InputProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`InputProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`InputProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`InputProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`InputProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`InputProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`InputProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`InputProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`InputProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`InputProps.aria-valuetext`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`InputProps.as`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `string` & `object` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

#### Inherited from

`InputProps.autoCapitalize`

***

### autoComplete?

> `optional` **autoComplete**: `HTMLInputAutoCompleteAttribute`

#### Inherited from

`InputProps.autoComplete`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`InputProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`InputProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`InputProps.autoSave`

***

### capture?

> `optional` **capture**: `boolean` \| `"environment"` \| `"user"`

#### Inherited from

`InputProps.capture`

***

### checked?

> `optional` **checked**: `boolean`

#### Inherited from

`InputProps.checked`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`InputProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`InputProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`InputProps.classPrefix`

***

### color?

> `optional` **color**: `string`

#### Inherited from

`InputProps.color`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`InputProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`InputProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`InputProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`InputProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`InputProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`InputProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`InputProps.defaultValue`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`InputProps.dir`

***

### disabled?

> `optional` **disabled**: `boolean`

#### Inherited from

`InputProps.disabled`

***

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`InputProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"done"` \| `"search"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`InputProps.enterKeyHint`

***

### form?

> `optional` **form**: `string`

#### Inherited from

`InputProps.form`

***

### formAction?

> `optional` **formAction**: `string` \| (`formData`) => `void` \| `Promise`\<`void`\>

#### Inherited from

`InputProps.formAction`

***

### formEncType?

> `optional` **formEncType**: `string`

#### Inherited from

`InputProps.formEncType`

***

### formMethod?

> `optional` **formMethod**: `string`

#### Inherited from

`InputProps.formMethod`

***

### formNoValidate?

> `optional` **formNoValidate**: `boolean`

#### Inherited from

`InputProps.formNoValidate`

***

### formTarget?

> `optional` **formTarget**: `string`

#### Inherited from

`InputProps.formTarget`

***

### height?

> `optional` **height**: `string` \| `number`

#### Inherited from

`InputProps.height`

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`InputProps.hidden`

***

### htmlSize?

> `optional` **htmlSize**: `number`

The htmlSize attribute defines the width of the &laquo;input> element.

#### Overrides

`InputProps.htmlSize`

***

### id?

> `optional` **id**: `string`

The HTML input id

#### Inherited from

`InputProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`InputProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`InputProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`InputProps.inputMode`

***

### inputRef?

> `optional` **inputRef**: `Ref`\<`any`\>

Ref of input element

#### Inherited from

`InputProps.inputRef`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`InputProps.is`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`InputProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`InputProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`InputProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`InputProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`InputProps.itemType`

***

### label

> **label**: `string`

The label for the text area.

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`InputProps.lang`

***

### list?

> `optional` **list**: `string`

#### Inherited from

`InputProps.list`

***

### max?

> `optional` **max**: `string` \| `number`

#### Inherited from

`InputProps.max`

***

### maxLength?

> `optional` **maxLength**: `number`

#### Inherited from

`InputProps.maxLength`

***

### min?

> `optional` **min**: `string` \| `number`

#### Inherited from

`InputProps.min`

***

### minLength?

> `optional` **minLength**: `number`

#### Inherited from

`InputProps.minLength`

***

### multiple?

> `optional` **multiple**: `boolean`

#### Inherited from

`InputProps.multiple`

***

### name?

> `optional` **name**: `string`

#### Inherited from

`InputProps.name`

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`InputProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `PrependParameters`\<`ChangeEventHandler`\<`HTMLInputElement`\>, \[`string`\]\>

The callback function in which value is changed.

#### Inherited from

`InputProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`InputProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`InputProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onPointerUpCapture`

***

### onPressEnter?

> `optional` **onPressEnter**: `KeyboardEventHandler`\<`HTMLInputElement`\>

Called on press enter

#### Inherited from

`InputProps.onPressEnter`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onResetCapture`

***

### onResize?

> `optional` **onResize**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onResize`

***

### onResizeCapture?

> `optional` **onResizeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onResizeCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onScrollCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`InputProps.onWheelCapture`

***

### pattern?

> `optional` **pattern**: `string`

#### Inherited from

`InputProps.pattern`

***

### placeholder?

> `optional` **placeholder**: `string`

#### Inherited from

`InputProps.placeholder`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Render the control as plain text

#### Inherited from

`InputProps.plaintext`

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"`

#### Inherited from

`InputProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`InputProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`InputProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`InputProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`InputProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`InputProps.radioGroup`

***

### readOnly?

> `optional` **readOnly**: `boolean`

#### Inherited from

`InputProps.readOnly`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`InputProps.rel`

***

### required?

> `optional` **required**: `boolean`

#### Inherited from

`InputProps.required`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`InputProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`InputProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`InputProps.rev`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`InputProps.role`

***

### rows

> **rows**: `number`

The number of visible text lines.

***

### security?

> `optional` **security**: `string`

#### Inherited from

`InputProps.security`

***

### size?

> `optional` **size**: `Size`

A component can have different sizes

#### Inherited from

`InputProps.size`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`InputProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`InputProps.spellCheck`

***

### src?

> `optional` **src**: `string`

#### Inherited from

`InputProps.src`

***

### step?

> `optional` **step**: `string` \| `number`

#### Inherited from

`InputProps.step`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`InputProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`InputProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`InputProps.suppressHydrationWarning`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`InputProps.tabIndex`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`InputProps.title`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`InputProps.translate`

***

### type?

> `optional` **type**: `string`

The HTML input type

#### Inherited from

`InputProps.type`

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`InputProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`InputProps.unselectable`

***

### value?

> `optional` **value**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`InputProps.value`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`InputProps.vocab`

***

### width?

> `optional` **width**: `string` \| `number`

#### Inherited from

`InputProps.width`
