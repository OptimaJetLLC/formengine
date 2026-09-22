# Class: Form

Represents a form that is rendered in Viewer or edited in Builder.

## Implements

- [`IForm`](../interfaces/IForm.md)

## Constructors

### Constructor

> **new Form**(`componentTree`, `localization`, `actions`, `languages`, `defaultLanguage`): `Form`

Creates a new instance of Form.

#### Parameters

##### componentTree

[`ComponentData`](ComponentData.md)

the root component of the form.

##### localization

[`LocalizationStore`](LocalizationStore.md)

the localization of the form.

##### actions

[`ActionValues`](../type-aliases/ActionValues.md)

the form custom actions.

##### languages

[`Language`](Language.md)[]

the localization languages of the form.

##### defaultLanguage

[`Language`](Language.md)

the default localization language of the form.

#### Returns

`Form`

## Properties

### actions

> `readonly` **actions**: [`ActionValues`](../type-aliases/ActionValues.md)

The set of action definitions.

***

### componentTree

> `readonly` **componentTree**: [`ComponentData`](ComponentData.md)

Root component of the form.

***

### defaultLanguage

> **defaultLanguage**: [`Language`](Language.md)

Default localization language of the form.

#### Implementation of

[`IForm`](../interfaces/IForm.md).[`defaultLanguage`](../interfaces/IForm.md#defaultlanguage)

***

### errorProps

> **errorProps**: `any` = `{}`

Properties of the component displaying the error.

***

### errorType?

> `optional` **errorType?**: `string`

The type name of the component displaying the error.

***

### formValidator?

> `optional` **formValidator?**: `string`

The form validator.

***

### languages

> `readonly` **languages**: [`Language`](Language.md)[] = `[]`

Localization languages of the form.

***

### localization

> `readonly` **localization**: [`LocalizationStore`](LocalizationStore.md)

Localization of the form.

#### Implementation of

[`IForm`](../interfaces/IForm.md).[`localization`](../interfaces/IForm.md#localization)

***

### modalType?

> `optional` **modalType?**: `string`

The type name of the component displaying the modal.

***

### tooltipType?

> `optional` **tooltipType?**: `string`

The type name of the component displaying the tooltip.

## Accessors

### actionNames

#### Get Signature

> **get** **actionNames**(): `string`[]

##### Returns

`string`[]

the actions names array.

***

### formValidatorFunction

#### Get Signature

> **get** **formValidatorFunction**(): [`FormValidator`](../type-aliases/FormValidator.md) \| `undefined`

##### Returns

[`FormValidator`](../type-aliases/FormValidator.md) \| `undefined`

the form validator function.

## Methods

### cloneAction()

> **cloneAction**(`namedAction`): `void`

Clones the action.

#### Parameters

##### namedAction

[`NamedActionDefinition`](../type-aliases/NamedActionDefinition.md)

the named action to clone.

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Disposes the form. Disposes all the components and localization.

#### Returns

`void`

***

### initFields()

> **initFields**(): `void`

Initializes form fields.

#### Returns

`void`

***

### removeAction()

> **removeAction**(`name`): `void`

Removes the action from the form.

#### Parameters

##### name

`string`

the action name to remove.

#### Returns

`void`

***

### updateOrAddAction()

> **updateOrAddAction**(`oldActionName`, `newAction`): `void`

Changes the existing action to the new one, adds the action if the existing action is not found.

#### Parameters

##### oldActionName

`string`

the existing action name.

##### newAction

[`NamedActionDefinition`](../type-aliases/NamedActionDefinition.md)

the new named action.

#### Returns

`void`
