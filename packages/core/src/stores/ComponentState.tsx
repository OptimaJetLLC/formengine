import {makeAutoObservable} from 'mobx'
import {calculateProperties} from '../features/calculation/propertyCalculator'
import {initEvents} from '../features/event'
import {getHtmlAttributes} from '../features/html-attributes'
import {getClassName} from '../features/style'
import {getSubstitutedValue} from '../features/substitution'
import {ComponentData} from '../utils/contexts/ComponenDataContext'
import {getChildren} from '../utils/getChildren'
import {getDefaultProps} from '../utils/getDefaultProps'
import {Store} from './Store'

export class ComponentState {
  constructor(readonly data: ComponentData, readonly store: Store) {
    makeAutoObservable(this)
  }

  get get() {
    return Object.assign(
      {key: this.data.componentStore.key},
      this.defaultProps,
      this.calculatedProps,
      this.children,
      this.substitutedValue,
      this.className,
      this.value,
      this.events,
      this.htmlAttributes
    )
  }

  get value() {
    if (this.data.field) return {[this.data.field.valuedAn.key]: this.data.field.value}
  }

  get defaultProps() {
    return getDefaultProps(this.data)
  }

  get calculatedProps() {
    return calculateProperties(this.data.componentStore, this.store.form)
  }

  get events() {
    return initEvents(this.data, this.store)
  }

  get substitutedValue() {
    return getSubstitutedValue(this.data.componentStore.props, this.store)
  }

  get className() {
    return getClassName(this.data.componentStore)
  }

  get htmlAttributes() {
    return getHtmlAttributes(this.data.componentStore)
  }

  get children() {
    return getChildren(this.data, this.store)
  }
}
