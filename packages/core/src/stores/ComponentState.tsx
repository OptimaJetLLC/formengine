import {makeAutoObservable} from 'mobx'
import {ComponentType} from 'react'
import {calculateProperties} from '../features/calculation/propertyCalculator'
import {computeEvents} from '../features/event'
import {getHtmlAttributes} from '../features/html-attributes'
import {computeStylization} from '../features/style'
import {getSubstitutedValue} from '../features/substitution'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {getChildren} from '../utils/getChildren'
import {initDefaultProps} from '../utils/initDefaultProps'
import {Store} from './Store'

export class ComponentState {
  readonly defaultProps

  constructor(
    readonly data: ComponentData,
    readonly store: Store,
    readonly componentTreeItem: ComponentType<any>
  ) {
    makeAutoObservable(this)
    this.defaultProps = initDefaultProps(data.model)
  }

  get get() {
    const propsWithoutChildren = Object.assign(
      {key: this.data.componentStore.key},
      this.defaultProps,
      this.calculatedProps,
      this.substitutedValue,
      this.stylization,
      this.value,
      this.events,
      this.htmlAttributes,
    )
    return Object.assign(propsWithoutChildren, this.children(propsWithoutChildren))
  }

  get value() {
    if (this.data.field) return {[this.data.field.valuedAn.key]: this.data.field.value}
  }

  get calculatedProps() {
    return calculateProperties(this.data.componentStore, this.store.form)
  }

  get events() {
    return computeEvents(this.data, this.store)
  }

  get substitutedValue() {
    return getSubstitutedValue(this.data.componentStore.props, this.store)
  }

  get stylization() {
    return computeStylization(this, this.data)
  }

  get htmlAttributes() {
    return getHtmlAttributes(this.data.componentStore)
  }

  children(props: any) {
    return getChildren(this.data, this.store, this.componentTreeItem, props)
  }
}
