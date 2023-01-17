import {LabeledPre} from '../../../ui/LabeledPre'
import {StyleAnnotationProps} from '../StyleEditor'

export const DefinedStyles = ({annotation}: StyleAnnotationProps) => {
  return (
    <>
      <LabeledPre code="style.inlineStyles" value={JSON.stringify(annotation.inline, null, ' ')}/>
      <LabeledPre code="style.cssObject" value={JSON.stringify(annotation.css?.object, null, ' ')}/>
      <LabeledPre code="style.cssString" value={annotation.css?.string}/>
    </>
  )
}
