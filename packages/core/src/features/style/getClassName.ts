import {css} from '@emotion/css'
import {keys} from 'lodash'
import {ComponentStore} from '../../stores/ComponentStore'
import {StylesFromProps} from './conts'
import {styleToString, transformStylesToCSS} from './utils'

export const getClassName = (componentStore: ComponentStore) => {
  const {style, props} = componentStore


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

  return {className: css`${styleString}`}
}

