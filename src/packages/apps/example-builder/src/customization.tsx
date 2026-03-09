import {ViewPicker} from '@react-form-builder/apps-common'
import {addToDefaultElement, customization as common} from '@react-form-builder/apps-common-designer'
import {useComponentData} from '@react-form-builder/core'
import type {CustomizationMap} from '@react-form-builder/designer'

const customToolbar = false

const toolbarStyle = {border: '1px solid purple'}
const componentToolbarCustomization: CustomizationMap['Component_Toolbar'] = {
  customRenderer: (defaultElement, component, props) => {
    return customToolbar ? <div style={toolbarStyle}>{defaultElement}</div> : defaultElement
  },
}

const CustomTitle = () => {
  const cd = useComponentData()

  return <span>{cd.id}</span>
}

const deleteStyle = {width: '10px', height: '10px'}
/**
 * Customization map for the form builder UI.
 */
export const customization: CustomizationMap = {
  ...common,
  Header_Toolbar: addToDefaultElement(<ViewPicker />),
  Component_Toolbar: componentToolbarCustomization,
  Component_Toolbar_RemoveButton: {
    customRenderer: (defaultElement, component, props) => {
      return customToolbar ? (
        <div style={deleteStyle} onClick={props.onRemove}>
          R
        </div>
      ) : (
        defaultElement
      )
    },
  },
  Component_Toolbar_Items: {
    customRenderer: (defaultElement, component, props) => {
      return customToolbar ? (
        <div>
          <CustomTitle />
          {defaultElement}
        </div>
      ) : (
        defaultElement
      )
    },
  },
}
