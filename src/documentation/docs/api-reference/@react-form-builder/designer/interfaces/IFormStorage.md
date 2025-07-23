# Interface: IFormStorage

Interface for storing forms in an external storage.

## Properties

### getForm()

> **getForm**: (`formName`, `options?`) => `Promise`\<`string`\>

Returns the form serialized in JSON by the form name.

#### Parameters

##### formName

`string`

the form name.

##### options?

`any`

the form options.

#### Returns

`Promise`\<`string`\>

the Promise with the form serialized in JSON.

***

### getFormNames()

> **getFormNames**: () => `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

the Promise with an array of form names.

***

### removeForm()

> **removeForm**: (`formName`) => `Promise`\<`any`\>

Removes the form by form name.

#### Parameters

##### formName

`string`

the form name.

#### Returns

`Promise`\<`any`\>

the Promise with the result of removal.

***

### saveForm()

> **saveForm**: (`formName`, `formValue`) => `Promise`\<`any`\>

Saves the form serialized in JSON.

#### Parameters

##### formName

`string`

the form name.

##### formValue

`string`

the form serialized in JSON.

#### Returns

`Promise`\<`any`\>

the Promise with the result of saving the form.
