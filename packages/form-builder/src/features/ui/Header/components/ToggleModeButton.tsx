import styled from '@emotion/styled'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay'
import {observer} from 'mobx-react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {BuilderMode} from '../../../../utils/types'
import {useTranslationPart} from '../../../localization/hooks'
import {SIconButton} from '../../common/Containers'
import {FaIcon} from '../../common/Icons'

const Modes: Record<BuilderMode, { icon: any, toggleTo: BuilderMode }> = {
  viewer: {icon: faPaintBrush, toggleTo: 'builder'},
  builder: {icon: faPlay, toggleTo: 'viewer'}
}

export const ToggleModeButton = observer(() => {
  const store = useBuilderStore()
  const {icon, toggleTo} = Modes[store.builderMode]
  const t = useTranslationPart('rightMenu.modes')

  return <AnimatedButton onClick={() => store.changeBuilderMode(toggleTo)}
                         appearance={'primary'} className={store.builderMode}>
    <FaIcon icon={icon} color={'white'}/>
    {t(store.builderMode)}
  </AnimatedButton>
})

const AnimatedButton = styled(SIconButton)`
  min-width: 98px;
  display: flex;
  justify-content: center;
  background-size: 200% 100%;
  background-image: linear-gradient(to right, var(--rs-btn-primary-bg) 50%, var(--rs-green-700) 50%);
  transition: background-position 200ms, box-shadow 600ms !important;
  box-shadow: 2px 5px 20px -5px var(--rs-btn-primary-bg);

  &.viewer {
    background-position: 100% 0;
    box-shadow: 2px 5px 20px -5px var(--rs-green-700);
  }
`
