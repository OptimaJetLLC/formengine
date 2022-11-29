import {computed, makeAutoObservable, observable} from 'mobx'
import {EventName, WeakActionData} from '../features/event/types'
import {Style} from '../features/style/types'
import {ParsableValidateSchema} from '../features/validation/types'

export type Props = Record<string, any>

export class ComponentStore {
  key: string = ''
  type: string = ''
  props: Record<string, any> = {}
  events?: Record<EventName, WeakActionData[]>
  style: Style = {}
  children?: ComponentStore[]

  //Bind to parent property
  bindTo?: string
  //TODO rename to scheme, move to inner validation?
  validation?: ParsableValidateSchema
  //TODO add on validation page
  visible?: string


  constructor(key: string, type: string) {
    this.key = key
    this.type = type

    makeAutoObservable(this, {
      //events: observable.deep,
      validation: observable.deep,
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

