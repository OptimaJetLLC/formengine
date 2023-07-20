import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {Form} from '../features/validation'
import {ViewMode} from '../types'
import {isPromise} from '../utils'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'
import {StoreProps} from './StoreProps'

/**
 * The form viewer settings.
 */
export class Store {
  readonly #props: Readonly<StoreProps>

  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form

  screen = new ComponentStore(screenModel.name, screenModel.type)
  cache = new WeakMap<ComponentStore, ComponentData>()

  viewMode: ViewMode = 'desktop'

  // todo remove isBuilderMode from Store class
  /**
   * Creates form viewer settings.
   * @param props the form viewer properties.
   * @param actions the array of action definitions.
   * @param isBuilderMode true if the form viewer is inside the form builder, false otherwise.
   * @param parentStore the form viewer settings, used in templates.
   * @param keyInParent the template component key.
   */
  constructor(props: Readonly<StoreProps>, public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false,
              public readonly parentStore?: Store, private readonly keyInParent?: string) {
    this.#props = props
    this.form = new Form(this)

    makeObservable(this, {
      screen: observable,
      viewMode: true,
    })
  }

  /**
   * @returns the type of React component used to display the tooltip.
   */
  get tooltipType(): string | undefined {
    return this.screen.props['tooltip']?.value ?? this.#props.view.tooltips[0]
  }

  /**
   * @returns the component's metadata for displaying the tooltip.
   */
  get tooltipComponent() {
    const selectedTooltipType = this.tooltipType
    if (!selectedTooltipType) return
    return this.#props.view.getTooltipComponent(selectedTooltipType)
  }

  /**
   * @returns true if these settings are used to display the pattern, false otherwise.
   */
  get isTemplateStore() {
    return !!this.parentStore
  }

  /**
   * @returns true if the template can be displayed in builder mode (e.g. with drop zones), false otherwise.
   */
  get templateBuilderMode(): boolean {
    if (!this.isTemplateStore) return this.isBuilderMode
    // if the template is inside another template, there is no builder mode
    return this.parentStore?.isBuilderMode || false
  }

  /**
   * @returns the {@link Record} with template slot settings.
   */
  get slotsContent(): Record<string, ComponentStore> | undefined {
    if (this.keyInParent && this.parentStore) {
      return this.parentStore.findComponent(this.keyInParent)?.slotsContent
    }
  }

  /**
   * Returns the component settings for the specified component key.
   * @param key the component key.
   * @returns the found component settings.
   * @throws Error if the component is not found.
   */
  getComponent(key: string) {
    const result = this.findComponent(key)

    if (!result) {
      throw Error(`Component ${key} didn't found!`)
    }

    return result
  }

  /**
   * Returns the element in the component tree of the form viewer.
   * @param value the component settings or component key.
   * @returns the element in the component tree of the form viewer.
   * @throws Error, if the component is not found in the component tree.
   */
  getComponentData(value: ComponentStore | string) {
    const store = typeof value === 'string' ? this.getComponent(value) : value
    const result = this.cache.get(store)

    if (!result) {
      throw Error(`Component data for ${store.key} didn't found!`)
    }

    return result
  }

  /**
   * Searches for and returns the component settings for the specified component key.
   * @param key the component key.
   * @returns the found component settings or undefined.
   */
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

  /**
   * Searches for an action, returns definition for the found action.
   * @param actionData the action's data.
   * @returns the action definition.
   * @throws Error, if action was not found.
   */
  findAction(actionData: ActionData) {
    return findAction(this, actionData)
  }

  /**
   * Returns the array with action definitions for the specified component.
   * @param target the component settings.
   * @returns the array with action definitions for the specified component.
   */
  getLinkedActions(target?: ComponentStore) {
    if (target) return this.#props.view.get(target.type).getActions(target)
  }

  /**
   * Loads a form by form name and sets that form in the form viewer.
   * @param getForm the function that loads the form.
   * @param formName the form name.
   */
  loadForm(getForm?: (name?: string) => ComponentStore | Promise<ComponentStore>, formName?: string) {
    if (!getForm) return

    try {
      const form = getForm(formName)
      if (isPromise<ComponentStore>(form)) {
        form
          .then(this.#applyComponentStore.bind(this))
          .catch(this.#onLoadError.bind(this))
        return
      }
      this.#applyComponentStore(form)
    } catch (e) {
      this.#onLoadError(e)
    }
  }

  /**
   * Changes the form to the component with an error description.
   * @param e the error.
   */
  #onLoadError(e: any) {
    console.error(e)
    const componentStore = buildInternalErrorStore(e)
    this.#applyComponentStore(componentStore)
  }

  /**
   * Changes the form to the specified one.
   * @param componentStore the form component settings.
   */
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
