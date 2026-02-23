---
description: 'Create responsive forms that adapt to any screen size. Learn FormEngine
  adaptive layout system: breakpoints, grid layouts, and mobile-first design patterns.'
sidebar_class_name: formengine-core-additional
sidebar_label: Adaptive Layout
sidebar_position: 45
slug: /formengine-core/adaptive-layout
title: Responsive Form Layouts - Mobile & Desktop Optimization
---

# Responsive Form Layouts - Mobile & Desktop Optimization

FormEngine Core provides a powerful adaptive layout system that automatically adjusts your forms to different screen sizes. When you use
the [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) component, it automatically detects the current view mode
based on the window width, ensuring your forms look great on desktop, tablet, and mobile devices.

In this guide, you'll learn:

- How FormEngine Core automatically determines the view mode based on screen width
- How to manually control the view mode using the `viewMode` prop
- How to create device-specific styles using `css` and `wrapperCss` properties
- How to build responsive forms that adapt to different screen sizes

## Overview

FormEngine Core's adaptive layout system works by:

1. **Automatically detecting screen width** when no `viewMode` prop is provided
2. **Applying device-specific styles** defined in your form JSON
3. **Supporting manual override** when you need to test or lock a specific view mode

This approach ensures your forms provide optimal user experiences across all devices while giving you complete control when needed.

## Automatic View Mode Detection

