# Interface: IFormBuilder

The form builder settings interface.

## Properties

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

### reloadFormList

> **reloadFormList**: () => `void`

Updates the form list on the Forms tab.

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
