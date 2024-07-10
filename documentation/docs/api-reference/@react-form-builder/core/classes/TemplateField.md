# Class: TemplateField

The field with the form data, contains the value of the nested form. **Internal use only.**

## Implements

- [`Field`](../interfaces/Field.md)

## Constructors

### new TemplateField()

> **new TemplateField**(`componentStore`, `viewerStore`): [`TemplateField`](TemplateField.md)

Creates the nested form field with form data for the component.

#### Parameters

• **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

• **viewerStore**: [`IStore`](../interfaces/IStore.md)

viewerStore the form viewer settings.

#### Returns

[`TemplateField`](TemplateField.md)

## Properties

### componentStore

> `readonly` **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

***

### touched

> **touched**: `boolean` = `false`

Flag, true, if the field is marked as touched.

#### Implementation of

[`Field`](../interfaces/Field.md).[`touched`](../interfaces/Field.md#touched)

***

### valued

> **valued**: `string` = `''`

The name of the component property that contains the field value.

#### Implementation of

[`Field`](../interfaces/Field.md).[`valued`](../interfaces/Field.md#valued)

***

### viewerStore

> `readonly` **viewerStore**: [`IStore`](../interfaces/IStore.md)

viewerStore the form viewer settings.

## Accessors

### errors

> `get` **errors**(): `Record`\<`string`, `unknown`\>

Contains a field validation errors if the field provides multiple errors (i.e. field is template).

#### Returns

`Record`\<`string`, `unknown`\>

#### Implementation of

[`Field`](../interfaces/Field.md).[`errors`](../interfaces/Field.md#errors)

***

### form

> `get` **form**(): [`ComponentData`](ComponentData.md)

#### Returns

[`ComponentData`](ComponentData.md)

the form for the field.

***

### storeDataInParentForm

> `get` **storeDataInParentForm**(): `any`

Flag, false if nested form data show as nested object, true otherwise.

#### Returns

`any`

#### Implementation of

[`Field`](../interfaces/Field.md).[`storeDataInParentForm`](../interfaces/Field.md#storedatainparentform)

***

### value

> `get` **value**(): `unknown`

Value of the field.

#### Returns

`unknown`

#### Implementation of

[`Field`](../interfaces/Field.md).[`value`](../interfaces/Field.md#value)

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`clear`](../interfaces/Field.md#clear)

***

### dispose()

> **dispose**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`dispose`](../interfaces/Field.md#dispose)

***

### getValidationResult()

> **getValidationResult**(): `Promise`\<`undefined`\>

#### Returns

`Promise`\<`undefined`\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

#### Implementation of

[`Field`](../interfaces/Field.md).[`getValidationResult`](../interfaces/Field.md#getvalidationresult)

***

### init()

> **init**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`init`](../interfaces/Field.md#init)

***

### reset()

> **reset**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`reset`](../interfaces/Field.md#reset)

***

### setError()

> **setError**(`error`): `void`

#### Parameters

• **error**: `unknown`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`setError`](../interfaces/Field.md#seterror)

***

### setTouched()

> **setTouched**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`setTouched`](../interfaces/Field.md#settouched)

***

### setValue()

> **setValue**(`value`): `void`

#### Parameters

• **value**: `unknown`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`setValue`](../interfaces/Field.md#setvalue)

***

### validate()

> **validate**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherit Doc

#### Implementation of

[`Field`](../interfaces/Field.md).[`validate`](../interfaces/Field.md#validate)
