---
description: 'Complete guide to styling FormEngine forms: CSS customization, theme
  integration with Material UI/React Suite, responsive layouts, and custom component
  styling.'
sidebar_class_name: formengine-core-additional
sidebar_label: Styling Components and Forms
sidebar_position: 40
title: Style React Forms - CSS, Themes & Responsive Design
---

# Style React Forms - CSS, Themes & Responsive Design

FormEngine Core provides multiple ways to style your forms and components, giving you full control over the appearance while maintaining
flexibility and responsiveness. This guide covers everything from basic CSS styling to advanced responsive design techniques.

## Component Types: Container vs Component

Before diving into styling, it's crucial to understand the difference between container and component types, as this affects how styles are
applied to the underlying HTML elements.

### Component (kind: 'component')

These are form elements that render as individual UI components like text fields, buttons, selects, etc. They are rendered using a wrapper
around the actual component.

**Example components:**

- `MuiTextField`
- `MuiButton`
- `MuiSelect`

For components, styles can be applied to:

1. **The wrapper element** - using `wrapperCss` property
2. **The component itself** - using `css` property

### Container (kind: 'container')

These are layout components that primarily exist to organize other components. They don't render wrapper elements around themselves in the
same way components do.

**Example containers:**

- `MuiContainer` - Material UI container component
- `MuiBox` - flexbox container
- `MuiStack` - vertical/horizontal stack

### Key Differences in Rendering

####  How a component is rendered

```tsx
// Renders with wrapper element around the component
<Tooltip>
  <Wrapper className={wrapperClassName} {...containerStyle}>
    <Erroneous>{component}</Erroneous>
  </Wrapper>
</Tooltip>
```

- `Tooltip`: the tooltip, if the properties of the tooltip are set for the component
- `Wrapper`: the component's wrapper
- `Erroneous`: the internal component that displays the validation error
- `component`: the component itself

####  How a container is rendered

```tsx
// Renders the component directly without wrapper
<ContainerComponent {...props} className={className} {...containerStyle}/>
```

This distinction is critical for styling: when you apply `wrapperCss` to a container component, **it will be fully merged with `css`
styles**. 

## Basic CSS Styling

The simplest way to style components is through CSS classes. FormEngine Core supports both inline styles and external CSS through standard
React patterns.

### External CSS Styling

You can use external CSS files and apply classes to your components:

```css
/* styles.css */
.form-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.text-field-custom {
  border: 2px solid #3f51b5;
  border-radius: 8px;
}
```

```tsx
// In your React component
import './styles.css';

function MyForm() {
  return (
    <div className="form-container">
      <FormViewer
        view={muiView}
        getForm={() => jsonString}
      />
    </div>
  );
}
```

## Styling via JSON Configuration

FormEngine Core allows you to define styles directly in your JSON configuration using the `css` and `wrapperCss` properties. This is the
most powerful and flexible way to style your forms.

### JSON Structure for CSS Properties

The `css` and `wrapperCss` properties follow the same JSON structure. Each property can contain device-specific styles with the following
structure:

```json {4-20}
{
  "key": "componentKey",
  "type": "componentType",
  "css": {
    "any": {
      "object": {
        "backgroundColor": "#f5f5f5",
        "borderRadius": "8px"
      },
      "string": "padding: 12px; font-size: 16px;"
    },
    "desktop": {
      "object": {
        "maxWidth": "1200px"
      }
    },
    "mobile": {
      "string": "padding: 8px;"
    }
  }
}
```

**Device levels**: `any`, `desktop`, `tablet`, `mobile`

- `any`: Styles that apply to all devices (base styles)
- `desktop`, `tablet`, `mobile`: Device-specific overrides

**Style formats**: `object` or `string`

