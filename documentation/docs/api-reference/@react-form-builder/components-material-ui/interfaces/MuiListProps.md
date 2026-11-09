# Interface: MuiListProps

The MuiList component properties.

## Extends

- `ListProps`
- `DisabledProps`
- `ReadOnlyProps`

## Properties

### about?

> `optional` **about?**: `string`

#### Inherited from

`ListProps.about`

***

### accessKey?

> `optional` **accessKey?**: `string`

#### Inherited from

`ListProps.accessKey`

***

### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`ListProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic?**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`ListProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`ListProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`ListProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`ListProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy?**: `Booleanish`

#### Inherited from

`ListProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`ListProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`ListProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`ListProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`ListProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`ListProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls?**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`ListProps.aria-controls`

***

### aria-current?

> `optional` **aria-current?**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`ListProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`ListProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description?**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`ListProps.aria-description`

***

### aria-details?

> `optional` **aria-details?**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`ListProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled?**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`ListProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ListProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`ListProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded?**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`ListProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto?**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`ListProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ListProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`ListProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden?**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`ListProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`ListProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`ListProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label?**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`ListProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`ListProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level?**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`ListProps.aria-level`

***

### aria-live?

> `optional` **aria-live?**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`ListProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal?**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`ListProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline?**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`ListProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable?**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`ListProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`ListProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns?**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`ListProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`ListProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`ListProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`ListProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly?**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`ListProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant?**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`ListProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required?**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`ListProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`ListProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`ListProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`ListProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`ListProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`ListProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected?**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`ListProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`ListProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort?**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`ListProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`ListProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`ListProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`ListProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`ListProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize?**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

`ListProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect?**: `string`

#### Inherited from

`ListProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

`ListProps.autoFocus`

***

### autoSave?

> `optional` **autoSave?**: `string`

#### Inherited from

`ListProps.autoSave`

***

### children?

> `optional` **children?**: `ReactNode`

The content of the component.

#### Inherited from

`ListProps.children`

***

### classes?

> `optional` **classes?**: `Partial`\<`ListClasses`\> & `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`ListProps.classes`

***

### className?

> `optional` **className?**: `string`

#### Inherited from

`ListProps.className`

***

### color?

> `optional` **color?**: `string`

#### Inherited from

`ListProps.color`

***

### component?

> `optional` **component?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`ListProps.component`

***

### content?

> `optional` **content?**: `string`

#### Inherited from

`ListProps.content`

***

### contentEditable?

> `optional` **contentEditable?**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`ListProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu?**: `string`

#### Inherited from

`ListProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`ListProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype?**: `string`

#### Inherited from

`ListProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

#### Inherited from

`ListProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`ListProps.defaultValue`

***

### dense?

> `optional` **dense?**: `boolean`

If `true`, compact vertical padding designed for keyboard and mouse input is used for
the list and list items.
The prop is available to descendant components as the `dense` context.

#### Default

```ts
false
```

#### Inherited from

`ListProps.dense`

***

### dir?

> `optional` **dir?**: `string`

#### Inherited from

`ListProps.dir`

***

### disabled?

> `optional` **disabled?**: `boolean`

If true, the component will be disabled.

#### Inherited from

`DisabledProps.disabled`

***

### disablePadding?

> `optional` **disablePadding?**: `boolean`

If `true`, vertical padding is removed from the list.

#### Default

```ts
false
```

#### Inherited from

`ListProps.disablePadding`

***

### draggable?

> `optional` **draggable?**: `Booleanish`

#### Inherited from

`ListProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint?**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

`ListProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`ListProps.exportparts`

***

### hidden?

> `optional` **hidden?**: `boolean`

#### Inherited from

`ListProps.hidden`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`ListProps.id`

***

### inert?

> `optional` **inert?**: `boolean`

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

#### Inherited from

`ListProps.inert`

***

### inlist?

> `optional` **inlist?**: `any`

#### Inherited from

`ListProps.inlist`

***

### inputMode?

> `optional` **inputMode?**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`ListProps.inputMode`

***

### is?

> `optional` **is?**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`ListProps.is`

***

### itemID?

> `optional` **itemID?**: `string`

#### Inherited from

`ListProps.itemID`

***

### itemProp?

> `optional` **itemProp?**: `string`

#### Inherited from

`ListProps.itemProp`

***

### itemRef?

> `optional` **itemRef?**: `string`

#### Inherited from

`ListProps.itemRef`

***

### itemScope?

> `optional` **itemScope?**: `boolean`

#### Inherited from

`ListProps.itemScope`

***

### itemType?

> `optional` **itemType?**: `string`

#### Inherited from

`ListProps.itemType`

***

### key?

> `optional` **key?**: `Key` \| `null`

#### Inherited from

`ListProps.key`

***

### lang?

> `optional` **lang?**: `string`

#### Inherited from

`ListProps.lang`

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

`ListProps.nonce`

***

### onAbort?

> `optional` **onAbort?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: `AnimationEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput?**: `InputEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: `InputEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle?**: `ToggleEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture?**: `FocusEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange?**: `ChangeEventHandler`\<`HTMLUListElement`, `Element`\>

#### Inherited from

`ListProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture?**: `ChangeEventHandler`\<`HTMLUListElement`, `Element`\>

#### Inherited from

`ListProps.onChangeCapture`

***

### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: `CompositionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCopyCapture`

***

### onCut?

> `optional` **onCut?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture?**: `DragEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onEndedCapture`

***

### onError?

> `optional` **onError?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture?**: `FocusEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput?**: `InputEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture?**: `InputEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`ListProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`ListProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: `KeyboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: `MouseEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture?**: `ClipboardEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPasteCapture`

***

### onPause?

> `optional` **onPause?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: `PointerEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll?**: `UIEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture?**: `UIEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd?**: `UIEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: `UIEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit?**: `SubmitEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture?**: `SubmitEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle?**: `ToggleEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: `TouchEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: `TransitionEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture?**: `ReactEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel?**: `WheelEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture?**: `WheelEventHandler`\<`HTMLUListElement`\>

#### Inherited from

`ListProps.onWheelCapture`

***

### part?

> `optional` **part?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`ListProps.part`

***

### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

`ListProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget?**: `string`

#### Inherited from

`ListProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

`ListProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix?**: `string`

#### Inherited from

`ListProps.prefix`

***

### property?

> `optional` **property?**: `string`

#### Inherited from

`ListProps.property`

***

### radioGroup?

> `optional` **radioGroup?**: `string`

#### Inherited from

`ListProps.radioGroup`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If true, the component will be read-only.

#### Inherited from

`ReadOnlyProps.readOnly`

***

### ref?

> `optional` **ref?**: `Ref`\<`HTMLUListElement`\>

Allows getting a ref to the component instance.
Once the component unmounts, React will set `ref.current` to `null`
(or call the ref with `null` if you passed a callback ref).

#### See

[React Docs](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)

#### Inherited from

`ListProps.ref`

***

### rel?

> `optional` **rel?**: `string`

#### Inherited from

`ListProps.rel`

***

### resource?

> `optional` **resource?**: `string`

#### Inherited from

`ListProps.resource`

***

### results?

> `optional` **results?**: `number`

#### Inherited from

`ListProps.results`

***

### rev?

> `optional` **rev?**: `string`

#### Inherited from

`ListProps.rev`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

`ListProps.role`

***

### security?

> `optional` **security?**: `string`

#### Inherited from

`ListProps.security`

***

### slot?

> `optional` **slot?**: `string`

#### Inherited from

`ListProps.slot`

***

### spellCheck?

> `optional` **spellCheck?**: `Booleanish`

#### Inherited from

`ListProps.spellCheck`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`ListProps.style`

***

### subheader?

> `optional` **subheader?**: `ReactNode`

The content of the subheader, normally `ListSubheader`.

#### Inherited from

`ListProps.subheader`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

#### Inherited from

`ListProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

#### Inherited from

`ListProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx?**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`ListProps.sx`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`ListProps.tabIndex`

***

### title?

> `optional` **title?**: `string`

#### Inherited from

`ListProps.title`

***

### translate?

> `optional` **translate?**: `"no"` \| `"yes"`

#### Inherited from

`ListProps.translate`

***

### typeof?

> `optional` **typeof?**: `string`

#### Inherited from

`ListProps.typeof`

***

### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

#### Inherited from

`ListProps.unselectable`

***

### vocab?

> `optional` **vocab?**: `string`

#### Inherited from

`ListProps.vocab`
