import {Input} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const StringInput = (props: PropertyEditorProps) => {
  const {annotation, onChange, onBlur, value, componentStore} = props

  return (
    <LabeledInput>
      <label>{annotation.name}</label>
      <Input
        name={annotation.key}
        value={componentStore.props[annotation.key] ?? annotation.scheme?.getDefault()}
        //value={value}
        onChange={value => componentStore.props[annotation.key] = value as string | undefined}
        //onChange={onChange}
        onBlur={onBlur}
      />
    </LabeledInput>
  )
}

export {StringInput}
