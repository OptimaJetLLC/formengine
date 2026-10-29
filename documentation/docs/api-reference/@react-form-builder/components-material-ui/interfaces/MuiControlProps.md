# Interface: MuiControlProps

The props for the MuiControl component.

## Extends

- `FormControlProps`
- `DisabledProps`
- `ReadOnlyProps`

## Properties

### about?

> `optional` **about?**: `string`

#### Inherited from

`FormControlProps.about`

***

### accessKey?

> `optional` **accessKey?**: `string`

#### Inherited from

`FormControlProps.accessKey`

***

### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`FormControlProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic?**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`FormControlProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"both"` \| `"inline"` \| `"list"` \| `"none"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`FormControlProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`FormControlProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`FormControlProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy?**: `Booleanish`

#### Inherited from

`FormControlProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`FormControlProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`FormControlProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`FormControlProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`FormControlProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`FormControlProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls?**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`FormControlProps.aria-controls`

***

### aria-current?

> `optional` **aria-current?**: `boolean` \| `"date"` \| `"false"` \| `"location"` \| `"page"` \| `"step"` \| `"time"` \| `"true"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`FormControlProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`FormControlProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description?**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`FormControlProps.aria-description`

***

### aria-details?

> `optional` **aria-details?**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`FormControlProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled?**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`FormControlProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"copy"` \| `"execute"` \| `"link"` \| `"move"` \| `"none"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`FormControlProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`FormControlProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded?**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`FormControlProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto?**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`FormControlProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`FormControlProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"dialog"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"` \| `"true"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`FormControlProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden?**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`FormControlProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"false"` \| `"grammar"` \| `"spelling"` \| `"true"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`FormControlProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`FormControlProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label?**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`FormControlProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`FormControlProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level?**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`FormControlProps.aria-level`

***

### aria-live?

> `optional` **aria-live?**: `"assertive"` \| `"off"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`FormControlProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal?**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`FormControlProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline?**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`FormControlProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable?**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`FormControlProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`FormControlProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns?**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`FormControlProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`FormControlProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`FormControlProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"false"` \| `"mixed"` \| `"true"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`FormControlProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly?**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`FormControlProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant?**: `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`FormControlProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required?**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`FormControlProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`FormControlProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`FormControlProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`FormControlProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`FormControlProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`FormControlProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected?**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`FormControlProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`FormControlProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort?**: `"ascending"` \| `"descending"` \| `"none"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`FormControlProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`FormControlProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`FormControlProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`FormControlProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`FormControlProps.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize?**: `string` & `object` \| `"characters"` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"`

#### Inherited from

`FormControlProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect?**: `string`

#### Inherited from

`FormControlProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

`FormControlProps.autoFocus`

***

### autoSave?

> `optional` **autoSave?**: `string`

#### Inherited from

`FormControlProps.autoSave`

***

### children?

> `optional` **children?**: `ReactNode`

The content of the component.

#### Inherited from

`FormControlProps.children`

***

### classes?

> `optional` **classes?**: `Partial`\<`FormControlClasses`\> & `Partial`\<`ClassNameMap`\<`never`\>\>

Override or extend the styles applied to the component.

#### Inherited from

`FormControlProps.classes`

***

### className?

> `optional` **className?**: `string`

#### Inherited from

`FormControlProps.className`

***

### color?

> `optional` **color?**: `OverridableStringUnion`\<`"error"` \| `"info"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"`, `FormControlPropsColorOverrides`\>

The color of the component.
It supports both default and custom theme colors, which can be added as shown in the
[palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).

#### Default

```ts
'primary'
```

#### Inherited from

`FormControlProps.color`

***

### component?

> `optional` **component?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`FormControlProps.component`

***

### content?

> `optional` **content?**: `string`

#### Inherited from

`FormControlProps.content`

***

### contentEditable?

> `optional` **contentEditable?**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`FormControlProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu?**: `string`

#### Inherited from

`FormControlProps.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`FormControlProps.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype?**: `string`

#### Inherited from

`FormControlProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

#### Inherited from

`FormControlProps.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue?**: readonly `string`[] \| `number` \| `string`

#### Inherited from

`FormControlProps.defaultValue`

***

### dir?

> `optional` **dir?**: `string`

#### Inherited from

`FormControlProps.dir`

***

### disabled?

> `optional` **disabled?**: `boolean`

If `true`, the label, input and helper text should be displayed in a disabled state.

#### Default

```ts
false
```

#### Inherited from

`FormControlProps.disabled`

***

### draggable?

> `optional` **draggable?**: `Booleanish`

#### Inherited from

`FormControlProps.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint?**: `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

#### Inherited from

`FormControlProps.enterKeyHint`

***

### error?

> `optional` **error?**: `boolean`

If `true`, the label is displayed in an error state.

#### Default

```ts
false
```

#### Inherited from

`FormControlProps.error`

***

### exportparts?

> `optional` **exportparts?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`FormControlProps.exportparts`

***

### focused?

> `optional` **focused?**: `boolean`

If `true`, the component is displayed in focused state.

#### Inherited from

`FormControlProps.focused`

***

### fullWidth?

> `optional` **fullWidth?**: `boolean`

If `true`, the component will take up the full width of its container.

#### Default

```ts
false
```

#### Inherited from

`FormControlProps.fullWidth`

***

### helperText?

> `optional` **helperText?**: `string`

The helper text for the form control.

***

### hidden?

> `optional` **hidden?**: `boolean`

#### Inherited from

`FormControlProps.hidden`

***

### hiddenLabel?

> `optional` **hiddenLabel?**: `boolean`

If `true`, the label is hidden.
This is used to increase density for a `FilledInput`.
Be sure to add `aria-label` to the `input` element.

#### Default

```ts
false
```

#### Inherited from

`FormControlProps.hiddenLabel`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`FormControlProps.id`

***

### inert?

> `optional` **inert?**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`FormControlProps.inert`

***

### inlist?

> `optional` **inlist?**: `any`

#### Inherited from

`FormControlProps.inlist`

***

### inputMode?

> `optional` **inputMode?**: `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`FormControlProps.inputMode`

