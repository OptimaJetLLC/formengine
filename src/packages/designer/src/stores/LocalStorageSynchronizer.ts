import type {BuilderTheme, ViewMode} from '@react-form-builder/core'
import {isUndefined, nameAutorun} from '@react-form-builder/core'
import type {IReactionDisposer} from 'mobx'
import {autorun} from 'mobx'
import type {FormBuilderProps} from '../FormBuilderProps'
import {getSystemTheme} from '../utils/getSystemTheme'
import {parseJson} from '../utils/parseJson'
import type {BuilderStore} from './BuilderStore'
import {defaultBottomPanelHeight, defaultOpenedPanels, defaultViewMode} from './constants'

/**
 * Synchronizes and saves form builder settings to the browser's localStorage.
 */
export class LocalStorageSynchronizer {
  readonly #disposers: IReactionDisposer[]

  /**
   * Creates {@LocalStorageSynchronizer}.
   * @param builderStore the form builder settings.
   * @param builderProps the form builder props.
   */
  constructor(builderStore: BuilderStore, builderProps: FormBuilderProps) {
    const resolutionKey = 'resolution'
    builderStore.viewMode = this.getItem<ViewMode>(resolutionKey, defaultViewMode)

    const openedPanelsKey = 'openedPanels'
    builderStore.openedPanels = parseJson(this.getItem<string>(openedPanelsKey)) ?? defaultOpenedPanels

    const bottomPanelHeightKey = 'bottomPanelHeight'
    builderStore.bottomPanelHeight = parseJson(this.getItem<string>(bottomPanelHeightKey)) ?? defaultBottomPanelHeight

    const themeKey = 'theme'
    builderStore.theme = this.getItem<BuilderTheme>(themeKey, getSystemTheme()) === 'dark' ? 'dark' : 'light'

    const testingAutorunKey = 'testingAutorun'
    builderStore.testingAutorun = this.getItem<string>(testingAutorunKey) === 'true'

    const className = 'LocalStorageSynchronizer'

    const formNameKey = 'formName'
    if (builderProps.persistFormName !== false) {
      const formName = this.getItem<string>(formNameKey)
      if (formName) builderStore.activeFormName = formName
    }

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
      )
    ]

    if (builderProps.persistFormName !== false) {
      this.#disposers.push(autorun(
        () => this.updateItem(formNameKey, builderStore.activeFormName),
        {name: nameAutorun(className, 'saveFormName')}
      ))
    }
  }

  /**
   * Releases allocated resources, must be used when destroying an object instance.
   */
  dispose = () => {
    this.#disposers.forEach(disposer => disposer())
  }

  private getItem = <T>(key: string, defaultValue?: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private updateItem = <T>(key: string, value: T) => {
    if (isUndefined(value)) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, value as string)
  }
}
