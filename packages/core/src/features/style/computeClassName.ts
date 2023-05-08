import {css, cx} from '@emotion/css'
import {assign} from 'lodash-es'
import {ComponentState} from '../../stores/ComponentState'
import {ViewMode} from '../../types'
import {ComponentData} from '../../utils/contexts/ComponentDataContext'

export const computeClassName = (state: ComponentState, data: ComponentData, viewMode: ViewMode) => {
  const cssObject = assign({}, data.model.css?.object, data.store.css?.object)

  return cx(
    getClassNameProp(data),
    css(cssObject),
    css(data.model.css?.string),
    css(data.store.css?.string),
    css(data.store.css?.any),
    css(data.store.css?.[viewMode]),
  )
}

function getClassNameProp(data: ComponentData): string {
  const defaultProp = data.model.defaultProps?.className
  const currentProp = data.store.props.className?.value
  return currentProp ?? defaultProp
}
