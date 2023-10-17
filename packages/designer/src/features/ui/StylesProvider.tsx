import {css, Global} from '@emotion/react'
import {namedObserver} from '@react-form-builder/core'
import {ComponentProps} from 'react'

const globalStyles = css`
  /* Scrollbar */

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: rgb(179 179 179 / 60%);
    border-radius: 4px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(179 179 179);
  }
`

export const StylesProvider = namedObserver('StylesProvider', (props: ComponentProps<any>) => {
  return <>
    {props.children}
    <Global styles={globalStyles}/>
  </>
})
