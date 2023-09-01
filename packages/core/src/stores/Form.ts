import {makeAutoObservable} from 'mobx'
import {BaseActionDefinition} from '../features/event'
import {Language} from '../features/localization/types'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'
import {LocalizationStore} from './LocalizationStore'

/**
 * Represents a form that is rendered in Viewer or edited in Builder.
 */
export class Form {
  /**
   * Root component of the form.
   */
  readonly componentTree: ComponentData

  /**
   * Localization of the form.
   */
  readonly localization: LocalizationStore

  /**
   * Localization languages of the form.
   */
  readonly languages: Language[] = []

  /**
   * Default localization language of the form.
   */
  defaultLanguage: Language

  /**
   * Creates a new instance of Form.
   * @param componentTree Root component of the form.
   * @param localization Localization of the form.
   * @param languages Localization languages of the form.
   * @param defaultLanguage Default localization language of the form.
   */
  constructor(componentTree: ComponentData, localization: LocalizationStore, languages: Language[], defaultLanguage: Language) {
    this.componentTree = componentTree
    this.localization = localization
    this.languages = languages
    this.defaultLanguage = defaultLanguage

    this.componentTree.events.onBeforeDelete.subscribe(this.onComponentDataBeforeDelete.bind(this))
    this.componentTree.events.onAfterKeyChanged.subscribe(this.onComponentDataAfterKeyChanged.bind(this))

    makeAutoObservable(this)
  }

  /**
   * Initializes form fields.
   */
  initFields() {
    this.componentTree.fields.forEach(field => field.init())
  }

  /**
   * Disposes the form. Disposes all the components and localization.
   */
  dispose() {
    this.componentTree.dispose()
    this.localization.dispose()
  }

  /**
   * @returns the form actions.
   */
  get actions(): BaseActionDefinition[] | undefined {
    return this.componentTree.store.props.actions?.value
  }

  /**
   * Removes the action from the form.
   * @param action the action to remove.
   */
  removeAction(action: BaseActionDefinition) {
    if (!this.actions) return
    const index = this.actions.indexOf(action)
    if (index >= 0) this.actions.splice(index, 1)
    this.removeCustomActionBinding(action.name, this.componentTree.store)
  }

  private removeCustomActionBinding(actionName: string, componentStore: ComponentStore) {
    const events = componentStore.events
    if (events) {
      Object.keys(events).forEach(value => {
        const bindings = events[value]
        if (!bindings.length) return
        events[value] = bindings.filter(item => !(item.type === 'custom' && item.name === actionName))
      })
    }
    componentStore.children?.forEach(item => this.removeCustomActionBinding(actionName, item))
  }

  /**
   * Clones the action.
   * @param action the action to clone.
   */
  cloneAction(action: BaseActionDefinition) {
    if (!this.actions) return
    const clone = JSON.parse(JSON.stringify(action)) as BaseActionDefinition
    clone.name = Form.generateUniqueName(clone.name, this.actions)
    this.actions.push(clone)
  }

  private onComponentDataBeforeDelete(component: ComponentData) {
    this.localization.removeLocalization(component.key)
  }

  private onComponentDataAfterKeyChanged(_: ComponentData, {oldKey, newKey}: { oldKey: string, newKey: string }) {
    this.localization.changeComponentKey(oldKey, newKey)
  }

  private static generateUniqueName(prefix: string, actions: BaseActionDefinition[]) {
    const names = new Set<string>()
    actions.forEach(action => names.add(action.name))

    let i = 1
    while (i < 10_000) {
      const name = `${prefix}_${i}`
      if (!names.has(name)) return name
      i++
    }
    const time = new Date().getTime()
    return `${prefix}_${time}`
  }
}