***

### is?

> `optional` **is?**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`FormControlProps.is`

***

### itemID?

> `optional` **itemID?**: `string`

#### Inherited from

`FormControlProps.itemID`

***

### itemProp?

> `optional` **itemProp?**: `string`

#### Inherited from

`FormControlProps.itemProp`

***

### itemRef?

> `optional` **itemRef?**: `string`

#### Inherited from

`FormControlProps.itemRef`

***

### itemScope?

> `optional` **itemScope?**: `boolean`

#### Inherited from

`FormControlProps.itemScope`

***

### itemType?

> `optional` **itemType?**: `string`

#### Inherited from

`FormControlProps.itemType`

***

### key?

> `optional` **key?**: `Key` \| `null`

#### Inherited from

`FormControlProps.key`

***

### label?

> `optional` **label?**: `string`

The label for the form control.

***

### lang?

> `optional` **lang?**: `string`

#### Inherited from

`FormControlProps.lang`

***

### margin?

> `optional` **margin?**: `"dense"` \| `"none"` \| `"normal"`

If `dense` or `normal`, will adjust vertical spacing of this and contained components.

#### Default

```ts
'none'
```

#### Inherited from

`FormControlProps.margin`

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

`FormControlProps.nonce`

***

### onAbort?

> `optional` **onAbort?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput?**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle?**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onChangeCapture`

***

### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCopyCapture`

***

### onCut?

> `optional` **onCut?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture?**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onEndedCapture`

***

### onError?

> `optional` **onError?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture?**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`FormControlProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`FormControlProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture?**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPasteCapture`

***

### onPause?

> `optional` **onPause?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onRateChangeCapture`

***

### onReset?

> `optional` **onReset?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onResetCapture`

***

### onScroll?

> `optional` **onScroll?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture?**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle?**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture?**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel?**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture?**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`FormControlProps.onWheelCapture`

***

### part?

> `optional` **part?**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`FormControlProps.part`

***

### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"hint"` \| `"manual"`

#### Inherited from

`FormControlProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget?**: `string`

#### Inherited from

`FormControlProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"hide"` \| `"show"` \| `"toggle"`

#### Inherited from

`FormControlProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix?**: `string`

#### Inherited from

`FormControlProps.prefix`

***

### property?

> `optional` **property?**: `string`

#### Inherited from

`FormControlProps.property`

***

### radioGroup?

> `optional` **radioGroup?**: `string`

#### Inherited from

`FormControlProps.radioGroup`

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

`FormControlProps.ref`

***

### rel?

> `optional` **rel?**: `string`

#### Inherited from

`FormControlProps.rel`

***

### required?

> `optional` **required?**: `boolean`

If `true`, the label will indicate that the `input` is required.

#### Default

```ts
false
```

#### Inherited from

`FormControlProps.required`

***

### resource?

> `optional` **resource?**: `string`

#### Inherited from

`FormControlProps.resource`

***

### results?

> `optional` **results?**: `number`

#### Inherited from

`FormControlProps.results`

***

### rev?

> `optional` **rev?**: `string`

#### Inherited from

`FormControlProps.rev`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

`FormControlProps.role`

***

### security?

> `optional` **security?**: `string`

#### Inherited from

`FormControlProps.security`

***

### size?

> `optional` **size?**: `OverridableStringUnion`\<`"medium"` \| `"small"`, `FormControlPropsSizeOverrides`\>

The size of the component.

#### Default

```ts
'medium'
```

#### Inherited from

`FormControlProps.size`

***

### slot?

> `optional` **slot?**: `string`

#### Inherited from

`FormControlProps.slot`

***

### spellCheck?

> `optional` **spellCheck?**: `Booleanish`

#### Inherited from

`FormControlProps.spellCheck`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`FormControlProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

#### Inherited from

`FormControlProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

#### Inherited from

`FormControlProps.suppressHydrationWarning`

***

### sx?

> `optional` **sx?**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`FormControlProps.sx`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`FormControlProps.tabIndex`

***

### title?

> `optional` **title?**: `string`

#### Inherited from

`FormControlProps.title`

***

### translate?

> `optional` **translate?**: `"no"` \| `"yes"`

#### Inherited from

`FormControlProps.translate`

***

### typeof?

> `optional` **typeof?**: `string`

#### Inherited from

`FormControlProps.typeof`

***

### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

#### Inherited from

`FormControlProps.unselectable`

***

### variant?

> `optional` **variant?**: `"filled"` \| `"outlined"` \| `"standard"`

The variant to use.

#### Default

```ts
'outlined'
```

#### Inherited from

`FormControlProps.variant`

***

### vocab?

> `optional` **vocab?**: `string`

#### Inherited from

`FormControlProps.vocab`
