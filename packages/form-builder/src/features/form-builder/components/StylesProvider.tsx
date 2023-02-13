import {css, Global} from '@emotion/react'
import {useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {ComponentProps} from 'react'
import {CustomProvider} from 'rsuite'

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

export const StylesProvider = observer((props: ComponentProps<any>) => {
  const store = useBuilderStore()
  const {theme} = store

  return <CustomProvider theme={theme}>
    {props.children}
    <Global styles={globalStyles}/>
  </CustomProvider>
})
