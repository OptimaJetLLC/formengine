import {css} from '@emotion/css'
import {keys} from 'lodash'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {StylesFromProps} from './conts'
import {styleToString, transformStylesToCSS} from './utils'

export const useStyles = () => {
  const {style, props} = useComponentData().componentStore


  const stylesFromProps: Record<string, string> = {}
  keys(props)?.forEach(key => {
    if (StylesFromProps[key]) {
      stylesFromProps[key] = props[key]
    }
  })

  const mergedStyles = [
    ...transformStylesToCSS(stylesFromProps),
    ...(style.cssStyles ?? []),
    ...transformStylesToCSS(style.styles)
  ]

  let styleString = mergedStyles?.reduce((sum, item) => sum + styleToString(item), '')

  styleString += style.cssBlock || ''

  return css`${styleString}`
}

export const removePropsStyles = (props: Record<string, any>) => {
  keys(props)?.forEach(key => {
    if (StylesFromProps[key]) delete props[key]
  })

  return props
}
