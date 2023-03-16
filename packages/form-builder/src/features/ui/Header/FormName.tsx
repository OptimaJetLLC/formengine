import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

const _FormName = () => {
  const store = useBuilderStore()
  const {t} = useTranslation()

  return <Whisper speaker={<Tooltip>{t('leftMenu.currentFormName')}</Tooltip>}>
    <span>{store.formName}</span>
  </Whisper>
}

export const FormName = observer(_FormName)
