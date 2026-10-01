# Interface: RichTextEditorProps

The Rich text editor component properties.

## Extends

- `Omit`\<`ReactQuill.ReactQuillProps`, `"formats"` \| `"modules"`\>

## Properties

### bounds?

> `optional` **bounds?**: `HTMLElement` \| `string`

#### Inherited from

`Omit.bounds`

***

### children?

> `optional` **children?**: `ReactElement`\<`any`, `JSXElementConstructor`\<`any`\> \| `string`\>

#### Inherited from

`Omit.children`

***

### className?

> `optional` **className?**: `string`

The CSS class name.

#### Overrides

`Omit.className`

***

### data-testid?

> `optional` **data-testid?**: `string`

Test id applied to the labeled wrapper. ReactQuill does not forward this attribute.

***

### defaultValue?

> `optional` **defaultValue?**: `Value`

#### Inherited from

`Omit.defaultValue`

***

### features?

> `optional` **features?**: `Partial`\<`Record`\<[`RichTextFeature`](../type-aliases/RichTextFeature.md), `boolean`\>\>

Feature flags. Each key fully enables or disables format, toolbar, and module for that group.

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`Omit.id`

***

### initialValue?

> `optional` **initialValue?**: `string`

The initial value for the editor.

***

### label?

> `optional` **label?**: `string`

The label for the component.

***

### onBlur?

> `optional` **onBlur?**: (`previousSelection`, `source`, `editor`) => `void`

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

`Omit.onBlur`

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

`Omit.onChange`

***

### onChangeSelection?

> `optional` **onChangeSelection?**: (`selection`, `source`, `editor`) => `void`

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

`Omit.onChangeSelection`

***

### onFocus?

> `optional` **onFocus?**: (`selection`, `source`, `editor`) => `void`

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

`Omit.onFocus`

***

### onKeyDown?

> `optional` **onKeyDown?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`Omit.onKeyDown`

***

### onKeyPress?

> `optional` **onKeyPress?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`Omit.onKeyPress`

***

### onKeyUp?

> `optional` **onKeyUp?**: (`event`) => `void`

#### Parameters

##### event

`any`

#### Returns

`void`

#### Inherited from

`Omit.onKeyUp`

***

### placeholder?

> `optional` **placeholder?**: `string`

#### Inherited from

`Omit.placeholder`

***

### preserveWhitespace?

> `optional` **preserveWhitespace?**: `boolean`

#### Inherited from

`Omit.preserveWhitespace`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

#### Inherited from

`Omit.readOnly`

***

### style?

> `optional` **style?**: `CSSProperties`

#### Inherited from

`Omit.style`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`Omit.tabIndex`

***

### theme?

> `optional` **theme?**: `string`

#### Inherited from

`Omit.theme`

***

### useSemanticHTML?

> `optional` **useSemanticHTML?**: `boolean`

If true, stores Quill semantic HTML instead of the editor DOM HTML.

#### Overrides

`Omit.useSemanticHTML`

***

### value?

> `optional` **value?**: `Value`

#### Inherited from

`Omit.value`
