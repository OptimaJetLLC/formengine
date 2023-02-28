import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {fbScreen} from '../features/ui/FbScreen'
import {Form} from '../features/validation'
import {treeFind} from '../utils'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

export class Store {
  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form = new Form(this)

  screen = new ComponentStore(fbScreen.name, fbScreen.type)

  constructor(public props: StoreProps, public actions: ActionDefinition[] = []) {
    makeObservable(this, {
      props: observable,
      screen: observable,
    })
  }

  getComponent(key: string) {
    const result = this.findComponent(key)

    if (!result) {
      throw Error(`Component ${key} didn't found!`)
    }

    return result
  }

  findComponent(key: string) {
    return treeFind(this.screen, key)
  }

  findAction(actionData: ActionData) {
    return findAction(this, actionData)
  }
}
