import {css, cx} from '@emotion/css'
import {assign} from 'lodash'
import {ComponentState} from '../../stores/ComponentState'
import {ComponentData} from '../../utils/contexts/ComponenDataContext'
import {isStyle} from '../annotation'
import {StyleItem, Styles} from './types'

export const computeStylization = (state: ComponentState, data: ComponentData) => {
  const styleAn = data.model.properties.find(isStyle)
  const styles = assign({}, styleAn?.default, data.componentStore.styles)

  const editorClassName = computeEditorClassName(styles, data)
  const propertyClassName = data.componentStore.props.className?.value || state.defaultProps.className
  const className = cx(styleAn?.className, propertyClassName, editorClassName)

  return {className, style: styleAn?.inline}
}

const computeEditorClassName = (styles: Styles, data: ComponentData) => {
  const styleItems: StyleItem[] = []
  const cssObject = assign({}, getDefaultCssObject(data), styles.cssObject)
  styleItems.push(...(styles.additional ?? []))

  let styleString = styleItems?.reduce(styleItemToString, '')
  styleString += styles.cssString ?? ''

  return cx(css`${styleString}`, css(cssObject))
}

const getDefaultCssObject = (data: ComponentData) => {
  return data.model.style.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.schema?.getDefault()
    return previousValue
  }, {} as Record<string, any>)
}

const styleItemToString = (sum: string, {name, value}: StyleItem) => {
  return sum + (name && value ? `${name}:${value};` : '')
}
