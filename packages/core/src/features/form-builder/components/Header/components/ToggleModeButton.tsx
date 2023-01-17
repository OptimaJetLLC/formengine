import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Radio, RadioGroup} from 'rsuite'
import {BuilderMode} from '../../../../../stores/Store'
import {useStore} from '../../../../../utils/contexts/StoreContext'
import {FaIcon} from '../../../../ui/Icons'

export const ToggleModeButton = observer(() => {
  const store = useStore()
  const {t} = useTranslation()
  const color = 'var(--rs-btn-primary-bg)'

  return <RadioGroup name="builderModeList" inline appearance="picker" value={store.builderMode}
                     onChange={value => store.builderMode = value as BuilderMode}>
    <Radio value="viewer">
      <SFaIcon icon={faPlay as unknown as IconDefinition} color={color}/>
      {t('rightMenu.previewMode')}
    </Radio>
    <Radio value="builder">
      <SFaIcon icon={faPaintBrush as unknown as IconDefinition} color={color}/>
      {t('rightMenu.editMode')}
    </Radio>
    <Radio value="json">
      <SFaIcon icon={faCode as unknown as IconDefinition} color={color}/>
      {t('rightMenu.jsonMode')}
    </Radio>
  </RadioGroup>
})

const SFaIcon = styled(FaIcon)`
  margin-right: 6px;
`
