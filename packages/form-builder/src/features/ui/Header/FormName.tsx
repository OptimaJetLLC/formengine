import {namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

export const FormName = namedObserver('FormName', () => {
  const store = useBuilderStore()
  const {t} = useTranslation()

  return <Whisper speaker={<Tooltip>{t('leftMenu.currentFormName')}</Tooltip>}>
    <span>{store.formName}</span>
  </Whisper>
})
