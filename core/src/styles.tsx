import {css, Global} from '@emotion/react'
import React, {ComponentProps} from 'react'
import {CustomProvider} from 'rsuite'
import {CustomProviderProps} from 'rsuite/esm/CustomProvider/CustomProvider'
import useLocalStorageState from 'use-local-storage-state'

const globalStyles = css`
  /* Scrollbar */

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: rgb(179 179 179 / 86%);
    border-radius: 4px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(133 133 133);
  }
`

type ThemeType = CustomProviderProps['theme'];

interface StylesProviderProps extends CustomProviderProps {
  setTheme: Function
}

export const StylesContext = React.createContext<StylesProviderProps>({
  setTheme: () => {
  }
})

export const Styles = (props: ComponentProps<any>) => {
  const isDarkThemeSystem = window.matchMedia('(prefers-color-scheme: dark)')?.matches
  const [theme, setTheme] = useLocalStorageState<ThemeType>('fb-theme', {
    defaultValue: isDarkThemeSystem ? 'dark' : 'light'
  })
  return <StylesContext.Provider value={{theme, setTheme}}><CustomProvider theme={theme}>
    {props.children}
    <Global styles={globalStyles}/>
  </CustomProvider></StylesContext.Provider>
}
