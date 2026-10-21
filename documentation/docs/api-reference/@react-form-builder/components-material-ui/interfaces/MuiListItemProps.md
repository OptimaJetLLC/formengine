# Interface: MuiListItemProps

The MuiListItem component properties.

## Extends

- `ListItemProps`.`DisabledProps`.`ReadOnlyProps`

## Properties

### about?

> `optional` **about?**: `string`

#### Inherited from

`ListItemProps.about`

***

### accessKey?

> `optional` **accessKey?**: `string`

#### Inherited from

`ListItemProps.accessKey`

***

### alignItems?

> `optional` **alignItems?**: `"center"` \| `"flex-start"`

Defines the `align-items` style property.

#### Default

```ts
'center'
```

#### Inherited from

`ListItemProps.alignItems`

***

### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`ListItemProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic?**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`ListItemProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`ListItemProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`ListItemProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`ListItemProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy?**: `Booleanish`

#### Inherited from

`ListItemProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`ListItemProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`ListItemProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`ListItemProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`ListItemProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`ListItemProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls?**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`ListItemProps.aria-controls`

***

### aria-current?

> `optional` **aria-current?**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`ListItemProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`ListItemProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description?**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`ListItemProps.aria-description`

***

### aria-details?

> `optional` **aria-details?**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`ListItemProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled?**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`ListItemProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ListItemProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`ListItemProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded?**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`ListItemProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto?**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`ListItemProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`ListItemProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`ListItemProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden?**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`ListItemProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`ListItemProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`ListItemProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label?**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`ListItemProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`ListItemProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level?**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`ListItemProps.aria-level`

***

### aria-live?

> `optional` **aria-live?**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`ListItemProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal?**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`ListItemProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline?**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`ListItemProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable?**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`ListItemProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`ListItemProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns?**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`ListItemProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`ListItemProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`ListItemProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`ListItemProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly?**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`ListItemProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant?**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`ListItemProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required?**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`ListItemProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`ListItemProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`ListItemProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`ListItemProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`ListItemProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`ListItemProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected?**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`ListItemProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`ListItemProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort?**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`ListItemProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`ListItemProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`ListItemProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`ListItemProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`ListItemProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize?**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

`ListItemProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect?**: `string`

#### Inherited from

`ListItemProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

`ListItemProps.autoFocus`

***

### autoSave?

> `optional` **autoSave?**: `string`

#### Inherited from

`ListItemProps.autoSave`

***

### children?

> `optional` **children?**: `ReactNode`

The content of the component.

#### Inherited from

`ListItemProps.children`

***

### classes?

> `optional` **classes?**: `Partial`\<`ListItemClasses`\> & `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`ListItemProps.classes`

***

### className?

> `optional` **className?**: `string`

#### Inherited from

`ListItemProps.className`

***

### color?

> `optional` **color?**: `string`

#### Inherited from

`ListItemProps.color`

***

### component?

> `optional` **component?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`ListItemProps.component`

***

### content?

> `optional` **content?**: `string`

#### Inherited from

`ListItemProps.content`

***

### contentEditable?

> `optional` **contentEditable?**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`ListItemProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu?**: `string`

#### Inherited from

`ListItemProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`ListItemProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype?**: `string`

#### Inherited from

`ListItemProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

#### Inherited from

`ListItemProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`ListItemProps.defaultValue`

***

### dense?

> `optional` **dense?**: `boolean`

If `true`, compact vertical padding designed for keyboard and mouse input is used.
The prop defaults to the value inherited from the parent List component.

#### Default

```ts
false
```

#### Inherited from

`ListItemProps.dense`

***

### dir?

> `optional` **dir?**: `string`

#### Inherited from

`ListItemProps.dir`

***

### disabled?

> `optional` **disabled?**: `boolean`

If true, the component will be disabled.

#### Inherited from

`DisabledProps.disabled`

***

### disableGutters?

> `optional` **disableGutters?**: `boolean`

If `true`, the left and right padding is removed.

#### Default

```ts
false
```

#### Inherited from

`ListItemProps.disableGutters`

***

### disablePadding?

> `optional` **disablePadding?**: `boolean`

If `true`, all padding is removed.

#### Default

```ts
false
```

#### Inherited from

`ListItemProps.disablePadding`

***

### divider?

> `optional` **divider?**: `boolean`

If `true`, a 1px light border is added to the bottom of the list item.

#### Default

```ts
false
```

#### Inherited from

`ListItemProps.divider`

***

### draggable?

> `optional` **draggable?**: `Booleanish`

#### Inherited from

`ListItemProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint?**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

`ListItemProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`ListItemProps.exportparts`

***

### hidden?

> `optional` **hidden?**: `boolean`

#### Inherited from

`ListItemProps.hidden`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`ListItemProps.id`

***

### inert?

> `optional` **inert?**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`ListItemProps.inert`

***

### inlist?

> `optional` **inlist?**: `any`

#### Inherited from

`ListItemProps.inlist`

***

### inputMode?

> `optional` **inputMode?**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`ListItemProps.inputMode`

***

### is?

> `optional` **is?**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`ListItemProps.is`

***

### itemID?

> `optional` **itemID?**: `string`

#### Inherited from

