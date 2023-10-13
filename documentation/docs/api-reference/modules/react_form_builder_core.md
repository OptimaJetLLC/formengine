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

- [ActionDefinition](../classes/react_form_builder_core.ActionDefinition.md)
- [ActionEventArgs](../classes/react_form_builder_core.ActionEventArgs.md)
- [Annotation](../classes/react_form_builder_core.Annotation.md)
- [AnnotationBuilder](../classes/react_form_builder_core.AnnotationBuilder.md)
- [ArrayBuilder](../classes/react_form_builder_core.ArrayBuilder.md)
- [BaseBuilder](../classes/react_form_builder_core.BaseBuilder.md)
- [BuilderOptions](../classes/react_form_builder_core.BuilderOptions.md)
- [BuilderView](../classes/react_form_builder_core.BuilderView.md)
- [ComponentData](../classes/react_form_builder_core.ComponentData.md)
- [ComponentDataEvents](../classes/react_form_builder_core.ComponentDataEvents.md)
- [ComponentKeyChangedEventArgs](../classes/react_form_builder_core.ComponentKeyChangedEventArgs.md)
- [ComponentState](../classes/react_form_builder_core.ComponentState.md)
- [ComponentStore](../classes/react_form_builder_core.ComponentStore.md)
- [ContainerAn](../classes/react_form_builder_core.ContainerAn.md)
- [DataValidator](../classes/react_form_builder_core.DataValidator.md)
- [Definer](../classes/react_form_builder_core.Definer.md)
- [EventAn](../classes/react_form_builder_core.EventAn.md)
- [EventStream](../classes/react_form_builder_core.EventStream.md)
- [Form](../classes/react_form_builder_core.Form.md)
- [Language](../classes/react_form_builder_core.Language.md)
- [LocalizationStore](../classes/react_form_builder_core.LocalizationStore.md)
- [Meta](../classes/react_form_builder_core.Meta.md)
- [Model](../classes/react_form_builder_core.Model.md)
- [ModuleAn](../classes/react_form_builder_core.ModuleAn.md)
- [NodeAnnotationBuilder](../classes/react_form_builder_core.NodeAnnotationBuilder.md)
- [OneOfBuilder](../classes/react_form_builder_core.OneOfBuilder.md)
- [PropertyAn](../classes/react_form_builder_core.PropertyAn.md)
- [QuantifierBuilder](../classes/react_form_builder_core.QuantifierBuilder.md)
- [SomeOfBuilder](../classes/react_form_builder_core.SomeOfBuilder.md)
- [Store](../classes/react_form_builder_core.Store.md)
- [StyleAn](../classes/react_form_builder_core.StyleAn.md)
- [SyncEvent](../classes/react_form_builder_core.SyncEvent.md)
- [TemplateField](../classes/react_form_builder_core.TemplateField.md)
- [TypedBuilder](../classes/react_form_builder_core.TypedBuilder.md)
- [View](../classes/react_form_builder_core.View.md)

## Interfaces

- [BaseCompilationResult](../interfaces/react_form_builder_core.BaseCompilationResult.md)
- [BuilderComponent](../interfaces/react_form_builder_core.BuilderComponent.md)
- [CompilationResult](../interfaces/react_form_builder_core.CompilationResult.md)
- [ComponentProperty](../interfaces/react_form_builder_core.ComponentProperty.md)
- [ComponentTreeProps](../interfaces/react_form_builder_core.ComponentTreeProps.md)
- [ErrorWrapperProps](../interfaces/react_form_builder_core.ErrorWrapperProps.md)
- [Field](../interfaces/react_form_builder_core.Field.md)
- [FormViewerProps](../interfaces/react_form_builder_core.FormViewerProps.md)
- [FormViewerWrapperComponentProps](../interfaces/react_form_builder_core.FormViewerWrapperComponentProps.md)
- [IFormData](../interfaces/react_form_builder_core.IFormData.md)
- [IFormViewer](../interfaces/react_form_builder_core.IFormViewer.md)
- [IStore](../interfaces/react_form_builder_core.IStore.md)
- [InternalErrorProps](../interfaces/react_form_builder_core.InternalErrorProps.md)
- [LabeledValue](../interfaces/react_form_builder_core.LabeledValue.md)
- [PersistedForm](../interfaces/react_form_builder_core.PersistedForm.md)
- [ScreenProps](../interfaces/react_form_builder_core.ScreenProps.md)
- [SuppressResizeObserverErrorsProps](../interfaces/react_form_builder_core.SuppressResizeObserverErrorsProps.md)
- [WrapperProps](../interfaces/react_form_builder_core.WrapperProps.md)

## Type Aliases

### ActionData

Ƭ **ActionData**: `Object`

