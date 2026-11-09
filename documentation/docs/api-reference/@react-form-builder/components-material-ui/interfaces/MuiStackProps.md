# Interface: MuiStackProps

The MuiStack component properties.

## Extends

- `StackProps`
- `DisabledProps`
- `ReadOnlyProps`

## Properties

### about?

> `optional` **about?**: `string`

#### Inherited from

`StackProps.about`

***

### accessKey?

> `optional` **accessKey?**: `string`

#### Inherited from

`StackProps.accessKey`

***

### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`StackProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic?**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`StackProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`StackProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`StackProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`StackProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy?**: `Booleanish`

#### Inherited from

`StackProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`StackProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`StackProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`StackProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`StackProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`StackProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls?**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`StackProps.aria-controls`

***

### aria-current?

> `optional` **aria-current?**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`StackProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`StackProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description?**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`StackProps.aria-description`

***

### aria-details?

> `optional` **aria-details?**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`StackProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled?**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`StackProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`StackProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`StackProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded?**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`StackProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto?**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`StackProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`StackProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`StackProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden?**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`StackProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`StackProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`StackProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label?**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`StackProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`StackProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level?**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`StackProps.aria-level`

***

### aria-live?

> `optional` **aria-live?**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`StackProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal?**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`StackProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline?**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`StackProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable?**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`StackProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`StackProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns?**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`StackProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`StackProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`StackProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`StackProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly?**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`StackProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant?**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`StackProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required?**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`StackProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`StackProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`StackProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`StackProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`StackProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`StackProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected?**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`StackProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`StackProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort?**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`StackProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`StackProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`StackProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`StackProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`StackProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize?**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

`StackProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect?**: `string`

#### Inherited from

`StackProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

`StackProps.autoFocus`

***

### autoSave?

> `optional` **autoSave?**: `string`

#### Inherited from

`StackProps.autoSave`

***

### children?

> `optional` **children?**: `ReactNode`

The content of the component.

#### Inherited from

`StackProps.children`

***

### classes?

> `optional` **classes?**: `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`StackProps.classes`

***

### className?

> `optional` **className?**: `string`

#### Inherited from

`StackProps.className`

***

### color?

> `optional` **color?**: `string`

#### Inherited from

`StackProps.color`

***

### component?

> `optional` **component?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`StackProps.component`

***

### content?

> `optional` **content?**: `string`

#### Inherited from

`StackProps.content`

***

### contentEditable?

> `optional` **contentEditable?**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`StackProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu?**: `string`

#### Inherited from

`StackProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`StackProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype?**: `string`

#### Inherited from

`StackProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

#### Inherited from

`StackProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`StackProps.defaultValue`

***

### dir?

> `optional` **dir?**: `string`

#### Inherited from

`StackProps.dir`

***

### direction?

> `optional` **direction?**: `ResponsiveStyleValue`\<`"column"` \| `"column-reverse"` \| `"row"` \| `"row-reverse"`\>

Defines the `flex-direction` style property.
It is applied for all screen sizes.

#### Default

```ts
'column'
```

#### Inherited from

`StackProps.direction`

***

### disabled?

> `optional` **disabled?**: `boolean`

If true, the component will be disabled.

#### Inherited from

`DisabledProps.disabled`

***

### divider?

> `optional` **divider?**: `ReactNode`

Add an element between each child.

#### Inherited from

`StackProps.divider`

***

### draggable?

> `optional` **draggable?**: `Booleanish`

#### Inherited from

`StackProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint?**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

`StackProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`StackProps.exportparts`

***

### hidden?

> `optional` **hidden?**: `boolean`

#### Inherited from

`StackProps.hidden`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`StackProps.id`

***

### inert?

> `optional` **inert?**: `boolean`

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

#### Inherited from

`StackProps.inert`

***

### inlist?

> `optional` **inlist?**: `any`

#### Inherited from

`StackProps.inlist`

***

### inputMode?

> `optional` **inputMode?**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`StackProps.inputMode`

***

### is?

> `optional` **is?**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`StackProps.is`

***

### itemID?

> `optional` **itemID?**: `string`

#### Inherited from

`StackProps.itemID`

***

### itemProp?

> `optional` **itemProp?**: `string`

#### Inherited from

`StackProps.itemProp`

***

### itemRef?

> `optional` **itemRef?**: `string`

#### Inherited from

`StackProps.itemRef`

***

### itemScope?

> `optional` **itemScope?**: `boolean`

#### Inherited from

`StackProps.itemScope`

***

### itemType?

> `optional` **itemType?**: `string`

#### Inherited from

`StackProps.itemType`

***

### key?

> `optional` **key?**: `Key` \| `null`

#### Inherited from

`StackProps.key`

***

### lang?

> `optional` **lang?**: `string`

#### Inherited from

`StackProps.lang`

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

`StackProps.nonce`

***

### onAbort?

> `optional` **onAbort?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput?**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle?**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange?**: `ChangeEventHandler`\<`HTMLDivElement`, `Element`\>

#### Inherited from

`StackProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture?**: `ChangeEventHandler`\<`HTMLDivElement`, `Element`\>

#### Inherited from

`StackProps.onChangeCapture`

***

### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCopyCapture`

***

### onCut?

> `optional` **onCut?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onEndedCapture`

***

### onError?

> `optional` **onError?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput?**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture?**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`StackProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`StackProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPasteCapture`

***

### onPause?

> `optional` **onPause?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit?**: `SubmitEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture?**: `SubmitEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle?**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel?**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture?**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`StackProps.onWheelCapture`

***

### part?

> `optional` **part?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`StackProps.part`

***

### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

`StackProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget?**: `string`

#### Inherited from

`StackProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

`StackProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix?**: `string`

#### Inherited from

`StackProps.prefix`

***

### property?

> `optional` **property?**: `string`

#### Inherited from

`StackProps.property`

***

### radioGroup?

> `optional` **radioGroup?**: `string`

#### Inherited from

`StackProps.radioGroup`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If true, the component will be read-only.

#### Inherited from

`ReadOnlyProps.readOnly`

***

### ref?

> `optional` **ref?**: `Ref`\<`HTMLDivElement`\>

Allows getting a ref to the component instance.
Once the component unmounts, React will set `ref.current` to `null`
(or call the ref with `null` if you passed a callback ref).

#### See

[React Docs](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)

#### Inherited from

`StackProps.ref`

***

### rel?

> `optional` **rel?**: `string`

#### Inherited from

`StackProps.rel`

***

### resource?

> `optional` **resource?**: `string`

#### Inherited from

`StackProps.resource`

***

### results?

> `optional` **results?**: `number`

#### Inherited from

`StackProps.results`

***

### rev?

> `optional` **rev?**: `string`

#### Inherited from

`StackProps.rev`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

`StackProps.role`

***

### security?

> `optional` **security?**: `string`

#### Inherited from

`StackProps.security`

***

### slot?

> `optional` **slot?**: `string`

#### Inherited from

`StackProps.slot`

***

### spacing?

> `optional` **spacing?**: `ResponsiveStyleValue`\<`number` \| `string`\>

Defines the space between immediate children.

#### Default

```ts
0
```

#### Inherited from

`StackProps.spacing`

***

### spellCheck?

> `optional` **spellCheck?**: `Booleanish`

#### Inherited from

`StackProps.spellCheck`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`StackProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

#### Inherited from

`StackProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

#### Inherited from

`StackProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx?**: `SxProps`\<`Theme`\>

The system prop, which allows defining system overrides as well as additional CSS styles.

#### Inherited from

`StackProps.sx`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`StackProps.tabIndex`

***

### title?

> `optional` **title?**: `string`

#### Inherited from

`StackProps.title`

***

### translate?

> `optional` **translate?**: `"no"` \| `"yes"`

#### Inherited from

`StackProps.translate`

***

### typeof?

> `optional` **typeof?**: `string`

#### Inherited from

`StackProps.typeof`

***

### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

#### Inherited from

`StackProps.unselectable`

***

### useFlexGap?

> `optional` **useFlexGap?**: `boolean`

If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.

While CSS `gap` removes the known limitations,
it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.

To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.

#### Default

```ts
false
```

#### Inherited from

`StackProps.useFlexGap`

***

### vocab?

> `optional` **vocab?**: `string`

#### Inherited from

`StackProps.vocab`
