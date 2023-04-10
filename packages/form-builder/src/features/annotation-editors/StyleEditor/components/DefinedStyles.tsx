import {useComponentData} from 'fb-core'
import {LabeledPre} from '../../../components/LabeledPre'

export const DefinedStyles = () => {
  const data = useComponentData()
  return (
    <>
      <LabeledPre code="style.cssObject" value={JSON.stringify(data.model.css?.object, null, ' ')}/>
      <LabeledPre code="style.cssString" value={data.model.css?.string}/>
    </>
  )
}
