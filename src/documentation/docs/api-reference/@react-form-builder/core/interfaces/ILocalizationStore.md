# Interface: ILocalizationStore

Localization of the form.

## Methods

### getItems()

> **getItems**(`languageFullCode`): `null` \| `Record`\<`string`, `unknown`\>

Returns all localization items provided by engine.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.).

#### Returns

`null` \| `Record`\<`string`, `unknown`\>

all localization items.

***

### getLocalization()

> **getLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`): `unknown`

Returns the localization constant for the component property.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language we are looking to localize.

##### componentKey

`string`

the component we are looking to localize.

##### propertyName

`string`

the property name we are looking to localize.

##### type

`string`

the type of localization.

#### Returns

`unknown`

the localization constant value.

***

### setLocalization()

> **setLocalization**(`languageFullCode`, `componentKey`, `propertyName`, `type`, `value`): `void`

Sets localization for component property.

#### Parameters

##### languageFullCode

`` `${string}-${string}` ``

the full code (en-US, en-GB etc.) of the language in which localization will be set.

##### componentKey

`string`

the component key that requires localization.

##### propertyName

`string`

the component's property name to be localized.

##### type

`string`

the type of localization.

##### value

`unknown`

the localization value to persist.

#### Returns

`void`
