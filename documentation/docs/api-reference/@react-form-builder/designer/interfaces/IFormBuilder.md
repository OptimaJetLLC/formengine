# Interface: IFormBuilder

The form builder settings interface.
Imperative action methods are optional for backward-compatible mocks and custom
implementations; the designer `builderRef` / `useFormBuilder()` instance always provides them.

## Properties

### cloneSelected?

> `optional` **cloneSelected?**: () => `void`

Clones the selected component when exactly one component is selected.

#### Returns

`void`

***

### deleteSelected?

> `optional` **deleteSelected?**: () => `void`

Deletes the currently selected components from the form.

#### Returns

`void`

***

### parseForm

> **parseForm**: (`text`) => `void`

Sets the form serialized in JSON as the current form.

#### Parameters

##### text

`string`

the form serialized in JSON.

#### Returns

`void`

***

### print?

> `optional` **print?**: () => `void`

Prints the form (switches to viewer mode for printing when needed).

#### Returns

`void`

***

### redo?

> `optional` **redo?**: () => `void`

Redoes the last undone form edit.

#### Returns

`void`

***

### reloadFormList

> **reloadFormList**: () => `void`

Updates the form list on the Forms tab.

#### Returns

`void`

***

### save?

> `optional` **save?**: (`formName?`) => `Promise`\<`void`\>

Saves the current form to form storage without showing the designer toast.
Built-in Ctrl/Cmd+S and the Save menu still show success/error toasts via the UI layer.

#### Parameters

##### formName?

`string`

the optional form name. When omitted, the active form name is used.

#### Returns

`Promise`\<`void`\>

the promise that resolves when the form is saved.

***

### undo?

> `optional` **undo?**: () => `void`

Undoes the last form edit.

#### Returns

`void`

## Accessors

### builderMode

#### Get Signature

> **get** **builderMode**(): [`BuilderMode`](../../core/type-aliases/BuilderMode.md)

##### Returns

[`BuilderMode`](../../core/type-aliases/BuilderMode.md)

the current form builder mode. Builder or viewer.

#### Set Signature

> **set** **builderMode**(`mode`): `void`

Sets the form builder mode. Builder or viewer.

##### Parameters

###### mode

[`BuilderMode`](../../core/type-aliases/BuilderMode.md)

##### Returns

`void`

***

### formAsString

#### Get Signature

> **get** **formAsString**(): `string`

##### Returns

`string`

the current form serialized to JSON.
