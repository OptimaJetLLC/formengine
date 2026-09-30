---
sidebar_position: 12
title: Designer customization
slug: /formengine-designer/features/designer-customization
description: Using the customization FormBuilder prop, you can hide, style, or replace any parts of the FormBuilder interface
---

:::info For form authors

Changing the designer UI or adding custom tools requires developers.

[Full guide →](designer-guide:advanced-topics/when-to-involve-developers/)
:::

## Designer customization

## Customizing the FormBuilder interface

Using the [customization](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#customization) `FormBuilder` prop, you can
hide, style, or replace any parts of the FormBuilder interface.
A [customization map](/api-reference/@react-form-builder/designer/type-aliases/CustomizationMap) object is passed to this property, in which
the [options](/api-reference/@react-form-builder/designer/type-aliases/Options) of the desired component are set using
its [customizable key](/api-reference/@react-form-builder/designer/type-aliases/CustomizableKey).

You can manage the FormBuilder and get its state in custom components
using [useFormBuilder](/api-reference/@react-form-builder/designer/variables/useFormBuilder). It provides access
to [IFormBuilder](/api-reference/@react-form-builder/designer/interfaces/IFormBuilder). The management options are limited at the moment,
but they will be expanded in the future.

Another option for customizing the component is to use pure CSS. Each component has a static CSS class named with the component's name
prefixed by `FE_`. This class is applied to the same element as the style or className attributes, utilizing
the [customization map](/api-reference/@react-form-builder/designer/type-aliases/CustomizationMap).

The components palette in the left panel also has some [additional rules](#components-palette) for CSS customization.

A list of customizable components is also available as a [Set](/api-reference/@react-form-builder/designer/variables/CustomizableZone).

### Example

```tsx
import {type CustomizationMap, FormBuilder, useFormBuilder} from '@react-form-builder/designer'
import {useCallback} from 'react'

const CustomToggleModeButton = () => {
  const builder = useFormBuilder()
  const label = builder.builderMode === 'builder' ? 'PreviewMode' : 'EditMode'

  const toggleMode = useCallback(() => {
    builder.builderMode = builder.builderMode === 'builder' ? 'viewer' : 'builder'
  }, [builder])

  return <button onClick={toggleMode}>{label}</button>
}

const simpleCustomization: CustomizationMap = {
  // Hiding the "Download" item in the main menu by using nested CSS selectors.
  MainMenu_Dropdown: {
    style: `
      #menuitem-\\:r5\\: {
        display: none;
      }
    `
  },

  // Hiding the "Clear" button using the menu item customization
  MainMenu_Item_Clear: {
    hidden: true
  },

  // Customizing Header styles
  Header: {
    className: 'MyClassName',
    style: {
      backgroundColor: 'rgba(52,152,255,.25)',
      borderRadius: '10px',
      margin: 5,
      marginBottom: 10,
      padding: '8px!important'
    }
  },

  // Adding a custom button to the header toolbar.
  Header_Toolbar: {
    customRenderer: defaultElement => <div style={{display: 'flex', gap: 10}}>
      {defaultElement}
      <button className={'rs-btn rs-btn-sm'}>My button</button>
    </div>
  },

  // Component toolbar (the toolbar on each selected component in the canvas): add a custom button and hide the default remove (trash) button.
  Component_Toolbar: {
    customRenderer: defaultElement => (
      <div>
        {defaultElement}
        <span style={{marginLeft: 4, padding: '2px 6px', fontSize: 24}}>
          Custom
        </span>
      </div>
    )
  },

  // Changing the "Toggle mode" button to a custom component.
  ToggleModeButton: {
    customRenderer: () => <CustomToggleModeButton/>
  },

  // Hiding the localization dropdown.
  LocalizationSelect: {
    hidden: true
  },

  // Hiding the "Json view" button
  JsonViewButton: {
    hidden: true
  },

  // Hiding the property code button
  PropertyCodeButton: {
    hidden: true
  }
}

const FormBuilderApp = () => {
  return <FormBuilder
    customization={simpleCustomization}
    // other props
  />
}
```

![Customization 03](/assets/customization/customization-03.png)

### Complete list of customizable component keys

![Customization 01](/assets/customization/customization-01.png)

| #  | Name                                    | className                                  |
|:--:|:----------------------------------------|--------------------------------------------|
| 1  | MainContainer                           | FE_MainContainer                           |
| 2  | LeftPanel                               | FE_LeftPanel                               |
| 3  | CentralPanel                            | FE_CentralPanel                            |
| 4  | RightPanel                              | FE_RightPanel                              |
| 5  | LeftPanel_Nav                           | FE_LeftPanel_Nav                           |
| 6  | LeftPanel_Content                       | FE_LeftPanel_Content                       |
| 7  | Header                                  | FE_Header                                  |
| 8  | FormContainer                           | FE_FormContainer                           |
| 9  | RightPanel_Nav                          | FE_RightPanel_Nav                          |
| 10 | RightPanel_Content                      | FE_RightPanel_Content                      |
| 11 | MainMenu_Dropdown                       | FE_MainMenu_Dropdown                       |
| 12 | MainMenu_Button                         | FE_MainMenu_Button                         |
| 13 | Header_Toolbar                          | FE_Header_Toolbar                          |
| 14 | Component_Toolbar                       | FE_Component_Toolbar                       |
| 15 | Component_Toolbar_Items                 | FE_Component_Toolbar_Items                 |
| 16 | Component_Toolbar_Title                 | FE_Component_Toolbar_Title                 |
| 17 | Component_Toolbar_AddButton             | FE_Component_Toolbar_AddButton             |
| 18 | Component_Toolbar_NearbyTreeButton      | FE_Component_Toolbar_NearbyTreeButton      |
| 19 | Component_Toolbar_CloneButton           | FE_Component_Toolbar_CloneButton           |
| 20 | Component_Toolbar_PresetComponentButton | FE_Component_Toolbar_PresetComponentButton |
| 21 | Component_Toolbar_RemoveButton          | FE_Component_Toolbar_RemoveButton          |
| 22 | Component_Toolbar_RevealInTreeButton    | FE_Component_Toolbar_RevealInTreeButton    |
| 23 | ToggleModeButton                        | FE_ToggleModeButton                        |
| 24 | ResolutionSelect                        | FE_ResolutionSelect                        |
| 25 | LocalizationSelect                      | FE_LocalizationSelect                      |
| 26 | JsonViewButton                          | FE_JsonViewButton                          |
| 27 | ToggleThemeButton                       | FE_ToggleThemeButton                       |

![Customization 02](/assets/customization/customization-02.png)

| #  | Name                                                                                       | className                                                                                              | aux classes   |
|:--:|:-------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------|
| 1  | Components_Tab                                                                             | FE_Components_Tab                                                                                      |               |
| 2  | Components_Tab_Content                                                                     | FE_Components_Tab_Content                                                                              |               |
| 3  | Tree_Tab                                                                                   | FE_Tree_Tab                                                                                            |               |
| 4  | Tree_Tab_Content                                                                           | FE_Tree_Tab_Content                                                                                    |               |
| 5  | Settings_Tab                                                                               | FE_Settings_Tab                                                                                        |               |
| 6  | Settings_Tab_Content                                                                       | FE_Settings_Tab_Content                                                                                |               |
| 7  | Forms_Tab                                                                                  | FE_Forms_Tab                                                                                           |               |
| 8  | Forms_Tab_Content                                                                          | FE_Forms_Tab_Content                                                                                   |               |
| 9  | Main_Tab                                                                                   | FE_Main_Tab                                                                                            |               |
| 10 | Style_Tab                                                                                  | FE_Style_Tab                                                                                           |               |
| 11 | Actions_Tab                                                                                | FE_Actions_Tab                                                                                         |               |
| 12 | Rules_Tab                                                                                  | FE_Rules_Tab                                                                                           |               |
| 13 | Main_Tab_Content,<br/> Style_Tab_Content,<br/> Actions_Tab_Content,<br/> Rules_Tab_Content | FE_Main_Tab_Content,<br/> FE_Style_Tab_Content,<br/> FE_Actions_Tab_Content,<br/> FE_Rules_Tab_Content |               |
| 14 | LabeledProperty                                                                            | FE_LabeledProperty                                                                                     | valueModified |
| 15 | PropertyCodeButton                                                                         | FE_PropertyCodeButton                                                                                  |               |
| 16 | PropertyLabel                                                                              | FE_PropertyLabel                                                                                       |               |
| 17 | PropertyInput                                                                              | FE_PropertyInput                                                                                       |               |

:::info note

The right-panel content keys (`Main_Tab_Content`, `Style_Tab_Content`, `Actions_Tab_Content`, and `Rules_Tab_Content`) wrap the active
properties tab body. They mount only when a component is selected on the canvas and that tab is open.

:::

### Menu items customization

Each item in the main menu can be customized individually. The following keys are available:

| #  | Name                               | className                               | Description                                                                                      |
|:---|:-----------------------------------|:----------------------------------------|:-------------------------------------------------------------------------------------------------|
| 1  | MainMenu_Item_AddNewForm           | `FE_MainMenu_Item_AddNewForm`           | "Add new form" button (only visible when [formStorage][formStorage] is enabled)                  |
| 2  | MainMenu_Item_Download             | `FE_MainMenu_Item_Download`             | "Download" button                                                                                |
| 3  | MainMenu_Item_Upload               | `FE_MainMenu_Item_Upload`               | "Upload" button                                                                                  |
| 4  | MainMenu_Item_Save                 | `FE_MainMenu_Item_Save`                 | "Save" button (only visible when [formStorage][formStorage] is enabled)                          |
| 5  | MainMenu_Item_SaveAs               | `FE_MainMenu_Item_SaveAs`               | "Save as" button (only visible when [formStorage][formStorage] is enabled)                       |
| 6  | MainMenu_Item_ExportForms          | `FE_MainMenu_Item_ExportForms`          | "Export forms" button (only visible when [formStorage][formStorage] is enabled)                  |
| 7  | MainMenu_Item_ImportForms          | `FE_MainMenu_Item_ImportForms`          | "Import forms" button (only visible when [formStorage][formStorage] is enabled)                  |
| 8  | MainMenu_Item_Clear                | `FE_MainMenu_Item_Clear`                | "Clear" button                                                                                   |
| 9  | MainMenu_Item_ExportJsonFormSchema | `FE_MainMenu_Item_ExportJsonFormSchema` | "Export JSON Form Schema" button (only visible when [generateJsonFormSchema][jsonSchema] is set) |
| 10 | MainMenu_Item_LanguageSwitch       | `FE_MainMenu_Item_LanguageSwitch`       | Language switch dropdown                                                                         |

**Example usage:**

```tsx
const menuCustomization: CustomizationMap = {
  // Hide the "Clear" button
  MainMenu_Item_Clear: {
    hidden: true
  },

  // Customize the "Download" button style
  MainMenu_Item_Download: {
    className: 'custom-download-button',
    style: {
      backgroundColor: '#4CAF50',
      color: 'white'
    }
  },

  // Replace the "Save" button with a custom component
  MainMenu_Item_Save: {
    customRenderer: (defaultElement, component, props) => (
      <button onClick={() => alert('Custom save!')}>
        Custom Save Button
      </button>
    )
  }
};
```

#### Language switch customization

The language switch menu (`MainMenu_Item_LanguageSwitch`) and individual language items can be customized using the following pattern:

- `MainMenu_Item_LanguageSwitch` - The entire language switch dropdown menu
- `MainMenu_Item_LanguageItem_{language-full-code}` - Individual language menu item (e.g., `MainMenu_Item_LanguageItem_en_US`)

**Example usage:**

```tsx
import {FormBuilder} from '@react-form-builder/designer'

const languageSwitchCustomization = {
  // Customize the entire language switch dropdown
  MainMenu_Item_LanguageSwitch: {
    className: 'custom-language-switch',
    style: {
      minWidth: '200px'
    }
  },

  // Customize a specific language item (English)
  MainMenu_Item_LanguageItem_en_US: {
    customRenderer: (defaultElement, component, props) => (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <span>🇺🇸</span>
        <span style={{fontWeight: 'bold'}}>English (US)</span>
      </div>
    )
  },
}

const FormBuilderApp = () => {
  return <FormBuilder
    customization={languageSwitchCustomization}
    // other props
  />
}
```

**Default behavior:**

- Each language menu item uses the default rendering
- Language items can be styled or entirely replaced using the customization API

### Components palette

Each group and component receives a set of classes composed of its name and type.

When defining a component, you can specify its category. Components with the same category are merged into component groups on the palette.

```typescript {3}
export const richTextEditor = define(RichTextEditor, 'RichTextEditor')
  .name('Rich text editor')
  .category('fields')
  .props({
    //...
  })
```

#### Components group

A component group is assigned the static class `FE_Palette_ComponentGroup` along with a category name prefixed with `FE_`. If a component
group is not defined, components appear at the top of the list without a title and within container with additional class
`FE_top`.

![Groups classes](/assets/customization/customization-groups-classes.png)

#### Single component

A component receives the static class `FE_Palette_Component` composed with its title and name, both prefixed with `FE_`.

```typescript {2}
export const rsCalendar = define(RsCalendar, 'RsCalendar')
  .name('Calendar')
  .props({
    // ...
  })
```

![Component classes](/assets/customization/customization-component-classes.png)

## Custom property editors

Using the [propertyEditors](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#propertyeditors) FormBuilder prop, you
can override existing component property editors or set editor for
your [custom property](/api-reference/@react-form-builder/core/functions/createProperty).

### Example

```tsx
import type {AnnotationEditorProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {RgbaColorPicker} from 'react-colorful'

const MyKeyInput = (props: AnnotationEditorProps) => {
  const {value, onChange} = props
  return <input value={value} onChange={(event) => onChange(event.target.value)}/>
}

/**
 * Converts the string containing a rgba color value into an object.
 * @param value the string containing a rgba color.
 * @returns the object with properties '{r, g, b, a}'.
 */
export function rgbFromString(value: string): RgbaColor {
  const matchColors = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const [, r, g, b, a] = matchColors.exec(value) || []
  return {r: Number(r), g: Number(g), b: Number(b), a: Number(a)}
}

const MyColorInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, showError, annotation} = props

  const onColorChange = useCallback((newColor?: RgbaColor) => {
    if (newColor) {
      const {r, g, b, a} = newColor
      onChange(`rgba(${r}, ${g}, ${b}, ${a})`)
      return
    }
    onChange(newColor)
  }, [onChange])

  const color = rgbFromString(value ?? 'rgba(255, 255, 255, 0)')

  return <div>
    <label>{annotation.name}</label>
    <RgbaColorPicker color={color} onChange={onColorChange}/>
    <label>{showError?.()}</label>
    <button onClick={onClean}>Clean</button>
  </div>
}

const FormBuilderApp = () => {
  return <FormBuilder
    propertyEditors={{
      // Overriding the default key property editor
      key: MyKeyInput,

      // Setting the property editor for your own custom property
      customColor: MyColorInput
    }}
    // other props
  />
}
```

[formStorage]: /formengine-designer/features/form-storage/
[jsonSchema]: /formengine-designer/features/forms-json/#json-schema
