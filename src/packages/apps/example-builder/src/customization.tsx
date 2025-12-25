import type {CustomizationMap} from '@react-form-builder/designer'
import {BuilderViewPicker} from '@react-form-builder/apps-common'
import {addToDefaultElement} from '@react-form-builder/apps-common'
import {customization as common} from '@react-form-builder/apps-common'

/**
 * Customization map for the form builder UI.
 */
export const customization: CustomizationMap = {
  ...common,
  Header_Toolbar: addToDefaultElement(<BuilderViewPicker />),
}
