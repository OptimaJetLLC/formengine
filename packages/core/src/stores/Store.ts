import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {Form} from '../features/validation'
import {ViewMode} from '../types'
import {treeFind} from '../utils'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

export class Store {
  readonly #props: StoreProps

  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form

  screen = new ComponentStore(screenModel.name, screenModel.type)
  viewMode: ViewMode = 'desktop'

  constructor(props: Readonly<StoreProps>, public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false) {
    this.#props = props
    this.form = new Form(this, props)

    makeObservable(this, {
      screen: observable,
      viewMode: true,
    })
  }

  get tooltipType(): string | undefined {
    return this.screen.props['tooltip']?.value ?? this.#props.view.tooltips[0]
  }

  get tooltipComponent() {
    const selectedTooltipType = this.tooltipType
    if (!selectedTooltipType) return
    return this.#props.view.getTooltipComponent(selectedTooltipType)
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

  getLinkedActions(target?: ComponentStore) {
    if (target) return this.#props.view.get(target.type).getActions(target)
  }

  loadForm(getForm?: (name?: string) => ComponentStore | Promise<ComponentStore>, formName?: string) {
    if (!getForm) return

    try {
      const form = getForm(formName)
      if (typeof (form as Promise<ComponentStore>).then === 'function') {
        (form as Promise<ComponentStore>)
          .then(this.#applyComponentStore.bind(this))
          .catch(this.#onLoadError.bind(this))
        return
      }
      this.#applyComponentStore(form as ComponentStore)
    } catch (e) {
      return this.#onLoadError(e)
    }
  }

  #onLoadError(e: any) {
    console.error(e)
    const componentStore = buildInternalErrorStore(e)
    this.#applyComponentStore(componentStore)
  }

  #applyComponentStore(componentStore: ComponentStore) {
    this.screen = assign(new ComponentStore('', ''), componentStore)
  }
}
