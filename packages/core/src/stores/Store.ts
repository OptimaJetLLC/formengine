import {makeObservable, observable} from 'mobx'
import {FunctionComponent} from 'react'
import {clear, log, reset, setProperty, validate} from '../features/event/actions'
import {ActionDefinition} from '../features/event/types'
import {EventBus} from '../features/event/utils/EventBus'
import {FormViewerProps} from '../features/form-viewer/FormViewer'
import {fbScreen} from '../features/ui/FbScreen'
import {Form} from '../features/validation'
import {treeFind} from '../utils'
import {WrapperProps} from '../utils/types'
import {ComponentStore} from './ComponentStore'

export class Store {
  readonly eventBus = new EventBus()
  readonly form = new Form(this)
  isBuilderMode: boolean = false

  actions: ActionDefinition[] = [setProperty, log, validate, reset, clear]
  screen = new ComponentStore(fbScreen.name, fbScreen.type)
  Wrapper?: FunctionComponent<WrapperProps>

  constructor(public props: FormViewerProps) {
    makeObservable(this, {
      props: observable,
      screen: observable,
      Wrapper: observable.ref,
      isBuilderMode: true,
    })
  }

  findComponent(key: string) {
    const result = treeFind(this.screen, key)

    if (!result) {
      throw Error(`Component ${key} didn't found!`)
    }

    return result
  }

  findAction(actionName: string, targetKey?: string) {
    const target = targetKey ? this.findComponent(targetKey) : undefined
    const actionList = target ? this.props.view.initModel(target).actions : this.actions
    const action = actionList?.find((val) => val.name === actionName)

    if (!action) {
      throw Error(`Action ${actionName} didn't found!`)
    }

    return action
  }
}
