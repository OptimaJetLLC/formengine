import {computed, makeAutoObservable, observable} from 'mobx'
import {EventName, WeakActionData} from '../features/event/types'
import {Style} from '../features/style/types'
import {ValidationSchema} from '../features/validation/types'

export class ComponentStore {
  key: string = ''
  type: string = ''
  props: Record<string, any> = {} //TODO do nullable
  events?: Record<EventName, WeakActionData[]>
  style: Style = {} //TODO do nullable
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

