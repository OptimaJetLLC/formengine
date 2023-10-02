---
id: "react_form_builder_core.Form"
title: "Class: Form"
sidebar_label: "Form"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Form

Represents a form that is rendered in Viewer or edited in Builder.

## Constructors

### constructor

• **new Form**(`componentTree`, `localization`, `actions`, `languages`, `defaultLanguage`)

Creates a new instance of Form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentTree` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the root component of the form. |
| `localization` | [`LocalizationStore`](react_form_builder_core.LocalizationStore.md) | the localization of the form. |
| `actions` | [`ActionValues`](../modules/react_form_builder_core.md#actionvalues) | the form custom actions. |
| `languages` | [`Language`](react_form_builder_core.Language.md)[] | the localization languages of the form. |
| `defaultLanguage` | [`Language`](react_form_builder_core.Language.md) | the default localization language of the form. |

## Properties

### actions

• `Readonly` **actions**: [`ActionValues`](../modules/react_form_builder_core.md#actionvalues)

___

### componentTree

• `Readonly` **componentTree**: [`ComponentData`](react_form_builder_core.ComponentData.md)

Root component of the form.

___

### defaultLanguage

• **defaultLanguage**: [`Language`](react_form_builder_core.Language.md)

Default localization language of the form.

___

### errorProps

• **errorProps**: `any` = `{}`

___

### errorType

• `Optional` **errorType**: `string`

___

### languages

• `Readonly` **languages**: [`Language`](react_form_builder_core.Language.md)[] = `[]`

Localization languages of the form.

___

### localization

• `Readonly` **localization**: [`LocalizationStore`](react_form_builder_core.LocalizationStore.md)

Localization of the form.

___

### tooltipType

• `Optional` **tooltipType**: `string`

## Accessors

### actionNames

• `get` **actionNames**(): `string`[]

#### Returns

`string`[]

the actions names array.

## Methods

### cloneAction

▸ **cloneAction**(`namedAction`): `void`

Clones the action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namedAction` | [`NamedActionDefinition`](../modules/react_form_builder_core.md#namedactiondefinition) | the named action to clone. |

#### Returns

`void`

___

### dispose

▸ **dispose**(): `void`

Disposes the form. Disposes all the components and localization.

#### Returns

`void`

___

### initFields

▸ **initFields**(): `void`

Initializes form fields.

#### Returns

`void`

___

### onComponentDataAfterKeyChanged

▸ `Private` **onComponentDataAfterKeyChanged**(`_`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`ComponentData`](react_form_builder_core.ComponentData.md) |
| `«destructured»` | `Object` |
| › `newKey` | `string` |
| › `oldKey` | `string` |

#### Returns

`void`

___

### onComponentDataBeforeDelete

▸ `Private` **onComponentDataBeforeDelete**(`component`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`ComponentData`](react_form_builder_core.ComponentData.md) |

#### Returns

`void`

___

### rebindActionData

▸ `Private` **rebindActionData**(`actionData`, `newAction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionData` | [`ActionData`](../modules/react_form_builder_core.md#actiondata) |
| `newAction` | [`NamedActionDefinition`](../modules/react_form_builder_core.md#namedactiondefinition) |

#### Returns

`void`

___

### rebindActionHandlers

▸ `Private` **rebindActionHandlers**(`componentStore`, `oldActionName`, `newAction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |
| `oldActionName` | `string` |
| `newAction` | [`NamedActionDefinition`](../modules/react_form_builder_core.md#namedactiondefinition) |

#### Returns

`void`

___

### removeAction

▸ **removeAction**(`name`): `void`

Removes the action from the form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the action name to remove. |

#### Returns

`void`

___

### removeCustomActionBinding

▸ `Private` **removeCustomActionBinding**(`actionName`, `componentStore`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionName` | `string` |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

`void`

___

### updateOrAddAction

▸ **updateOrAddAction**(`oldActionName`, `newAction`): `void`

Changes the existing action to the new one, adds the action if the existing action is not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldActionName` | `string` | the existing action name. |
| `newAction` | [`NamedActionDefinition`](../modules/react_form_builder_core.md#namedactiondefinition) | the new named action. |

#### Returns

`void`
