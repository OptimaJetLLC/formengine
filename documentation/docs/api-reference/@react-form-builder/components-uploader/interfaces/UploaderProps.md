# Interface: UploaderProps

The properties of the Uploader component.

## Extends

- `DropzoneOptions`
- `ComponentProps`\<`any`\>

## Indexable

> \[`key`: `string`\]: `any`

## Properties

### accept?

> `optional` **accept?**: `AcceptGroup`[] \| `Accept`

#### Inherited from

`DropzoneOptions.accept`

***

### action

> **action**: `string`

URL to upload files to.

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

#### Inherited from

`DropzoneOptions.autoFocus`

***

### disabled?

> `optional` **disabled?**: `boolean`

If true, the children are in disabled state.

#### Overrides

`DropzoneOptions.disabled`

***

### dropzone?

> `optional` **dropzone?**: `boolean`

If true, the dropzone will show.

***

### getErrorMessage?

> `optional` **getErrorMessage?**: (`error`, `file`) => `string`

Override the message of any rejection error (built-in or custom). Called once per error;
receives the error and the file it belongs to and returns the message to use. Return
`error.message` for codes you don't want to change. Useful for localizing error messages.

#### Parameters

##### error

`FileError`

##### file

`File`

#### Returns

`string`

#### Inherited from

`DropzoneOptions.getErrorMessage`

***

### getFilesFromEvent?

> `optional` **getFilesFromEvent?**: (`event`) => `Promise`\<(`DataTransferItem` \| `File`)[]\>

#### Parameters

##### event

`FileSystemFileHandle`[] \| `DropEvent`

#### Returns

`Promise`\<(`DataTransferItem` \| `File`)[]\>

#### Inherited from

`DropzoneOptions.getFilesFromEvent`

***

### maxFiles?

> `optional` **maxFiles?**: `number`

#### Inherited from

`DropzoneOptions.maxFiles`

***

### maxSize?

> `optional` **maxSize?**: `number`

#### Inherited from

`DropzoneOptions.maxSize`

***

### minSize?

> `optional` **minSize?**: `number`

#### Inherited from

`DropzoneOptions.minSize`

***

### multiple?

> `optional` **multiple?**: `boolean`

#### Inherited from

`DropzoneOptions.multiple`

***

### noClick?

> `optional` **noClick?**: `boolean`

#### Inherited from

`DropzoneOptions.noClick`

***

### noDrag?

> `optional` **noDrag?**: `boolean`

#### Inherited from

`DropzoneOptions.noDrag`

***

### noDragEventsBubbling?

> `optional` **noDragEventsBubbling?**: `boolean`

#### Inherited from

`DropzoneOptions.noDragEventsBubbling`

***

### noKeyboard?

> `optional` **noKeyboard?**: `boolean`

#### Inherited from

`DropzoneOptions.noKeyboard`

***

### noPaste?

> `optional` **noPaste?**: `boolean`

If true, disables paste-to-upload. By default, when the dropzone (or a focused child) receives a
paste that carries files - e.g. a screenshot pasted with Ctrl/Cmd+V - those files go through the
same `accept`/size/`validator` checks and `onDrop` callbacks as a drop. Pastes with no files
(plain text, etc.) are ignored and left untouched. See
https://github.com/react-dropzone/react-dropzone/issues/1210

#### Inherited from

`DropzoneOptions.noPaste`

***

### onChange?

> `optional` **onChange?**: [`OnSuccess`](../type-aliases/OnSuccess.md)

Callback function called when files are successfully uploaded.

***

### onDragEnter?

> `optional` **onDragEnter?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragEnter`

***

### onDragLeave?

> `optional` **onDragLeave?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragLeave`

***

### onDragOver?

> `optional` **onDragOver?**: `DragEventHandler`\<`HTMLElement`\>

#### Inherited from

`DropzoneOptions.onDragOver`

***

### onDrop?

> `optional` **onDrop?**: \<`T`\>(`acceptedFiles`, `fileRejections`, `event`) => `void`

#### Type Parameters

##### T

`T` *extends* `File`

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

### onDropAccepted?

> `optional` **onDropAccepted?**: \<`T`\>(`files`, `event`) => `void`

#### Type Parameters

##### T

`T` *extends* `File`

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

### onDropRejected?

> `optional` **onDropRejected?**: (`fileRejections`, `event`) => `void`

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

> `optional` **onError?**: [`OnError`](../type-aliases/OnError.md)

Callback function called when an error occurs during upload.

#### Overrides

`DropzoneOptions.onError`

***

### onFileDialogCancel?

> `optional` **onFileDialogCancel?**: () => `void`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onFileDialogCancel`

***

### onFileDialogOpen?

> `optional` **onFileDialogOpen?**: () => `void`

#### Returns

`void`

#### Inherited from

`DropzoneOptions.onFileDialogOpen`

***

### paste?

> `optional` **paste?**: `boolean`

If true, pasting files (for example screenshots) into the uploader uploads them.

***

### preventDropOnDocument?

> `optional` **preventDropOnDocument?**: `boolean`

#### Inherited from

`DropzoneOptions.preventDropOnDocument`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If true, the children are in read-only state.

***

### useFsAccessApi?

> `optional` **useFsAccessApi?**: `boolean`

#### Inherited from

`DropzoneOptions.useFsAccessApi`

***

### validator?

> `optional` **validator?**: \<`T`\>(`file`) => `Promise`\<`ValidatorResult`\> \| `ValidatorResult`

Custom validation, run once per file on drop/selection. Return `null` to accept the file, or a
FileError (or array of them) to reject it. May be `async` (return a `Promise`) to support
checks that can't run synchronously - e.g. reading image dimensions, inspecting file contents,
or calling an external service. While an async validator is pending, DropzoneState.isProcessing
is `true`, and `onDrop`/`onDropAccepted`/`onDropRejected` fire only once it settles. If the
validator throws or rejects, `onError` is called and the drop is discarded.

Note: the validator never runs during a drag (a `DataTransferItem` has no name/size), so a
validator-configured dropzone is `isDragUnknown` until drop.

#### Type Parameters

##### T

`T` *extends* `File`

#### Parameters

##### file

`T`

#### Returns

`Promise`\<`ValidatorResult`\> \| `ValidatorResult`

#### Inherited from

`DropzoneOptions.validator`

***

### value

> **value**: [`FileType`](FileType.md)[]

Current value of the uploader (array of uploaded files).