- `object`: JavaScript object with camelCase CSS properties (e.g., `backgroundColor`). Think of it as
  a [React.CSSProperties](https://react.dev/learn/typescript#typing-style-props) type object.
- `string`: Plain CSS string (e.g., `"background-color: #f5f5f5;"`)

Both formats can be used together, and they will be merged. The `string` format is useful for quick CSS rules, while the `object` format
provides better readability of JSON.

### The css Property

The `css` property applies styles directly to the component (or container) element. It supports both string-based CSS and object-based
styles.

```json
{
  "key": "name",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Your Name"
    }
  },
  "css": {
    "any": {
      "object": {
        "backgroundColor": "#c6ced6",
        "borderRadius": "4px"
      },
      "string": "border: 3px solid #dee2e6"
    }
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Your Name"
            }
          },
          "css": {
            "any": {
              "object": {
                "backgroundColor": "#c6ced6",
                "borderRadius": "4px"
              },
              "string": "border: 3px solid #dee2e6"
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

### The wrapperCss Property

The `wrapperCss` property applies styles to the wrapper element that surrounds components (not containers). This is useful when you
need to style the layout around a component without affecting the component itself.

:::info note

The `wrapperCss` property uses the same JSON structure as the `css` property, supporting both `object` and `string` formats for
device-specific styling (`any`, `desktop`, `tablet`, `mobile`).

:::

```json {9-17}
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email Address"
    }
  },
  "wrapperCss": {
    "any": {
      "object": {
        "marginBottom": "16px",
        "width": "100%"
      },
      "string": "border: 3px solid transparent; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #556270) border-box; background-clip: padding-box, border-box; border-radius: 12px; padding: 1rem;"
    }
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email Address"
            }
          },
          "wrapperCss": {
            "any": {
              "object": {
                "marginBottom": "16px",
                "width": "100%"
              },
              "string": "border: 3px solid transparent; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #556270) border-box; background-clip: padding-box, border-box; border-radius: 12px; padding: 1rem;"
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Inline Styling with style and wrapperStyle

For quick, component-specific styles, you can use inline styles through the `style` property in your JSON configuration. Along with setting
inline styles, you can also use inline styles for wrapper using `wrapperStyle`.

### JSON Structure for style and wrapperStyle Properties

The `style` and `wrapperStyle` properties follow the same JSON structure as `css` and `wrapperCss`, supporting device-specific styling:

```json
{
  "key": "componentKey",
  "type": "componentType",
  "style": {
    "any": {
      "string": "background-color: #1976d2; color: white; padding: 12px 24px;"
    },
    "desktop": {
      "string": "font-size: 16px; padding: 16px 32px;"
    },
    "mobile": {
      "string": "font-size: 14px; padding: 12px; width: 100%;"
    }
  }
}
```

**Device levels**: `any`, `desktop`, `tablet`, `mobile`

- `any`: Styles that apply to all devices (base styles)
- `desktop`, `tablet`, `mobile`: Device-specific overrides

**Important differences from css/wrapperCss:**

- `style` and `wrapperStyle` only support the `string` format (plain CSS)
- They generate inline `style` attributes instead of CSS classes
- Useful for dynamic styles or one-off customizations
- Not recommended for complex styling (use `css`/`wrapperCss` instead)

**When to use style/wrapperStyle vs css/wrapperCss:**

- Use `style`/`wrapperStyle` for quick, simple inline styles
- Use `css`/`wrapperCss` for complex styles, better performance, and maintainability

```json
{
  "key": "customButton",
  "type": "MuiButton",
  "props": {
    "children": {
      "value": "Submit"
    }
  },
  "style": {
    "any": {
      "string": "background: linear-gradient(42deg, #fe6b6b, #4badc4); color: azure; letter-spacing: 5.4px;"
    }
  },
  "wrapperStyle": {
    "any": {
      "string": "border: 3px solid transparent; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #556270) border-box; background-clip: padding-box, border-box; border-radius: 12px; padding: 1rem;"
    }
  }
}
```

:::info Important

The `style` property applies directly to the component element, similar to React's inline styles, while `css` property uses
[adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets) and generates class names.

Styling with `style` only works for components that support the `style` property.

:::


### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "customButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Submit"
            }
          },
          "style": {
            "any": {
              "string": "background: linear-gradient(42deg, #fe6b6b, #4badc4); color: azure; letter-spacing: 5.4px;"
            }
          },
          "wrapperStyle": {
            "any": {
              "string": "border: 3px solid transparent; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #556270) border-box; background-clip: padding-box, border-box; border-radius: 12px; padding: 1rem;"
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Styling Container Components

Container components behave differently from regular components. Here's how to properly style them:

```json
{
  "key": "mainContainer",
  "type": "MuiContainer",
  "css": {
    "any": {
      "object": {
        "maxWidth": "1200px",
        "margin": "0 auto",
        "padding": "24px",
        "border": "1px dashed grey"
      }
    }
  },
  "children": [
    {
      "key": "contentBox",
      "type": "MuiBox",
      "css": {
        "any": {
          "object": {
            "display": "flex",
            "gap": "16px",
            "flexDirection": "column",
            "border": "1px dashed blue"
          }
        }
      },
      "children": [
        {
          "key": "textField",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Input field"
            }
          }
        }
      ]
    }
  ]
}
```

### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "mainContainer",
          "type": "MuiContainer",
          "css": {
            "any": {
              "object": {
                "maxWidth": "1200px",
                "margin": "0 auto",
                "padding": "24px",
                "border": "1px dashed grey"
              }
            }
          },
          "children": [
            {
              "key": "contentBox",
              "type": "MuiBox",
              "css": {
                "any": {
                  "object": {
                    "display": "flex",
                    "gap": "16px",
                    "flexDirection": "column",
                    "border": "1px dashed blue"
                  }
                }
              },
              "children": [
                {
                  "key": "textField",
                  "type": "MuiTextField",
                  "props": {
                    "label": {
                      "value": "Input field"
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Responsive Styling

FormEngine Core provides built-in responsive design capabilities through device-specific style definitions. You can define different styles
for desktop, tablet, and mobile devices.

### Device-Specific Styling

```json {5,12,19,26}
{
  "key": "responsiveContainer",
  "type": "MuiBox",
  "css": {
    "desktop": {
      "object": {
        "flexDirection": "row",
        "gap": "32px",
        "padding": "40px"
      }
    },
    "tablet": {
      "object": {
        "flexDirection": "column",
        "gap": "24px",
        "padding": "24px"
      }
    },
    "mobile": {
      "object": {
        "flexDirection": "column",
        "gap": "16px",
        "padding": "16px"
      }
    },
    "any": {
      "object": {
        "display": "flex",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

### Breakpoints and View Modes

FormEngine Core automatically detects the view mode based on screen width:

- **Desktop**: Width > 900px
- **Tablet**: 600px < Width ≤ 900px
- **Mobile**: Width ≤ 600px

The `any` property defines styles that apply to all devices, while device-specific properties (`desktop`, `tablet`, `mobile`) override or
extend those styles for specific devices.

### Responsive Form Example

```json
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "css": {
      "desktop": {
        "object": {
          "padding": 40,
          "maxWidth": 800
        }
      },
      "tablet": {
        "object": {
          "padding": 24,
          "maxWidth": 600
        }
      },
      "mobile": {
        "object": {
          "padding": 16,
          "maxWidth": "100%"
        }
      },
      "any": {
        "object": {
          "margin": "0 auto",
          "backgroundColor": "#fafafa"
        }
      }
    },
    "children": [
      {
        "key": "formFields",
        "type": "MuiBox",
        "css": {
          "desktop": {
            "object": {
              "display": "grid",
              "gridTemplateColumns": "1fr 1fr",
              "gap": 24
            }
          },
          "mobile": {
            "object": {
              "display": "flex",
              "flexDirection": "column",
              "gap": 16
            }
          },
          "any": {
            "object": {
              "marginBottom": 32
            }
          }
        },
        "children": [
          {
            "key": "firstName",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "First Name"
              }
            },
            "wrapperCss": {
              "any": {
                "object": {
                  "width": "100%"
                }
              }
            }
          },
          {
            "key": "lastName",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "Last Name"
              }
            },
            "wrapperCss": {
              "any": {
                "object": {
                  "width": "100%"
                }
              }
            }
          }
        ]
      }
    ]
  }
}
```

### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "css": {
        "desktop": {
          "object": {
            "padding": 40,
            "maxWidth": 800
          }
        },
        "tablet": {
          "object": {
            "padding": 24,
            "maxWidth": 600
          }
        },
        "mobile": {
          "object": {
            "padding": 16,
            "maxWidth": "100%"
          }
        },
        "any": {
          "object": {
            "margin": "0 auto",
            "backgroundColor": "#fafafa"
          }
        }
      },
      "children": [
        {
          "key": "formFields",
          "type": "MuiBox",
          "css": {
            "desktop": {
              "object": {
                "display": "grid",
                "gridTemplateColumns": "1fr 1fr",
                "gap": 24
              }
            },
            "mobile": {
              "object": {
                "display": "flex",
                "flexDirection": "column",
                "gap": 16
              }
            },
            "any": {
              "object": {
                "marginBottom": 32
              }
            }
          },
          "children": [
            {
              "key": "firstName",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "First Name"
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "width": "100%"
                  }
                }
              }
            },
            {
              "key": "lastName",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Last Name"
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "width": "100%"
                  }
                }
              }
            }
          ]
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Styling Wrapper Elements

Wrapper elements are automatically generated for regular components (not containers). Understanding how to style them is key to achieving
precise layouts.

### When to Use wrapperCss

Use `wrapperCss` when you need to:

1. Control the layout positioning of a component
2. Add margins, padding, or spacing around a component
3. Set width/height constraints on the component container
4. Apply background, borders, or shadows to the area around the component

### Example: Form Field with Label and Error

```json {12,21}
{
  "key": "emailField",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email"
    },
    "placeholder": {
      "value": "Enter your email"
    }
  },
  "wrapperCss": {
    "any": {
      "object": {
        "marginBottom": "20px",
        "position": "relative"
      },
      "string": "& .MuiFormLabel-root { font-weight: 600; }"
    }
  },
  "css": {
    "any": {
      "object": {
        "backgroundColor": "lightblue",
        "borderRadius": "4px"
      }
    }
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "emailField",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            },
            "placeholder": {
              "value": "Enter your email"
            }
          },
          "wrapperCss": {
            "any": {
              "object": {
                "marginBottom": "20px",
                "position": "relative"
              },
              "string": "& .MuiFormLabel-root { font-weight: 600; }"
            }
          },
          "css": {
            "any": {
              "object": {
                "backgroundColor": "lightblue",
                "borderRadius": "4px"
              }
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

In this example:
- `wrapperCss` controls the field's spacing and positions the label
- `css` styles the text field input itself

## Complete Styling Example

Here's a complete form with various styling techniques:

```json
{
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "css": {
      "desktop": {
        "object": {
          "padding": "40px",
          "maxWidth": "600px"
        }
      },
      "mobile": {
        "object": {
          "padding": "20px",
          "maxWidth": "100%"
        }
      },
      "any": {
        "object": {
          "margin": "0 auto",
          "backgroundColor": "#ffffff",
          "borderRadius": "12px",
          "boxShadow": "0 4px 20px rgba(0,0,0,0.1)"
        }
      }
    },
    "children": [
      {
        "key": "header",
        "type": "MuiTypography",
        "kind": "component",
        "props": {
          "variant": {
            "value": "h4"
          },
          "children": {
            "value": "Contact Us"
          }
        },
        "wrapperCss": {
          "any": {
            "object": {
              "textAlign": "center",
              "marginBottom": "32px",
              "color": "#1a237e"
            }
          }
        }
      },
      {
        "key": "formContainer",
        "type": "MuiBox",
        "kind": "container",
        "css": {
          "desktop": {
            "object": {
              "display": "grid",
              "gridTemplateColumns": "1fr 1fr",
              "gap": "24px"
            }
          },
          "mobile": {
            "object": {
              "display": "flex",
              "flexDirection": "column",
              "gap": "16px"
            }
          },
          "any": {
            "object": {
              "marginBottom": "32px"
            }
          }
        },
        "children": [
          {
            "key": "nameField",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "Full Name"
              }
            },
            "wrapperCss": {
              "any": {
                "object": {
                  "width": "100%"
                }
              }
            },
            "css": {
              "any": {
                "object": {
                  "backgroundColor": "#f8f9fa",
                  "border": "1px solid #e0e0e0"
                }
              }
            }
          },
          {
            "key": "emailField",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "Email Address"
              }
            },
            "wrapperCss": {
              "any": {
                "object": {
                  "width": "100%"
                }
              }
            },
            "css": {
              "any": {
                "object": {
                  "backgroundColor": "#f8f9fa",
                  "border": "1px solid #e0e0e0"
                }
              }
            }
          },
          {
            "key": "messageField",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "Message"
              },
              "multiline": {
                "value": true
              },
              "rows": {
                "value": 4
              }
            },
            "wrapperCss": {
              "any": {
                "object": {
                  "gridColumn": "1 / -1",
                  "width": "100%"
                }
              }
            },
            "css": {
              "any": {
                "object": {
                  "backgroundColor": "#f8f9fa",
                  "border": "1px solid #e0e0e0"
                }
              }
            }
          }
        ]
      },
      {
        "key": "submitButton",
        "type": "MuiButton",
        "props": {
          "children": {
            "value": "Send Message"
          },
          "variant": {
            "value": "contained"
          },
          "color": {
            "value": "primary"
          }
        },
        "wrapperCss": {
          "any": {
            "object": {
              "display": "flex",
              "justifyContent": "center",
              "marginTop": "24px"
            }
          }
        },
        "css": {
          "any": {
            "object": {
              "padding": "12px 48px",
              "fontSize": "16px",
              "fontWeight": "600",
              "borderRadius": "8px"
            }
          }
        }
      }
    ]
  }
}
```

### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "css": {
        "desktop": {
          "object": {
            "padding": "40px",
            "maxWidth": "600px"
          }
        },
        "mobile": {
          "object": {
            "padding": "20px",
            "maxWidth": "100%"
          }
        },
        "any": {
          "object": {
            "margin": "0 auto",
            "backgroundColor": "#ffffff",
            "borderRadius": "12px",
            "boxShadow": "0 4px 20px rgba(0,0,0,0.1)"
          }
        }
      },
      "children": [
        {
          "key": "header",
          "type": "MuiTypography",
          "kind": "component",
          "props": {
            "variant": {
              "value": "h4"
            },
            "children": {
              "value": "Contact Us"
            }
          },
          "wrapperCss": {
            "any": {
              "object": {
                "textAlign": "center",
                "marginBottom": "32px",
                "color": "#1a237e"
              }
            }
          }
        },
        {
          "key": "formContainer",
          "type": "MuiBox",
          "kind": "container",
          "css": {
            "desktop": {
              "object": {
                "display": "grid",
                "gridTemplateColumns": "1fr 1fr",
                "gap": "24px"
              }
            },
            "mobile": {
              "object": {
                "display": "flex",
                "flexDirection": "column",
                "gap": "16px"
              }
            },
            "any": {
              "object": {
                "marginBottom": "32px"
              }
            }
          },
          "children": [
            {
              "key": "nameField",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Full Name"
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "width": "100%"
                  }
                }
              },
              "css": {
                "any": {
                  "object": {
                    "backgroundColor": "#f8f9fa",
                    "border": "1px solid #e0e0e0"
                  }
                }
              }
            },
            {
              "key": "emailField",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Email Address"
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "width": "100%"
                  }
                }
              },
              "css": {
                "any": {
                  "object": {
                    "backgroundColor": "#f8f9fa",
                    "border": "1px solid #e0e0e0"
                  }
                }
              }
            },
            {
              "key": "messageField",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Message"
                },
                "multiline": {
                  "value": true
                },
                "rows": {
                  "value": 4
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "gridColumn": "1 / -1",
                    "width": "100%"
                  }
                }
              },
              "css": {
                "any": {
                  "object": {
                    "backgroundColor": "#f8f9fa",
                    "border": "1px solid #e0e0e0"
                  }
                }
              }
            }
          ]
        },
        {
          "key": "submitButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Send Message"
            },
            "variant": {
              "value": "contained"
            },
            "color": {
              "value": "primary"
            }
          },
          "wrapperCss": {
            "any": {
              "object": {
                "display": "flex",
                "justifyContent": "center",
                "marginTop": "24px"
              }
            }
          },
          "css": {
            "any": {
              "object": {
                "padding": "12px 48px",
                "fontSize": "16px",
                "fontWeight": "600",
                "borderRadius": "8px"
              }
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Best Practices and Recommendations

### 1. Use wrapperCss for Layout, css for Component Styling

- Apply margins, padding, width/height, and positioning via `wrapperCss`
- Apply component-specific styles like colors, borders, backgrounds via `css`

### 2. Leverage Responsive Design

- Override specific properties in device-specific blocks
- Test on multiple screen sizes during development

### 3. Maintain Consistency

- Define a style system with consistent spacing units
- Use CSS variables or a theme for colors and typography
- Create reusable component templates with predefined styles

### 4. Performance Considerations

- Consider external CSS for styles that don't change dynamically

### 5. Debugging Styles

- Use browser DevTools to inspect generated HTML structure
- Remember that containers don't have wrapper elements
- Check if styles are being applied to the correct element (wrapper vs component)

## Summary

FormEngine Core's styling system provides powerful, flexible options for customizing your forms. By understanding the difference between
container and component rendering, and leveraging the `css`, `wrapperCss`, and responsive styling features, you can create beautiful,
responsive forms that work seamlessly across all devices.

Start with basic styling and gradually incorporate more advanced techniques as needed. Remember to test your forms on different screen sizes
and keep your styling approach consistent across your application.

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Adaptive layout](/formengine-core/adaptive-layout)
- [HTML attributes](/formengine-core/html-attributes)
- [Component types](/formengine-core/custom-components)
