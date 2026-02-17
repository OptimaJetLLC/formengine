import {ViewPicker} from '@react-form-builder/apps-common'
import {addToDefaultElement, customization as common} from '@react-form-builder/apps-common-designer'
import type {CustomizationMap} from '@react-form-builder/designer'

/**
 * Customization map for the form builder UI.
 */
export const customization: CustomizationMap = {
  ...common,
  Header_Toolbar: addToDefaultElement(<ViewPicker />),
}
