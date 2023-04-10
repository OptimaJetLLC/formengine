import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {screenModel} from '../features/ui/screenModel'
import {Form} from '../features/validation'
import {ViewMode} from '../types'
import {treeFind} from '../utils'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

export class Store {
  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form = new Form(this)

  screen = new ComponentStore(screenModel.name, screenModel.type)
  viewMode: ViewMode = 'desktop'

  constructor(public props: StoreProps, public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false) {
    makeObservable(this, {
      props: observable,
      screen: observable,
      viewMode: true,
    })
  }

  get tooltipType(): string | undefined {
    return this.screen.props['tooltip']?.value ?? this.props.view.tooltips[0]
  }

  get tooltipComponent() {
    const selectedTooltipType = this.tooltipType
    if (!selectedTooltipType) return
    return this.props.view.getTooltipComponent(selectedTooltipType)
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
