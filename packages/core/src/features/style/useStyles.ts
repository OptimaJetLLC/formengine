import {css} from '@emotion/css'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {styleToString, transformStylesToCSS} from './utils'

export const useStyles = () => {
  const {componentStore} = useComponentData()

  let transformedStyles = ''
  const mergedStyles = [
    ...(componentStore.style.cssStyles ?? []),
    ...transformStylesToCSS(componentStore.style.styles)
  ]

  mergedStyles?.forEach(
    ({name, value}) => transformedStyles += styleToString(name, value)
  )

  transformedStyles += componentStore.style.cssBlock || ''

  return css`${transformedStyles}`
}
