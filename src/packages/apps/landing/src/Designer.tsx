import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'

/**
 * @returns the Designer element.
 */
export const Designer = () => {
  return <FormBuilder view={builderViewWithCss}/>
}
