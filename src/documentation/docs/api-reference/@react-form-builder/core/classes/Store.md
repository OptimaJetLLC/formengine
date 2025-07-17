# Class: Store

The form viewer settings. **Internal use only.**

## Implements

- [`IStore`](../interfaces/IStore.md)
- [`IFormViewer`](../interfaces/IFormViewer.md)
- [`IComponentDataFactory`](../interfaces/IComponentDataFactory.md)

## Constructors

### new Store()

> **new Store**(`formViewerPropsStore`, `componentStateFactory`, `parentStore`?, `getInitialData`?): [`Store`](Store.md)

Creates form viewer settings.

#### Parameters

• **formViewerPropsStore**: [`FormViewerPropsStore`](FormViewerPropsStore.md)

the form viewer store settings.

• **componentStateFactory**: [`ComponentStateFactory`](../type-aliases/ComponentStateFactory.md)

the factory for creating component states.

• **parentStore?**: [`Store`](Store.md)

the form viewer settings, used in templates.

• **getInitialData?**: [`GetInitialDataFn`](../type-aliases/GetInitialDataFn.md)

the function to get initial data for the Store.

#### Returns

[`Store`](Store.md)

## Properties

### componentStateFactory

> `readonly` **componentStateFactory**: [`ComponentStateFactory`](../type-aliases/ComponentStateFactory.md)

the factory for creating component states.

***

### form

> **form**: [`Form`](Form.md)

