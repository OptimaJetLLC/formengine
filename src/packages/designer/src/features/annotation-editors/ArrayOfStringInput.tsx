import {TagInput} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const style = {width: '100%'} as const

/**
 * The property editor for property of type "multiple select", displays values as a tag editor.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ArrayOfStringInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean} = props
  const t = useTranslationPart('propertiesEditor')

  return <LabeledProperty {...props}>
    <TagInput value={value ?? ''} onChange={onChange} onClean={onClean} block
              size={'xs'} style={style} placeholder={t('setInputHint')}
    />
  </LabeledProperty>
}
