import {makeAutoObservable} from 'mobx'
import {ComponentType} from 'react'
import {calculateProperties} from '../features/calculation/propertyCalculator'
import {computeEvents} from '../features/event'
import {getHtmlAttributes} from '../features/html-attributes'
import {computeClassName} from '../features/style'
import {getSubstitutedValue} from '../features/substitution'
import {OverrideRef} from '../features/ui/OverridesContext'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {getChildren} from '../utils/getChildren'
import {Store} from './Store'

export class ComponentState {
  constructor(
    readonly data: ComponentData,
    readonly store: Store,
    readonly componentTreeItem: ComponentType<any>,
    readonly overrides?: OverrideRef,
  ) {
    makeAutoObservable(this)
  }

  get get(): Record<string, any> {
    const propsWithoutChildren = Object.assign(
      {key: this.data.store.key},
      this.data.model.defaultProps,
      this.calculatedProps,
      this.substitutedValue,
      this.className,
      this.value,
      this.events,
      this.htmlAttributes,
      this.overrides?.current,
    )
    return Object.assign(propsWithoutChildren, this.children(propsWithoutChildren))
  }

  get value() {
    if (this.data.field) return {[this.data.field.valued]: this.data.field.value}
  }

  get calculatedProps() {
    return calculateProperties(this.data.store, this.store.form)
  }

  get events() {
    return computeEvents(this.data, this.store)
  }

  get substitutedValue() {
    return getSubstitutedValue(this.data.store.props, this.store)
  }

  get className() {
    const className = computeClassName(this, this.data, this.store.viewMode)
    return {className}
  }

  get htmlAttributes() {
    return getHtmlAttributes(this.data.store)
  }

  children(props: any) {
    return getChildren(this.data, this.store, this.componentTreeItem, props)
  }
}