Action Storage.
Used for add a new action, store information about it.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `[KeySymbol]?` | `string` |
| `args?` | [`Arguments`](react_form_builder_core.md#arguments) |
| `name` | `string` |
| `type` | [`ActionType`](react_form_builder_core.md#actiontype) |

___

### ActionEventHandler

Ƭ **ActionEventHandler**: (`e`: [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`e`): `void` \| `Promise`<`void`\>

Event handler function type.

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md) |

##### Returns

`void` \| `Promise`<`void`\>

___

### ActionHandler

Ƭ **ActionHandler**<`T`\>: (`e`: [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md), `params`: { [k in keyof T]: any }) => `void` \| `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`e`, `params`): `void` \| `Promise`<`void`\>

Action function type.

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md) |
| `params` | { [k in keyof T]: any } |

##### Returns

`void` \| `Promise`<`void`\>

___

### ActionParameters

Ƭ **ActionParameters**: `Record`<[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)\>

Represents a set of action parameters.

___

### ActionType

Ƭ **ActionType**: ``"common"`` \| ``"custom"`` \| ``"external"``

Action type.

___

### ActionValues

Ƭ **ActionValues**: `Record`<`string`, [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)\>

Represents a set of action definitions.

___

### ActionsInitializer

Ƭ **ActionsInitializer**: (`props`: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``], `def`: [`DefineActionHelper`](react_form_builder_core.md#defineactionhelper)) => `Record`<[`EventName`](react_form_builder_core.md#eventname), [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler) \| [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)\>

#### Type declaration

▸ (`props`, `def`): `Record`<[`EventName`](react_form_builder_core.md#eventname), [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler) \| [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)\>

The type of function that initializes an actions on a component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``] |
| `def` | [`DefineActionHelper`](react_form_builder_core.md#defineactionhelper) |

##### Returns

`Record`<[`EventName`](react_form_builder_core.md#eventname), [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler) \| [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)\>

___

### AnnotationType

Ƭ **AnnotationType**: ``"Property"`` \| ``"Container"`` \| ``"Event"`` \| ``"Module"`` \| ``"Style"``

Type of component property description in the form builder.

___

### Annotations

Ƭ **Annotations**<`T`\>: { [key in keyof T]: BaseBuilder<T[key]\> \| undefined }

The type-safe description of the component's metadata property builders.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

___

### ArgumentValue

Ƭ **ArgumentValue**: `string` \| `number` \| `boolean`

The type of the argument value of the function.

___

### Arguments

Ƭ **Arguments**: `Record`<[`ParameterName`](react_form_builder_core.md#parametername), [`ArgumentValue`](react_form_builder_core.md#argumentvalue)\>

It will be transformed in arguments before passing in action.

___

### BoundValueSchema

Ƭ **BoundValueSchema**: `Object`

Value validation rules.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autoValidate?` | `boolean` |
| `validations?` | [`ValidationRuleSettings`](react_form_builder_core.md#validationrulesettings)[] |

___

### BuilderSetup

Ƭ **BuilderSetup**: `Partial`<[`PreAnnotation`](react_form_builder_core.md#preannotation) & [`BuilderOptions`](../classes/react_form_builder_core.BuilderOptions.md)\>

The type representing custom options for the component's property metadata builder.

___

### ComponentKey

Ƭ **ComponentKey**: `string`

The component key.

___

### ComponentLocalizer

Ƭ **ComponentLocalizer**: (`componentStore`: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md), `language`: [`Language`](../classes/react_form_builder_core.Language.md)) => `Record`<`string`, `any`\>

#### Type declaration

▸ (`componentStore`, `language`): `Record`<`string`, `any`\>

The function to localize the properties of a component.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) | the component settings. |
| `language` | [`Language`](../classes/react_form_builder_core.Language.md) | the language selected in the form viewer. |

##### Returns

`Record`<`string`, `any`\>

the Record with the localized properties of a component.

___

### ComponentPropertyComputeType

Ƭ **ComponentPropertyComputeType**: ``"function"`` \| ``"localization"``

The component property value type.

___

### ComponentPropertyName

Ƭ **ComponentPropertyName**: `string`

The component property name.

___

### ComponentPropsLocalization

Ƭ **ComponentPropsLocalization**: `Record`<[`ComponentPropertyName`](react_form_builder_core.md#componentpropertyname), `string`\>

A record containing localizations for the component properties.

___

### ComponentsLocalization

Ƭ **ComponentsLocalization**: `Record`<[`ComponentKey`](react_form_builder_core.md#componentkey), [`TypedLocalization`](react_form_builder_core.md#typedlocalization)\>

A record containing localizations grouped by component key.

___

### ComputeChildren

Ƭ **ComputeChildren**: (`componentData`: [`ComponentData`](../classes/react_form_builder_core.ComponentData.md), `componentProps`: `Record`<`string`, `any`\>) => `Record`<`string`, `any`\>

#### Type declaration

▸ (`componentData`, `componentProps`): `Record`<`string`, `any`\>

Function that calculates all child properties of a component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentData` | [`ComponentData`](../classes/react_form_builder_core.ComponentData.md) |
| `componentProps` | `Record`<`string`, `any`\> |

##### Returns

`Record`<`string`, `any`\>

___

### Css

Ƭ **Css**: `Object`

The type for the CSS property of a React component.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `any?` | [`DeviceStyle`](react_form_builder_core.md#devicestyle) | CSS styles for arbitrary device. |
| `desktop?` | [`DeviceStyle`](react_form_builder_core.md#devicestyle) | CSS styles for desktop devices. |
| `mobile?` | [`DeviceStyle`](react_form_builder_core.md#devicestyle) | CSS styles for mobile devices. |
| `tablet?` | [`DeviceStyle`](react_form_builder_core.md#devicestyle) | CSS styles for tablet devices. |

___

### CssLoaderType

Ƭ **CssLoaderType**: [`BiDi`](../enums/react_form_builder_core.BiDi.md) \| ``"common"``

Represents the type of CSS loader. Can be either BiDi or common for both BiDi.

___

### DefineActionHelper

Ƭ **DefineActionHelper**: <T\>(`name`: `string`, `func`: [`ActionHandler`](react_form_builder_core.md#actionhandler)<`T`\>, `params?`: [`ParametersDefinition`](react_form_builder_core.md#parametersdefinition)<`T`\>[], `description?`: `string`) => [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

#### Type declaration

▸ <`T`\>(`name`, `func`, `params?`, `description?`): [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

The defineAction helper type.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `func` | [`ActionHandler`](react_form_builder_core.md#actionhandler)<`T`\> |
| `params?` | [`ParametersDefinition`](react_form_builder_core.md#parametersdefinition)<`T`\>[] |
| `description?` | `string` |

##### Returns

[`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

___

### DefinerData

Ƭ **DefinerData**<`T`\>: `Object`

Definer class data.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionsInitializer?` | [`ActionsInitializer`](react_form_builder_core.md#actionsinitializer) |
| `category?` | `string` |
| `cssObject?` | [`Annotations`](react_form_builder_core.md#annotations)<`CSSObject`\> |
| `customPreview?` | `ReactNode` |
| `icon?` | `ComponentType` |
| `name?` | `string` |
| `properties?` | [`Annotations`](react_form_builder_core.md#annotations)<`T`\> |
| `view` | `ComponentType`<`T`\> |

___

### Device

Ƭ **Device**: ``"any"`` \| [`ViewMode`](react_form_builder_core.md#viewmode)

Display resolution type of the form builder.

___

### DeviceStyle

Ƭ **DeviceStyle**: `Object`

CSS styles for a device.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `object?` | `CSSObject` | CSS styles defined in the general style settings. |
| `string?` | `string` | CSS styles defined in the style code editor. |

___

### Disposer

Ƭ **Disposer**: () => `void`

#### Type declaration

▸ (): `void`

Type for the function that disposes resources.

##### Returns

`void`

___

### EditorType

Ƭ **EditorType**: `string`

A type that denotes the name of the property editor.

___

### ErrorMap

Ƭ **ErrorMap**: `Object`

The result of validating a component property in the form builder.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `code?` | `string` |
| `message?` | `string` |

___

### ErrorMessageLocalizer

Ƭ **ErrorMessageLocalizer**: (`value`: [`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`) => `string` \| `undefined`

#### Type declaration

▸ (`value`): `string` \| `undefined`

A function that localizes validation error messages.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined` |

##### Returns

`string` \| `undefined`

___

### EventName

Ƭ **EventName**: `string`

The type for the event name.

___

### ExternalActions

Ƭ **ExternalActions**: `Record`<`string`, [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md) \| [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler)\>

External actions for the form viewer.

___

### ExternalValidationRuleSettings

Ƭ **ExternalValidationRuleSettings**: `Object`

External validation rule settings.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`ValidationRuleParameter`](react_form_builder_core.md#validationruleparameter)[] | Metadata of validation rule parameters. |
| `validate` | [`RuleValidator`](react_form_builder_core.md#rulevalidator) | The function that validates the value. |

___

### ExternalValidationRules

Ƭ **ExternalValidationRules**: `Record`<`string`, [`ExternalValidationRuleSettings`](react_form_builder_core.md#externalvalidationrulesettings)\>

A set of metadata of external validation rules, grouped by rule name.

___

### ExternalValidators

Ƭ **ExternalValidators**: `Partial`<`Record`<[`SchemaType`](react_form_builder_core.md#schematype), [`ExternalValidationRules`](react_form_builder_core.md#externalvalidationrules)\>\>

The set of metadata of external validation rules, grouped by the type of value being validated.

___

### FirstParameter

Ƭ **FirstParameter**<`T`\>: `Parameters`<`T`\>[``0``]

The generic type that returns the first parameter of the generic type T.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

___

### FormViewerValidationRules

Ƭ **FormViewerValidationRules**: `Object`

Validation rules for FormViewer.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `external?` | [`ExternalValidationRules`](react_form_builder_core.md#externalvalidationrules) |
| `internal` | [`ValidationRuleSet`](react_form_builder_core.md#validationruleset) |

___

### FormViewerWrapper

Ƭ **FormViewerWrapper**: `ComponentType`<[`FormViewerWrapperComponentProps`](../interfaces/react_form_builder_core.FormViewerWrapperComponentProps.md)\>

Represents a form viewer Wrapper component.

___

### Func

Ƭ **Func**: (...`arg`: `any`[]) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`...arg`): `void` \| `Promise`<`void`\>

The type of arbitrary function that returns void or Promise&lt;void&gt;.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...arg` | `any`[] |

##### Returns

`void` \| `Promise`<`void`\>

___

### HtmlAttribute

Ƭ **HtmlAttribute**: `Record`<`string`, `string`\>

The arbitrary HTML attributes for the component.

___

### LanguageFullCode

Ƭ **LanguageFullCode**: `string`

The full language code, e.g. 'en-US'.

___

### LocalizationTestRequest

Ƭ **LocalizationTestRequest**: `Object`

Localization testing request.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Record`<`string`, `FluentVariable`\> |
| `language` | [`Language`](../classes/react_form_builder_core.Language.md) |
| `localization` | `string` |
| `localizationStringId` | `string` |

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

### LocalizationType

Ƭ **LocalizationType**: ``"component"`` \| ``"tooltip"`` \| `string`

Represents the type of localization. The localization can be for a component, tooltip or for validator.

___

### LocalizationValue

Ƭ **LocalizationValue**: `Record`<[`LanguageFullCode`](react_form_builder_core.md#languagefullcode), [`ComponentsLocalization`](react_form_builder_core.md#componentslocalization)\>

The format in which localization is stored.

**`Example`**

```ts
{
 *  "en-US" :
 *  {
 *    "componentKey:
 *      {
 *        "property" : "This {$value} is localized!"
 *      }
 *  }
 * }
```

___

### NamedActionDefinition

Ƭ **NamedActionDefinition**: `Object`

Represents a named action definition.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionDefinition` | [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md) |
| `name` | `string` |

___

### ParameterName

Ƭ **ParameterName**: `string`

The type for the parameter name.

___

### ParameterType

Ƭ **ParameterType**: ``"string"`` \| ``"number"`` \| ``"boolean"``

Parameter type.

___

### ParametersDefinition

Ƭ **ParametersDefinition**<`T`\>: [[`PropertyKey`](react_form_builder_core.md#propertykey)<`T`\>, [`ParameterType`](react_form_builder_core.md#parametertype)]

The type to describe the action parameter.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### PreAnnotation

Ƭ **PreAnnotation**: `Partial`<`Omit`<[`Annotation`](../classes/react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](../classes/react_form_builder_core.Annotation.md), ``"editor"``\>

Type for component property metadata without the 'key' property, but with the 'editor' property.

___

### PropertyBlockType

Ƭ **PropertyBlockType**: ``"component"`` \| ``"tooltip"`` \| `string`

Represents the type of property block.

___

### PropertyKey

Ƭ **PropertyKey**<`T`\>: keyof `T` & `string`

Component property key type.

#### Type parameters

| Name |
| :------ |
| `T` |

___

### Rel

Ƭ **Rel**: ``"stylesheet"`` \| `string`

Represents a relationship attribute value used in HTML.

___

### ResolvedValidator

Ƭ **ResolvedValidator**: (`value`: `any`, `store`: [`IStore`](../interfaces/react_form_builder_core.IStore.md)) => `Promise`<[`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`\>

#### Type declaration

▸ (`value`, `store`): `Promise`<[`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`\>

The function that validates a value and returns the validation result.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) |

##### Returns

`Promise`<[`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`\>

___

### RuleValidator

Ƭ **RuleValidator**<`T`\>: (`value`: `T`, `store`: [`IStore`](../interfaces/react_form_builder_core.IStore.md), `args?`: `Record`<`string`, `unknown`\>) => [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`value`, `store`, `args?`): [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

The function that checks the value and returns the result of the rule validation, see [RuleValidatorResult](react_form_builder_core.md#rulevalidatorresult).

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) |
| `args?` | `Record`<`string`, `unknown`\> |

##### Returns

[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

___

### RuleValidatorResult

Ƭ **RuleValidatorResult**: `string` \| `boolean`

The result of validation of a single rule, true means validation was successful,
false means validation failed, string means error message.

___

### SchemaResolver

Ƭ **SchemaResolver**<`T`\>: (`value`: `T`) => [`ResolvedValidator`](react_form_builder_core.md#resolvedvalidator)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): [`ResolvedValidator`](react_form_builder_core.md#resolvedvalidator)

The validation function factory.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

[`ResolvedValidator`](react_form_builder_core.md#resolvedvalidator)

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
| `date` | `Date` |
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

### SyncEventHandler

Ƭ **SyncEventHandler**<`TSender`, `TEventArgs`\>: (`source`: `TSender`, `eventArgs`: `TEventArgs`) => `void`

#### Type parameters

| Name | Description |
| :------ | :------ |
| `TSender` | the type of the event source. |
| `TEventArgs` | the type of the event arguments. |

#### Type declaration

▸ (`source`, `eventArgs`): `void`

Represents a synchronous event handler.

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSender` |
| `eventArgs` | `TEventArgs` |

##### Returns

`void`

___

### TypedLocalization

Ƭ **TypedLocalization**: `Partial`<`Record`<[`LocalizationType`](react_form_builder_core.md#localizationtype), [`ComponentPropsLocalization`](react_form_builder_core.md#componentpropslocalization)\>\>

A record containing localizations grouped by localization type.

___

### ValidationResult

Ƭ **ValidationResult**: `Object`

The result of the validation.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `string` | The validation error message text. |
| `settings` | [`ValidationRuleSettings`](react_form_builder_core.md#validationrulesettings) | The validation rule settings. |

___

### ValidationRule

Ƭ **ValidationRule**: `Object`

Validation rule metadata required to create a validation function.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`ValidationRuleParameter`](react_form_builder_core.md#validationruleparameter)[] | Metadata of validation rule parameters. |
| `validatorFactory` | [`ValidatorFactory`](react_form_builder_core.md#validatorfactory)<`any`\> | The validation function factory. |

___

### ValidationRuleParameter

Ƭ **ValidationRuleParameter**: `Object`

Describes the settings of the validation rule parameter.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default?` | `unknown` |
| `editorType?` | `string` |
| `key` | `string` |
| `required` | `boolean` |
| `type` | [`SchemaType`](react_form_builder_core.md#schematype) |

___

### ValidationRuleSet

Ƭ **ValidationRuleSet**: `Record`<`string`, [`ValidationRule`](react_form_builder_core.md#validationrule)\>

Describes a set of validation rules.

___

### ValidationRuleSettings

Ƭ **ValidationRuleSettings**: `Object`

The validation rule settings.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `args?` | `Record`<`string`, `any`\> | Arguments of the validation rule. |
| `key` | `string` | The unique key of the validation rule. The key is unique within the value type. |
| `type?` | [`ValidatorType`](react_form_builder_core.md#validatortype) | The type of validator. |

___

### ValidatorFactory

Ƭ **ValidatorFactory**<`Params`\>: (`args`: `Params`) => [`RuleValidator`](react_form_builder_core.md#rulevalidator)

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Type declaration

▸ (`args`): [`RuleValidator`](react_form_builder_core.md#rulevalidator)

The validation function factory.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Params` |

##### Returns

[`RuleValidator`](react_form_builder_core.md#rulevalidator)

___

### ValidatorType

Ƭ **ValidatorType**: ``"internal"`` \| ``"external"``

The type of validator.

___

### ViewMode

Ƭ **ViewMode**: ``"desktop"`` \| ``"mobile"`` \| ``"tablet"``

Display resolution type.

## Variables

### ActionEventArgsDeclaration

• `Const` **ActionEventArgsDeclaration**: ``"\n/**\n * Arguments passed to the event handler.\n */\ndeclare class ActionEventArgs {\n\n  /**\n   * The event type.\n   */\n  readonly type: string\n\n  /**\n   * The component that triggered the event.\n   */\n  readonly sender: ComponentData\n  \n  /**\n   * The component properties that were used to render the sender component.\n   */\n  readonly renderedProps: Record<string, any>\n  \n  /**\n   * Sets current props of component.\n   */\n  readonly setUserDefinedProps: (props: Record<string, any>) => void\n\n  /**\n   * The form viewer settings.\n   */\n  readonly store: Store\n\n  /**\n   * The event arguments.\n   */\n  readonly args: any[]\n\n  /**\n   * @returns the event handled by the event handler.\n   */\n  get event(): SyntheticEvent | null\n\n  /**\n   * @returns the first element of the event argument array, which is treated as a value.\n   */\n  get value(): any\n  \n  /**\n   * @returns the object for reading and changing form data.\n   */\n  get data(): Record<string, unknown>\n}\n"``

Description of the event argument type for the code editor.

___

### AsyncFunction

• `Const` **AsyncFunction**: `Function`

___

### DidMountEvent

• `Const` **DidMountEvent**: ``"onDidMount"``

___

### IFormDataDeclaration

• `Const` **IFormDataDeclaration**: ``"declare interface IFormData {\n  /**\n   * @returns the {@link Record} with all the form data.\n   */\n  get data(): Record<string, unknown>\n\n  /**\n   * @returns the {@link Record} with all validation error messages.\n   */\n  get errors(): Record<string, unknown>\n\n  /**\n   * true if the form contains errors, otherwise false.\n   */\n  get hasErrors(): boolean\n\n  /**\n   * Sets the validation error message for all form data fields.\n   * @param message the validation error message.\n   */\n  setAllErrors(message?: string): void\n\n  /**\n   * Validates the data in the form.\n   */\n  validate(): Promise<void>\n\n  /**\n   * If true, then validation is in progress.\n   */\n  get isValidating(): boolean\n\n  /**\n   * Sets the form to its default value.\n   */\n  reset(): void\n\n  /**\n   * Clears the form data.\n   */\n  clear(): void\n}"``

Description of the form data for the code editor.

___

### KeySymbol

• `Const` **KeySymbol**: typeof [`KeySymbol`](react_form_builder_core.md#keysymbol)

The unique Symbol for the key property.

___

### StoreContext

• **StoreContext**: `Context`<``null`` \| [`Store`](../classes/react_form_builder_core.Store.md)\>

___

### WillUnmountEvent

• `Const` **WillUnmountEvent**: ``"onWillUnmount"``

___

### array

• `Const` **array**: [`ArrayBuilder`](../classes/react_form_builder_core.ArrayBuilder.md)<`undefined` \| `unknown`[]\>

The annotation builder for a component property with type 'Array'.

___

### boolean

• `Const` **boolean**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `boolean`\>

The annotation builder for a component property with type 'boolean'.

___

### className

• `Const` **className**: [`Annotation`](../classes/react_form_builder_core.Annotation.md)

The annotation builder for the component property containing the CSS class name.

___

### color

• `Const` **color**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\>

The annotation builder for a component property with type 'color' (e.g. rgba(71, 167, 122, 0.72)).

___

### commonStyles

• `Const` **commonStyles**: [`Annotation`](../classes/react_form_builder_core.Annotation.md)[]

The array of annotation builders for generic CSS properties of a component.

___

### date

• `Const` **date**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `Date`\>

The annotation builder for a component property with type 'Date'.

___

### emotionCache

• `Const` **emotionCache**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `LTR` | `EmotionCache` |
| `RTL` | `EmotionCache` |

___

### emptyComponentStore

• `Const` **emptyComponentStore**: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)

___

### errorMessageModel

• `Const` **errorMessageModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

___

### event

• `Const` **event**: [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`Function`\>

The annotation builder for a component property with type 'event' (or event handler, or just a function).

___

### htmlAttributes

• `Const` **htmlAttributes**: [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\>

The annotation builder for the 'key' property of a component.

___

### internalErrorModel

• `Const` **internalErrorModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`InternalErrorProps`](../interfaces/react_form_builder_core.InternalErrorProps.md)\>

Form viewer internal error metadata.

___

### key

• `Const` **key**: [`Annotation`](../classes/react_form_builder_core.Annotation.md)

The annotation for the 'key' property of the component.

___

### node

• `Const` **node**: [`NodeAnnotationBuilder`](../classes/react_form_builder_core.NodeAnnotationBuilder.md)<`ReactNode`\>

The annotation builder for a component property with type 'ReactNode'.

___

### number

• `Const` **number**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `number`\>

The annotation builder for a component property with type 'number'.

___

### renderWhen

• `Const` **renderWhen**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `boolean`\>

The annotation builder for the synthetic 'renderWhen' property of the component.

___

### screenModel

• `Const` **screenModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`ScreenProps`](../interfaces/react_form_builder_core.ScreenProps.md)\>

___

### size

• `Const` **size**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\>

The annotation builder for a component property with type 'CSS unit' (width, height, etc.).

___

### slotModel

• `Const` **slotModel**: [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>

___

### string

• `Const` **string**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\>

The annotation builder for a component property with type 'string'.

___

### tooltipProps

• `Const` **tooltipProps**: [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\>

The annotation builder for component tooltip properties.

___

### tooltipType

• `Const` **tooltipType**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\>

The annotation builder for the form property describing the type of form tooltip.

___

### validation

• `Const` **validation**: [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\>

The annotation builder for arbitrary HTML attributes of a component.

## Functions

### ComponentDataProvider

▸ **ComponentDataProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

Context provider for the useComponentData hook.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`ComponentData`](../classes/react_form_builder_core.ComponentData.md)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### ComponentTree

▸ **ComponentTree**(`«destructured»`): `Element`

The React component that displays an array of ComponentData.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ComponentTreeProps`](../interfaces/react_form_builder_core.ComponentTreeProps.md) |

#### Returns

`Element`

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

### SuppressResizeObserverErrors

▸ **SuppressResizeObserverErrors**(`props`): `Element`

SuppressResizeObserverErrors component is used to suppress ResizeObserver errors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`SuppressResizeObserverErrorsProps`](../interfaces/react_form_builder_core.SuppressResizeObserverErrorsProps.md) | the component props. |

#### Returns

`Element`

the rendered child elements.

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

### checkSlotCondition

▸ **checkSlotCondition**(`childStore`, `parentProps`): `any`

Performs the function of checking if the child component can be bound.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childStore` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) | the child component settings. |
| `parentProps` | `any` | the parent component properties. |

#### Returns

`any`

true, if the child component can be bound, false otherwise.

___

### compileFn

▸ **compileFn**(`source`): [`CompilationResult`](../interfaces/react_form_builder_core.CompilationResult.md)

Compiles the function from string source code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | the function source code. |

#### Returns

[`CompilationResult`](../interfaces/react_form_builder_core.CompilationResult.md)

the result of the function compilation.

___

### createActionValuesFromObject

▸ **createActionValuesFromObject**(`obj`): [`ActionValues`](react_form_builder_core.md#actionvalues)

Converts the input object to an ActionValues object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | the input object. |

#### Returns

[`ActionValues`](react_form_builder_core.md#actionvalues)

the converted ActionValues object.

___

### createAnnotation

▸ **createAnnotation**<`T`\>(`editor`): [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`T`\>

Creates a component property metadata builder.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | the property editor type. |

#### Returns

[`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`T`\>

the component property metadata builder.

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

### createProperty

▸ **createProperty**(`editor`): [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\>

Creates an instance of the builder class to define the property's metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | editor type for editing the property. |

#### Returns

[`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\>

the instance of the builder class to define the property's metadata.

___

### createView

▸ **createView**(`models`): [`View`](../classes/react_form_builder_core.View.md)

Static wrapper for the [View](../classes/react_form_builder_core.View.md) constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>[] | the components metadata. |

#### Returns

[`View`](../classes/react_form_builder_core.View.md)

the [View](../classes/react_form_builder_core.View.md) instance.

___

### define

▸ **define**<`T`\>(`view`, `displayName?`): [`Definer`](../classes/react_form_builder_core.Definer.md)<`T`\>

Static method to create an instance of the component's metadata builder class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | `ComponentType`<`T`\> | the React component type. |
| `displayName?` | `string` | the display name for the anonymous component. |

#### Returns

[`Definer`](../classes/react_form_builder_core.Definer.md)<`T`\>

the instance of the [Definer](../classes/react_form_builder_core.Definer.md) class.

___

### externalActionsToActionsValues

▸ **externalActionsToActionsValues**(`externalActions?`): [`ActionValues`](react_form_builder_core.md#actionvalues) \| `undefined`

Converts external actions to the set of action definitions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `externalActions?` | [`ExternalActions`](react_form_builder_core.md#externalactions) | the external actions. |

#### Returns

[`ActionValues`](react_form_builder_core.md#actionvalues) \| `undefined`

the set of action definitions or undefined.

___

### findTreeElementDepth

▸ **findTreeElementDepth**<`T`\>(`value`, `element?`, `depth?`): `number` \| `undefined`

Finds the depth of a given element in a tree.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `T` | `undefined` | the root of the tree. |
| `element?` | `T` | `undefined` | the element to find the depth of. |
| `depth` | `number` | `0` | the current depth of the tree (optional, default is 0). |

#### Returns

`number` \| `undefined`

the depth of the element in the tree, or undefined if the element is not found.

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

### generateUniqueName

▸ **generateUniqueName**(`prefix`, `existingNames`): `string`

Generates a unique name with the specified prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | the prefix. |
| `existingNames` | `Set`<`string`\> | the set of existing names to match with which uniqueness will be checked. |

#### Returns

`string`

the generated name.

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

### getValidatorPropertyBlockType

▸ **getValidatorPropertyBlockType**(`ruleKey`): `string`

Retrieves the property block type for a given rule key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ruleKey` | `string` | the rule key. |

#### Returns

`string`

the property block type. Validator property block types are prefixed with 'validator-'.

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

### isContainer

▸ **isContainer**(`value`): value is ContainerAn

Type predicate, asserts that the value is an instance of ContainerAn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Annotation`](../classes/react_form_builder_core.Annotation.md) | the value. |

#### Returns

value is ContainerAn

true if the value is an instance of ContainerAn, false otherwise.

___

### isFunctionalProperty

▸ **isFunctionalProperty**(`componentProperty?`): `boolean`

Returns true if the property value is calculated by the function, otherwise false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentProperty?` | [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md) | the component property. |

#### Returns

`boolean`

true if the property value is calculated by the function, otherwise false.

___

### isLocalizedProperty

▸ **isLocalizedProperty**(`componentProperty?`): `boolean`

Returns true if the property value is localized, otherwise false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentProperty?` | [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md) | the component property. |

#### Returns

`boolean`

true if the property value is localized, otherwise false.

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

### isProperty

▸ **isProperty**(`value`): value is PropertyAn

Type predicate, asserts that the value is an instance of PropertyAn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Annotation`](../classes/react_form_builder_core.Annotation.md) | the value. |

#### Returns

value is PropertyAn

true if the value is an instance of PropertyAn, false otherwise.

___

### isString

▸ **isString**(`value`): value is string

Type predicate, asserts that the value is a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the value. |

#### Returns

value is string

true if the value is a string, false otherwise.

___

### isUniqueKey

▸ **isUniqueKey**(`value`, `store`, `args?`): [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

Returns true if the component key is unique across the entire component tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the component key. |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) | the form viewer settings. |
| `args?` | `Record`<`string`, `unknown`\> | - |

#### Returns

[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

true if the component key is unique across the entire component tree.

___

### isValidatorPropertyBlockType

▸ **isValidatorPropertyBlockType**(`type`): `boolean`

Determines if the given type is a validator property block type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type to be checked. |

#### Returns

`boolean`

the boolean value indicating if the type is a validator property block type.

___

### loadResource

▸ **loadResource**(`id`, `href`, `rel`): `Promise`<`void`\>

Loads a resource into the document head asynchronously.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the identifier of the resource. |
| `href` | `string` | represents a URL to the resource. |
| `rel` | `string` | the relationship of the resource to the document. |

#### Returns

`Promise`<`void`\>

the promise that resolves when the resource has been loaded successfully.

___

### nameAutorun

▸ **nameAutorun**(`owner`, `name`, `params?`): `string`

Computes the autorun name based on the owner, name, and parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | the owner of the autorun. |
| `name` | `string` | the name of the autorun. |
| `params` | `Record`<`string`, `any`\> | the parameters for specific autorun. |

#### Returns

`string`

the computed autorun name.

___

### nameObservable

▸ **nameObservable**(`owner`, `params?`): `string`

Computes the observable name based on the owner, name, and parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | the owner of the observable. |
| `params` | `Record`<`string`, `any`\> | the parameters for specific observable. |

#### Returns

`string`

the computed observable name.

___

### namedObserver

▸ **namedObserver**<`T`\>(`displayName`, `component`): `T`

Creates the observable React component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `FunctionComponent`<`any`, `T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `displayName` | `string` | the displayName value of the React component. |
| `component` | `T` | the React component. |

#### Returns

`T`

the observable React component.

___

### oneOf

▸ **oneOf**<`U`\>(`...values`): [`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<`U`\>

The annotation builder for a component property with type 'enum', the property value can only be one of enum.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `U`[] |

#### Returns

[`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<`U`\>

___

### someOf

▸ **someOf**<`U`\>(`...values`): [`SomeOfBuilder`](../classes/react_form_builder_core.SomeOfBuilder.md)<`U`\>

The annotation builder for a component property with type 'enum', the property value can contain multiple enum values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `U`[] |

#### Returns

[`SomeOfBuilder`](../classes/react_form_builder_core.SomeOfBuilder.md)<`U`\>

___

### testFluentLocalization

▸ **testFluentLocalization**(`request`): [`LocalizationTestResult`](react_form_builder_core.md#localizationtestresult)

Localization testing function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`LocalizationTestRequest`](react_form_builder_core.md#localizationtestrequest) | the localization testing request. |

#### Returns

[`LocalizationTestResult`](react_form_builder_core.md#localizationtestresult)

the localization testing result.

___

### toArray

▸ **toArray**<`T`\>(`annotations?`, `setup?`): [`Annotation`](../classes/react_form_builder_core.Annotation.md)[]

Converts the object containing component property metadata into an array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `annotations?` | [`Annotations`](react_form_builder_core.md#annotations)<`T`\> | the object containing component property metadata. |
| `setup` | `Partial`<`Partial`<`Omit`<[`Annotation`](../classes/react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](../classes/react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](../classes/react_form_builder_core.BuilderOptions.md)\> | the custom options for the component's property metadata builder. |

#### Returns

[`Annotation`](../classes/react_form_builder_core.Annotation.md)[]

the metadata array of the component properties.

___

### toLabeledValues

▸ **toLabeledValues**(`items`, `upper?`): { `label`: `undefined` \| `string` ; `value`: `string` \| `number`  }[]

Converts the array of elements into the array of [LabeledValue](../interfaces/react_form_builder_core.LabeledValue.md) elements.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `items` | `string`[] \| [`LabeledValue`](../interfaces/react_form_builder_core.LabeledValue.md)[] | `undefined` | the array of elements. |
| `upper` | `boolean` | `true` | if true, the first character in [label](../interfaces/react_form_builder_core.LabeledValue.md#label) will be capitalized. |

#### Returns

{ `label`: `undefined` \| `string` ; `value`: `string` \| `number`  }[]

the array of [LabeledValue](../interfaces/react_form_builder_core.LabeledValue.md) elements.

___

### treeForEach

▸ **treeForEach**<`T`\>(`tree`, `fn`): `void`

Executes a given function on each node of a tree.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tree` | `T` | the root node of the tree. |
| `fn` | (`treeNode`: `T`) => `void` | the function to be executed on each node of the tree. |

#### Returns

`void`

___

### unloadResource

▸ **unloadResource**(`id`): `void`

Unloads a resource from the DOM based on its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the ID of the resource to unload. |

#### Returns

`void`

___

### useComponentData

▸ **useComponentData**(): [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)

#### Returns

[`ComponentData`](../classes/react_form_builder_core.ComponentData.md)

the instance of the ComponentData of the currently rendered component.

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

### useErrorModel

▸ **useErrorModel**(): [`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

#### Returns

[`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

the model of React component used to display the error.

___

### useStore

▸ **useStore**(): [`Store`](../classes/react_form_builder_core.Store.md)

#### Returns

[`Store`](../classes/react_form_builder_core.Store.md)

___

### useTooltipType

▸ **useTooltipType**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

the type of React component used to display the tooltip.

___

### useViewerProps

▸ **useViewerProps**(): `Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>

#### Returns

`Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>
