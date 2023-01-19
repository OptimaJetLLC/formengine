import {LabeledProperty} from '../../ui/Containers'
import {RadioButtons} from '../../ui/RadioButtons'
import {PropertyAn} from '../utils/annotations/PropertyAn'
import {useEditor} from '../utils/useEditor'

export const RadioInput = () => {
  const {value, onChange, annotation} = useEditor()
  return (
    <LabeledProperty annotation={annotation}>
      <RadioButtons items={(annotation as PropertyAn).data} onChange={onChange} value={value}/>
    </LabeledProperty>
  )
}
