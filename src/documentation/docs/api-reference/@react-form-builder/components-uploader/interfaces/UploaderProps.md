# Interface: UploaderProps

The properties of the Uploader component.

## Extends

- `DropzoneOptions`.`ComponentProps`\<`any`\>

## Indexable

\[`key`: `string`\]: `any`

## Properties

### accept?

> `optional` **accept**: `Accept`

#### Inherited from

`DropzoneOptions.accept`

***

### action

> **action**: `string`

URL to upload files to.

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`DropzoneOptions.autoFocus`

***

### disabled?

> `optional` **disabled**: `boolean`

If true, the children are in disabled state.

#### Overrides

`DropzoneOptions.disabled`

***

### dropzone?

> `optional` **dropzone**: `boolean`

If true, the dropzone will show.

***

### getFilesFromEvent()?

> `optional` **getFilesFromEvent**: (`event`) => `Promise`\<(`File` \| `DataTransferItem`)[]\>

#### Parameters

##### event

`DropEvent`

#### Returns

`Promise`\<(`File` \| `DataTransferItem`)[]\>

#### Inherited from

`DropzoneOptions.getFilesFromEvent`

***

### maxFiles?

> `optional` **maxFiles**: `number`

#### Inherited from

`DropzoneOptions.maxFiles`

***

### maxSize?

> `optional` **maxSize**: `number`

#### Inherited from

`DropzoneOptions.maxSize`

***

### minSize?

> `optional` **minSize**: `number`

#### Inherited from

`DropzoneOptions.minSize`

***

### multiple?

> `optional` **multiple**: `boolean`

#### Inherited from

`DropzoneOptions.multiple`

***

### noClick?

> `optional` **noClick**: `boolean`

#### Inherited from

`DropzoneOptions.noClick`

***

### noDrag?

> `optional` **noDrag**: `boolean`

#### Inherited from

`DropzoneOptions.noDrag`

***

### noDragEventsBubbling?

> `optional` **noDragEventsBubbling**: `boolean`

#### Inherited from

`DropzoneOptions.noDragEventsBubbling`

***

### noKeyboard?

> `optional` **noKeyboard**: `boolean`

#### Inherited from

`DropzoneOptions.noKeyboard`

***

### onChange?

> `optional` **onChange**: [`OnSuccess`](../type-aliases/OnSuccess.md)

Callback function called when files are successfully uploaded.

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragEnter`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragLeave`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragOver`

***

### onDrop()?

> `optional` **onDrop**: \<`T`\>(`acceptedFiles`, `fileRejections`, `event`) => `void`

#### Type Parameters

##### T

`T` *extends* `File`\<`T`\>

#### Parameters

##### acceptedFiles

`T`[]

##### fileRejections

`FileRejection`[]

##### event

`DropEvent`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onDrop`

***

### onDropAccepted()?

> `optional` **onDropAccepted**: \<`T`\>(`files`, `event`) => `void`

#### Type Parameters

##### T

`T` *extends* `File`\<`T`\>

#### Parameters

##### files

`T`[]

##### event

`DropEvent`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onDropAccepted`

***

### onDropRejected()?

> `optional` **onDropRejected**: (`fileRejections`, `event`) => `void`

#### Parameters

##### fileRejections

`FileRejection`[]

##### event

`DropEvent`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onDropRejected`

***

### onError?

> `optional` **onError**: [`OnError`](../type-aliases/OnError.md)

Callback function called when an error occurs during upload.

#### Overrides

`DropzoneOptions.onError`

***

### onFileDialogCancel()?

> `optional` **onFileDialogCancel**: () => `void`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onFileDialogCancel`

***

### onFileDialogOpen()?

> `optional` **onFileDialogOpen**: () => `void`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onFileDialogOpen`

***

### preventDropOnDocument?

> `optional` **preventDropOnDocument**: `boolean`

#### Inherited from

`DropzoneOptions.preventDropOnDocument`

***

### readOnly?

> `optional` **readOnly**: `boolean`

If true, the children are in read-only state.

***

### useFsAccessApi?

> `optional` **useFsAccessApi**: `boolean`

#### Inherited from

`DropzoneOptions.useFsAccessApi`

***

### validator()?

> `optional` **validator**: \<`T`\>(`file`) => `null` \| `FileError` \| readonly `FileError`[]

#### Type Parameters

##### T

`T` *extends* `File`\<`T`\>

#### Parameters

##### file

`T`

#### Returns

`null` \| `FileError` \| readonly `FileError`[]

#### Inherited from

`DropzoneOptions.validator`

***

### value

> **value**: [`FileType`](FileType.md)[]

Current value of the uploader (array of uploaded files).
