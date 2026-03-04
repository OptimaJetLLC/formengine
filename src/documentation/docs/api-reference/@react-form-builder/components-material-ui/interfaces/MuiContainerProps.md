# Interface: MuiContainerProps

The MuiContainer component properties.

## Extends

- `ContainerProps`.`DisabledProps`.`ReadOnlyProps`

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`ContainerProps.about`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`ContainerProps.accessKey`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`ContainerProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`ContainerProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`ContainerProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`ContainerProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`ContainerProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`ContainerProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`ContainerProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`ContainerProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`ContainerProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`ContainerProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`ContainerProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`ContainerProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`ContainerProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`ContainerProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`ContainerProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`ContainerProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`ContainerProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ContainerProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`ContainerProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`ContainerProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`ContainerProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ContainerProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`ContainerProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`ContainerProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`ContainerProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`ContainerProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`ContainerProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`ContainerProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`ContainerProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`ContainerProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`ContainerProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`ContainerProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`ContainerProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`ContainerProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`ContainerProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`ContainerProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`ContainerProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`ContainerProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`ContainerProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`ContainerProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`ContainerProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`ContainerProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`ContainerProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`ContainerProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`ContainerProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`ContainerProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`ContainerProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`ContainerProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`ContainerProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`ContainerProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`ContainerProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`ContainerProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`ContainerProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

`ContainerProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`ContainerProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`ContainerProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`ContainerProps.autoSave`

***

### children?

> `optional` **children**: `ReactNode`

#### Inherited from

`ContainerProps.children`

***

### classes?

> `optional` **classes**: `Partial`\<`ContainerClasses`\> & `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`ContainerProps.classes`

***

### className?

> `optional` **className**: `string`

#### Inherited from

`ContainerProps.className`

***

### color?

> `optional` **color**: `string`

#### Inherited from

`ContainerProps.color`

***

### component?

> `optional` **component**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`ContainerProps.component`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`ContainerProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`ContainerProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`ContainerProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`ContainerProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`ContainerProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`ContainerProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`ContainerProps.defaultValue`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`ContainerProps.dir`

***

### disabled?

> `optional` **disabled**: `boolean`

If true, the component will be disabled.

#### Inherited from

`DisabledProps.disabled`

***

### disableGutters?

> `optional` **disableGutters**: `boolean`

If `true`, the left and right padding is removed.

#### Default

```ts
false
```

#### Inherited from

`ContainerProps.disableGutters`

***

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`ContainerProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

`ContainerProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`ContainerProps.exportparts`

***

### fixed?

> `optional` **fixed**: `boolean`

Set the max-width to match the min-width of the current breakpoint.
This is useful if you'd prefer to design for a fixed set of sizes
instead of trying to accommodate a fully fluid viewport.
It's fluid by default.

#### Default

```ts
false
```

#### Inherited from

`ContainerProps.fixed`

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`ContainerProps.hidden`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`ContainerProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`ContainerProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`ContainerProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`ContainerProps.inputMode`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`ContainerProps.is`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`ContainerProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`ContainerProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`ContainerProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`ContainerProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`ContainerProps.itemType`

***

### key?

> `optional` **key**: `Key` \| `null`

#### Inherited from

`ContainerProps.key`

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`ContainerProps.lang`

***

### maxWidth?

> `optional` **maxWidth**: `Breakpoint` \| `false`

Determine the max-width of the container.
The container width grows with the size of the screen.
Set to `false` to disable `maxWidth`.

#### Default

```ts
'lg'
```

#### Inherited from

`ContainerProps.maxWidth`

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`ContainerProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`ContainerProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`ContainerProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`ContainerProps.onWheelCapture`

***

### part?

> `optional` **part**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`ContainerProps.part`

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

`ContainerProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`ContainerProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

`ContainerProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`ContainerProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`ContainerProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`ContainerProps.radioGroup`

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

`ContainerProps.ref`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`ContainerProps.rel`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`ContainerProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`ContainerProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`ContainerProps.rev`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`ContainerProps.role`

***

### security?

> `optional` **security**: `string`

#### Inherited from

`ContainerProps.security`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`ContainerProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`ContainerProps.spellCheck`

***

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`ContainerProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`ContainerProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`ContainerProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`ContainerProps.sx`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`ContainerProps.tabIndex`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`ContainerProps.title`

***

### translate?

> `optional` **translate**: `"no"` \| `"yes"`

#### Inherited from

`ContainerProps.translate`

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`ContainerProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`ContainerProps.unselectable`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`ContainerProps.vocab`
