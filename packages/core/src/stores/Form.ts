import {makeAutoObservable} from 'mobx'
import {Language} from '../features/localization/types'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
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
   * Disposes the form. Disposes all the components and localization.
   */
  dispose() {
    this.componentTree.dispose()
    this.localization.dispose()
  }

  private onComponentDataBeforeDelete(component: ComponentData) {
    this.localization.removeLocalization(component.key)
  }

  private onComponentDataAfterKeyChanged(_: ComponentData, {oldKey, newKey}: { oldKey: string, newKey: string }) {
    this.localization.changeComponentKey(oldKey, newKey)
  }
}
