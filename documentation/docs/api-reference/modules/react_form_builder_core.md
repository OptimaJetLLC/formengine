---
id: "react_form_builder_core"
title: "Module: @react-form-builder/core"
sidebar_label: "@react-form-builder/core"
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [BiDi](../enums/react_form_builder_core.BiDi.md)
- [PersistedFormVersion](../enums/react_form_builder_core.PersistedFormVersion.md)

## Classes

- [ActionDefinition](../classes/react_form_builder_core.ActionDefinition.md)
- [ActionEventArgs](../classes/react_form_builder_core.ActionEventArgs.md)
- [Annotation](../classes/react_form_builder_core.Annotation.md)
- [AnnotationBuilder](../classes/react_form_builder_core.AnnotationBuilder.md)
- [ArrayBuilder](../classes/react_form_builder_core.ArrayBuilder.md)
- [BaseBuilder](../classes/react_form_builder_core.BaseBuilder.md)
- [BuilderOptions](../classes/react_form_builder_core.BuilderOptions.md)
- [BuilderView](../classes/react_form_builder_core.BuilderView.md)
- [CalculableResult](../classes/react_form_builder_core.CalculableResult.md)
- [ComponentData](../classes/react_form_builder_core.ComponentData.md)
- [ComponentDataEvents](../classes/react_form_builder_core.ComponentDataEvents.md)
- [ComponentKeyChangedEventArgs](../classes/react_form_builder_core.ComponentKeyChangedEventArgs.md)
- [ComponentState](../classes/react_form_builder_core.ComponentState.md)
- [ComponentStore](../classes/react_form_builder_core.ComponentStore.md)
- [ContainerAnnotation](../classes/react_form_builder_core.ContainerAnnotation.md)
- [DataValidator](../classes/react_form_builder_core.DataValidator.md)
- [Definer](../classes/react_form_builder_core.Definer.md)
- [EventAnnotation](../classes/react_form_builder_core.EventAnnotation.md)
- [EventStream](../classes/react_form_builder_core.EventStream.md)
- [Form](../classes/react_form_builder_core.Form.md)
- [FormViewerPropsStore](../classes/react_form_builder_core.FormViewerPropsStore.md)
- [Language](../classes/react_form_builder_core.Language.md)
- [LocalizationStore](../classes/react_form_builder_core.LocalizationStore.md)
- [Meta](../classes/react_form_builder_core.Meta.md)
- [Model](../classes/react_form_builder_core.Model.md)
- [ModuleAnnotation](../classes/react_form_builder_core.ModuleAnnotation.md)
- [NodeAnnotationBuilder](../classes/react_form_builder_core.NodeAnnotationBuilder.md)
- [OneOfBuilder](../classes/react_form_builder_core.OneOfBuilder.md)
- [PropertyAnnotation](../classes/react_form_builder_core.PropertyAnnotation.md)
- [QuantifierBuilder](../classes/react_form_builder_core.QuantifierBuilder.md)
- [SomeOfBuilder](../classes/react_form_builder_core.SomeOfBuilder.md)
- [Store](../classes/react_form_builder_core.Store.md)
- [StyleAnnotation](../classes/react_form_builder_core.StyleAnnotation.md)
- [SyncEvent](../classes/react_form_builder_core.SyncEvent.md)
- [TemplateField](../classes/react_form_builder_core.TemplateField.md)
- [TypedBuilder](../classes/react_form_builder_core.TypedBuilder.md)
- [View](../classes/react_form_builder_core.View.md)

## Interfaces

- [BaseCompilationResult](../interfaces/react_form_builder_core.BaseCompilationResult.md)
- [BuilderComponent](../interfaces/react_form_builder_core.BuilderComponent.md)
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

