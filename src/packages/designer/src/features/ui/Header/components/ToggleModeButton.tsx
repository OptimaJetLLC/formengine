import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faPlay from '@fortawesome/free-solid-svg-icons/faPlay.js'
import type {BuilderMode} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'
import styles from './ToggleModeButton.module.css'

const Modes: Record<BuilderMode, { icon: any, toggleTo: BuilderMode }> = {
  viewer: {icon: faPaintBrush, toggleTo: 'builder'},
  builder: {icon: faPlay, toggleTo: 'viewer'}
}

const RawToggleModeButton = ({className}: { className?: string }) => {
  const store = useBuilderStore()
  const {icon, toggleTo} = Modes[store.builderMode]
  const t = useTranslationPart('rightMenu.modes')
  const onClick = useCallback(() => store.changeBuilderMode(toggleTo), [store, toggleTo])

  return (
    <Button
      onClick={onClick}
      appearance="primary"
      className={cx(styles.animatedButton, store.builderMode, className)}
      size="sm"
    >
      <FaIcon icon={icon} color="white"/>
      {t(store.builderMode)}
    </Button>
  )
}

export const ToggleModeButton = customizableObserver('ToggleModeButton', RawToggleModeButton)