When you use `FormViewer` without specifying a [viewMode](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#viewmode) prop,
it automatically determines the appropriate [ViewMode](/api-reference/@react-form-builder/core/type-aliases/ViewMode) based on the current
window width:

- **Desktop**: Width > 900px
- **Tablet**: 600px < Width ≤ 900px
- **Mobile**: Width ≤ 600px

The system continuously monitors window resize events and updates the view mode accordingly. This means your forms automatically adapt when
users resize their browser windows or rotate their mobile devices.

### Live example

Here's a simple form that demonstrates automatic view mode detection. Try resizing your browser window to see how the form adapts:

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "css": {
        "any": {
          "object": {
            "padding": "20px",
            "backgroundColor": "#f5f5f5"
          }
        }
      },
      "children": [
        {
          "key": "container",
          "type": "MuiBox",
          "css": {
            "any": {
              "object": {
                "display": "flex",
                "gap": "16px"
              }
            },
            "desktop": {
              "object": {
                "flexDirection": "row"
              }
            },
            "mobile": {
              "object": {
                "flexDirection": "column"
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
                "desktop": {
                  "object": {
                    "flex": "1"
                  }
                },
                "mobile": {
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
                "desktop": {
                  "object": {
                    "flex": "1"
                  }
                },
                "mobile": {
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

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

## Manual View Mode Control

While automatic detection works well for most use cases, you might need to manually control the view mode for testing, demonstration, or
specific user requirements. You can do this by passing
the [viewMode](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#viewmode) prop to `FormViewer`. The prop accepts
a [ViewMode](/api-reference/@react-form-builder/core/type-aliases/ViewMode) value:

```jsx
<FormViewer
  view={muiView}
  getForm={getForm}
  viewMode="mobile"  // Force mobile view mode
/>
```

### Live example with view mode selector

This example shows how to manually control the view mode using a selector. Try switching between different view modes to see how the form
adapts:

```jsx live
function App() {
  const [viewMode, setViewMode] = useState('desktop')

  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "css": {
        "any": {
          "object": {
            "padding": "24px",
            "backgroundColor": "#ffffff",
            "borderRadius": "8px"
          }
        },
        "desktop": {
          "object": {
            "maxWidth": "800px",
            "margin": "0 auto"
          }
        },
        "tablet": {
          "object": {
            "maxWidth": "600px",
            "margin": "0 auto"
          }
        },
        "mobile": {
          "object": {
            "maxWidth": "100%"
          }
        }
      },
      "children": [
        {
          "key": "header",
          "type": "MuiTypography",
          "props": {
            "variant": {
              "value": "h5"
            },
            "children": {
              "value": "Registration Form"
            }
          },
          "wrapperCss": {
            "any": {
              "object": {
                "marginBottom": "24px",
                "textAlign": "center"
              }
            }
          }
        },
        {
          "key": "fieldsContainer",
          "type": "MuiBox",
          "css": {
            "desktop": {
              "object": {
                "display": "grid",
                "gridTemplateColumns": "1fr 1fr",
                "gap": "24px"
              }
            },
            "tablet": {
              "object": {
                "display": "grid",
                "gridTemplateColumns": "1fr",
                "gap": "20px"
              }
            },
            "mobile": {
              "object": {
                "display": "flex",
                "flexDirection": "column",
                "gap": "16px"
              }
            }
          },
          "children": [
            {
              "key": "email",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Email Address"
                },
                "type": {
                  "value": "email"
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
              "key": "phone",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Phone Number"
                },
                "type": {
                  "value": "tel"
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
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])
  
  const ResolutionButton = (props) => {
    const {mode, label} = props
    return <button
      onClick={() => setViewMode(mode)}
      style={{
        padding: '8px 16px',
        background: viewMode === mode ? '#1976d2' : '#e0e0e0',
        color: viewMode === mode ? 'white' : 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  }

  return (
    <div>
      <div style={{marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center'}}>
        <span>View Mode:</span>
        <ResolutionButton mode="desktop" label="Desktop" />
        <ResolutionButton mode="tablet" label="Tablet" />
        <ResolutionButton mode="mobile" label="Mobile" />
      </div>

      <FormViewer
        view={muiView}
        getForm={getForm}
        viewMode={viewMode}
      />
    </div>
  )
}
```

## Device-Specific Styling

The real power of adaptive layouts comes from device-specific styling. FormEngine Core allows you to define different styles for each view
mode using the `css` and `wrapperCss` properties with `any`, `desktop`, `tablet`, and `mobile` keys.

### CSS Property Structure

```json {5,11,18,25}
{
  "key": "responsiveElement",
  "type": "MuiBox",
  "css": {
    "any": {
      "object": {
        "display": "flex",
        "backgroundColor": "#ffffff"
      }
    },
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
    }
  }
}
```

### Understanding Style Cascading

Styles cascade from general to specific:

1. **`any` styles** apply to all devices
2. **Device-specific styles** (`desktop`, `tablet`, `mobile`) override or extend `any` styles
3. **Inline string styles** in the `string` property override object styles

## Complete Adaptive Form Example

Here's a comprehensive example that demonstrates adaptive layout techniques for a user registration form:

```jsx live
function App() {
  const form = useMemo(() => ({
    "form": {
      "key": "Screen",
      "type": "Screen",
      "css": {
        "any": {
          "object": {
            "margin": "0 auto",
            "backgroundColor": "#f8f9fa",
          }
        },
        "desktop": {
          "object": {
            "padding": "40px",
            "maxWidth": "800px"
          }
        },
        "tablet": {
          "object": {
            "padding": "24px",
            "maxWidth": "600px"
          }
        },
        "mobile": {
          "object": {
            "padding": "16px",
            "maxWidth": "100%"
          }
        }
      },
      "children": [
        {
          "key": "formCard",
          "type": "MuiBox",
          "css": {
            "any": {
              "object": {
                "padding": "32px",
                "borderRadius": "12px",
                "boxShadow": "0 4px 12px rgba(0,0,0,0.1)"
              }
            },
            "mobile": {
              "object": {
                "padding": "24px"
              }
            }
          },
          "children": [
            {
              "key": "header",
              "type": "MuiTypography",
              "props": {
                "variant": {
                  "value": "h4"
                },
                "children": {
                  "value": "Create Account"
                }
              },
              "wrapperCss": {
                "any": {
                  "object": {
                    "marginBottom": "32px",
                    "textAlign": "center",
                    "color": "#1976d2"
                  }
                },
                "mobile": {
                  "object": {
                    "marginBottom": "24px"
                  }
                }
              }
            },
            {
              "key": "nameFields",
              "type": "MuiBox",
              "css": {
                "desktop": {
                  "object": {
                    "display": "grid",
                    "gridTemplateColumns": "1fr 1fr",
                    "gap": "24px"
                  }
                },
                "tablet": {
                  "object": {
                    "display": "grid",
                    "gridTemplateColumns": "1fr 1fr",
                    "gap": "20px"
                  }
                },
                "mobile": {
                  "object": {
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "16px"
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
            },
            {
              "key": "contactFields",
              "type": "MuiBox",
              "css": {
                "any": {
                  "object": {
                    "marginTop": "24px"
                  }
                },
                "mobile": {
                  "object": {
                    "marginTop": "20px"
                  }
                }
              },
              "children": [
                {
                  "key": "email",
                  "type": "MuiTextField",
                  "props": {
                    "label": {
                      "value": "Email Address"
                    },
                    "type": {
                      "value": "email"
                    }
                  },
                  "wrapperCss": {
                    "any": {
                      "object": {
                        "marginBottom": "16px",
                        "width": "100%"
                      }
                    }
                  }
                },
                {
                  "key": "phone",
                  "type": "MuiTextField",
                  "props": {
                    "label": {
                      "value": "Phone Number"
                    },
                    "type": {
                      "value": "tel"
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
            },
            {
              "key": "actions",
              "type": "MuiBox",
              "css": {
                "any": {
                  "object": {
                    "display": "flex",
                    "justifyContent": "flex-end",
                    "marginTop": "32px",
                    "gap": "16px"
                  }
                },
                "mobile": {
                  "object": {
                    "flexDirection": "column",
                    "gap": "12px",
                    "marginTop": "24px"
                  }
                }
              },
              "children": [
                {
                  "key": "cancelButton",
                  "type": "MuiButton",
                  "props": {
                    "variant": {
                      "value": "outlined"
                    },
                    "children": {
                      "value": "Cancel"
                    }
                  }
                },
                {
                  "key": "submitButton",
                  "type": "MuiButton",
                  "props": {
                    "variant": {
                      "value": "contained"
                    },
                    "color": {
                      "value": "primary"
                    },
                    "children": {
                      "value": "Create Account"
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const [viewMode, setViewMode] = useState('desktop')
  
  const ResolutionButton = (props) => {
    const {mode, label} = props
    return <button
      onClick={() => setViewMode(mode)}
      style={{
        padding: '8px 16px',
        background: viewMode === mode ? '#1976d2' : '#e0e0e0',
        color: viewMode === mode ? 'white' : 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  }

  return (
    <div>
      <div style={{marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center'}}>
        <span>View Mode:</span>
        <ResolutionButton mode="desktop" label="Desktop" />
        <ResolutionButton mode="tablet" label="Tablet" />
        <ResolutionButton mode="mobile" label="Mobile" />
      </div>

      <FormViewer
        view={muiView}
        getForm={getForm}
        viewMode={viewMode}
      />
    </div>
  )
}
```

## Common Issues and Solutions

### Form Doesn't Adapt When Resizing

- **Cause**: Custom `viewMode` prop overrides automatic detection
- **Solution**: Remove the `viewMode` prop or implement your own resize handling

### Styles Not Applying Correctly

- **Cause**: Incorrect style cascading or missing `any` block
- **Solution**: Ensure `any` styles exist and device-specific styles override correctly

### Layout Shifts on Mobile

- **Cause**: Different font sizes or image dimensions
- **Solution**: Use relative units (rem, sv*, cq*) and set explicit dimensions for media

## Summary

FormEngine Core's adaptive layout system provides:

1. **Automatic view mode detection** based on screen width
2. **Manual control** via the `viewMode` prop when needed
3. **Device-specific styling** through `css` and `wrapperCss` properties
4. **Responsive design patterns** that work across all devices

By leveraging these features, you can create forms that provide excellent user experiences regardless of device, screen size, or
orientation.

---

For more information:

- [Styling Components and Forms](/formengine-core/styling-components-and-forms)
- [Component Library](/components-library)
- [FormViewer API Reference](/api-reference/@react-form-builder/core/variables/FormViewer)
