import {assign} from 'lodash-es'
import {makeAutoObservable} from 'mobx'
import {KeySymbol} from '../consts'
import {ActionData, EventName} from '../features/event'
import {Css} from '../features/style/types'
import type {BoundValueSchema} from '../features/validation'
import {nameObservable} from '../utils/observableNaming'

let actionDataCounter = 0

function initActionDataKey(actionData: ActionData) {
  if (actionData[KeySymbol]) return
  ++actionDataCounter
  actionData[KeySymbol] = `actionData_${actionDataCounter}`
}

function initActionDataKeys(componentStore: ComponentStore) {
  const events = componentStore.events
  if (events) {
    Object.values(events)
      .forEach(data => data.forEach(initActionDataKey))
  }
  componentStore.children?.forEach(initActionDataKeys)
}

/**
 * The component property value type.
 */
export type ComponentPropertyComputeType = 'function' | 'localization'

/**
 * The value of the component property.
 */
export interface ComponentProperty {
  value?: any
  fnSource?: string
  computeType?: ComponentPropertyComputeType
}

/**
 * Returns true if the property value is calculated by the function, otherwise false.
 * @param componentProperty the component property.
 * @returns true if the property value is calculated by the function, otherwise false.
 */
export function isFunctionalProperty(componentProperty?: ComponentProperty) {
  return componentProperty?.computeType === 'function'
}

/**
 * Returns true if the property value is localized, otherwise false.
 * @param componentProperty the component property.
 * @returns true if the property value is localized, otherwise false.
 */
export function isLocalizedProperty(componentProperty?: ComponentProperty) {
  return componentProperty?.computeType === 'localization'
}

/**
 * The arbitrary HTML attributes for the component.
 */
export type HtmlAttribute = Record<string, string>

//No functions here
// todo rename to ComponentSettings?
/**
 * Component settings for serialization in JSON.
 */
export class ComponentStore {

  /**
   * The React component key.
   */
  key = ''

  /**
   * The component type of the form viewer.
   */
  type = ''

  /**
   * The component properties.
   */
  props: Record<string, ComponentProperty> = {} //TODO do nullable

  /**
   * The component CSS styles.
   */
  css?: Css

  /**
   * The set of event handlers.
   */
  events?: Record<EventName, ActionData[]>

  /**
   * The array of child components.
   */
  children?: ComponentStore[]

  /**
   * The component value validation settings.
   */
  schema?: BoundValueSchema

  /**
   * The set of arbitrary HTML attributes added to the component.
   */
  htmlAttributes?: HtmlAttribute[]

  /**
   * The tooltip settings.
   */
  tooltipProps?: Record<string, ComponentProperty>

  /**
   * The name of the occupied component property in the parent component.
   */
  slot?: string

  /**
   * The condition for binding a child element to a parent element.
   */
  bindCondition?: string

  /**
   * The expression or function to conditionally render a component.
   */
  renderWhen?: ComponentProperty

  /**
   * Creates the component settings.
   * @param key the React component key.
   * @param type the component type of the form viewer.
   */
  constructor(key: string, type: string) {
    this.key = key
    this.type = type
    makeAutoObservable(this, undefined, {name: nameObservable('ComponentStore', {key: key})})
  }

  /**
   * Correctly creates the {@link ComponentStore} from deserialized data.
   * @param value the deserialized data.
   * @returns the component Store.
   */
  static createFromObject(value: any) {
    const result = assign(new ComponentStore(value.key, value.type), value)
    initActionDataKeys(result)
    return result
  }

  /**
   * Adds the event handler for component.
   * @param store the target {@link ComponentStore}.
   * @param eventName the target event name.
   * @param data the {@link ActionData}.
   * @internal
   */
  static addEventHandler(store: ComponentStore, eventName: string, data: ActionData) {
    initActionDataKey(data)
    store.events ??= {}
    store.events[eventName] ??= []
    store.events[eventName].push(data)
  }
}