| Name | Type | Description |
| :------ | :------ | :------ |
| `[KeySymbol]?` | `string` | The unique action key. |
| `args?` | [`Arguments`](react_form_builder_core.md#arguments) | The action arguments. |
| `name` | `string` | The action name. |
| `type` | [`ActionType`](react_form_builder_core.md#actiontype) | The action type. |

___

### ActionEventHandler

Ƭ **ActionEventHandler**: (`e`: [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`e`): `void` \| `Promise`<`void`\>

Event handler function type.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md) | the action arguments. |

##### Returns

`void` \| `Promise`<`void`\>

___

### ActionHandler

Ƭ **ActionHandler**<`T`\>: (`e`: [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md), `params`: { [k in keyof T]: any }) => `void` \| `Promise`<`void`\>

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of action parameters. |

#### Type declaration

▸ (`e`, `params`): `void` \| `Promise`<`void`\>

Action function type.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`ActionEventArgs`](../classes/react_form_builder_core.ActionEventArgs.md) | the action arguments. |
| `params` | { [k in keyof T]: any } | the action parameters. |

##### Returns

`void` \| `Promise`<`void`\>

___

### ActionParameters

Ƭ **ActionParameters**: `Record`<[`ParameterName`](react_form_builder_core.md#parametername), [`ParameterType`](react_form_builder_core.md#parametertype)\>

Represents a set of action parameters.

___

### ActionType

Ƭ **ActionType**: ``"common"`` \| ``"code"`` \| ``"custom"``

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

The type of function that initializes an actions on a component. **Internal use only.**

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)[``"props"``] | the component's property settings. |
| `def` | [`DefineActionHelper`](react_form_builder_core.md#defineactionhelper) | the helper to create an action event handler. |

##### Returns

`Record`<[`EventName`](react_form_builder_core.md#eventname), [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler) \| [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)\>

the Record with action event handlers.

___

### AnnotationType

Ƭ **AnnotationType**: ``"Property"`` \| ``"Container"`` \| ``"Event"`` \| ``"Module"`` \| ``"Style"``

Type of component property description in the form builder.

___

### Annotations

Ƭ **Annotations**<`T`\>: { [key in keyof T]: BaseBuilder<T[key]\> \| undefined }

The type-safe description of the component's metadata property builders.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `object` | the component property name type. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoValidate?` | `boolean` | Flag, if true then automatic validation of the value works, false otherwise. |
| `validations?` | [`ValidationRuleSettings`](react_form_builder_core.md#validationrulesettings)[] | The array of validation rule settings. |

___

### BuilderSetup

Ƭ **BuilderSetup**: `Partial`<[`PreAnnotation`](react_form_builder_core.md#preannotation) & [`BuilderOptions`](../classes/react_form_builder_core.BuilderOptions.md)\>

The type representing custom options for the component's property metadata builder.

___

### ComponentKey

Ƭ **ComponentKey**: `string`

The component key.

___

### ComponentKind

Ƭ **ComponentKind**: ``"container"`` \| ``"component"`` \| ``"slot"`` \| ``"template"``

The component kind type.

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

Function that calculates all child properties of a component. **Internal use only.**

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentData` | [`ComponentData`](../classes/react_form_builder_core.ComponentData.md) | the data required to display a component. |
| `componentProps` | `Record`<`string`, `any`\> | the calculated properties of the component. |

##### Returns

`Record`<`string`, `any`\>

the Record with calculated child properties.

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

### CssPart

Ƭ **CssPart**: ``"css"`` \| ``"wrapperCss"``

The part of the CSS properties of a component.

___

### CustomActions

Ƭ **CustomActions**: `Record`<`string`, [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md) \| [`ActionEventHandler`](react_form_builder_core.md#actioneventhandler)\>

Custom actions for the form viewer.

___

### CustomValidationRuleSettings

Ƭ **CustomValidationRuleSettings**: `Object`

Custom validation rule settings.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`ValidationRuleParameter`](react_form_builder_core.md#validationruleparameter)[] | Metadata of validation rule parameters. |
| `validate` | [`RuleValidator`](react_form_builder_core.md#rulevalidator) | The function that validates the value. |

___

### CustomValidationRules

Ƭ **CustomValidationRules**: `Record`<`string`, [`CustomValidationRuleSettings`](react_form_builder_core.md#customvalidationrulesettings)\>

A set of metadata of custom validation rules, grouped by rule name.

___

### DefineActionHelper

Ƭ **DefineActionHelper**: <T\>(`name`: `string`, `func`: [`ActionHandler`](react_form_builder_core.md#actionhandler)<`T`\>, `params?`: [`ParameterDefinition`](react_form_builder_core.md#parameterdefinition)<`T`\>[], `description?`: `string`) => [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

#### Type declaration

▸ <`T`\>(`name`, `func`, `params?`, `description?`): [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

The defineAction helper type. **Internal use only.**

##### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of action parameter. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the action name. |
| `func` | [`ActionHandler`](react_form_builder_core.md#actionhandler)<`T`\> | the action handler. |
| `params?` | [`ParameterDefinition`](react_form_builder_core.md#parameterdefinition)<`T`\>[] | the definition of action parameters. |
| `description?` | `string` | the action description. |

##### Returns

[`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md)

the definition of an action.

___

### DefinerData

Ƭ **DefinerData**<`T`\>: `Object`

Definer class data.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `object` | React component property type. |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionsInitializer?` | [`ActionsInitializer`](react_form_builder_core.md#actionsinitializer) | The function that initializes an actions on a component (for internal use only). |
| `category?` | `string` | The component category. |
| `component` | `ComponentType`<`T`\> | The React component. |
| `cssObject?` | [`Annotations`](react_form_builder_core.md#annotations)<`CSSObject`\> | The CSS metadata. |
| `customPreview?` | `ReactNode` | The custom component to display in the component list (unused). |
| `icon?` | `ComponentType` | The component icon. |
| `kind?` | [`ComponentKind`](react_form_builder_core.md#componentkind) | The component kind. |
| `name?` | `string` | The component name. |
| `properties?` | [`Annotations`](react_form_builder_core.md#annotations)<`T`\> | The property metadata. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `code?` | `string` | The validation code. |
| `message?` | `string` | The validation message. |

___

### ErrorMessageLocalizer

Ƭ **ErrorMessageLocalizer**: (`value`: [`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`) => `string` \| `undefined`

#### Type declaration

▸ (`value`): `string` \| `undefined`

A function that localizes validation error messages.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined` | the results of the validation. |

##### Returns

`string` \| `undefined`

the localization result or undefined.

___

### EventName

Ƭ **EventName**: `string`

The type for the event name.

___

### FirstParameter

Ƭ **FirstParameter**<`T`\>: `Parameters`<`T`\>[``0``]

The generic type that returns the first parameter of the generic type T. **Internal use only.**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

___

### FormValidator

Ƭ **FormValidator**: (`data`: `Record`<`string`, `unknown`\>) => `Promise`<`Record`<`string`, `string`\> \| `undefined`\>

#### Type declaration

▸ (`data`): `Promise`<`Record`<`string`, `string`\> \| `undefined`\>

Represents a function that validate the form data.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `unknown`\> | the form data. |

##### Returns

`Promise`<`Record`<`string`, `string`\> \| `undefined`\>

the Record with form field errors.

___

### FormValidators

Ƭ **FormValidators**: [`FormValidator`](react_form_builder_core.md#formvalidator)[]

Represents an array of functions that validate the form data.

___

### FormViewerValidationRules

Ƭ **FormViewerValidationRules**: `Object`

Validation rules for FormViewer.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `custom?` | [`CustomValidationRules`](react_form_builder_core.md#customvalidationrules) | The set of custom validators. |
| `internal` | [`ValidationRuleSet`](react_form_builder_core.md#validationruleset) | The set of internal validators. |

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

### IDisposable

Ƭ **IDisposable**: `Object`

Type of disposable object.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dispose` | () => `void` |

___

### LanguageFullCode

Ƭ **LanguageFullCode**: `string`

The full language code, e.g. 'en-US'.

___

### LocalizationTestRequest

Ƭ **LocalizationTestRequest**: `Object`

Localization testing request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `FluentVariable`\> | The test form data. |
| `language` | [`Language`](../classes/react_form_builder_core.Language.md) | The localization Language. |
| `localization` | `string` | Localization value to be tested. |
| `localizationStringId` | `string` | The identifier of the localization string. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionDefinition` | [`ActionDefinition`](../classes/react_form_builder_core.ActionDefinition.md) | The definition of an action. |
| `name` | `string` | The name of action definition. |

___

### ParameterDefinition

Ƭ **ParameterDefinition**<`T`\>: [[`PropertyKey`](react_form_builder_core.md#propertykey)<`T`\>, [`ParameterType`](react_form_builder_core.md#parametertype)]

The type to describe the action parameter.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of action parameter. |

___

### ParameterName

Ƭ **ParameterName**: `string`

The type for the parameter name.

___

### ParameterType

Ƭ **ParameterType**: ``"string"`` \| ``"number"`` \| ``"boolean"``

Parameter type.

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

| Name | Description |
| :------ | :------ |
| `T` | the type of action parameter |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the validated value. |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) | the form viewer settings. |

##### Returns

`Promise`<[`ValidationResult`](react_form_builder_core.md#validationresult)[] \| `undefined`\>

the Promise with the results of the validation.

___

### RuleValidator

Ƭ **RuleValidator**<`T`\>: (`value`: `T`, `store`: [`IStore`](../interfaces/react_form_builder_core.IStore.md), `args?`: `Record`<`string`, `unknown`\>) => [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | the value type. |

#### Type declaration

▸ (`value`, `store`, `args?`): [`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult) \| `Promise`<[`RuleValidatorResult`](react_form_builder_core.md#rulevalidatorresult)\>

The function that checks the value and returns the result of the rule validation, see [RuleValidatorResult](react_form_builder_core.md#rulevalidatorresult).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the value. |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) | the form viewer settings |
| `args?` | `Record`<`string`, `unknown`\> | the rule arguments. |

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

| Name | Description |
| :------ | :------ |
| `T` | the validation function factory arguments. |

#### Type declaration

▸ (`value`): [`ResolvedValidator`](react_form_builder_core.md#resolvedvalidator)

The validation function factory.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the validated value. |

##### Returns

[`ResolvedValidator`](react_form_builder_core.md#resolvedvalidator)

the function that validates a value.

___

### SchemaType

Ƭ **SchemaType**: keyof [`SchemaTypeMap`](react_form_builder_core.md#schematypemap)

The value type name.

___

### SchemaTypeMap

Ƭ **SchemaTypeMap**: `Object`

Describes the mapping of a value type name to a type.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `any`[] | The array. |
| `boolean` | `boolean` | The boolean. |
| `date` | `Date` | The date. |
| `enum` | `any` | The enumeration. |
| `number` | `number` | The number. |
| `object` | `object` | The object. |
| `string` | `string` | The string. |

___

### Setter

Ƭ **Setter**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | the value type. |

#### Type declaration

▸ (`value`): `void`

Value setting function type.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the value. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `default?` | `unknown` | The default value. |
| `editorType?` | `string` | The editor type of the setting value. |
| `key` | `string` | The unique setting key of the parameter. |
| `required` | `boolean` | Flag whether the setting value must be filled in. |
| `type` | [`SchemaType`](react_form_builder_core.md#schematype) | The type of value. |

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

| Name | Description |
| :------ | :------ |
| `Params` | the factory arguments type. |

#### Type declaration

▸ (`args`): [`RuleValidator`](react_form_builder_core.md#rulevalidator)

The validation function factory.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Params` | the factory arguments. |

##### Returns

[`RuleValidator`](react_form_builder_core.md#rulevalidator)

the function that checks the value and returns the result of the rule validation

___

### ValidatorType

Ƭ **ValidatorType**: ``"internal"`` \| ``"custom"``

The type of validator.

___

### Validators

Ƭ **Validators**: `Partial`<`Record`<[`SchemaType`](react_form_builder_core.md#schematype), [`CustomValidationRules`](react_form_builder_core.md#customvalidationrules)\>\>

The set of metadata of custom validation rules, grouped by the type of value being validated.

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

Asynchronous function constructor.

___

### DidMountEvent

• `Const` **DidMountEvent**: ``"onDidMount"``

The DidMountEvent event name.

___

### IFormDataDeclaration

• `Const` **IFormDataDeclaration**: ``"declare interface IFormData {\n  /**\n   * @returns the {@link Record} with all the form data.\n   */\n  get data(): Record<string, unknown>\n\n  /**\n   * @returns the {@link Record} with all validation error messages.\n   */\n  get errors(): Record<string, unknown>\n\n  /**\n   * true if the form contains errors, otherwise false.\n   */\n  get hasErrors(): boolean\n\n  /**\n   * @returns A user-defined key-value observable storage. Utilize it to store and share any custom data.\n   */\n  get state(): Record<string, unknown>\n\n  /**\n   * Sets the validation error message for all form data fields.\n   * @param message the validation error message.\n   */\n  setAllErrors(message?: string): void\n\n  /**\n   * Validates the data in the form.\n   */\n  validate(): Promise<void>\n    \n  /**\n   * Returns the validation results without triggering an events and changing the state of the form.\n   * @returns the validation results.\n   */\n  getValidationResult: () => Promise<ValidationMessages>\n\n  /**\n   * If true, then validation is in progress.\n   */\n  get isValidating(): boolean\n\n  /**\n   * Sets the form to its default value.\n   */\n  reset(): void\n\n  /**\n   * Clears the form data.\n   */\n  clear(): void\n}"``

Description of the form data for the code editor.

___

### KeySymbol

• `Const` **KeySymbol**: typeof [`KeySymbol`](react_form_builder_core.md#keysymbol)

The unique Symbol for the key property.

___

### StoreContext

• **StoreContext**: `Context`<``null`` \| [`Store`](../classes/react_form_builder_core.Store.md)\>

**Internal use only.**

___

### WillUnmountEvent

• `Const` **WillUnmountEvent**: ``"onWillUnmount"``

The WillUnmountEvent event name.

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

• `Const` **commonStyles**: `Object`

The annotations for generic CSS properties of a component.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `color` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `height` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `marginBottom` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `marginLeft` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `marginRight` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `marginTop` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |
| `width` | [`AnnotationBuilder`](../classes/react_form_builder_core.AnnotationBuilder.md)<`unknown`\> |

___

### containerStyles

• `Const` **containerStyles**: `Object`

The annotations for generic CSS properties of a container component.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alignItems` | [`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<``"start"`` \| ``"center"`` \| ``"baseline"`` \| ``"end"`` \| ``"stretch"``\> |
| `flexDirection` | [`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<``"column"`` \| ``"row"`` \| ``"column-reverse"`` \| ``"row-reverse"``\> |
| `flexWrap` | [`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<``"wrap"`` \| ``"nowrap"`` \| ``"wrap-reverse"``\> |
| `gap` | [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\> |
| `justifyContent` | [`OneOfBuilder`](../classes/react_form_builder_core.OneOfBuilder.md)<``"left"`` \| ``"right"`` \| ``"start"`` \| ``"center"`` \| ``"end"`` \| ``"flex-start"`` \| ``"flex-end"`` \| ``"space-between"`` \| ``"space-around"`` \| ``"space-evenly"``\> |

___

### date

• `Const` **date**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `Date`\>

The annotation builder for a component property with type 'Date'.

___

### emotionCache

• `Const` **emotionCache**: `Object`

The CSS style cache. **Internal use only.**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `LTR` | `EmotionCache` |
| `RTL` | `EmotionCache` |

___

### emptyComponentStore

• `Const` **emptyComponentStore**: [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)

The empty component settings object. **Internal use only.**

___

### errorMessageModel

• `Const` **errorMessageModel**: [`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

The component metadata for error message. **Internal use only.**

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

Form viewer internal error metadata. **Internal use only.**

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

• `Const` **screenModel**: [`Model`](../classes/react_form_builder_core.Model.md)<{ `as?`: `ElementType`<`any`\> ; `theme?`: `Theme`  } & `ClassAttributes`<`HTMLDivElement`\> & `HTMLAttributes`<`HTMLDivElement`\>\>

Form viewer screen metadata. **Internal use only.**

___

### size

• `Const` **size**: [`TypedBuilder`](../classes/react_form_builder_core.TypedBuilder.md)<`undefined` \| `string`\>

The annotation builder for a component property with type 'CSS unit' (width, height, etc.).

___

### slotModel

• `Const` **slotModel**: [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>

Form viewer slot metadata. **Internal use only.**

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

Context provider for the useComponentData hook. **Internal use only.**

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`ComponentData`](../classes/react_form_builder_core.ComponentData.md)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### ComponentTree

▸ **ComponentTree**(`props`): `Element`

The React component that displays an array of ComponentData. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ComponentTreeProps`](../interfaces/react_form_builder_core.ComponentTreeProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### DefaultWrapper

▸ **DefaultWrapper**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

The React component that wraps every component in a form.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<{ `as?`: `ElementType`<`any`\> ; `theme?`: `Theme`  } & `ClassAttributes`<`HTMLDivElement`\> & `HTMLAttributes`<`HTMLDivElement`\>\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

___

### FormViewer

▸ **FormViewer**(`props`): `Element`

The main React component of the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### SDiv

▸ **SDiv**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<{ `as?`: `ElementType`<`any`\> ; `theme?`: `Theme`  } & `ClassAttributes`<`HTMLDivElement`\> & `HTMLAttributes`<`HTMLDivElement`\>\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

___

### StoreProvider

▸ **StoreProvider**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**Internal use only.**

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`Store`](../classes/react_form_builder_core.Store.md)\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### SuppressResizeObserverErrors

▸ **SuppressResizeObserverErrors**(`props`): `Element`

SuppressResizeObserverErrors component is used to suppress ResizeObserver errors. **Internal use only.**

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

**Internal use only.**

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<`Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

___

### calculatePropertyValue

▸ **calculatePropertyValue**(`componentProperty`, `formViewerData`): [`CalculableResult`](../classes/react_form_builder_core.CalculableResult.md)

Calculates the value for the component property. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentProperty` | [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md) | the component property. |
| `formViewerData` | [`IFormData`](../interfaces/react_form_builder_core.IFormData.md) | the formViewerData data. |

#### Returns

[`CalculableResult`](../classes/react_form_builder_core.CalculableResult.md)

the calculated value.

___

### checkSlotCondition

▸ **checkSlotCondition**(`childStore`, `parentProps`): `any`

Performs the function of checking if the child component can be bound. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childStore` | [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) | the child component settings. |
| `parentProps` | `any` | the parent component properties. |

#### Returns

`any`

true, if the child component can be bound, false otherwise.

___

### createActionValuesFromObject

▸ **createActionValuesFromObject**(`obj`): [`ActionValues`](react_form_builder_core.md#actionvalues)

Converts the input object to an ActionValues object. **Internal use only.**

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

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

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

Creates non-nullable React context. **Internal use only.**

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

▸ **define**<`T`\>(`component`, `displayName?`): [`Definer`](../classes/react_form_builder_core.Definer.md)<`T`\>

Static method to create an instance of the component's metadata builder class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | `ComponentType`<`T`\> | the React component. |
| `displayName?` | `string` | the display name for the anonymous component. |

#### Returns

[`Definer`](../classes/react_form_builder_core.Definer.md)<`T`\>

the instance of the [Definer](../classes/react_form_builder_core.Definer.md) class.

___

### findTreeElementDepth

▸ **findTreeElementDepth**<`T`\>(`value`, `element?`, `depth?`): `number` \| `undefined`

Finds the depth of a given element in a tree. **Internal use only.**

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

Generates the template type name from the specified template name. **Internal use only.**

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

Generates a unique name with the specified prefix. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | the prefix. |
| `existingNames` | `Set`<`string`\> | the set of existing names to match with which uniqueness will be checked. |

#### Returns

`string`

the generated name.

___

### getDefault

▸ **getDefault**(`annotations`): `Readonly`<`Record`<`string`, `any`\>\>

Extracts component properties default values from annotations . **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `annotations` | [`Annotation`](../classes/react_form_builder_core.Annotation.md)[] | the array of component annotations. |

#### Returns

`Readonly`<`Record`<`string`, `any`\>\>

the object containing component properties default values.

___

### getDefaultCss

▸ **getDefaultCss**(`annotations`): `Readonly`<`Record`<`string`, `any`\>\>

Extracts CSS properties default values from annotations . **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `annotations` | [`Annotation`](../classes/react_form_builder_core.Annotation.md)[] | the array of component annotations. |

#### Returns

`Readonly`<`Record`<`string`, `any`\>\>

the object with CSS properties default values.

___

### getFluentCompatibleId

▸ **getFluentCompatibleId**(`rawId`): `string`

Converts the raw id to a Fluent compatible id, i.e. replaces all the spaces with underscores. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawId` | `string` | some raw id. |

#### Returns

`string`

the Fluent compatible id.

___

### getFluentData

▸ **getFluentData**(`data`): `Record`<`string`, `FluentVariable`\>

Converts the form data to a Fluent compatible. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `unknown`\> | the form data. |

#### Returns

`Record`<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.

___

### getKey

▸ **getKey**(): `string`

Generates the random string. **Internal use only.**

#### Returns

`string`

the generated random string.

___

### getValidatorPropertyBlockType

▸ **getValidatorPropertyBlockType**(`ruleKey`): `string`

Retrieves the property block type for a given rule key. **Internal use only.**

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

Groups the array of values by function predicate. **Internal use only.**

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

### initFormFields

▸ **initFormFields**(`form`): `Record`<`string`, `unknown`\>

Replaces empty form fields with an empty string. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `form` | [`ComponentData`](../classes/react_form_builder_core.ComponentData.md) | the form. |

#### Returns

`Record`<`string`, `unknown`\>

all form data where empty fields are filled with empty strings.

___

### isContainer

▸ **isContainer**(`value`): value is ContainerAnnotation

Type predicate, asserts that the value is an instance of ContainerAnnotation. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Annotation`](../classes/react_form_builder_core.Annotation.md) | the value. |

#### Returns

value is ContainerAnnotation

true if the value is an instance of ContainerAnnotation, false otherwise.

___

### isFunctionalProperty

▸ **isFunctionalProperty**(`componentProperty?`): `boolean`

Returns true if the property value is calculated by the function, otherwise false. **Internal use only.**

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

Returns true if the property value is localized, otherwise false. **Internal use only.**

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

Type predicate, asserts that the value is a Promise. **Internal use only.**

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

▸ **isProperty**(`value`): value is PropertyAnnotation

Type predicate, asserts that the value is an instance of PropertyAnnotation. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Annotation`](../classes/react_form_builder_core.Annotation.md) | the value. |

#### Returns

value is PropertyAnnotation

true if the value is an instance of PropertyAnnotation, false otherwise.

___

### isString

▸ **isString**(`value`): value is string

Type predicate, asserts that the value is a string. **Internal use only.**

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

Returns true if the component key is unique across the entire component tree. **Internal use only.**

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

Determines if the given type is a validator property block type. **Internal use only.**

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

Loads a resource into the document head asynchronously. **Internal use only.**

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

Computes the autorun name based on the owner, name, and parameters. **Internal use only.**

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

Computes the observable name based on the owner, name, and parameters. **Internal use only.**

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

Creates the observable React component. **Internal use only.**

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

▸ **testFluentLocalization**(`request`): [`CalculableResult`](../classes/react_form_builder_core.CalculableResult.md)

Localization testing function. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`LocalizationTestRequest`](react_form_builder_core.md#localizationtestrequest) | the localization testing request. |

#### Returns

[`CalculableResult`](../classes/react_form_builder_core.CalculableResult.md)

the localization testing result.

___

### toArray

▸ **toArray**<`T`\>(`annotations?`, `setup?`): [`Annotation`](../classes/react_form_builder_core.Annotation.md)[]

Converts the object containing component property metadata into an array. **Internal use only.**

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

Executes a given function on each node of a tree. **Internal use only.**

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

Unloads a resource from the DOM based on its ID. **Internal use only.**

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

### useDisposable

▸ **useDisposable**<`T`\>(`factory`): `T` \| `undefined`

Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IDisposable`](react_form_builder_core.md#idisposable) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | () => `T` | the factory function to create a disposable object. |

#### Returns

`T` \| `undefined`

the disposable object.

___

### useErrorModel

▸ **useErrorModel**(): [`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

#### Returns

[`Model`](../classes/react_form_builder_core.Model.md)<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

the model of React component used to display the error.

___

### useStore

▸ **useStore**(): [`Store`](../classes/react_form_builder_core.Store.md)

**Internal use only.**

#### Returns

[`Store`](../classes/react_form_builder_core.Store.md)

___

### useTooltipType

▸ **useTooltipType**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

the type of React component used to display the tooltip. **Internal use only.**

___

### useViewerProps

▸ **useViewerProps**(): `Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>

**Internal use only.**

#### Returns

`Readonly`<[`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md)\>
