---
id: "fb_core"
title: "Module: fb-core"
sidebar_label: "fb-core"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [ActionEventArgs](../classes/fb_core.ActionEventArgs.md)
- [ComponentStore](../classes/fb_core.ComponentStore.md)
- [Model](../classes/fb_core.Model.md)
- [Store](../classes/fb_core.Store.md)
- [View](../classes/fb_core.View.md)

## Interfaces

- [ComponentProperty](../interfaces/fb_core.ComponentProperty.md)
- [CustomActionDefinition](../interfaces/fb_core.CustomActionDefinition.md)
- [ErrorMessageProps](../interfaces/fb_core.ErrorMessageProps.md)
- [FormViewerProps](../interfaces/fb_core.FormViewerProps.md)
- [ScreenProps](../interfaces/fb_core.ScreenProps.md)

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

Ƭ **ActionsInitializer**: (`props`: [`ComponentStore`](../classes/fb_core.ComponentStore.md)[``"props"``], `def`: `DefineActionHelper`) => `Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

#### Type declaration

▸ (`props`, `def`): `Record`<`EventName`, `ActionEventHandler` \| `ActionDefinition`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ComponentStore`](../classes/fb_core.ComponentStore.md)[``"props"``] |
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
| `componentStore` | [`ComponentStore`](../classes/fb_core.ComponentStore.md) |
| `field?` | `Field` |
| `key` | `string` |
| `model` | [`Model`](../classes/fb_core.Model.md) |
| `parentStore?` | [`ComponentStore`](../classes/fb_core.ComponentStore.md) |

___

### Device

Ƭ **Device**: ``"any"`` \| [`ViewMode`](fb_core.md#viewmode)

___

### Parameter

Ƭ **Parameter**: [`ParameterName`](fb_core.md#parametername) \| [[`ParameterName`](fb_core.md#parametername), [`ParameterType`](fb_core.md#parametertype)]

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

### DefaultActions

• `Const` **DefaultActions**: `ActionDefinition`[]

___

### DidMountEvent

• `Const` **DidMountEvent**: ``"onDidMount"``

___

### FormViewer

• `Const` **FormViewer**: `IReactComponent`

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

• **StoreContext**: `Context`<`undefined` \| [`Store`](../classes/fb_core.Store.md)\>

___

### WillUnmountEvent

• `Const` **WillUnmountEvent**: ``"onWillUnmount"``

___

### componentMarkup

• `Const` **componentMarkup**: ``"@[__label__](component:__value__)"``

___

### emptyComponentStore

• `Const` **emptyComponentStore**: [`ComponentStore`](../classes/fb_core.ComponentStore.md)

___

### errorMessageModel

• `Const` **errorMessageModel**: [`Model`](../classes/fb_core.Model.md)

___

### screenModel

• `Const` **screenModel**: [`Model`](../classes/fb_core.Model.md)

## Functions

### ComponentDataProvider

▸ **ComponentDataProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`ComponentData`](fb_core.md#componentdata)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

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
| `props` | `ProviderProps`<[`Store`](../classes/fb_core.Store.md)\> |

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

▸ **compileFn**(`source`): [`CompilationResult`](fb_core.md#compilationresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

[`CompilationResult`](fb_core.md#compilationresult)

___

### createNamedContext

▸ **createNamedContext**<`T`\>(`name`): [() => `T`, `Provider`<`NonNullable`<`T`\>\>, `Context`<`undefined` \| `T`\>]

Return tuple with hook and provider for context using

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[() => `T`, `Provider`<`NonNullable`<`T`\>\>, `Context`<`undefined` \| `T`\>]

___

### createView

▸ **createView**(`...models`): [`View`](../classes/fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](../classes/fb_core.Model.md)[] |

#### Returns

[`View`](../classes/fb_core.View.md)

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

▸ **namedObserver**(`displayName`, `component`): `IReactComponent`

#### Parameters

| Name | Type |
| :------ | :------ |
| `displayName` | `string` |
| `component` | `IReactComponent` |

#### Returns

`IReactComponent`

___

### toParameterWithType

▸ **toParameterWithType**(`value`): [[`ParameterName`](fb_core.md#parametername), [`ParameterType`](fb_core.md#parametertype)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Parameter`](fb_core.md#parameter) |

#### Returns

[[`ParameterName`](fb_core.md#parametername), [`ParameterType`](fb_core.md#parametertype)]

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

▸ **useComponentData**(): [`ComponentData`](fb_core.md#componentdata)

#### Returns

[`ComponentData`](fb_core.md#componentdata)

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
    () => _.values(data.componentStore.events).flat().filter(value => value.type === 'linked'),
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

▸ **useStore**(): [`Store`](../classes/fb_core.Store.md)

#### Returns

[`Store`](../classes/fb_core.Store.md)
