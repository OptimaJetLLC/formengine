import {InputNumber} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

const NumberInput = () => {
  const {onChange, value, annotation} = useEditor()
  const handleChange = (value: any) => {
    if (typeof value === 'string') {
      onChange(Number(value))
      return
    }
    onChange(value)
  }
  const inputNumberProps = {...annotation.editorProps, value}

  return <LabeledProperty annotation={annotation}>
    <InputNumber {...inputNumberProps} onChange={handleChange} size={'xs'}/>
  </LabeledProperty>
}

export {NumberInput}
