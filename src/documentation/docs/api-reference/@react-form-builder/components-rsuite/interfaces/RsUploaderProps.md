# Interface: RsUploaderProps

Props for the RsUploader component.

## Extends

- `UploaderProps`

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`UploaderProps.about`

***

### accept?

> `optional` **accept**: `string`

File types that can be accepted. See input accept Attribute

#### Inherited from

`UploaderProps.accept`

***

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`UploaderProps.accessKey`

***

### action

> **action**: `string`

Uploading URL

#### Inherited from

`UploaderProps.action`

***

### active?

> `optional` **active**: `boolean`

A button can show it is currently the active user selection

#### Inherited from

`UploaderProps.active`

***

### appearance?

> `optional` **appearance**: `Appearance`

A button can have different appearances.

#### Inherited from

`UploaderProps.appearance`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`UploaderProps.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`UploaderProps.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`UploaderProps.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`UploaderProps.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`UploaderProps.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`UploaderProps.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`UploaderProps.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`UploaderProps.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`UploaderProps.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`UploaderProps.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`UploaderProps.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`UploaderProps.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"date"` \| `"time"` \| `"page"` \| `"true"` \| `"false"` \| `"step"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`UploaderProps.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`UploaderProps.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`UploaderProps.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`UploaderProps.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`UploaderProps.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`UploaderProps.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`UploaderProps.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`UploaderProps.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`UploaderProps.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`UploaderProps.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"grid"` \| `"dialog"` \| `"menu"` \| `"true"` \| `"false"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`UploaderProps.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`UploaderProps.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`UploaderProps.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`UploaderProps.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`UploaderProps.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`UploaderProps.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`UploaderProps.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`UploaderProps.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`UploaderProps.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`UploaderProps.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`UploaderProps.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`UploaderProps.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`UploaderProps.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`UploaderProps.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`UploaderProps.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`UploaderProps.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`UploaderProps.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"all"` \| `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`UploaderProps.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`UploaderProps.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`UploaderProps.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`UploaderProps.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`UploaderProps.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`UploaderProps.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`UploaderProps.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`UploaderProps.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`UploaderProps.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`UploaderProps.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`UploaderProps.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`UploaderProps.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`UploaderProps.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`UploaderProps.aria-valuetext`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`UploaderProps.as`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `string` & `object` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

#### Inherited from

`UploaderProps.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`UploaderProps.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`UploaderProps.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`UploaderProps.autoSave`

***

### autoUpload?

> `optional` **autoUpload**: `boolean`

Automatically upload files after selecting them

#### Inherited from

`UploaderProps.autoUpload`

***

### block?

> `optional` **block**: `boolean`

Format button to appear inside a content block

#### Inherited from

`UploaderProps.block`

***

### children?

> `optional` **children**: `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

Primary content

#### Inherited from

`UploaderProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`UploaderProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`UploaderProps.classPrefix`

***

### color?

> `optional` **color**: `Color`

A button can have different colors

#### Inherited from

`UploaderProps.color`

***

### content?

> `optional` **content**: `string`

#### Inherited from

`UploaderProps.content`

***

### contentEditable?

> `optional` **contentEditable**: `"inherit"` \| `Booleanish` \| `"plaintext-only"`

#### Inherited from

`UploaderProps.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`UploaderProps.contextMenu`

***

### customElement

> **customElement**: `boolean`

Whether to use a custom element for the uploader.

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`UploaderProps.dangerouslySetInnerHTML`

***

### data?

> `optional` **data**: `any`

Upload the parameters with

#### Inherited from

`UploaderProps.data`

***

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`UploaderProps.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`UploaderProps.defaultChecked`

***

### defaultFileList?

> `optional` **defaultFileList**: `FileType`[]

List of uploaded files

#### Inherited from

`UploaderProps.defaultFileList`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`UploaderProps.defaultValue`

***

### dir?

> `optional` **dir**: `string`

#### Inherited from

`UploaderProps.dir`

***

### disabled?

> `optional` **disabled**: `boolean`

Disabled upload button

#### Inherited from

`UploaderProps.disabled`

***

### disabledFileItem?

> `optional` **disabledFileItem**: `boolean`

Disabled file item

#### Inherited from

`UploaderProps.disabledFileItem`

***

### disableMultipart?

> `optional` **disableMultipart**: `boolean`

If 'true', disable using a multipart form for file upload and instead stream the file.
Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.

#### Inherited from

`UploaderProps.disableMultipart`

***

### draggable?

> `optional` **draggable**: `boolean`

Supported Drag and drop upload *

#### Inherited from

`UploaderProps.draggable`

***

### endIcon?

> `optional` **endIcon**: `ReactNode`

The icon element placed _after_ the button text

#### Inherited from