The form.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`form`](../interfaces/IStore.md#form)

***

### formLoadError?

> `optional` **formLoadError**: `string`

The loading form error.

***

### formViewerPropsStore

> **formViewerPropsStore**: [`FormViewerPropsStore`](FormViewerPropsStore.md)

the form viewer store settings.

***

### getInitialData?

> `readonly` `optional` **getInitialData**: [`GetInitialDataFn`](../type-aliases/GetInitialDataFn.md)

the function to get initial data for the Store.

***

### parentStore?

> `readonly` `optional` **parentStore**: [`Store`](Store.md)

the form viewer settings, used in templates.

***

### selectedLanguage?

> `optional` **selectedLanguage**: [`Language`](Language.md)

The currently selected language.

***

### viewMode

> **viewMode**: [`ViewMode`](../type-aliases/ViewMode.md) = `'desktop'`

Current display resolution type.

## Accessors

### commonActions

#### Get Signature

> **get** **commonActions**(): [`ActionValues`](../type-aliases/ActionValues.md)

##### Returns

[`ActionValues`](../type-aliases/ActionValues.md)

the Record with the common actions.

***

### displayedLanguage

#### Get Signature

> **get** **displayedLanguage**(): [`Language`](Language.md)

##### Returns

[`Language`](Language.md)

the current display language.

***

### formData

#### Get Signature

> **get** **formData**(): [`ComponentData`](ComponentData.md)

##### Returns

[`ComponentData`](ComponentData.md)

the [IFormData](../interfaces/IFormData.md) with all the form data.

#### Implementation of

[`IFormViewer`](../interfaces/IFormViewer.md).[`formData`](../interfaces/IFormViewer.md#formdata)

***

### initialDataSlice

#### Get Signature

> **get** **initialDataSlice**(): `unknown`

##### Returns

`unknown`

the slice of the initial data in accordance with the Store hierarchy. **Internal use only.**

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`initialDataSlice`](../interfaces/IStore.md#initialdataslice)

***

### showAllValidationErrors

#### Get Signature

> **get** **showAllValidationErrors**(): `undefined` \| `boolean`

##### Returns

`undefined` \| `boolean`

true if all validation errors are to be displayed, false otherwise.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`showAllValidationErrors`](../interfaces/IStore.md#showallvalidationerrors)

## Methods

### applyPersistedForm()

> **applyPersistedForm**(`persistedForm`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

• **persistedForm**: [`PersistedForm`](../interfaces/PersistedForm.md)

saved form value.

#### Returns

`void`

***

### applyStringForm()

> **applyStringForm**(`text`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

• **text**: `string`

saved form value.

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Clears the form in Form Viewer.

#### Returns

`void`

***

### createComponentData()

> **createComponentData**(`componentStore`, `deferFieldCalculation`): [`ComponentData`](ComponentData.md)

Creates the element for the component tree. **Internal use only.**

#### Parameters

• **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

• **deferFieldCalculation**: `boolean` = `false`

if true, then the calculated field must be explicitly initialized.

#### Returns

[`ComponentData`](ComponentData.md)

the element for the component tree.

#### Implementation of

[`IComponentDataFactory`](../interfaces/IComponentDataFactory.md).[`createComponentData`](../interfaces/IComponentDataFactory.md#createcomponentdata)

***

### dispose()

> **dispose**(): `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`dispose`](../interfaces/IStore.md#dispose)

***

### findAction()

> **findAction**(`actionData`): [`ActionDefinition`](ActionDefinition.md)

Searches for an action, returns definition for the found action.

#### Parameters

• **actionData**: [`ActionData`](../type-aliases/ActionData.md)

the action's data.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action definition.

#### Throws

Error, if action was not found.

***

### getAction()

> **getAction**(`name`, `type`): [`ActionDefinition`](ActionDefinition.md)

Returns an action by the specified action name and action type.

#### Parameters

• **name**: `string`

the action name.

• **type**: [`ActionType`](../type-aliases/ActionType.md)

the action type.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action.

***

### getModel()

> **getModel**(`type`): [`Model`](Model.md)\<`any`\> \| [`Model`](Model.md)\<[`TemplateProps`](../interfaces/TemplateProps.md)\> \| [`Model`](Model.md)\<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

Returns model for the specified type.

#### Parameters

• **type**: `string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\> \| [`Model`](Model.md)\<[`TemplateProps`](../interfaces/TemplateProps.md)\> \| [`Model`](Model.md)\<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

the model for the specified type.

***

### getValidationRules()

> **getValidationRules**(`type`): [`FormViewerValidationRules`](../type-aliases/FormViewerValidationRules.md)

Returns the object with validators for the specified value type.

#### Parameters

• **type**: keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)

the value type.

#### Returns

[`FormViewerValidationRules`](../type-aliases/FormViewerValidationRules.md)

the object with validators for the specified value type.

***

### ~~loadForm()~~

> **loadForm**(`getForm`?, `formName`?): `void`

#### Parameters

• **getForm?**

the function that loads the form.

• **formName?**: `string`

the form name.

#### Returns

`void`

#### Deprecated

Loads a form by form name and sets that form in the form viewer.

***

### localizeComponent()

> **localizeComponent**(`type`, `formData`, `componentStore`): `Record`\<`string`, `any`\>

Localizes a component store based on the given localization type. If a custom localizer is available, it will be used.

#### Parameters

• **type**: `string`

the type of localization.

• **formData**: [`IFormData`](../interfaces/IFormData.md)

the form data.

• **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

#### Returns

`Record`\<`string`, `any`\>

the Record with the localized properties.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`localizeComponent`](../interfaces/IStore.md#localizecomponent)

***

### localizeErrorMessages()

> **localizeErrorMessages**(`formData`, `componentStore`, `validationResults`?): `undefined` \| `string`

The function to localize the validation error message.

#### Parameters

• **formData**: [`IFormData`](../interfaces/IFormData.md)

the form data.

• **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

• **validationResults?**: [`ValidationResult`](../type-aliases/ValidationResult.md)[]

the results of the validation.

#### Returns

`undefined` \| `string`

the result of localization or undefined.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`localizeErrorMessages`](../interfaces/IStore.md#localizeerrormessages)

***

### reduceScreen()

> **reduceScreen**\<`T`\>(`callback`, `initialValue`): `T`

Performs the callback function on each element of the component tree, accumulates the return values.

#### Type Parameters

• **T**

the return value type.

#### Parameters

• **callback**

the function that calculates the value for the accumulator.

• **initialValue**: `T`

the initial value for the accumulator.

#### Returns

`T`

the accumulated value.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`reduceScreen`](../interfaces/IStore.md#reducescreen)
