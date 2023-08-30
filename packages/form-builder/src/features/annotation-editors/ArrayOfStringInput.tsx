import {TagInput} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for property of type "multiple select", displays values as a tag editor.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ArrayOfStringInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const t = useTranslationPart('propertiesEditor')

  return <LabeledProperty annotation={annotation}>
    <TagInput value={value ?? ''} onChange={onChange} onClean={onClean} block
              size={'xs'} style={{width: '100%'}} placeholder={t('setInputHint')}
    />
  </LabeledProperty>
}
