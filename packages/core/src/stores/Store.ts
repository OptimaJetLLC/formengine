import {makeObservable, observable} from 'mobx'
import {ActionDefinition} from '../features/event/actionDefinition'
import {fbScreen} from '../features/ui/FbScreen'
import {Form} from '../features/validation'
import {treeFind} from '../utils'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

export class Store {
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

  findAction(actionName: string, targetKey?: string) {
    const target = targetKey ? this.getComponent(targetKey) : undefined
    const actionList = target ? this.props.view.initModel(target).actions : this.actions
    const action = actionList?.find((val) => val.name === actionName)

    if (!action) {
      throw Error(`Action ${actionName} didn't found!`)
    }

    return action
  }
}
