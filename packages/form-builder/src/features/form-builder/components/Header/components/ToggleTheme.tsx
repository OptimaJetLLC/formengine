import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import * as faMoon from '@fortawesome/free-solid-svg-icons/faMoon'
import * as faSun from '@fortawesome/free-solid-svg-icons/faSun'
import {FaIcon} from 'fb-core'
import {useContext, useEffect, useState} from 'react'
import {StylesContext} from '../../StylesProvider'

export const ToggleTheme = () => {
  const {theme, setTheme} = useContext(StylesContext)
  const isDark = theme === 'dark'
  const [icon, setIcon] = useState(isDark ? faMoon : faSun)
  const iconProps: any = {
    icon,
    color: isDark ? 'var(--rs-yellow-300)' : 'white',
    size: 1.4,
    onClick: () => setTheme(isDark ? 'light' : 'dark'),
    className: cx({isDark})
  }
  useEffect(() => {
    setTimeout(() => setIcon(isDark ? faMoon : faSun), 200)
  }, [isDark])
  return <IconButton {...iconProps}/>
}

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

  &.isDark {
    path {
      transform: rotate(0deg);
    }

    background-color: var(--rs-toggle-bg);
  }
`
