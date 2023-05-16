---
id: "react_form_builder_core"
title: "Module: @react-form-builder/core"
sidebar_label: "@react-form-builder/core"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [ActionEventArgs](../classes/react_form_builder_core.ActionEventArgs.md)
- [ComponentStore](../classes/react_form_builder_core.ComponentStore.md)
- [Model](../classes/react_form_builder_core.Model.md)
- [Store](../classes/react_form_builder_core.Store.md)
- [View](../classes/react_form_builder_core.View.md)

## Interfaces

- [ComponentProperty](../interfaces/react_form_builder_core.ComponentProperty.md)
- [CustomActionDefinition](../interfaces/react_form_builder_core.CustomActionDefinition.md)
- [ErrorMessageProps](../interfaces/react_form_builder_core.ErrorMessageProps.md)
- [FormViewerProps](../interfaces/react_form_builder_core.FormViewerProps.md)
- [ScreenProps](../interfaces/react_form_builder_core.ScreenProps.md)
- [StoreProps](../interfaces/react_form_builder_core.StoreProps.md)

## Type Aliases

### ActionData

Ƭ **ActionData**: `Object`

Action Storage
Used for add a new action, store information about it

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``] |
| `def` | `DefineActionHelper` |

##### Returns

`Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

___

### CompilationResult

Ƭ **CompilationResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | `boolean` |
| `exception?` | `Error` |
| `fn?` | `Function` |

___

### ComponentData

Ƭ **ComponentData**: `Object`

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

___

### Parameter

Ƭ **Parameter**: [`ParameterName`](react_form_builder_core.md#parametername) \| [[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

___

### ParameterName

Ƭ **ParameterName**: `string`

___

### ParameterType

Ƭ **ParameterType**: ``"string"`` \| ``"number"`` \| ``"boolean"``

___

### SchemaType

Ƭ **SchemaType**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"date"`` \| ``"object"`` \| ``"array"``

___

### ViewMode

Ƭ **ViewMode**: ``"desktop"`` \| ``"mobile"`` \| ``"tablet"``

___

### WrapperProps

Ƭ **WrapperProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |

## Variables

### ActionEventArgsDeclaration

• `Const` **ActionEventArgsDeclaration**: ``"\ndeclare class ActionEventArgs {\n\n  readonly type: string\n  readonly sender: ComponentData\n  readonly store: Store\n  readonly args: any[]\n\n  get event(): SyntheticEvent | null\n\n  get value(): any\n}\n"``

___

### DefaultActions

• `Const` **DefaultActions**: `ActionDefinition`[]

___

### DidMountEvent

• `Const` **DidMountEvent**: ``"onDidMount"``

___

### FormDeclaration

• `Const` **FormDeclaration**: ``"declare class Form {\n  fields: Map<string, Field>\n  readonly store: Store\n\n  get data(): Record<string, unknown>\n\n  get errors(): Record<string, unknown>\n\n  get(key: string): Field\n\n  validate(): void\n\n  reset(): void\n\n  clear(): void\n}"``

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

### WillUnmountEvent

• `Const` **WillUnmountEvent**: ``"onWillUnmount"``

___

### componentMarkup

• `Const` **componentMarkup**: ``"@[__label__](component:__value__)"``

___

### emptyComponentStore

• `Const` **emptyComponentStore**: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)

___

### errorMessageModel

• `Const` **errorMessageModel**: [`Model`](../classes/react_form_builder_core.Model.md)

___

### internalErrorModel

• `Const` **internalErrorModel**: [`Model`](../classes/react_form_builder_core.Model.md)

___

### screenModel

• `Const` **screenModel**: [`Model`](../classes/react_form_builder_core.Model.md)

___

### slotModel

• `Const` **slotModel**: [`Model`](../classes/react_form_builder_core.Model.md)

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) |

#### Returns

`Element`

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

### cast

▸ **cast**(`value`, `type`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `type` | `string` |

#### Returns

`any`

___

### compileFn

▸ **compileFn**(`source`): [`CompilationResult`](react_form_builder_core.md#compilationresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

[`CompilationResult`](react_form_builder_core.md#compilationresult)

___

### createNonNullableContext

▸ **createNonNullableContext**<`T`\>(`name`): [() => `T`, `Provider`<`T`\>, `Context`<`T` \| ``null``\>]

Return the tuple [hook, provider, and common context] for interactions with a non-nullable context

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[() => `T`, `Provider`<`T`\>, `Context`<`T` \| ``null``\>]

___

### createView

▸ **createView**(`...models`): [`View`](../classes/react_form_builder_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](../classes/react_form_builder_core.Model.md)[] |

#### Returns

[`View`](../classes/react_form_builder_core.View.md)

___

### generateTemplateTypeName

▸ **generateTemplateTypeName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

___

### getKey

▸ **getKey**(): `string`

#### Returns

`string`

___

### getSchemaRules

▸ **getSchemaRules**(`ctr?`): `undefined` \| `Rules`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctr?` | `Function` |

#### Returns

`undefined` \| `Rules`<`any`\>

___

### groupBy

▸ **groupBy**<`T`\>(`array`, `predicate`): `Record`<`string`, `T`[]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `string` |

#### Returns

`Record`<`string`, `T`[]\>

___

### namedObserver

▸ **namedObserver**<`T`\>(`displayName`, `component`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IReactComponent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `displayName` | `string` |
| `component` | `T` |

#### Returns

`T`

___

### toParameterWithType

▸ **toParameterWithType**(`value`): [[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Parameter`](react_form_builder_core.md#parameter) |

#### Returns

[[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)]

___

### treeFind

▸ **treeFind**<`T`\>(`value`, `key?`): `T` \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `key?` | `string` |

#### Returns

`T` \| `undefined`

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

### useComputed

▸ **useComputed**<`T`\>(`func`, `options?`, `deps?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | () => `T` |
| `options?` | `IComputedValueOptions`<`T`\> |
| `deps?` | `DependencyList` |

#### Returns

`T`

___

### useMultiReaction

▸ **useMultiReaction**<`Observers`, `Observable`, `Track`\>(`initObservers`, `mapObservable`, `expression`, `effect`): `void`

A hook for synchronization used mobx reaction
@example:
useMultiReaction(
    //Get observers
    () => _.values(data.store.events).flat().filter(value => value.type === 'linked'),
    //Map observer to observable
    (observer) => store.findComponent(observer.target!),
    //Expression for track value such as in common reaction
    (observable) => observable?.key,
    //Effect for reaction
    (observer, arg?: string, prev?: string) => observer.target = arg
  )

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Observers` | extends `ElementType`<`Observers`\>[] |
| `Observable` | `Observable` |
| `Track` | `Track` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initObservers` | () => `Observers` |
| `mapObservable` | (`observer`: `ElementType`<`Observers`\>) => `Observable` |
| `expression` | (`observable`: `Observable`) => `Track` |
| `effect` | (`observer`: `ElementType`<`Observers`\>, `arg`: `Track`, `prev`: `Track`) => `void` |

#### Returns

`void`

___

### useReaction

▸ **useReaction**<`T`, `FireImmediately`\>(`expression`, `effect`, `deps?`, `opts?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `FireImmediately` | extends `boolean` = ``false`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | (`r`: `IReactionPublic`) => `T` |
| `effect` | (`arg`: `T`, `prev`: `FireImmediately` extends ``true`` ? `undefined` \| `T` : `T`, `r`: `IReactionPublic`) => `void` |
| `deps?` | `DependencyList` |
| `opts?` | `IReactionOptions`<`T`, `FireImmediately`\> |

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
