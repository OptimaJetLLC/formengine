import {computed, makeAutoObservable, observable} from 'mobx'
import {EventName, WeakActionData} from '../features/event/types'
import {HtmlAttribute} from '../features/html-attributes'
import {Styles} from '../features/style/types'
import {ValidationSchema} from '../features/validation/types'

export interface ComponentProperty {
  value?: any
  useFn?: boolean
  fnSource?: string
}

export class ComponentStore {
  key: string = ''
  type: string = ''
  props: Record<string, ComponentProperty> = {} //TODO do nullable
  events?: Record<EventName, WeakActionData[]>
  styles?: Styles
  htmlAttributes?: HtmlAttribute[]
  children?: ComponentStore[]

  schema?: ValidationSchema

  /*rules = {
    visible: [],
    enabled: [],
  }*/

  //Bind to parent property
  bindTo?: string
  //TODO add on validation page
  visible?: string

  constructor(key: string, type: string) {
    this.key = key
    this.type = type

    makeAutoObservable(this, {
      //events: observable.deep,
      schema: observable.deep,
      props: observable.deep,
      isRoot: computed,
      isContainer: computed,
    })
  }

  get isRoot() {
    return this.type === 'Screen'
  }

  get isContainer() {
    return !!this.children
  }
}

