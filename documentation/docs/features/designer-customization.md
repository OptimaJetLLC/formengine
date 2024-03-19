---
sidebar_position: 12
title: Designer customization
slug: /designer-customization
---

# Designer customization

## Customizing the FormBuilder interface

Using the [customization](/api-reference/interfaces/react_form_builder_designer.FormBuilderProps#customization) `FormBuilder` prop, you can
hide, style, or replace any parts of the FormBuilder interface.
A [customization map](/api-reference/modules/react_form_builder_designer#customizationmap) object is passed to this property, in which the
[options](/api-reference/modules/react_form_builder_designer#options) of the desired component are set using
its [customizable key](/api-reference/modules/react_form_builder_designer#customizablekey).

### Example

```tsx
import {type CustomizationMap, FormBuilder} from '@react-form-builder/designer'

const simpleCustomization: CustomizationMap = {
  // Hiding the "Download" item in the main menu by using nested CSS selectors.
  MainMenu_Dropdown: {
    style: `
      #menuitem-\\:r5\\: {
        display: none;
      }
    `
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

  // Hiding the icon on the "Toggle mode" button.
  ToggleModeButton: {
    style: `
      background: black !important;

      svg {
        display: none;
      }
    `
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

|  #   | Name                |
|:----:|:--------------------|
|  1   | MainContainer       | 
|  2   | LeftPanel           | 
|  3   | CentralPanel        | 
|  4   | RightPanel          | 
|  5   | LeftPanel_Nav       | 
|  6   | LeftPanel_Content   | 
|  7   | Header              |
|  8   | CentralPanel        |
|  9   | RightPanel_Nav      |
|  10  | RightPanel_Content  |
|  11  | MainMenu_Dropdown   |
|  12  | MainMenu_Button     |
|  13  | Header_Toolbar      |
|  14  | ToggleModeButton    |
|  15  | ResolutionSelect    |
|  16  | LocalizationSelect  |
|  17  | JsonViewButton      |
|  18  | ToggleThemeButton   |

![Customization 02](/assets/customization/customization-02.png)

| #  | Name                                                                        |
|:--:|:----------------------------------------------------------------------------|
| 1  | Components_Tab                                                              |
| 2  | Components_Tab_Content                                                      |
| 3  | Tree_Tab                                                                    |
| 4  | Tree_Tab_Content                                                            |
| 5  | Settings_Tab                                                                |
| 6  | Settings_Tab_Content                                                        |
| 7  | Forms_Tab                                                                   |
| 8  | Forms_Tab_Content                                                           |
| 9  | Main_Tab                                                                    |
| 10 | Style_Tab                                                                   |
| 11 | Actions_Tab                                                                 |
| 12 | Rules_Tab                                                                   |
| 13 | Main_Tab_Content, Style_Tab_Content, Actions_Tab_Content, Rules_Tab_Content |
| 14 | LabeledProperty                                                             |
| 15 | PropertyCodeButton                                                          |
| 16 | PropertyLabel                                                               |
| 17 | PropertyInput                                                               |

## Custom property editors

Using the [propertyEditors](/api-reference/interfaces/react_form_builder_designer.FormBuilderProps#propertyeditors) FormBuilder prop, you
can override existing component property editors or set editor for
your [custom property](/api-reference/modules/react_form_builder_core#createproperty).

### Example

```tsx
import type {AnnotationEditorProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {RgbaColorPicker} from 'react-colorful'

const MyKeyInput = (props: AnnotationEditorProps) => {
  const {value, onChange} = props
  return <input value={value} onChange={onChange}/>
}

const MyColorInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, showError, annotation} = props

  return <div>
    <label>{annotation.name}</label>
    <RgbaColorPicker color={value} onChange={onChange}/>
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
