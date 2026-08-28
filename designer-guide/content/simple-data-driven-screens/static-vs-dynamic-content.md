---
title: "Static vs dynamic content"
description: "Fixed content you set in Designer vs values resolved at runtime from answers, calculations, or application data."
---

# Static vs dynamic content

**Static** content is what you type in Designer. **Dynamic** content is resolved while the form runs from user answers, calculations, or
application data such as a user profile or API-driven dropdown options.

## Static (you control)

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZm9ybVRpdGxlIiwidHlwZSI6Ik11aVR5cG9ncmFwaHkiLCJwcm9wcyI6eyJ2YXJpYW50Ijp7InZhbHVlIjoiaDUifSwiY2hpbGRyZW4iOnsidmFsdWUiOiJTaGlwcGluZyBkZXN0aW5hdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY291bnRyeSIsInR5cGUiOiJNdWlTZWxlY3QiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkNvdW50cnkifSwiaXRlbXMiOnsidmFsdWUiOlt7InZhbHVlIjoidXMiLCJsYWJlbCI6IlVuaXRlZCBTdGF0ZXMifSx7InZhbHVlIjoiY2EiLCJsYWJlbCI6IkNhbmFkYSJ9LHsidmFsdWUiOiJnYiIsImxhYmVsIjoiVW5pdGVkIEtpbmdkb20ifSx7InZhbHVlIjoiZGUiLCJsYWJlbCI6Ikdlcm1hbnkifSx7InZhbHVlIjoiZnIiLCJsYWJlbCI6IkZyYW5jZSJ9XX19fV19fQ&formName=static-select-options&view=mui'); return false;">Open static Select options in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

<img src="/assets/guide/data-driven/highlight-static-select-items.png" alt="Select component on Main with the Items options table highlighted." />

| Example                            | Where                              |
| ---------------------------------- | ---------------------------------- |
| Labels and help text               | **Main**                           |
| Dropdown options typed in Designer | **Main** → **Items** (or **Data**) |
| Default values                     | **Main** → **Value**               |

## Dynamic (resolved at runtime)

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJhY3Rpb25zIjp7ImxvYWREYXRhIjp7ImJvZHkiOiJjb25zdCBbc2VhcmNoVmFsdWUsIGxvYWRDYWxsYmFjaywgY3VycmVudERhdGFMZW5ndGhdID0gZS5hcmdzXG5cbmZldGNoKCdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZG9taW5pY3RhcnIvcmFuZG9tLW5hbWUvbWFzdGVyL2ZpcnN0LW5hbWVzLmpzb24nKVxuICAudGhlbihkYXRhID0-IGRhdGEuanNvbigpKVxuICAudGhlbihkYXRhID0-IHtcbiAgICBjb25zdCBwcmVwYXJlZERhdGEgPSBkYXRhXG4gICAgICAuZmlsdGVyKHZhbHVlID0-IHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAuc2xpY2UoY3VycmVudERhdGFMZW5ndGgsIGN1cnJlbnREYXRhTGVuZ3RoICsgMjApXG4gICAgICAubWFwKHZhbHVlID0-ICh7dmFsdWUsIGxhYmVsOiB2YWx1ZX0pKVxuXG4gICAgbG9hZENhbGxiYWNrKHByZXBhcmVkRGF0YSlcbiAgfSkiLCJwYXJhbXMiOnt9fX0sInRvb2x0aXBUeXBlIjoiUnNUb29sdGlwIiwiZXJyb3JUeXBlIjoiUnNFcnJvck1lc3NhZ2UiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoibmFtZSIsInR5cGUiOiJSc0Ryb3Bkb3duIiwicHJvcHMiOnsiZGF0YSI6eyJ2YWx1ZSI6W119LCJsYWJlbCI6eyJ2YWx1ZSI6Ik5hbWUifX0sImV2ZW50cyI6eyJvbkxvYWREYXRhIjpbeyJuYW1lIjoibG9hZERhdGEiLCJ0eXBlIjoiY29kZSJ9XX19XX19&formName=dynamic-dropdown-names&view=rsuite-inject-css'); return false;">Open dynamic Name dropdown in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

<img src="/assets/guide/data-driven/highlight-dynamic-dropdown-onload.png" alt="Dropdown Actions tab with onLoadData bound to a loadData action." />

| Example               | How it is provided                                         |
| --------------------- | ---------------------------------------------------------- |
| Pre-filled user name  | Developers pass initial data                               |
| Name list from an API | **Actions** → **onLoadData** (or data binding)             |
| Calculated totals     | **Main** → **Value** → **Calculable value**, or an action  |

Use **Calculable value** for a live calculation that updates when its source data changes. Use an action when the calculation should run
only after an event. **Rules** validate field values; they do not calculate them.

## Author checklist

1. List fields that need live data.
2. Agree on **Key** names with developers.
3. Test in **Preview** with sample data your team provides.

## See also

- [What is form data?](/fields-and-data/what-is-form-data)
- [Prefill a form](/simple-data-driven-screens/prefill-a-form)
- [Load options from external data](/simple-data-driven-screens/load-options-from-external-data)
- [Dynamic dropdown population (developers)](docs:dynamic-dropdown-population)
