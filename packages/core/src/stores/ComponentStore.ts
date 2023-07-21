import {makeAutoObservable, observable} from 'mobx'
import {ActionData, EventName} from '../features/event'
import {Css} from '../features/style/types'
import type {BoundValueSchema} from '../features/validation'

/**
 * The value of the component property.
 */
export interface ComponentProperty {
  value?: any
  useFn?: boolean
  fnSource?: string
  useFluentLocalization?: boolean
}

/**
 * The Arbitrary HTML attributes for the component.
 */
export type HtmlAttribute = Record<string, string>

//No functions here
// todo rename to ComponentSettings?
/**
 * Component settings for serialization in JSON.
 */
export class ComponentStore {
  key = ''
  type = ''
  props: Record<string, ComponentProperty> = {} //TODO do nullable
  css?: Css
  events?: Record<EventName, ActionData[]>
  children?: ComponentStore[]
  slotsContent?: Record<string, ComponentStore>

  schema?: BoundValueSchema

  htmlAttributes?: HtmlAttribute[]
  tooltipProps?: Record<string, ComponentProperty>

  /*rules = {
    visible: [],
    enabled: [],
  }*/

  //Bind to parent property
  bindTo?: string
  bindCondition?: string
  //TODO add on validation page
  renderWhen?: ComponentProperty

  /**
   * Creates the component settings.
   * @param key the React component key.
   * @param type the component type of the form viewer.
   */
  constructor(key: string, type: string) {
    this.key = key
    this.type = type

    makeAutoObservable(this, {
      //events: observable.deep,
      tooltipProps: observable.deep,
      schema: observable.deep,
      props: observable.deep,
      children: observable,
    })
  }
}

