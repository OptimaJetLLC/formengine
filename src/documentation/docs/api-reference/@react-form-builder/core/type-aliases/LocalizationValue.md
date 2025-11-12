# Type Alias: LocalizationValue

> **LocalizationValue** = `Record`\<[`LanguageFullCode`](LanguageFullCode.md), [`ComponentsLocalization`](ComponentsLocalization.md)\>

The format in which localization is stored.

## Example

```ts
{
 *  "en-US": {
 *    "componentKey": {
 *      "property": "This {$value} is localized!"
 *    }
 *  }
 * }
```
