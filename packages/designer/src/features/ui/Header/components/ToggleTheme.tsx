import styled from '@emotion/styled'
import * as faMoon from '@fortawesome/free-solid-svg-icons/faMoon.js'
import * as faSun from '@fortawesome/free-solid-svg-icons/faSun.js'
import {namedObserver} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {BuilderTheme} from '../../../../utils/types'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'

const icons: Record<BuilderTheme, any> = {
  dark: faMoon,
  light: faSun
}

export const ToggleTheme = namedObserver('ToggleTheme', () => {
  const store = useBuilderStore()
  const t = useTranslationPart('rightMenu')
  const {theme} = store
  const [icon, setIcon] = useState(icons[theme])
  const isDark = theme === 'dark'

  useEffect(() => {
    setTimeout(() => setIcon(isDark ? faMoon : faSun), 200)
  }, [store.theme])

  const iconProps: any = {
    icon,
    color: isDark ? 'var(--rs-yellow-300)' : 'white',
    size: 1.4,
    onClick: () => store.theme = isDark ? 'light' : 'dark',
    className: store.theme
  }

  return (
    <Whisper speaker={<Tooltip>{t('toggleTheme')}</Tooltip>} placement={'bottom'}>
      <div>
        <IconButton {...iconProps}/>
      </div>
    </Whisper>
  )
})

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
