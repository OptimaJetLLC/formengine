import {makeAutoObservable} from 'mobx'
import {ActionDefinition, ActionValues} from '../features/event'
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

  readonly actions: ActionValues

  /**
   * Default localization language of the form.
   */
  defaultLanguage: Language

  /**
   * Creates a new instance of Form.
   * @param componentTree the root component of the form.
   * @param localization the localization of the form.
   * @param actions the form custom actions.
   * @param languages the localization languages of the form.
   * @param defaultLanguage the default localization language of the form.
   */
  constructor(componentTree: ComponentData, localization: LocalizationStore, actions: ActionValues,
              languages: Language[], defaultLanguage: Language) {
    this.componentTree = componentTree
    this.localization = localization
    this.actions = actions
    this.languages = languages
    this.defaultLanguage = defaultLanguage

    this.componentTree.events.onBeforeDelete.subscribe(this.onComponentDataBeforeDelete.bind(this))
    this.componentTree.events.onAfterKeyChanged.subscribe(this.onComponentDataAfterKeyChanged.bind(this))

    makeAutoObservable(this)
  }

  /**
   * @returns the array of action definitions.
   */
  get actionsList(): ActionDefinition[] {
    return Object.values(this.actions)
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
   * Removes the action from the form.
   * @param action the action to remove.
   */
  removeAction(action: ActionDefinition) {
    if (!this.actions) return
    delete this.actions[action.name]
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
  cloneAction(action: ActionDefinition) {
    if (!this.actions) return
    const existingNames = new Set(Object.keys(this.actions))
    const newName = Form.generateUniqueName(action.name, existingNames)
    this.actions[newName] = ActionDefinition.sourceAction(newName, action.body || '', [...action.params], action.description)
  }

  /**
   * Applies the given action to the actions object.
   * @param action the ActionDefinition object to apply.
   */
  applyAction(action: any) {
    const newAction = ActionDefinition.sourceAction(action.name, action.body, [...action.params], action.description)
    this.actions[newAction.name] = newAction
  }

  private onComponentDataBeforeDelete(component: ComponentData) {
    this.localization.removeLocalization(component.key)
  }

  private onComponentDataAfterKeyChanged(_: ComponentData, {oldKey, newKey}: { oldKey: string, newKey: string }) {
    this.localization.changeComponentKey(oldKey, newKey)
  }

  private static generateUniqueName(prefix: string, existingNames: Set<string>) {
    let i = 1
    while (i < 10_000) {
      const name = `${prefix}_${i}`
      if (!existingNames.has(name)) return name
      i++
    }
    const time = new Date().getTime()
    return `${prefix}_${time}`
  }
}
