import {css, cx} from '@emotion/css'
import {assign, keysIn} from 'lodash-es'
import {makeAutoObservable} from 'mobx'
import {calculateProperties} from '../features/calculation/propertyCalculator'
import type {EventName} from '../features/event'
import {ActionEventArgs, DidMountEvent, WillUnmountEvent} from '../features/event'
import type {CssPart} from '../features/style/types'
import type {ComputeChildren} from '../utils/ComputeChildren'
import type {ComponentData} from '../utils/contexts/ComponentDataContext'
import {nameObservable} from '../utils/observableNaming'
import type {ComponentStore} from './ComponentStore'
import type {ComponentStoreLocalizer} from './ComponentStoreLocalizer'
import type {IComponentState} from './IComponentState'
import type {Store} from './Store'

const getHtmlAttributes = (componentStore: ComponentStore) => componentStore.htmlAttributes
  ?.reduce((result: Record<string, string>, {name, value}) => {
    try {
      result[name] = JSON.parse(value)
    } catch {
      result[name] = value
    }
    return result
  }, {})

const computeEvents = (data: ComponentData, store: Store, state: ComponentState) => {
  const events = {} as Record<EventName, Function>
  const hasActions = (eventName: string) => data.store.events?.[eventName]?.length
  const eventNames = new Set<string>(keysIn(data.store.events).filter(hasActions))
  eventNames.add('onChange').add('onBlur')
  eventNames.delete(DidMountEvent)
  eventNames.delete(WillUnmountEvent)
  eventNames.forEach((name) =>
    events[name] = (...args: any[]) => store.eventSubject.next(new ActionEventArgs(name, data, store, args, state.get)))

  return events
}

/**
 * Calculates all the properties of the form view component.
 */
export class ComponentState implements IComponentState {

  /**
   * Creates an instance that calculates the properties of the form viewer component.
   * @param data the data needed to display the component.
   * @param store the form viewer settings.
   * @param localizer the function to localize the properties of a component, returns a Record with localized properties.
   * @param computeChildren the function that calculates all child properties of a component.
   */
  constructor(
    readonly data: ComponentData,
    readonly store: Store,
    readonly localizer: ComponentStoreLocalizer,
    readonly computeChildren: ComputeChildren,
  ) {
    makeAutoObservable(this, undefined, {name: nameObservable('ComponentState', {key: data.key})})
  }

  /**
   * @inheritDoc
   */
  get get(): Record<string, any> {
    const propsWithoutChildren = this.propsWithoutChildren
    return Object.assign({}, propsWithoutChildren, this.className, this.children(propsWithoutChildren))
  }

  /**
   * @inheritDoc
   */
  get ownProps() {
    return {...this.propsWithoutChildren, ...this.className}
  }

  /**
   * @inheritDoc
   */
  get propsWithoutChildren(): Record<string, any> {
    const {htmlAttributes, ...calculated} = this.calculatedProps

    return Object.assign(
      {key: this.data.store.key},
      this.data.model.defaultProps,
      calculated,
      this.localizedProps,
      this.value,
      this.readOnly,
      this.events,
      htmlAttributes ?? this.htmlAttributes,
      this.data.userDefinedProps,
    )
  }

  /**
   * @returns the component's field value data, if the component can have a field value.
   */
  get value() {
    if (this.data.model.kind === 'template') return
    if (this.data.field) {
      const value = this.data.field.value ?? this.data.model.uncontrolledValue
      return {[this.data.field.valued]: value}
    }
  }

  /**
   * @returns the component's read-only flag, if the component can have a read-only flag.
   */
  get readOnly() {
    if (this.store.formViewerPropsStore.readOnly && this.data.model.readOnly) {
      return {[this.data.model.readOnly]: true}
    }
  }

  /**
   * @returns the values for all properties of the component, calculates the values of the calculated properties.
   */
  get calculatedProps() {
    const dataRootProvider = this.data.dataRootProvider ?? this.store.dataContext
    return calculateProperties(this.data.store, dataRootProvider.dataRoot)
  }

  /**
   * @returns component localized properties.
   */
  get localizedProps() {
    return this.localizer(this.data.store)
  }

  /**
   * @returns the component event handlers that send events to the event bus.
   */
  get events() {
    return computeEvents(this.data, this.store, this)
  }

  /**
   * Calculates and returns className property.
   * @returns the Record that contains the className property for the component.
   */
  get className() {
    const className = cx(
      this.propsWithoutChildren.className,
      this.getClassNameFromCssPart('css')
    )
    return {className}
  }

  /**
   * @inheritDoc
   */
  get wrapperClassName() {
    return this.getClassNameFromCssPart('wrapperCss')
  }

  /**
   * @returns all arbitrary HTML attributes of the component.
   */
  get htmlAttributes() {
    return getHtmlAttributes(this.data.store)
  }

  /**
   * Calculates and returns all child components.
   * @param props the React component properties.
   * @returns the Record that contains the child components of a component.
   */
  children(props: any) {
    return this.computeChildren(this.data, props)
  }

  private getClassNameFromCssPart(cssPart: CssPart) {
    const {model, store} = this.data
    const {viewMode} = this.store

    const cssObjectAny = assign({},
      model[cssPart]?.any?.object,
      store[cssPart]?.any?.object
    )
    const cssObjectCurrent = assign({},
      model[cssPart]?.[viewMode]?.object,
      store[cssPart]?.[viewMode]?.object
    )

    return css`
      && {
        ${cssObjectAny}
        ${cssObjectCurrent}
        ${store[cssPart]?.any?.string}
        ${store[cssPart]?.[viewMode]?.string}
      }
    `
  }
}
