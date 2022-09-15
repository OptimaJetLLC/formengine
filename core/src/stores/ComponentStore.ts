import {computed, makeAutoObservable, observable} from 'mobx'
import {EventName, WeakActionData} from '../features/event/types'
import {StyleItem} from '../features/style/types'
import {ParsableValidateSchema} from '../features/validation/types'

export class ComponentStore {
  key: string = ''
  type: string = ''
  //Bind to parent property
  bindTo?: string
  props: Record<string, any> = {}
  events?: Record<EventName, WeakActionData[]>
  //TODO styles в отдельный блок - объеденить три поля в один
  styles?: Record<string, string>
  cssStyles?: StyleItem[]
  cssBlock?: string

  //TODO rename to scheme, move to inner validation?
  validation?: ParsableValidateSchema
  //TODO add on validation page
  visible?: string

  children?: ComponentStore[]

  constructor(key: string, type: string) {
    this.key = key
    this.type = type

    makeAutoObservable(this, {
      //events: observable.deep,
      validation: observable.deep,
      props: observable.shallow,
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

