import {useComponentData} from '@react-form-builder/core'
import {LabeledPre} from '../../../components/LabeledPre'

/**
 * The React form builder component that displays the editor of the component's custom CSS properties.
 * @returns the React element.
 */
export const DefinedStyles = () => {
  const data = useComponentData()
  return (
    <>
      <LabeledPre code="style.cssObject" value={JSON.stringify(data.model.css?.object, null, ' ')}/>
      <LabeledPre code="style.cssString" value={data.model.css?.string}/>
    </>
  )
}