`ListItemProps.itemID`

***

### itemProp?

> `optional` **itemProp?**: `string`

#### Inherited from

`ListItemProps.itemProp`

***

### itemRef?

> `optional` **itemRef?**: `string`

#### Inherited from

`ListItemProps.itemRef`

***

### itemScope?

> `optional` **itemScope?**: `boolean`

#### Inherited from

`ListItemProps.itemScope`

***

### itemType?

> `optional` **itemType?**: `string`

#### Inherited from

`ListItemProps.itemType`

***

### key?

> `optional` **key?**: `Key` \| `null`

#### Inherited from

`ListItemProps.key`

***

### lang?

> `optional` **lang?**: `string`

#### Inherited from

`ListItemProps.lang`

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

`ListItemProps.nonce`

***

### onAbort?

> `optional` **onAbort?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: `AnimationEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput?**: `InputEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle?**: `ToggleEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture?**: `FocusEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onChangeCapture`

***

### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: `CompositionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCopyCapture`

***

### onCut?

> `optional` **onCut?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture?**: `DragEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onEndedCapture`

***

### onError?

> `optional` **onError?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture?**: `FocusEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`ListItemProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`ListItemProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: `KeyboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: `MouseEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture?**: `ClipboardEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPasteCapture`

***

### onPause?

> `optional` **onPause?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: `PointerEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll?**: `UIEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture?**: `UIEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd?**: `UIEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: `UIEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture?**: `FormEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle?**: `ToggleEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: `TouchEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: `TransitionEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture?**: `ReactEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel?**: `WheelEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture?**: `WheelEventHandler`\<`HTMLLIElement`\>

#### Inherited from

`ListItemProps.onWheelCapture`

***

### part?

> `optional` **part?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`ListItemProps.part`

***

### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

`ListItemProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget?**: `string`

#### Inherited from

`ListItemProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

`ListItemProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix?**: `string`

#### Inherited from

`ListItemProps.prefix`

***

### property?

> `optional` **property?**: `string`

#### Inherited from

`ListItemProps.property`

***

### radioGroup?

> `optional` **radioGroup?**: `string`

#### Inherited from

`ListItemProps.radioGroup`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If true, the component will be read-only.

#### Inherited from

`ReadOnlyProps.readOnly`

***

### ref?

> `optional` **ref?**: `Ref`\<`HTMLLIElement`\>

Allows getting a ref to the component instance.
Once the component unmounts, React will set `ref.current` to `null`
(or call the ref with `null` if you passed a callback ref).

#### See

[React Docs](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)

#### Inherited from

`ListItemProps.ref`

***

### rel?

> `optional` **rel?**: `string`

#### Inherited from

`ListItemProps.rel`

***

### resource?

> `optional` **resource?**: `string`

#### Inherited from

`ListItemProps.resource`

***

### results?

> `optional` **results?**: `number`

#### Inherited from

`ListItemProps.results`

***

### rev?

> `optional` **rev?**: `string`

#### Inherited from

`ListItemProps.rev`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

`ListItemProps.role`

***

### secondaryAction?

> `optional` **secondaryAction?**: `ReactNode`

The element to display at the end of ListItem.

#### Inherited from

`ListItemProps.secondaryAction`

***

### security?

> `optional` **security?**: `string`

#### Inherited from

`ListItemProps.security`

***

### slot?

> `optional` **slot?**: `string`

#### Inherited from

`ListItemProps.slot`

***

### slotProps?

> `optional` **slotProps?**: `object`

The extra props for the slot components.
You can override the existing props or add new ones.

#### root?

> `optional` **root?**: `SlotProps`\<`ElementType`\<`HTMLAttributes`\<`HTMLDivElement`\>, keyof IntrinsicElements\>, `ListItemRootSlotPropsOverrides`, `ListItemOwnerState`\>

#### secondaryAction?

> `optional` **secondaryAction?**: `SlotProps`\<`ElementType`\<`HTMLAttributes`\<`HTMLDivElement`\>, keyof IntrinsicElements\>, `ListItemSecondaryActionSlotPropsOverrides`, `ListItemOwnerState`\>

#### Default

```ts
{}
```

#### Inherited from

`ListItemProps.slotProps`

***

### slots?

> `optional` **slots?**: `object`

The components used for each slot inside.

#### root?

> `optional` **root?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### secondaryAction?

> `optional` **secondaryAction?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Default

```ts
{}
```

#### Inherited from

`ListItemProps.slots`

***

### spellCheck?

> `optional` **spellCheck?**: `Booleanish`

#### Inherited from

`ListItemProps.spellCheck`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`ListItemProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

#### Inherited from

`ListItemProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

#### Inherited from

`ListItemProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx?**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`ListItemProps.sx`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`ListItemProps.tabIndex`

***

### title?

> `optional` **title?**: `string`

#### Inherited from

`ListItemProps.title`

***

### translate?

> `optional` **translate?**: `"no"` \| `"yes"`

#### Inherited from

`ListItemProps.translate`

***

### typeof?

> `optional` **typeof?**: `string`

#### Inherited from

`ListItemProps.typeof`

***

### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

#### Inherited from

`ListItemProps.unselectable`

***

### value?

> `optional` **value?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`ListItemProps.value`

***

### vocab?

> `optional` **vocab?**: `string`

#### Inherited from

`ListItemProps.vocab`
