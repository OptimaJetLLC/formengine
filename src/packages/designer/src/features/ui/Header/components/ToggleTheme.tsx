import styled from '@emotion/styled'
import * as faMoon from '@fortawesome/free-solid-svg-icons/faMoon.js'
import * as faSun from '@fortawesome/free-solid-svg-icons/faSun.js'
import type {ComponentProps} from 'react'
import {useMemo} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {BuilderTheme} from '../../../../utils/types'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'

const IconButton = styled(FaIcon)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 3px;
  border-radius: 20px;
  overflow: hidden;

  & path {
    transform: rotate(360deg);
    transform-origin: 50% 200%;
    transition: all 400ms cubic-bezier(1, 0, 0, 1);
  }

  transition: background-color 400ms linear;
  background-color: var(--rs-primary-500);

  &.dark {
    path {
      transform: rotate(0deg);
    }

    background-color: var(--rs-toggle-bg);
  }
`

const icons: Record<BuilderTheme, any> = {
  dark: faMoon,
  light: faSun
}

type ToggleThemeProps = Omit<ComponentProps<typeof Whisper>, 'placement' | 'speaker' | 'children'>

const RawToggleTheme = (props: ToggleThemeProps) => {
  const store = useBuilderStore()
  const t = useTranslationPart('rightMenu')
  const {theme} = store
  const icon = useMemo(() => icons[theme], [theme])
  const isDark = theme === 'dark'

  const iconProps: any = useMemo(() => ({
    icon,
    color: isDark ? 'var(--rs-yellow-300)' : 'white',
    size: 1.4,
    onClick: () => store.theme = isDark ? 'light' : 'dark',
    className: store.theme
  }), [icon, isDark, store])
  const speaker = useMemo(() => <Tooltip>{t('toggleTheme')}</Tooltip>, [t])

  return (
    <Whisper {...props} speaker={speaker} placement="bottom">
      <div>
        <IconButton {...iconProps}/>
      </div>
    </Whisper>
  )
}

export const ToggleTheme = customizableObserver('ToggleThemeButton', RawToggleTheme)
