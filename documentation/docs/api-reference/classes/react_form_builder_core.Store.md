---
id: "react_form_builder_core.Store"
title: "Class: Store"
sidebar_label: "Store"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Store

The form viewer settings.

## Constructors

### constructor

• **new Store**(`props`, `actions?`, `isBuilderMode?`, `parentStore?`, `keyInParent?`)

Creates form viewer settings.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `props` | `Readonly`<[`StoreProps`](../interfaces/react_form_builder_core.StoreProps.md)\> | `undefined` | the form viewer properties. |
| `actions` | `ActionDefinition`[] | `[]` | the array of action definitions. |
| `isBuilderMode` | `boolean` | `false` | true if the form viewer is inside the form builder, false otherwise. |
| `parentStore?` | [`Store`](react_form_builder_core.Store.md) | `undefined` | the form viewer settings, used in templates. |
| `keyInParent?` | `string` | `undefined` | the template component key. |

## Properties

### #props

• `Private` `Readonly` **#props**: `Readonly`<[`StoreProps`](../interfaces/react_form_builder_core.StoreProps.md)\>

___

### actions

• **actions**: `ActionDefinition`[] = `[]`

the array of action definitions.

___

### cache

• **cache**: `WeakMap`<[`ComponentStore`](react_form_builder_core.ComponentStore.md), [`ComponentData`](../modules/react_form_builder_core.md#componentdata)\>

___

### defaultLanguage

• `Optional` **defaultLanguage**: [`Language`](react_form_builder_core.Language.md)

___

### eventSubject

• `Readonly` **eventSubject**: `Subject`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\>

___

### form

• `Readonly` **form**: `Form`

___

### isBuilderMode

• **isBuilderMode**: `boolean` = `false`

true if the form viewer is inside the form builder, false otherwise.

___

### keyInParent

• `Private` `Optional` `Readonly` **keyInParent**: `string`

the template component key.

___

### languages

• **languages**: [`Language`](react_form_builder_core.Language.md)[] = `[]`

___

### localization

• **localization**: [`LocalizationStore`](react_form_builder_core.LocalizationStore.md)

___

### parentStore

• `Optional` `Readonly` **parentStore**: [`Store`](react_form_builder_core.Store.md)

the form viewer settings, used in templates.

___

### screen

• **screen**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)

___

### selectedLanguage

• `Optional` **selectedLanguage**: [`Language`](react_form_builder_core.Language.md)

___

### viewMode

• **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode) = `'desktop'`

## Accessors

### displayedLanguage

• `get` **displayedLanguage**(): [`Language`](react_form_builder_core.Language.md)

#### Returns

[`Language`](react_form_builder_core.Language.md)

the [Language](react_form_builder_core.Language.md) displayed in Form Viewer.

___

### isDefaultLanguage

• `get` **isDefaultLanguage**(): `boolean`

#### Returns

`boolean`

true if the displayed language is the default language, false otherwise.

___

### isTemplateStore

• `get` **isTemplateStore**(): `boolean`

#### Returns

`boolean`

true if these settings are used to display the pattern, false otherwise.

___

### slotsContent

• `get` **slotsContent**(): `undefined` \| `Record`<`string`, [`ComponentStore`](react_form_builder_core.ComponentStore.md)\>

#### Returns

`undefined` \| `Record`<`string`, [`ComponentStore`](react_form_builder_core.ComponentStore.md)\>

the Record with template slot settings.

___

### templateBuilderMode

• `get` **templateBuilderMode**(): `boolean`

#### Returns

`boolean`

true if the template can be displayed in builder mode (e.g. with drop zones), false otherwise.

___

### tooltipComponent

• `get` **tooltipComponent**(): `undefined` \| [`Model`](react_form_builder_core.Model.md)<`any`\>

#### Returns

`undefined` \| [`Model`](react_form_builder_core.Model.md)<`any`\>

the component's metadata for displaying the tooltip.

___

### tooltipType

• `get` **tooltipType**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

the type of React component used to display the tooltip.

## Methods

### #applyPersistedForm

▸ `Private` **#applyPersistedForm**(`persistedForm`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `persistedForm` | [`PersistedForm`](../interfaces/react_form_builder_core.PersistedForm.md) | saved form value. |

#### Returns

`void`

___

### #onLoadError

▸ `Private` **#onLoadError**(`e`): `void`

Changes the form to the component with an error description.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` | the error. |

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

___

### findAction

▸ **findAction**(`actionData`): `ActionDefinition`

Searches for an action, returns definition for the found action.

**`Throws`**

Error, if action was not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionData` | [`ActionData`](../modules/react_form_builder_core.md#actiondata) | the action's data. |

#### Returns

`ActionDefinition`

the action definition.

___

### findComponent

▸ **findComponent**(`key`): `undefined` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md)

Searches for and returns the component settings for the specified component key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the component key. |

#### Returns

`undefined` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md)

the found component settings or undefined.

___

### getComponent

▸ **getComponent**(`key`): [`ComponentStore`](react_form_builder_core.ComponentStore.md)

Returns the component settings for the specified component key.

**`Throws`**

Error if the component is not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the component key. |

#### Returns

[`ComponentStore`](react_form_builder_core.ComponentStore.md)

the found component settings.

___

### getComponentData

▸ **getComponentData**(`value`): [`ComponentData`](../modules/react_form_builder_core.md#componentdata)

Returns the element in the component tree of the form viewer.

**`Throws`**

Error, if the component is not found in the component tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings or component key. |

#### Returns

[`ComponentData`](../modules/react_form_builder_core.md#componentdata)

the element in the component tree of the form viewer.

___

### getLinkedActions

▸ **getLinkedActions**(`target?`): `undefined` \| `ActionDefinition`[]

Returns the array with action definitions for the specified component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target?` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings. |

#### Returns

`undefined` \| `ActionDefinition`[]

the array with action definitions for the specified component.

___

### loadForm

▸ **loadForm**(`getForm?`, `formName?`): `void`

Loads a form by form name and sets that form in the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `getForm?` | (`name?`: `string`) => [`PersistedForm`](../interfaces/react_form_builder_core.PersistedForm.md) \| `Promise`<[`PersistedForm`](../interfaces/react_form_builder_core.PersistedForm.md)\> | the function that loads the form. |
| `formName?` | `string` | the form name. |

#### Returns

`void`

___

### reduceScreen

▸ **reduceScreen**<`T`\>(`callback`, `initialValue`): `T`

Performs the callback function on each element of the component tree, accumulates the return values.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`accumulator`: `T`, `current`: [`ComponentStore`](react_form_builder_core.ComponentStore.md)) => `T` | the function that calculates the value for the accumulator. |
| `initialValue` | `T` | the initial value for the accumulator. |

#### Returns

`T`

the accumulated value.
