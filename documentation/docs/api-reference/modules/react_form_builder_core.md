---
id: "react_form_builder_core"
title: "Module: @react-form-builder/core"
sidebar_label: "@react-form-builder/core"
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [BiDi](../enums/react_form_builder_core.BiDi.md)

## Classes

- [ActionEventArgs](../classes/react_form_builder_core.ActionEventArgs.md)
- [BaseCompilationResult](../classes/react_form_builder_core.BaseCompilationResult.md)
- [CompilationResult](../classes/react_form_builder_core.CompilationResult.md)
- [ComponentStore](../classes/react_form_builder_core.ComponentStore.md)
- [DataValidator](../classes/react_form_builder_core.DataValidator.md)
- [Language](../classes/react_form_builder_core.Language.md)
- [LocalizationStore](../classes/react_form_builder_core.LocalizationStore.md)
- [Model](../classes/react_form_builder_core.Model.md)
- [Store](../classes/react_form_builder_core.Store.md)
- [View](../classes/react_form_builder_core.View.md)

## Interfaces

- [ComponentProperty](../interfaces/react_form_builder_core.ComponentProperty.md)
- [CustomActionDefinition](../interfaces/react_form_builder_core.CustomActionDefinition.md)
- [ErrorWrapperProps](../interfaces/react_form_builder_core.ErrorWrapperProps.md)
- [FormViewerProps](../interfaces/react_form_builder_core.FormViewerProps.md)
- [PersistedForm](../interfaces/react_form_builder_core.PersistedForm.md)
- [ScreenProps](../interfaces/react_form_builder_core.ScreenProps.md)
- [StoreProps](../interfaces/react_form_builder_core.StoreProps.md)

## Type Aliases

### ActionData

Ƭ **ActionData**: `Object`

Action Storage.
Used for add a new action, store information about it.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args?` | `Arguments` |
| `name` | `string` |
| `target?` | `string` |
| `type` | `ActionType` |

___

### ActionsInitializer

Ƭ **ActionsInitializer**: (`props`: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``], `def`: `DefineActionHelper`) => `Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

#### Type declaration

▸ (`props`, `def`): `Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

The type of function that initializes an actions on a component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``] |
| `def` | `DefineActionHelper` |

##### Returns

`Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

___

### ComponentData

Ƭ **ComponentData**: `Object`

The element in the component tree of the form viewer, contains the data needed to display the component.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `field?` | `Field` |
| `key` | `string` |
| `model` | [`Model`](../classes/react_form_builder_core.Model.md) |
| `parent?` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) |
| `store` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) |

___

### Device

