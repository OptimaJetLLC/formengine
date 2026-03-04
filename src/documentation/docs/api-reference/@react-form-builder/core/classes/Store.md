# Class: Store

The form viewer settings. **Internal use only.**

## Implements

- [`IStore`](../interfaces/IStore.md)
- [`IFormViewer`](../interfaces/IFormViewer.md)
- [`IComponentDataFactory`](../interfaces/IComponentDataFactory.md)

## Constructors

### Constructor

> **new Store**(`formViewerPropsStore`, `componentStateFactory`, `parentStore?`, `getInitialData?`, `setInitialData?`): `Store`

Creates form viewer settings.

#### Parameters

##### formViewerPropsStore

[`FormViewerPropsStore`](FormViewerPropsStore.md)

the form viewer store settings.

##### componentStateFactory

[`ComponentStateFactory`](../type-aliases/ComponentStateFactory.md)

the factory for creating component states.

##### parentStore?

`Store`

the form viewer settings, used in templates.

##### getInitialData?

[`GetInitialDataFn`](../type-aliases/GetInitialDataFn.md)

the function to get initial data for the Store.

##### setInitialData?

[`SetInitialDataFn`](../type-aliases/SetInitialDataFn.md)

the function for updating initial data.

#### Returns

`Store`

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

> `readonly` `optional` **parentStore**: `Store`

the form viewer settings, used in templates.

***

### selectedLanguage?

> `optional` **selectedLanguage**: [`Language`](Language.md)

The currently selected language.

***

### setInitialData?

> `readonly` `optional` **setInitialData**: [`SetInitialDataFn`](../type-aliases/SetInitialDataFn.md)

the function for updating initial data.

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

> **get** **showAllValidationErrors**(): `boolean` \| `undefined`

##### Returns

`boolean` \| `undefined`

true if all validation errors are to be displayed, false otherwise.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`showAllValidationErrors`](../interfaces/IStore.md#showallvalidationerrors)

## Methods

### applyPersistedForm()

> **applyPersistedForm**(`persistedForm`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

##### persistedForm

[`PersistedForm`](../interfaces/PersistedForm.md)

saved form value.

#### Returns

`void`

***

### applyStringForm()

> **applyStringForm**(`text`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

##### text

`string`

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

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component settings.

##### deferFieldCalculation

`boolean` = `false`

if true, then the calculated field must be explicitly initialized.

#### Returns

[`ComponentData`](ComponentData.md)

the element for the component tree.

#### Implementation of

[`IComponentDataFactory`](../interfaces/IComponentDataFactory.md).[`createComponentData`](../interfaces/IComponentDataFactory.md#createcomponentdata)

***

### dispose()

> **dispose**(): `void`

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

##### actionData

[`ActionData`](../type-aliases/ActionData.md)

the action's data.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action definition.

#### Throws

If the action was not found.

***

### getAction()

> **getAction**(`name`, `type`): [`ActionDefinition`](ActionDefinition.md)

Returns an action by the specified action name and action type.

#### Parameters

##### name

`string`

the action name.

##### type

[`ActionType`](../type-aliases/ActionType.md)

the action type.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action.

***

### getFirstComponentTypeWithRole()

> **getFirstComponentTypeWithRole**(`componentRole`): `string` \| `undefined`

Returns the first type of component with the specified role.

#### Parameters

##### componentRole

`string`

the component role.

#### Returns

`string` \| `undefined`

the first type of component with the specified role.

***

### getModel()

> **getModel**(`type`): [`Model`](Model.md)\<`any`\> \| [`Model`](Model.md)\<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

Returns model for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\> \| [`Model`](Model.md)\<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

the model for the specified type.

***

### getValidationRules()

> **getValidationRules**(`type`): [`FormViewerValidationRules`](../type-aliases/FormViewerValidationRules.md)

Returns the object with validators for the specified value type.

#### Parameters

##### type

keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md)

the value type.

#### Returns

[`FormViewerValidationRules`](../type-aliases/FormViewerValidationRules.md)

the object with validators for the specified value type.

***

### localizeComponent()

> **localizeComponent**(`type`, `formData`, `componentStore`): `Record`\<`string`, `any`\>

Localizes a component store based on the given localization type. If a custom localizer is available, it will be used.

#### Parameters

##### type

`string`

the type of localization.

##### formData

[`IFormData`](../interfaces/IFormData.md)

the form data.

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component settings.

#### Returns

`Record`\<`string`, `any`\>

the Record with the localized properties.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`localizeComponent`](../interfaces/IStore.md#localizecomponent)

***

### localizeErrorMessages()

> **localizeErrorMessages**(`formData`, `componentStore`, `validationResults?`): `string`[] \| `undefined`

The function to localize the validation error message.

#### Parameters

##### formData

[`IFormData`](../interfaces/IFormData.md)

the form data.

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component settings.

##### validationResults?

[`ValidationResult`](../type-aliases/ValidationResult.md)[]

the results of the validation.

#### Returns

`string`[] \| `undefined`

the result of localization or undefined.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`localizeErrorMessages`](../interfaces/IStore.md#localizeerrormessages)

***

### reduceScreen()

> **reduceScreen**\<`T`\>(`callback`, `initialValue`): `T`

#### Type Parameters

##### T

`T`

the return value type.

#### Parameters

##### callback

(`accumulator`, `current`) => `T`

the function that calculates the value for the accumulator.

##### initialValue

`T`

the initial value for the accumulator.

#### Returns

`T`

the accumulated value.

#### Implementation of

[`IStore`](../interfaces/IStore.md).[`reduceScreen`](../interfaces/IStore.md#reducescreen)