`UploaderProps.endIcon`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"done"` \| `"enter"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`UploaderProps.enterKeyHint`

***

### exportparts?

> `optional` **exportparts**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`UploaderProps.exportparts`

***

### fileList?

> `optional` **fileList**: `FileType`[]

List of uploaded files （Controlled）

#### Inherited from

`UploaderProps.fileList`

***

### fileListVisible?

> `optional` **fileListVisible**: `boolean`

File list can be rendered

#### Inherited from

`UploaderProps.fileListVisible`

***

### headers?

> `optional` **headers**: `any`

Set Upload request Header

#### Inherited from

`UploaderProps.headers`

***

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`UploaderProps.hidden`

***

### href?

> `optional` **href**: `string`

Providing a `href` will render an `<a>` element, _styled_ as a button

#### Inherited from

`UploaderProps.href`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`UploaderProps.id`

***

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`UploaderProps.inert`

***

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`UploaderProps.inlist`

***

### inputMode?

> `optional` **inputMode**: `"search"` \| `"none"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`UploaderProps.inputMode`

***

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`UploaderProps.is`

***

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`UploaderProps.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`UploaderProps.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`UploaderProps.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`UploaderProps.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`UploaderProps.itemType`

***

### label?

> `optional` **label**: `string`

The label for the uploader.

***

### lang?

> `optional` **lang**: `string`

#### Inherited from

`UploaderProps.lang`

***

### listType?

> `optional` **listType**: `"picture"` \| `"text"` \| `"picture-text"`

Upload list Style

#### Inherited from

`UploaderProps.listType`

***

### loading?

> `optional` **loading**: `boolean`

A button can show a loading indicator

#### Inherited from

`UploaderProps.loading`

***

### locale?

> `optional` **locale**: `UploaderLocale`

Custom locale

#### Inherited from

`UploaderProps.locale`

***

### maxPreviewFileSize?

> `optional` **maxPreviewFileSize**: `number`

Max file size limit of the preview file

#### Inherited from

`UploaderProps.maxPreviewFileSize`

***

### method?

> `optional` **method**: `string`

The http method of upload request

#### Inherited from

`UploaderProps.method`

***

### multiple?

> `optional` **multiple**: `boolean`

Allow multiple file uploads

#### Inherited from

`UploaderProps.multiple`

***

### name?

> `optional` **name**: `string`

Upload the parameter name of the corresponding file

#### Inherited from

`UploaderProps.name`

***

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`UploaderProps.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCanPlayThroughCapture`

***

### onChange()?

> `optional` **onChange**: (`fileList`, `event`) => `void`

callback function that the upload queue has changed

#### Parameters

##### fileList

`FileType`[]

##### event

`MouseEvent`\<`Element`, `MouseEvent`\> | `ChangeEvent`\<`Element`\>

#### Returns

`void`

#### Inherited from

`UploaderProps.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`UploaderProps.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`UploaderProps.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`UploaderProps.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`UploaderProps.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onEndedCapture`

***

### onError()?

> `optional` **onError**: (`status`, `file`, `event`, `xhr`) => `void`

Upload callback function with error

#### Parameters

##### status

`ErrorStatus`

##### file

`FileType`

##### event

`ProgressEvent`

##### xhr

`XMLHttpRequest`

#### Returns

`void`

#### Inherited from

`UploaderProps.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`UploaderProps.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`UploaderProps.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onPointerUpCapture`

***

### onPreview()?

> `optional` **onPreview**: (`file`, `event`) => `void`

In the file list, click the callback function for the uploaded file

#### Parameters

##### file

`FileType`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`UploaderProps.onPreview`

***

### onProgress()?

> `optional` **onProgress**: (`percent`, `file`, `event`, `xhr`) => `void`

Callback functions that upload progress change

#### Parameters

##### percent

`number`

##### file

`FileType`

##### event

`ProgressEvent`

##### xhr

`XMLHttpRequest`

#### Returns

`void`

#### Inherited from

`UploaderProps.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onRateChangeCapture`

***

### onRemove()?

> `optional` **onRemove**: (`file`) => `void`

In the file list, click the callback function to delete a file

#### Parameters

##### file

`FileType`

#### Returns

`void`

#### Inherited from

`UploaderProps.onRemove`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onResetCapture`

***

### onReupload()?

> `optional` **onReupload**: (`file`) => `void`

In the file list, for uploading failed files, click the callback function to upload

#### Parameters

##### file

`FileType`

#### Returns

`void`

#### Inherited from

`UploaderProps.onReupload`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSubmitCapture`

***

### onSuccess()?

> `optional` **onSuccess**: (`response`, `file`, `event`, `xhr`) => `void`

callback function after successful upload

#### Parameters

##### response

`any`

##### file

`FileType`

##### event

`ProgressEvent`

##### xhr

`XMLHttpRequest`

#### Returns

`void`

#### Inherited from

`UploaderProps.onSuccess`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onTransitionStartCapture`

