import {TagInput} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'

export const SetInput = () => {
  const {value, onChange, annotation, onRemove} = useEditor()
  const t = useTranslationPart('propertiesEditor')

  return <LabeledProperty annotation={annotation}>
    <TagInput value={value ?? ''} onChange={onChange} onClean={onRemove} block
              size={'xs'} style={{width: '100%'}} placeholder={t('setInputHint')}
    />
  </LabeledProperty>
}
