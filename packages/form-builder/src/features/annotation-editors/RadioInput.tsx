import {PropertyAn} from 'fb-core'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'
import {RadioButtons} from '../ui/common/RadioButtons'

export const RadioInput = () => {
  const {value, onChange, annotation} = useEditor()
  return (
    <LabeledProperty annotation={annotation}>
      <RadioButtons items={(annotation as PropertyAn).data} onChange={onChange} value={value}/>
    </LabeledProperty>
  )
}
