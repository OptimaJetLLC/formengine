import {css} from '@emotion/react'
import styled from '@emotion/styled'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay.js'
import {namedObserver} from '@react-form-builder/core'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {BuilderMode} from '../../../../utils/types'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'

const Modes: Record<BuilderMode, { icon: any, toggleTo: BuilderMode }> = {
  viewer: {icon: faPaintBrush, toggleTo: 'builder'},
  builder: {icon: faPlay, toggleTo: 'viewer'}
}

export const ToggleModeButton = namedObserver('ToggleModeButton', () => {
  const store = useBuilderStore()
  const {icon, toggleTo} = Modes[store.builderMode]
  const t = useTranslationPart('rightMenu.modes')

  return <AnimatedButton onClick={() => store.changeBuilderMode(toggleTo)}
                         appearance={'primary'} className={store.builderMode} size={'sm'}>
    <FaIcon icon={icon} color={'white'}/>
    {t(store.builderMode)}
  </AnimatedButton>
})

const makeLabeledIconStyles = (gap = 10) => css`
  && {
    display: flex;
    align-items: center;
    gap: ${gap}px;

    .rs-icon {
      margin-block-start: 2px;
    }
  }
`

const SIconButton = styled(Button)`
  ${makeLabeledIconStyles()}
`

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
