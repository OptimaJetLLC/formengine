import {makeAutoObservable} from 'mobx'
import {ActionData, ActionDefinition, ActionValues} from '../features/event'
import {Language} from '../features/localization/types'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {generateUniqueName} from '../utils/generateUniqueName'
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
   * @returns the actions names array.
   */
  get actionNames(): string[] {
    return Object.keys(this.actions)
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
    delete this.actions[action.name]
    this.removeCustomActionBinding(action.name, this.componentTree.store)
  }

  /**
   * Changes the existing action to the new one, adds the action if the existing action is not found.
   * @param existingAction the existing action.
   * @param newAction the new action.
   */
  updateOrAddAction(existingAction: ActionDefinition, newAction: ActionDefinition) {
    this.actions[newAction.name] = newAction
    this.rebindActionHandlers(this.componentTree.store, existingAction.name, newAction)
    if (existingAction.name !== newAction.name) {
      delete this.actions[existingAction.name]
    }
  }

  /**
   * Clones the action.
   * @param action the action to clone.
   */
  cloneAction(action: ActionDefinition) {
    if (!this.actions) return
    const existingNames = new Set(Object.keys(this.actions))
    const data = JSON.parse(JSON.stringify(action))
    data.name = generateUniqueName(`${action.name}_`, existingNames)
    this.actions[data.name] = ActionDefinition.createFromObject(data)
  }

  private rebindActionData(actionData: ActionData, newAction: ActionDefinition) {
    actionData.name = newAction.name
    const args = actionData.args
    if (!args) return

    const newActionParamNames = new Set<string>()
    newAction.params.forEach(value => {
      typeof value === 'string' ? newActionParamNames.add(value) : newActionParamNames.add(value[0])
    })
    Object.keys(args).forEach(key => {
      if (!newActionParamNames.has(key)) delete args[key]
    })
  }

  private rebindActionHandlers(componentStore: ComponentStore, oldActionName: string, newAction: ActionDefinition) {
    const events = componentStore.events
    if (events) {
      Object.keys(events).forEach(value => {
        const bindings = events[value]
        bindings?.filter(item => item.type === 'custom' && item.name === oldActionName)
          .forEach(item => this.rebindActionData(item, newAction))
      })
    }
    componentStore.children?.forEach(item => {
      this.rebindActionHandlers(item, oldActionName, newAction)
    })
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

  private onComponentDataBeforeDelete(component: ComponentData) {
    this.localization.removeLocalization(component.key)
  }

  private onComponentDataAfterKeyChanged(_: ComponentData, {oldKey, newKey}: { oldKey: string, newKey: string }) {
    this.localization.changeComponentKey(oldKey, newKey)
  }
}
