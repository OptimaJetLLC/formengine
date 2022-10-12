import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {FaIcon} from '../../../../ui/Icons'
import {useStore} from '../../../../../utils/contexts/StoreContext'

export const ToggleModeButton = observer(() => {
  const store = useStore()
  const {t} = useTranslation()
  const icon = store.isBuilderMode ? faPlay : faPaintBrush

  return <IconButton onClick={() => store.isBuilderMode = !store.isBuilderMode}>
    <FaIcon icon={icon as unknown as IconDefinition} color={'var(--rs-btn-primary-bg)'}/>
    {store.isBuilderMode ? t('rightMenu.previewMode') : t('rightMenu.editMode')}
  </IconButton>
})

const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 14px;
  color: var(--rs-btn-primary-bg);
`
