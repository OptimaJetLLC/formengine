import {nameAutorun, ViewMode} from '@react-form-builder/core'
import {autorun, IReactionDisposer} from 'mobx'
import {getSystemTheme} from '../utils/getSystemTheme'
import {parseJson} from '../utils/parseJson'
import type {BuilderTheme} from '../utils/types'
import {BuilderStore} from './BuilderStore'
import {defaultBottomPanelHeight, defaultOpenedPanels, defaultViewMode} from './constants'

/**
 * Synchronizes and saves form builder settings to the browser's localStorage.
 */
export class LocalStorageSynchronizer {
  readonly #disposers: IReactionDisposer[]

  /**
   * Creates {@LocalStorageSynchronizer}.
   * @param builderStore the form builder settings.
   */
  constructor(builderStore: BuilderStore) {
    const resolutionKey = 'resolution'
    builderStore.viewMode = this.getItem<ViewMode>(resolutionKey, defaultViewMode)

    const openedPanelsKey = 'openedPanels'
    builderStore.openedPanels = parseJson(this.getItem<string>(openedPanelsKey)) ?? defaultOpenedPanels

    const bottomPanelHeightKey = 'bottomPanelHeight'
    builderStore.bottomPanelHeight = parseJson(this.getItem<string>(bottomPanelHeightKey)) ?? defaultBottomPanelHeight

    const themeKey = 'theme'
    builderStore.theme = this.getItem<BuilderTheme>(themeKey, getSystemTheme())

    const testingAutorunKey = 'testingAutorun'
    builderStore.testingAutorun = this.getItem<string>(testingAutorunKey) === 'true'

    const className = 'LocalStorageSynchronizer'

    const formNameKey = 'formName'
    const formName = this.getItem<string>(formNameKey)
    if (formName) builderStore.activeFormName = formName

    const i18nextLngKey = 'i18nextLng'
    const i18nextLng = this.getItem<string>(i18nextLngKey)
    if (i18nextLng) {
      const i18nextLang = builderStore.availableLanguages.find(l => l.fullCode === i18nextLng)
      builderStore.changeLanguage(i18nextLang ?? builderStore.defaultLanguage)
    }

    this.#disposers = [
      autorun(
        () => this.updateItem(resolutionKey, builderStore.viewMode),
        {name: nameAutorun(className, 'saveResolution')}
      ),
      autorun(
        () => this.updateItem(openedPanelsKey, JSON.stringify(builderStore.openedPanels)),
        {name: nameAutorun(className, 'saveOpenedPanels')}
      ),
      autorun(
        () => this.updateItem(bottomPanelHeightKey, builderStore.bottomPanelHeight),
        {name: nameAutorun(className, 'saveBottomPanelHeight')}
      ),
      autorun(
        () => this.updateItem(themeKey, builderStore.theme),
        {name: nameAutorun(className, 'saveTheme')}
      ),
      autorun(
        () => this.updateItem(testingAutorunKey, builderStore.testingAutorun),
        {name: nameAutorun(className, 'saveTestingAutorunSetting')}
      ),
      autorun(
        () => this.updateItem(formNameKey, builderStore.activeFormName),
        {name: nameAutorun(className, 'saveFormName')}
      ),
    ]
  }

  dispose = () => {
    this.#disposers.forEach(disposer => disposer())
  }

  private getItem = <T>(key: string, defaultValue?: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private updateItem = <T>(key: string, value: T) => {
    if (typeof value === 'undefined') {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, value as string)
  }
}
