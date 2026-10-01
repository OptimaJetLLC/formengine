import {namedObserver} from '@react-form-builder/core'
import {Close, Code} from '@rsuite/icons'
import {Input, InputGroup} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {useOpenJsonEditor} from './useOpenJsonEditor'

const RawObjectInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation} = props
  const title = `${props.componentData.key}.${annotation.name}`
  const {valuePreview, editJson} = useOpenJsonEditor(annotation.key, title, value, onChange)

  return (
    <LabeledProperty {...props}>
      <InputGroup inside size="xs">
        <Input value={valuePreview} onClick={editJson} readOnly color={'var(--rs-btn-ghost-text)'} />
        <InputGroup.Button onClick={value ? onClean : editJson}>{value ? <Close /> : <Code />}</InputGroup.Button>
      </InputGroup>
    </LabeledProperty>
  )
}

/**
 * Plain object editor.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ObjectInput = namedObserver('ObjectInput', RawObjectInput)
