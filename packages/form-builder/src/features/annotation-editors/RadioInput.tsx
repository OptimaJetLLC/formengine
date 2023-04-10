import {useEditor} from '../../utils/useEditor'
import {PropertyAn} from '../annotation/types/annotations/PropertyAn'
import LabeledProperty from '../components/LabeledProperty'
import {RadioButtons} from '../components/RadioButtons'

export const RadioInput = () => {
  const {value, onChange, annotation} = useEditor()
  return (
    <LabeledProperty annotation={annotation}>
      <RadioButtons items={(annotation as PropertyAn).data} onChange={onChange} value={value}/>
    </LabeledProperty>
  )
}
