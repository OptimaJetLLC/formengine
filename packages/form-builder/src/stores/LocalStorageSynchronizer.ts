import {nameAutorun, ViewMode} from '@react-form-builder/core'
import {autorun, IReactionDisposer} from 'mobx'
import {getSystemTheme} from '../utils/getSystemTheme'
import {parseJson} from '../utils/parseJson'
import {BuilderTheme} from '../utils/types'
import {BuilderStore} from './BuilderStore'

/**
 * Synchronizes and saves form builder settings to the browser's localStorage.
 */
export class LocalStorageSynchronizer {
  readonly #disposers: IReactionDisposer[]

  /**
   * Creates {@LocalStorageSynchronizer}.
   * @param store the form builder settings.
   */
  constructor(store: BuilderStore) {
    const resolutionKey = 'resolution'
    store.viewMode = this.getItem<ViewMode>(resolutionKey, 'desktop')

    const openedPanelsKey = 'openedPanels'
    store.openedPanels = parseJson(this.getItem<string>(openedPanelsKey)) ?? ['left', 'right']

    const themeKey = 'theme'
    store.theme = this.getItem<BuilderTheme>(themeKey, getSystemTheme())

    const className = 'LocalStorageSynchronizer'

    this.#disposers = [
      autorun(
        () => this.setItem(resolutionKey, store.viewMode),
        {name: nameAutorun(className, 'saveResolution')}
      ),
      autorun(
        () => this.setItem(openedPanelsKey, JSON.stringify(store.openedPanels)),
        {name: nameAutorun(className, 'saveOpenedPanels')}
      ),
      autorun(
        () => this.setItem(themeKey, store.theme),
        {name: nameAutorun(className, 'saveTheme')}
      ),
    ]
  }

  destroy = () => {
    this.#disposers.forEach(disposer => disposer())
  }

  private getItem = <T>(key: string, defaultValue?: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, value as string)
  }
}