Ƭ **Device**: ``"any"`` \| [`ViewMode`](react_form_builder_core.md#viewmode)

Display resolution type of the form builder.

___

### Disposer

Ƭ **Disposer**: () => `void`

#### Type declaration

▸ (): `void`

Type for the function that disposes resources.

##### Returns

`void`

___

### LocalizationTestResult

Ƭ **LocalizationTestResult**: `Object`

Localization testing result.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | `boolean` |
| `exceptions?` | `Error`[] |
| `result?` | `string` |

___

### OnInitCallback

Ƭ **OnInitCallback**: (`language`: `string`) => `void`

#### Type declaration

▸ (`language`): `void`

The type of callback function called during language initialization.

##### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

##### Returns

`void`

___

### Parameter

Ƭ **Parameter**: [`ParameterName`](react_form_builder_core.md#parametername) \| [[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

Function parameter.

___

### ParameterName

Ƭ **ParameterName**: `string`

The type for the parameter name.

___

### ParameterType

Ƭ **ParameterType**: ``"string"`` \| ``"number"`` \| ``"boolean"``

Parameter type.

___

### ResolvedValidator

Ƭ **ResolvedValidator**: (`value`: `any`, `store`: [`Store`](../classes/react_form_builder_core.Store.md)) => `Promise`<`ValidationResult`[] \| `undefined`\>

#### Type declaration

▸ (`value`, `store`): `Promise`<`ValidationResult`[] \| `undefined`\>

The function that validates a value and returns the validation result.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `store` | [`Store`](../classes/react_form_builder_core.Store.md) |

##### Returns

`Promise`<`ValidationResult`[] \| `undefined`\>

___

### RuleValidator

Ƭ **RuleValidator**<`T`\>: (`value`: `T`, `store`: [`Store`](../classes/react_form_builder_core.Store.md)) => [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`value`, `store`): [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

The function that checks the value and returns the result of the rule validation, see [RuleValidatorResult](react_form_builder_core.md#rulevalidatorresult).

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `store` | [`Store`](../classes/react_form_builder_core.Store.md) |

##### Returns

[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

___

### RuleValidatorResult

Ƭ **RuleValidatorResult**: `string` \| `boolean`

The result of validation of a single rule, true means validation was successful,
false means validation failed, string means error message.

___

### SchemaType

Ƭ **SchemaType**: keyof [`SchemaTypeMap`](react_form_builder_core.md#schematypemap)

The value type name.

___

### SchemaTypeMap

Ƭ **SchemaTypeMap**: `Object`

Describes the mapping of a value type name to a type.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |
| `boolean` | `boolean` |
| `date` | `string` |
| `enum` | `any` |
| `number` | `number` |
| `object` | `object` |
| `string` | `string` |

___

### Setter

Ƭ **Setter**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`value`): `void`

Value setting function type.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

___

### ValidationRuleSettings

Ƭ **ValidationRuleSettings**: `Object`

The validation rule settings.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `args?` | `Record`<`string`, `any`\> | Arguments of the validation rule. |
| `key` | `string` | The unique key of the validation rule. The key is unique within the value type. |

___

### ViewMode

Ƭ **ViewMode**: ``"desktop"`` \| ``"mobile"`` \| ``"tablet"``

Display resolution type.

___

### WrapperProps

Ƭ **WrapperProps**: `Object`

React wrapper component properties.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |

## Variables

### ActionEventArgsDeclaration

• `Const` **ActionEventArgsDeclaration**: ``"\n/**\n * Arguments passed to the event handler.\n */\ndeclare class ActionEventArgs {\n\n  /**\n   * The event type.\n   */\n  readonly type: string\n\n  /**\n   * The component that triggered the event.\n   */\n  readonly sender: ComponentData\n\n  /**\n   * The form viewer settings.\n   */\n  readonly store: Store\n\n  /**\n   * The event arguments.\n   */\n  readonly args: any[]\n\n  /**\n   * @returns the event handled by the event handler.\n   */\n  get event(): SyntheticEvent | null\n\n  /**\n   * @returns the first element of the event argument array, which is treated as a value.\n   */\n  get value(): any\n}\n"``

Description of the event argument type for the code editor.

___

### DefaultActions

• `Const` **DefaultActions**: `ActionDefinition`[]

___

### DidMountEvent

• `Const` **DidMountEvent**: ``"onDidMount"``

___

### FormDeclaration

• `Const` **FormDeclaration**: ``"declare class Form {\n  fields: Map<string, Field>\n  readonly store: Store\n\n  get data(): Record<string, unknown>\n\n  get errors(): Record<string, unknown>\n  \n  setAllErrors(message?: string)\n\n  get(key: string): Field\n\n  validate(): void\n\n  reset(): void\n\n  clear(): void\n}"``

Description of the form type for the code editor.

___

### IndentStyles

• `Const` **IndentStyles**: `any`

___

### OtherStyles

• `Const` **OtherStyles**: `any`

___

### SizeStyles

• `Const` **SizeStyles**: `any`

___

### StoreContext

• **StoreContext**: `Context`<``null`` \| [`Store`](../classes/react_form_builder_core.Store.md)\>

___

### ValidationRules

• `Const` **ValidationRules**: `Record`<[`SchemaType`](react_form_builder_core.md#schematype), `ValidationRuleSet`\>

___

### WillUnmountEvent

• `Const` **WillUnmountEvent**: ``"onWillUnmount"``

___

### componentMarkup

• `Const` **componentMarkup**: ``"@[__label__](component:__value__)"``

___

### defaultLanguage

• `Const` **defaultLanguage**: [`Language`](../classes/react_form_builder_core.Language.md)

___

### emptyComponentStore

• `Const` **emptyComponentStore**: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)

___

### errorMessageModel

• `Const` **errorMessageModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

___

### internalErrorModel

• `Const` **internalErrorModel**: [`Model`](../classes/react_form_builder_core.Model.md)<`InternalErrorProps`\>

Form viewer internal error metadata.

___

### screenModel

• `Const` **screenModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`ScreenProps`](../interfaces/react_form_builder_core.ScreenProps.md)\>

___

### slotModel

• `Const` **slotModel**: [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>

## Functions

### ComponentDataProvider

▸ **ComponentDataProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`ComponentData`](react_form_builder_core.md#componentdata)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### FormViewer

▸ **FormViewer**(`props`): `Element`

The main React component of the form viewer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) |

#### Returns

`Element`

the React element.

___

### OverridesProvider

▸ **OverridesProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<`OverrideRef`\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### StoreProvider

▸ **StoreProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`Store`](../classes/react_form_builder_core.Store.md)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### ViewerPropsProvider

▸ **ViewerPropsProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<`Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### compileFn

▸ **compileFn**(`source`): [`CompilationResult`](../classes/react_form_builder_core.CompilationResult.md)

Compiles the function from string source code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | the function source code. |

#### Returns

[`CompilationResult`](../classes/react_form_builder_core.CompilationResult.md)

the result of the function compilation.

___

### createNonNullableContext

▸ **createNonNullableContext**<`T`\>(`name`): [() => `T`, `Provider`<`T`\>, `Context`<`T` \| ``null``\>]

Creates non-nullable React context.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the context name. |

#### Returns

[() => `T`, `Provider`<`T`\>, `Context`<`T` \| ``null``\>]

the tuple [hook, provider, and common context] for interactions with a non-nullable context.

___

### createView

▸ **createView**(`...models`): [`View`](../classes/react_form_builder_core.View.md)

Static wrapper for the [View](../classes/react_form_builder_core.View.md) constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...models` | [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>[] | the components metadata. |

#### Returns

[`View`](../classes/react_form_builder_core.View.md)

the [View](../classes/react_form_builder_core.View.md) instance.

___

### generateTemplateTypeName

▸ **generateTemplateTypeName**(`name`): `string`

Generates the template type name from the specified template name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the template name. |

#### Returns

`string`

the template type name.

___

### getFluentCompatibleId

▸ **getFluentCompatibleId**(`rawId`): `string`

Converts the raw id to a Fluent compatible id, i.e. replaces all the spaces with underscores.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawId` | `string` | some raw id. |

#### Returns

`string`

the Fluent compatible id.

___

### getKey

▸ **getKey**(): `string`

Generates the random string.

#### Returns

`string`

the generated random string.

___

### groupBy

▸ **groupBy**<`T`\>(`array`, `predicate`): `Record`<`string`, `T`[]\>

Groups the array of values by function predicate.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | the array of values. |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `string` | the function that returns a string to group the values of the array. |

#### Returns

`Record`<`string`, `T`[]\>

the Record with grouped values.

___

### isPromise

▸ **isPromise**<`T`\>(`value`): value is Promise<T\>

Type predicate, asserts that the value is a Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the value. |

#### Returns

value is Promise<T\>

true if the value is a Promise, false otherwise.

___

### namedObserver

▸ **namedObserver**<`T`\>(`displayName`, `component`): `T`

Creates the observable React component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IReactComponent` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `displayName` | `string` | the displayName value of the React component. |
| `component` | `T` | the React component. |

#### Returns

`T`

the observable React component.

___

### testFluentLocalization

▸ **testFluentLocalization**(`request`): [`LocalizationTestResult`](react_form_builder_core.md#localizationtestresult)

Localization testing function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `LocalizationTestRequest` | the localization testing request. |

#### Returns

[`LocalizationTestResult`](react_form_builder_core.md#localizationtestresult)

the localization testing result.

___

### toParameterWithType

▸ **toParameterWithType**(`value`): [[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

Converts the parameter to the parameter with the type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Parameter`](react_form_builder_core.md#parameter) | the parameter. |

#### Returns

[[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

the parameter with the type.

___

### useComponentData

▸ **useComponentData**(): [`ComponentData`](react_form_builder_core.md#componentdata)

#### Returns

[`ComponentData`](react_form_builder_core.md#componentdata)

___

### useComponentTree

▸ **useComponentTree**(): `ComponentType`<`ComponentTreeProps`\>

#### Returns

`ComponentType`<`ComponentTreeProps`\>

___

### useDestroy

▸ **useDestroy**(`destroyFn`): `void`

Executes the function when the component is destroyed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destroyFn` | () => `void` | the function that executes when a component is destroyed. |

#### Returns

`void`

___

### useStore

▸ **useStore**(): [`Store`](../classes/react_form_builder_core.Store.md)

#### Returns

[`Store`](../classes/react_form_builder_core.Store.md)

___

### useViewerProps

▸ **useViewerProps**(): `Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>

#### Returns

`Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>
