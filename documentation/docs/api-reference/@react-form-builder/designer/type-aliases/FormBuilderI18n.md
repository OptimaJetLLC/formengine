# Type Alias: FormBuilderI18n

> **FormBuilderI18n**: `object`

The i18n data of the form builder.

## Type declaration

### getData()

> **getData**: (`languageFullCode`) => `Promise`\<[`FormBuilderI18nData`](FormBuilderI18nData.md)\>

The callback function called when loading data for i18n.
Accepts the full code (en-US, en-GB, etc.) of a language.

#### Parameters

• **languageFullCode**: `string`

#### Returns

`Promise`\<[`FormBuilderI18nData`](FormBuilderI18nData.md)\>

### languages

> **languages**: [`Language`](../../core/classes/Language.md)[]

The languages.
