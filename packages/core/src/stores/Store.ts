import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {Form} from '../features/validation'
import {ViewMode} from '../types'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

export class Store {
  readonly #props: Readonly<StoreProps>

  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form

  screen = new ComponentStore(screenModel.name, screenModel.type)
  cache = new WeakMap<ComponentStore, ComponentData>()

  viewMode: ViewMode = 'desktop'

  constructor(props: Readonly<StoreProps>, public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false,
              public readonly parentStore?: Store, private readonly keyInParent?: string) {
    this.#props = props
    this.form = new Form(this)

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

  get isTemplateStore() {
    return !!this.parentStore
  }

  /**
   * Returns true if the template can be displayed in builder mode (e.g. with drop zones), false otherwise.
   */
  get templateBuilderMode(): boolean {
    if (!this.isTemplateStore) return this.isBuilderMode
    // if the template is inside another template, there is no builder mode
    return this.parentStore?.isBuilderMode || false
  }

  get slotsContent(): Record<string, ComponentStore> | undefined {
    if (this.keyInParent && this.parentStore) {
      return this.parentStore.findComponent(this.keyInParent)?.slotsContent
    }
  }

  getComponent(key: string) {
    const result = this.findComponent(key)

    if (!result) {
      throw Error(`Component ${key} didn't found!`)
    }

    return result
  }

  getComponentData(value: ComponentStore | string) {
    const store = typeof value === 'string' ? this.getComponent(value) : value
    const result = this.cache.get(store)

    if (!result) {
      throw Error(`Component data for ${store.key} didn't found!`)
    }

    return result
  }

  findComponent(key: string) {
    let result = treeFind(this.screen, key)
    if (result) return result

    const slots = this.slotsContent
    if (!slots) return

    for (const slotName in slots) {
      result = treeFind(slots[slotName], key)
      if (result) return result
    }
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

function treeFind<T extends { key: string, children?: T[] }>(value: T, key?: string): T | undefined {
  if (value.key === key) return value

  if (!value.children) return

  for (const child of value.children) {
    const childNode = treeFind(child, key)
    if (childNode) return childNode
  }

  return
}
