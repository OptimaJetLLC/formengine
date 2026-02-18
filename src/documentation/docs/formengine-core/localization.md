---
sidebar_position: 70
sidebar_class_name: formengine-core-additional
title: Localization and Internationalization
description: FormEngine Core provides comprehensive support for localization and internationalization, allowing you to create forms that can be displayed in multiple languages
---

# Localization and Internationalization

FormEngine Core provides comprehensive support for localization and internationalization, allowing you to create forms that can be displayed
in multiple languages. This guide covers all aspects of localization in FormEngine, from basic property localization to advanced validation
error translation.

## Types of Localization

FormEngine supports two main types of localization:

1. **Component Properties Localization** - Localization of component properties such as labels, placeholders, tooltips, and other text
   properties.
2. **Validation Error Localization** - Localization of validation error messages for form validation rules.

## Localization in JSON Forms

Localization data is stored directly within the form JSON, making forms self-contained and easily distributable across different language
environments.

### Basic Structure

A localized form includes three key properties:

```json lines
{
  "form": {
    // Form definition
  },
  "localization": {
    "en-US": {
      // English translations
    },
    "de-DE": {
      // German translations
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "de",
      "dialect": "DE",
      "name": "Deutsch",
      "description": "German",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

### The localization Property

The [localization](/api-reference/@react-form-builder/core/interfaces/PersistedForm#localization) property contains translations organized
by language code and component. Each language code (like `en-US`, `de-DE`) maps to an object containing translations for specific components:

```json
{
  "localization": {
    "en-US": {
      "componentKey1": {
        "component": {
          "label": "Enter your name",
          "helperText": "Type here..."
        }
      },
      "componentKey2": {
        "component": {
          "label": "Email address"
        }
      }
    },
    "de-DE": {
      "componentKey1": {
        "component": {
          "label": "Geben Sie Ihren Namen ein",
          "helperText": "Hier eingeben..."
        }
      },
      "componentKey2": {
        "component": {
          "label": "E-Mail-Adresse"
        }
      }
    }
  }
}
```

### Variables in Localized Strings

Localized strings can include variables that are replaced at runtime with actual values. Variables are enclosed in curly braces with a
dollar sign prefix: `{$variableName}`.

**Example:**

```json
{
  "localization": {
    "en-US": {
      "componentKey": {
        "component": {
          "content": "Welcome, {$userName}! You have {$messageCount} new messages."
        }
      }
    }
  }
}
```

At runtime, `{$userName}` and `{$messageCount}` will be replaced with actual values provided to the component. This allows for dynamic
content within localized strings.

:::info note

Variable names are case-sensitive and should match the property names available in the component's data context.

:::

### The languages Property

The [languages](/api-reference/@react-form-builder/core/interfaces/PersistedForm#languages) array defines which languages are available for
the form. Each [language](/api-reference/@react-form-builder/core/classes/Language) includes:

- `code`: Language code (e.g., "en")
- `dialect`: Regional dialect (e.g., "US")
- `name`: Language name in its native script
- `description`: Language description
- `bidi`: Text direction ("ltr" for left-to-right, "rtl" for right-to-left)

### The defaultLanguage Property

The [defaultLanguage](/api-reference/@react-form-builder/core/interfaces/PersistedForm#defaultlanguage) property specifies which language
should be used by default when the form loads. Must match one of the language codes in the `localization` object.

### Localizing Component Properties

Component properties can be localized by
setting [computeType](/api-reference/@react-form-builder/core/interfaces/ComponentProperty#computetype) to `localization` in the property
definition. This tells FormEngine to look up the actual value from the localization data.

When a property has `computeType` set to `localization`, FormEngine will look up the actual value from the `localization` object based on
the component key and
current language:

```json
{
  "key": "emailInput",
  "type": "RsInput",
  "props": {
    "label": {
      "computeType": "localization"
    },
    "helperText": {
      "computeType": "localization"
    }
  }
}
```

With this approach, the actual values for `label` and `helperText` will be retrieved from:

- `localization["en-US"]["emailInput"]["component"]["label"]` (for English)
- `localization["de-DE"]["emailInput"]["component"]["label"]` (for German)
- etc.

### Example: Basic Component Localization

```json
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "langSelect",
        "type": "MuiSelect",
        "props": {
          "items": {
            "value": [
              {
                "value": "en-US",
                "label": "American English"
              },
              {
                "value": "es-ES",
                "label": "Español"
              }
            ]
          },
          "label": {
            "computeType": "localization"
          }
        },
        "events": {
          "onChange": [
            {
              "name": "onLangChange",
              "type": "custom"
            }
          ]
        }
      },
      {
        "key": "nameInput",
        "type": "MuiTextField",
        "props": {
          "label": {
            "computeType": "localization"
          },
          "helperText": {
            "computeType": "localization"
          }
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "langSelect": {
        "component": {
          "label": "Language"
        }
      },
      "nameInput": {
        "component": {
          "label": "Full Name",
          "helperText": "Enter your full name"
        }
      }
    },
    "es-ES": {
      "nameInput": {
        "component": {
          "label": "Nombre Completo",
          "helperText": "Introduce tu nombre completo"
        }
      },
      "langSelect": {
        "component": {
          "label": "Idioma"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "es",
      "dialect": "ES",
      "name": "Español",
      "description": "Spanish",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "es-ES",
                  "label": "Español"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "nameInput",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            },
            "helperText": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
        "nameInput": {
          "component": {
            "label": "Full Name",
            "helperText": "Enter your full name"
          }
        }
      },
      "es-ES": {
        "nameInput": {
          "component": {
            "label": "Nombre Completo",
            "helperText": "Introduce tu nombre completo"
          }
        },
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e)=> {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

### Example: Multiple Components with Localization

```json
{
  "tooltipType": "MuiTooltip",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "langSelect",
        "type": "MuiSelect",
        "props": {
          "items": {
            "value": [
              {
                "value": "en-US",
                "label": "American English"
              },
              {
                "value": "fr-FR",
                "label": "Français"
              }
            ]
          },
          "label": {
            "computeType": "localization"
          }
        },
        "events": {
          "onChange": [
            {
              "name": "onLangChange",
              "type": "custom"
            }
          ]
        }
      },
      {
        "key": "header",
        "type": "MuiTypography",
        "props": {
          "children": {
            "computeType": "localization"
          }
        }
      },
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "computeType": "localization"
          },
          "helperText": {
            "computeType": "localization"
          }
        },
        "tooltipProps": {
          "title": {
            "computeType": "localization"
          }
        }
      },
      {
        "key": "submitButton",
        "type": "MuiButton",
        "props": {
          "children": {
            "computeType": "localization"
          }
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "header": {
        "component": {
          "children": "Registration Form"
        }
      },
      "email": {
        "component": {
          "label": "Email Address",
          "helperText": "user@example.com"
        },
        "tooltip": {
          "title": "We'll never share your email with anyone else"
        }
      },
      "submitButton": {
        "component": {
          "children": "Submit Registration"
        }
      },
      "langSelect": {
        "component": {
          "label": "Language"
        }
      }
    },
    "fr-FR": {
      "header": {
        "component": {
          "children": "Formulaire d'Inscription"
        }
      },
      "email": {
        "component": {
          "label": "Adresse Email",
          "helperText": "utilisateur@exemple.fr"
        },
        "tooltip": {
          "title": "Nous ne partagerons jamais votre email avec qui que ce soit"
        }
      },
      "submitButton": {
        "component": {
          "children": "Soumettre l'Inscription"
        }
      },
      "langSelect": {
        "component": {
          "label": "Idioma"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "fr",
      "dialect": "FR",
      "name": "Français",
      "description": "French",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "tooltipType": "MuiTooltip",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "fr-FR",
                  "label": "Français"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "header",
          "type": "MuiTypography",
          "props": {
            "children": {
              "computeType": "localization"
            }
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            },
            "helperText": {
              "computeType": "localization"
            }
          },
          "tooltipProps": {
            "title": {
              "computeType": "localization"
            }
          }
        },
        {
          "key": "submitButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "header": {
          "component": {
            "children": "Registration Form"
          }
        },
        "email": {
          "component": {
            "label": "Email Address",
            "helperText": "user@example.com"
          },
          "tooltip": {
            "title": "We'll never share your email with anyone else"
          }
        },
        "submitButton": {
          "component": {
            "children": "Submit Registration"
          }
        },
        "langSelect": {
          "component": {
            "label": "Language"
          }
        }
      },
      "fr-FR": {
        "header": {
          "component": {
            "children": "Formulaire d'Inscription"
          }
        },
        "email": {
          "component": {
            "label": "Adresse Email",
            "helperText": "utilisateur@exemple.fr"
          },
          "tooltip": {
            "title": "Nous ne partagerons jamais votre email avec qui que ce soit"
          }
        },
        "submitButton": {
          "component": {
            "children": "Soumettre l'Inscription"
          }
        },
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "FR",
        "name": "Français",
        "description": "French",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e)=> {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

## Localizing Validation Errors

Validation error messages can also be localized. Each validator can have its error message specified in the localization data.

### Example: Validation Error Localization

```json {103-108,111-113,131-136,139-141}
{
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "langSelect",
        "type": "MuiSelect",
        "props": {
          "items": {
            "value": [
              {
                "value": "en-US",
                "label": "American English"
              },
              {
                "value": "de-DE",
                "label": "Deutsch"
              }
            ]
          },
          "label": {
            "computeType": "localization"
          }
        },
        "events": {
          "onChange": [
            {
              "name": "onLangChange",
              "type": "custom"
            }
          ]
        }
      },
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "email"
            },
            {
              "key": "required"
            }
          ]
        }
      },
      {
        "key": "age",
        "type": "MuiTextField",
        "props": {
          "label": {
            "computeType": "localization"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "code",
              "args": {
                "code": "  return parseInt(value) >= 18"
              }
            }
          ]
        }
      },
      {
        "key": "validateButton",
        "type": "MuiButton",
        "props": {
          "children": {
            "computeType": "localization"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "validate",
              "type": "common"
            }
          ]
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "langSelect": {
        "component": {
          "label": "Language"
        }
      },
      "email": {
        "validator-email": {
          "message": "Please enter a valid email address"
        },
        "validator-required": {
          "message": "Email is required"
        }
      },
      "age": {
        "validator-code": {
          "message": "You must be at least 18 years old"
        },
        "component": {
          "label": "Age"
        }
      },
      "validateButton": {
        "component": {
          "children": "Validate"
        }
      }
    },
    "de-DE": {
      "langSelect": {
        "component": {
          "label": "Sprache"
        }
      },
      "email": {
        "validator-email": {
          "message": "Bitte geben Sie eine gültige E-Mail-Adresse ein"
        },
        "validator-required": {
          "message": "E-Mail ist erforderlich"
        }
      },
      "age": {
        "validator-code": {
          "message": "Sie müssen mindestens 18 Jahre alt sein"
        },
        "component": {
          "label": "Alter"
        }
      },
      "validateButton": {
        "component": {
          "children": "Validieren"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "de",
      "dialect": "DE",
      "name": "Deutsch",
      "description": "German",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

:::info note

The validator type in the localization object uses the format `validator-{validatorKey}` (e.g., `validator-email`, `validator-required`).

:::

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "de-DE",
                  "label": "Deutsch"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "email"
              },
              {
                "key": "required"
              }
            ]
          }
        },
        {
          "key": "age",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "code",
                "args": {
                  "code": "  return parseInt(value) >= 18"
                }
              }
            ]
          }
        },
        {
          "key": "validateButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "computeType": "localization"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "validate",
                "type": "common"
              }
            ]
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
        "email": {
          "validator-email": {
            "message": "Please enter a valid email address"
          },
          "validator-required": {
            "message": "Email is required"
          }
        },
        "age": {
          "validator-code": {
            "message": "You must be at least 18 years old"
          },
          "component": {
            "label": "Age"
          }
        },
        "validateButton": {
          "component": {
            "children": "Validate"
          }
        }
      },
      "de-DE": {
        "langSelect": {
          "component": {
            "label": "Sprache"
          }
        },
        "email": {
          "validator-email": {
            "message": "Bitte geben Sie eine gültige E-Mail-Adresse ein"
          },
          "validator-required": {
            "message": "E-Mail ist erforderlich"
          }
        },
        "age": {
          "validator-code": {
            "message": "Sie müssen mindestens 18 Jahre alt sein"
          },
          "component": {
            "label": "Alter"
          }
        },
        "validateButton": {
          "component": {
            "children": "Validieren"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "de",
        "dialect": "DE",
        "name": "Deutsch",
        "description": "German",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e)=> {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

:::info note

Validation error messages are not automatically translated when the language is changed, but they change after calling the validate 
`action`.

:::

## Localizing Tooltips and Modal Windows

FormEngine also supports localization of tooltips and modal windows, allowing you to provide translated help text and modal content for
different languages.

### Tooltip Localization

Tooltips can be localized using the `tooltip` type in the localization object. Component tooltip properties are typically defined in the
[tooltipProps](/api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops) section of a component.

#### Example: Tooltip Localization

```json
{
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "langSelect",
        "type": "MuiSelect",
        "props": {
          "items": {
            "value": [
              {
                "value": "en-US",
                "label": "American English"
              },
              {
                "value": "de-DE",
                "label": "Deutsch"
              },
              {
                "value": "fr-FR",
                "label": "Français"
              }
            ]
          },
          "label": {
            "computeType": "localization"
          }
        },
        "events": {
          "onChange": [
            {
              "name": "onLangChange",
              "type": "custom"
            }
          ]
        }
      },
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email"
          }
        },
        "tooltipProps": {
          "title": {
            "computeType": "localization"
          }
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "langSelect": {
        "component": {
          "label": "Language"
        }
      },
      "email": {
        "tooltip": {
          "title": "Enter your email address for notifications"
        }
      }
    },
    "de-DE": {
      "langSelect": {
        "component": {
          "label": "Sprache"
        }
      },
      "email": {
        "tooltip": {
          "title": "Geben Sie Ihre E-Mail-Adresse für Benachrichtigungen ein"
        }
      }
    },
    "fr-FR": {
      "langSelect": {
        "component": {
          "label": "Langue"
        }
      },
      "email": {
        "tooltip": {
          "title": "Entrez votre adresse e-mail pour les notifications"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "de",
      "dialect": "DE",
      "name": "Deutsch",
      "description": "German",
      "bidi": "ltr"
    },
    {
      "code": "fr",
      "dialect": "FR",
      "name": "Français",
      "description": "French",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

:::info note

The tooltip type in the localization object uses the format `tooltip` (e.g., `tooltip.title`).

:::

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "de-DE",
                  "label": "Deutsch"
                },
                {
                  "value": "fr-FR",
                  "label": "Français"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          },
          "tooltipProps": {
            "title": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
        "email": {
          "tooltip": {
            "title": "Enter your email address for notifications"
          }
        }
      },
      "de-DE": {
        "langSelect": {
          "component": {
            "label": "Sprache"
          }
        },
        "email": {
          "tooltip": {
            "title": "Geben Sie Ihre E-Mail-Adresse für Benachrichtigungen ein"
          }
        }
      },
      "fr-FR": {
        "langSelect": {
          "component": {
            "label": "Langue"
          }
        },
        "email": {
          "tooltip": {
            "title": "Entrez votre adresse e-mail pour les notifications"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "de",
        "dialect": "DE",
        "name": "Deutsch",
        "description": "German",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "FR",
        "name": "Français",
        "description": "French",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e)=> {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

### Modal Window Localization

Modal windows can be localized using the [modal](/api-reference/@react-form-builder/core/classes/ComponentStore#modal) type in the
localization object. Modal content typically comes from templates defined in the form, and these templates can contain localized content.

```json {9-21}
{
  "key": "confirmationModal",
  "type": "Modal",
  "props": {
    "modalTemplate": {
      "value": "Template:confirmation-dialog"
    }
  },
  "modal": {
    "props": {
      "cancelButton": {
        "computeType": "localization"
      },
      "confirmButton": {
        "computeType": "localization"
      },
      "title": {
        "computeType": "localization"
      }
    }
  }
}
```

#### Example: Modal Window Localization

Below is an example of a simple dialog box for which localization will be applied:

```tsx title='MyDialog.tsx'
import type {DialogProps} from '@mui/material'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import {boolean, define, oneOf} from '@react-form-builder/core'
import type {SyntheticEvent} from 'react'
import {useCallback} from 'react'

export interface MyDialogProps extends DialogProps {
  handleClose?: () => void
  cancelButton?: string
  confirmButton?: string
  title?: string
}

const MyDialog = (props: MyDialogProps) => {
  const {children, cancelButton, confirmButton, handleClose, onClose, title, ...rest} = props

  const close = useCallback((e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => {
    handleClose?.()
    onClose?.(e, reason)
  }, [handleClose, onClose])

  const closeDialog = useCallback(() => {
    handleClose?.()
  }, [handleClose])

  return <Dialog {...rest} onClose={close}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog}>{cancelButton}</Button>
      <Button onClick={closeDialog}>{confirmButton}</Button>
    </DialogActions>
  </Dialog>
}

export const myDialog = define(MyDialog, 'MyDialog')
  .props({
    open: boolean.default(false),
    fullWidth: boolean.default(false),
    scroll: oneOf('paper', 'body').default('paper'),
  })
  .componentRole('modal')
  .build()
```
##### Live example

```jsx live
function App() {
  const MyDialog = (props) => {
    const {children, cancelButton, confirmButton, handleClose, onClose, title, ...rest} = props

    const close = useCallback((e, reason) => {
      handleClose?.()
      onClose?.(e, reason)
    }, [handleClose, onClose])

    const closeDialog = useCallback(() => {
      handleClose?.()
    }, [handleClose])

    return <Dialog {...rest} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{cancelButton}</Button>
        <Button onClick={closeDialog}>{confirmButton}</Button>
      </DialogActions>
    </Dialog>
  }

  const myDialog = define(MyDialog, 'MyDialog')
    .props({
      open: boolean.default(false),
      fullWidth: boolean.default(false),
      scroll: oneOf('paper', 'body').default('paper'),
    })
    .componentRole('modal')
    .build()

  const confirmationDialog = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "content",
          "type": "MuiTypography",
          "props": {
            "children": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "content": {
          "component": {
            "children": "Are you sure you want to proceed with this action?"
          }
        }
      },
      "es-ES": {
        "content": {
          "component": {
            "children": "¿Está seguro de que desea proceder con esta acción?"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const form = useMemo(() => ({
    "modalType": "MyDialog",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "confirmationModal",
          "type": "Modal",
          "props": {
            "modalTemplate": {
              "value": "Template:confirmation-dialog"
            }
          },
          "modal": {
            "props": {
              "cancelButton": {
                "computeType": "localization"
              },
              "confirmButton": {
                "computeType": "localization"
              },
              "title": {
                "computeType": "localization"
              }
            }
          }
        },
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "es-ES",
                  "label": "Español"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "showModalButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "computeType": "localization"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "openModal",
                "type": "common",
                "args": {
                  "modalKey": "confirmationModal"
                }
              }
            ]
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
        "showModalButton": {
          "component": {
            "children": "Show Confirmation"
          }
        },
        "confirmationModal": {
          "modal": {
            "title": "Confirm Action",
            "confirmButton": "Yes, proceed",
            "cancelButton": "Cancel"
          }
        }
      },
      "es-ES": {
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        },
        "showModalButton": {
          "component": {
            "children": "Mostrar Confirmación"
          }
        },
        "confirmationModal": {
          "modal": {
            "title": "Confirmar Acción",
            "confirmButton": "Sí, proceder",
            "cancelButton": "Cancelar"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback((name) => {
    const data = name === 'confirmation-dialog' ? confirmationDialog : form
    return JSON.stringify(data)
  }, [confirmationDialog, form])

  muiView.define(myDialog.model)

  const [language, setLanguage] = useState<LanguageFullCode>('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e) => {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

## Setting Form Language

The form language can be controlled using the `language` property on the `FormViewer` component. This property accepts a language code in
the format `{code}-{dialect}` (e.g., `en-US`, `de-DE`).

### Example: React Component with Language Selection

```tsx showLineNumbers {15,21,32}
import {view as muiView} from '@react-form-builder/components-material-ui'
import {FormViewer, type LanguageFullCode} from '@react-form-builder/core'
import {useCallback, useMemo, useState} from 'react'

function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState<LanguageFullCode>('en-US')

  return (
    <div>
      <div>
        <label>Select Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value as LanguageFullCode)}>
          <option value="en-US">English</option>
          <option value="de-DE">German</option>
          <option value="fr-FR">French</option>
          <option value="es-ES">Spanish</option>
        </select>
      </div>

      <FormViewer
        getForm={getForm}
        view={muiView}
        language={language}
      />
    </div>
  )
}
```

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "disabled": {
              "value": true
            },
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "de-DE",
                  "label": "Deutsch"
                },
                {
                  "value": "fr-FR",
                  "label": "Français"
                },
                {
                  "value": "es-ES",
                  "label": "Español"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        }
      },
      "de-DE": {
        "langSelect": {
          "component": {
            "label": "Sprache"
          }
        }
      },
      "fr-FR": {
        "langSelect": {
          "component": {
            "label": "Langue"
          }
        }
      },
      "es-ES": {
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "de",
        "dialect": "DE",
        "name": "Deutsch",
        "description": "German",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "FR",
        "name": "Français",
        "description": "French",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  return (
    <div>
      <div>
        <label>Select Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="de-DE">German</option>
          <option value="fr-FR">French</option>
          <option value="es-ES">Spanish</option>
        </select>
      </div>

      <FormViewer
        getForm={getForm}
        view={muiView}
        language={language}
      />
    </div>
  )
}
```

## Fallback Localization Mechanism

FormEngine provides a robust fallback mechanism to ensure users always see meaningful text even when translations are incomplete or missing.

### How Fallback Works

When a user requests a specific language (e.g., `fr-CA` - Canadian French), FormEngine follows this fallback chain:

1. **Requested language exact match** - Looks for exact translation in the requested language full code (e.g., `fr-CA`)
2. **Requested language base match** - Falls back to the base language code if the specific dialect is not found (e.g., `fr` for `fr-CA`)
3. **Form default language** - Uses the form's `defaultLanguage` specified in the JSON
4. **Global default language** - Falls back to the global default (`en-US`) if form default is not available
5. **[NOT LOCALIZED] helperText** - Shows `[NOT LOCALIZED]` for missing translations (not component key or property name)

:::info note

This fallback mechanism applies to all localization types: component properties, validation errors, tooltips, and modal content.

:::

### Example: Fallback Chain in Action

Consider a form with these language definitions:

```json
{
  "localization": {
    "en-US": {
      "emailField": {
        "component": {
          "label": "Email Address",
          "helperText": "Enter your email"
        }
      }
    },
    "fr": {
      "emailField": {
        "component": {
          "label": "Adresse Email"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "fr",
      "dialect": "FR",
      "name": "Français",
      "description": "French",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

When a user requests `fr-CA` (Canadian French):
1. FormEngine looks for `fr-CA` translations - Not found
2. Falls back to `fr` (French) - Finds `"label": "Adresse Email"` but `helperText` is missing
3. Falls back to form default `en-US` - Uses `"helperText": "Enter your email"` for the missing translation
4. Result: `label` in French, `helperText` in English

### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "fr-CA",
                  "label": "Français (Canadian)"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            },
            "helperText": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
        "email": {
          "component": {
            "label": "Email Address",
            "helperText": "Enter your full name"
          }
        }
      },
      "fr-FR": {
        "email": {
          "component": {
            "label": "Adresse Email",
          }
        },
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "FR",
        "name": "Français",
        "description": "French",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "CA",
        "name": "Français canadien",
        "description": "Canadian French",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e)=> {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
  />
}
```

### Best Practices for Fallback

1. **Always provide complete translations for your default language** - This ensures a complete user experience even when other languages
   are incomplete
2. **Use base language translations for regional dialects** - Provide `fr` translations that work for all French dialects (`fr-FR`, `fr-CA`,
   `fr-BE`, etc.)
3. **Test with incomplete translations** - Verify your form works correctly when some translations are missing
4. **Define all languages in the `languages` array** - Ensure every language used in `localization` has a corresponding entry in the
   `languages` array
5. **Use consistent language codes** - If you define `fr-FR` in `languages`, use `fr-FR` (not `fr`) in the `localization` object keys

## External Localization with localize Function

For more advanced scenarios where you need to load translations from external sources or integrate with existing translation systems, you
can use the [localize](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localize) property
on [FormViewerProps](/api-reference/@react-form-builder/core/interfaces/FormViewerProps).

### The ComponentLocalizer Type

The `localize` property accepts a [ComponentLocalizer](/api-reference/@react-form-builder/core/type-aliases/ComponentLocalizer) function
with the following signature:

```typescript
type ComponentLocalizer = (
  componentStore: ComponentStore,
  language: Language
) => Record<string, any>;
```

- `componentStore`: Contains information about the component being localized
- `language`: The current language selected for the form
- Returns: An object with localized property values for the component

### Example: External Translation Service Integration

```tsx {54-69,101-119,121-126,134}
import {view as muiView} from '@react-form-builder/components-material-ui'
import {type ComponentLocalizer, FormViewer, type FormViewerProps, type LanguageFullCode} from '@react-form-builder/core'
import {useCallback, useMemo, useState} from 'react'

function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "es-ES",
                  "label": "Español"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "nameInput",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            },
            "helperText": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
      },
      "es-ES": {
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState<LanguageFullCode>('en-US')

  const actions: FormViewerProps['actions'] = useMemo(() => ({
    onLangChange: (e) => {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  const translate = useCallback((componentKey: string, langFullCode: LanguageFullCode) => {
    if (componentKey === 'nameInput') {
      if (langFullCode === 'es-ES') {
        return {
          label: 'Nombre Completo',
          helperText: 'Introduce tu nombre completo'
          // Add any other properties that need localization
        }
      }

      return {
        label: 'Full Name',
        helperText: 'Enter your full name'
        // Add any other properties that need localization
      }
    }

    return {}
  }, [])

  const customLocalizer: ComponentLocalizer = useCallback((componentStore, language) => {
    const componentKey = componentStore.key

    // Use your external translation service
    return translate(componentKey, language.fullCode)
  }, [translate])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
    localize={customLocalizer}
  />
}
```

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "langSelect",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "en-US",
                  "label": "American English"
                },
                {
                  "value": "es-ES",
                  "label": "Español"
                }
              ]
            },
            "label": {
              "computeType": "localization"
            }
          },
          "events": {
            "onChange": [
              {
                "name": "onLangChange",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "nameInput",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            },
            "helperText": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "langSelect": {
          "component": {
            "label": "Language"
          }
        },
      },
      "es-ES": {
        "langSelect": {
          "component": {
            "label": "Idioma"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [language, setLanguage] = useState('en-US')

  const actions = useMemo(() => ({
    onLangChange: (e) => {
      setLanguage(e.args[0] ?? 'en-US')
    }
  }), [])

  const initialData = useMemo(() => ({langSelect: 'en-US'}), [])

  const translate = useCallback((componentKey, langFullCode) => {
    if (componentKey === 'nameInput') {
      if (langFullCode === 'es-ES') {
        return {
          label: 'Nombre Completo',
          helperText: 'Introduce tu nombre completo'
          // Add any other properties that need localization
        }
      }

      return {
        label: 'Full Name',
        helperText: 'Enter your full name'
        // Add any other properties that need localization
      }
    }

    return {}
  }, [])

  const customLocalizer = useCallback((componentStore, language) => {
    const componentKey = componentStore.key

    // Use your external translation service
    return translate(componentKey, language.fullCode)
  }, [translate])

  return <FormViewer
    initialData={initialData}
    view={muiView}
    getForm={getForm}
    actions={actions}
    language={language}
    localize={customLocalizer}
  />
}
```

:::tip info

In this example, you can also observe hybrid mode. The language selection component is translated into JSON, and the name input component is
translated using an external function.

:::

## Best Practices

1. **Always provide a default language** - Ensure your form has a sensible default language for users who don't have a language preference
   set.
2. **Use descriptive component keys** - Component keys like `emailField` or `submitButton` make localization easier to manage than generic
   keys like `input1` or `button2`.
3. **Keep localization data organized** - Group related translations together and consider maintaining separate translation files for large
   forms.
4. **Test bidirectional text support** - For RTL languages like Arabic or Hebrew, ensure your form layout handles text direction correctly.
5. **Consider text expansion** - Some languages require more space for the same meaning. Design your forms with flexible layouts to
   accommodate longer text.
6. **Fallback strategy** - Implement a fallback strategy for missing translations, either to a default language or to the component key
   itself.

## Summary

FormEngine Core provides a robust localization system that supports:

- **Inline JSON localization** for self-contained forms
- **Component property localization** for labels, placeholders, tooltips, and more
- **Validation error localization** for user-friendly error messages in multiple languages
- **Language switching** via the `language` property
- **External localization integration** through the `localize` function

Whether you need simple multi-language support or complex translation system integration, FormEngine's localization features provide the
flexibility to meet your internationalization requirements.

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Validation](/formengine-core/validation)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Computed properties](/formengine-core/computed-properties)
- [Tooltip](/formengine-core/tooltip)
