import {Input} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const StringInput = (props: PropertyEditorProps<string | undefined>) => {
  const {annotation, onChange, onBlur, value} = props

  //if (!fields) return null
  //if (!helpers) return null
  return (
    <LabeledInput>
      <label>{annotation.title}</label>
      <Input
        name={annotation.key}
        /*value={componentStore.props[annotation.key]}*/
        value={value}
        /*onChange={value => componentStore.props[annotation.key] = value as string | undefined}*/
        onChange={onChange}
        onBlur={onBlur}
      />
    </LabeledInput>
  )
}

export {StringInput}