***

### onUpload()?

> `optional` **onUpload**: (`file`, `uploadData`, `xhr`) => `void`

The callback function that starts the upload file

#### Parameters

##### file

`FileType`

##### uploadData

`any`

##### xhr

`XMLHttpRequest`

#### Returns

`void`

#### Inherited from

`UploaderProps.onUpload`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLElement`\>

#### Inherited from

`UploaderProps.onWheelCapture`

***

### part?

> `optional` **part**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`UploaderProps.part`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Render the control as plain text

#### Inherited from

`UploaderProps.plaintext`

***

### popover?

> `optional` **popover**: `""` \| `"hint"` \| `"auto"` \| `"manual"`

#### Inherited from

`UploaderProps.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`UploaderProps.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`UploaderProps.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`UploaderProps.prefix`

***

### property?

> `optional` **property**: `string`

#### Inherited from

`UploaderProps.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`UploaderProps.radioGroup`

***

### readOnly?

> `optional` **readOnly**: `boolean`

Make the control readonly

#### Inherited from

`UploaderProps.readOnly`

***

### rel?

> `optional` **rel**: `string`

#### Inherited from

`UploaderProps.rel`

***

### removable?

> `optional` **removable**: `boolean`

Removable list file

#### Inherited from

`UploaderProps.removable`

***

### renderFileInfo()?

> `optional` **renderFileInfo**: (`file`, `fileElement`) => `ReactNode`

Custom render file information

#### Parameters

##### file

`FileType`

##### fileElement

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`UploaderProps.renderFileInfo`

***

### renderThumbnail()?

> `optional` **renderThumbnail**: (`file`, `thumbnail`) => `ReactNode`

Custom render thumbnail

#### Parameters

##### file

`FileType`

##### thumbnail

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`UploaderProps.renderThumbnail`

***

### resource?

> `optional` **resource**: `string`

#### Inherited from

`UploaderProps.resource`

***

### results?

> `optional` **results**: `number`

#### Inherited from

`UploaderProps.results`

***

### rev?

> `optional` **rev**: `string`

#### Inherited from

`UploaderProps.rev`

***

### ripple?

> `optional` **ripple**: `boolean`

Ripple after button click

#### Inherited from

`UploaderProps.ripple`

***

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`UploaderProps.role`

***

### security?

> `optional` **security**: `string`

#### Inherited from

`UploaderProps.security`

***

### shouldQueueUpdate()?

> `optional` **shouldQueueUpdate**: (`fileList`, `newFile`) => `boolean` \| `Promise`\<`boolean`\>

Allow the queue to be updated. After you select a file, update the checksum function before the upload file queue, and return false to not update

#### Parameters

##### fileList

`FileType`[]

##### newFile

`FileType` | `FileType`[]

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Inherited from

`UploaderProps.shouldQueueUpdate`

***

### shouldUpload()?

> `optional` **shouldUpload**: (`file`) => `boolean` \| `Promise`\<`boolean`\>

Allow uploading of files. Check function before file upload, return false without uploading

#### Parameters

##### file

`FileType`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Inherited from

`UploaderProps.shouldUpload`

***

### size?

> `optional` **size**: `Size`

A button can have different sizes

#### Inherited from

`UploaderProps.size`

***

### slot?

> `optional` **slot**: `string`

#### Inherited from

`UploaderProps.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`UploaderProps.spellCheck`

***

### startIcon?

> `optional` **startIcon**: `ReactNode`

The icon element placed _before_ the button text

#### Inherited from

`UploaderProps.startIcon`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`UploaderProps.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`UploaderProps.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`UploaderProps.suppressHydrationWarning`

***

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`UploaderProps.tabIndex`

***

### target?

> `optional` **target**: `string`

Where to display the linked URL

#### Inherited from

`UploaderProps.target`

***

### timeout?

> `optional` **timeout**: `number`

Set upload timeout

#### Inherited from

`UploaderProps.timeout`

***

### title?

> `optional` **title**: `string`

#### Inherited from

`UploaderProps.title`

***

### toggleAs?

> `optional` **toggleAs**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`UploaderProps.toggleAs`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`UploaderProps.translate`

***

### type?

> `optional` **type**: `"button"` \| `"reset"` \| `"submit"`

Defines HTML button type attribute

#### Inherited from

`UploaderProps.type`

***

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`UploaderProps.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`UploaderProps.unselectable`

***

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`UploaderProps.vocab`

***

### withCredentials?

> `optional` **withCredentials**: `boolean`

Whether to carry cookies when uploading requests

#### Inherited from

`UploaderProps.withCredentials`
