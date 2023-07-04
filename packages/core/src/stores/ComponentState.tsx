import {css, cx} from '@emotion/css'
import {assign, keysIn} from 'lodash-es'
import {makeAutoObservable} from 'mobx'
import {ComponentType} from 'react'
import {calculateProperties} from '../features/calculation/propertyCalculator'
import {ActionEventArgs, DidMountEvent, EventName, WillUnmountEvent} from '../features/event'
import {OverrideRef} from '../features/ui/OverridesContext'
import {ViewMode} from '../types'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {getChildren} from '../utils/getChildren'
import {ComponentProperty, ComponentStore} from './ComponentStore'
import {Store} from './Store'

const computeClassName = (state: ComponentState, data: ComponentData, viewMode: ViewMode) => {
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

const getHtmlAttributes = (componentStore: ComponentStore) => componentStore.htmlAttributes
  ?.reduce((result: Record<string, string>, {name, value}) => {
    try {
      result[name] = JSON.parse(value)
    } catch {
      result[name] = value
    }
    return result
  }, {})

const getSubstitutedValue = (props: Record<string, ComponentProperty>, store: Store) => {
  const result: Record<string, any> = {}

  for (const key in props) {
    const value = props[key]?.value

    if (props[key]?.useFn || typeof value !== 'string' || key === 'value') continue
    //if (store.isBuilderMode) continue

    result[key] = substitute(value, store.form.data)
  }

  return result

  function substitute(value: string, values: any) {
    return value.replace(/{([\w ]+)}/g, (match, replaceable) => {
      return values[replaceable] ? values[replaceable] : match
    })
  }
}

const computeEvents = (data: ComponentData, store: Store) => {
  const events = {} as Record<EventName, Function>

  const eventNames = new Set(keysIn(data.store.events))
  eventNames.add('onChange').add('onBlur')
  eventNames.delete(DidMountEvent)
  eventNames.delete(WillUnmountEvent)
  eventNames.forEach((name) =>
    events[name] = (...args: any[]) => store.eventSubject.next(new ActionEventArgs(name, data, store, args)))

  return events
}

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
