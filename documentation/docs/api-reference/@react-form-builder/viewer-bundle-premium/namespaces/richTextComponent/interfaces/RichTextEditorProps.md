# Interface: RichTextEditorProps

The Rich text editor component properties.

## Extends

- `ReactQuillProps`

## Properties

### bounds?

> `optional` **bounds?**: `HTMLElement` \| `string`

#### Inherited from

`ReactQuill.ReactQuillProps.bounds`

***

### children?

> `optional` **children?**: `ReactElement`\<`any`, `JSXElementConstructor`\<`any`\> \| `string`\>

#### Inherited from

`ReactQuill.ReactQuillProps.children`

***

### className?

> `optional` **className?**: `string`

The CSS class name.

#### Overrides

`ReactQuill.ReactQuillProps.className`

***

### defaultValue?

> `optional` **defaultValue?**: `Value`

#### Inherited from

`ReactQuill.ReactQuillProps.defaultValue`

***

### formats?

> `optional` **formats?**: `string`[]

#### Inherited from

`ReactQuill.ReactQuillProps.formats`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`ReactQuill.ReactQuillProps.id`

***

### initialValue?

> `optional` **initialValue?**: `string`

The initial value for the editor.

***

### label?

> `optional` **label?**: `string`

The label for the component.

***

### modules?

> `optional` **modules?**: `Record`\<`string`, `unknown`\>

Allows to customize the behavior and functionality of the editor.

#### Overrides

`ReactQuill.ReactQuillProps.modules`

***

### onChange

> **onChange**: (`value?`) => `void`

Triggered after the content changed.

#### Parameters

##### value?

`string`

#### Returns

`void`

#### Overrides

`ReactQuill.ReactQuillProps.onChange`

***

### onKeyDown?

> `optional` **onKeyDown?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onKeyDown`

***

### onKeyPress?

> `optional` **onKeyPress?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onKeyPress`

***

### onKeyUp?

> `optional` **onKeyUp?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onKeyUp`

***

### placeholder?

> `optional` **placeholder?**: `string`

#### Inherited from

`ReactQuill.ReactQuillProps.placeholder`

***

### preserveWhitespace?

> `optional` **preserveWhitespace?**: `boolean`

#### Inherited from

`ReactQuill.ReactQuillProps.preserveWhitespace`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

#### Inherited from

`ReactQuill.ReactQuillProps.readOnly`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`ReactQuill.ReactQuillProps.style`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`ReactQuill.ReactQuillProps.tabIndex`

***

### theme?

> `optional` **theme?**: `string`

#### Inherited from

`ReactQuill.ReactQuillProps.theme`

***

### toolbarOptions?

> `optional` **toolbarOptions?**: (`"align"` \| `"block"` \| `"clean"` \| `"color"` \| `"decoration"` \| `"direction"` \| `"font"` \| `"header"` \| `"indent"` \| `"insert"` \| `"list"` \| `"script"` \| `"size"`)[]

Groups of buttons to be displayed on the toolbar.

***

### value?

> `optional` **value?**: `Value`

#### Inherited from

`ReactQuill.ReactQuillProps.value`

## Methods

### onBlur()?

> `optional` **onBlur**(`previousSelection`, `source`, `editor`): `void`

#### Parameters

##### previousSelection

`Range`

##### source

`EmitterSource`

##### editor

`UnprivilegedEditor`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onBlur`

***

### onChangeSelection()?

> `optional` **onChangeSelection**(`selection`, `source`, `editor`): `void`

#### Parameters

##### selection

`Range`

##### source

`EmitterSource`

##### editor

`UnprivilegedEditor`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onChangeSelection`

***

### onFocus()?

> `optional` **onFocus**(`selection`, `source`, `editor`): `void`

#### Parameters

##### selection

`Range`

##### source

`EmitterSource`

##### editor

`UnprivilegedEditor`

#### Returns

`void`

#### Inherited from

`ReactQuill.ReactQuillProps.onFocus`
