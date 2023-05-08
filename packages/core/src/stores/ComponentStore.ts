import {makeAutoObservable, observable} from 'mobx'
import {ActionData, EventName} from '../features/event'
import {HtmlAttribute} from '../features/html-attributes'
import {Css} from '../features/style/types'
import {ValidationSchema} from '../features/validation/types'

export interface ComponentProperty {
  value?: any
  useFn?: boolean
  fnSource?: string
}

//No functions here
export class ComponentStore {
  key: string = ''
  type: string = ''
  props: Record<string, ComponentProperty> = {} //TODO do nullable
  css?: Css
  events?: Record<EventName, ActionData[]>
  children?: ComponentStore[]

  schema?: ValidationSchema

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

