import * as faMoon from '@fortawesome/free-solid-svg-icons/faMoon.js'
import * as faSun from '@fortawesome/free-solid-svg-icons/faSun.js'
import type {BuilderTheme} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useMemo} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization/customizableObserver'
import {useTranslationPart} from '../../../localization/hooks'
import styles from './ToggleTheme.module.css'

const icons: Record<BuilderTheme, any> = {
  dark: faMoon,
  light: faSun
}

type ToggleThemeProps = Omit<ComponentProps<typeof Whisper>, 'placement' | 'speaker' | 'children'>

const RawToggleTheme = ({className, ...props}: ToggleThemeProps) => {
  const store = useBuilderStore()
  const t = useTranslationPart('rightMenu')
  const {theme} = store
  const icon = useMemo(() => icons[theme], [theme])
  const isDark = theme === 'dark'

  const iconProps: any = useMemo(() => ({
    icon,
    color: isDark ? 'var(--rs-yellow-300)' : 'white',
    size: 1.4,
    // eslint-disable-next-line react-hooks/immutability
    onClick: () => store.theme = isDark ? 'light' : 'dark',
    className: cx(styles.iconButton, store.theme, className)
  }), [className, icon, isDark, store])
  const speaker = useMemo(() => <Tooltip>{t('toggleTheme')}</Tooltip>, [t])

  return (
    <Whisper {...props} speaker={speaker} placement="bottom">
      <div>
        <FaIcon {...iconProps}/>
      </div>
    </Whisper>
  )
}

export const ToggleTheme = customizableObserver('ToggleThemeButton', RawToggleTheme)
