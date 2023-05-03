import {ViewMode} from 'fb-core'
import {autorun, IReactionDisposer} from 'mobx'
import {getSystemTheme} from '../utils/getSystemTheme'
import {parseJson} from '../utils/parseJson'
import {BuilderTheme} from '../utils/types'
import {BuilderStore} from './BuilderStore'

export class LocalStorageSynchronizer {
  readonly #disposers: IReactionDisposer[]

  constructor(private store: BuilderStore) {
    const resolutionKey = 'resolution'
    store.viewMode = this.getItem<ViewMode>(resolutionKey, 'desktop')

    const openedPanelsKey = 'openedPanels'
    store.openedPanels = parseJson(this.getItem<string>(openedPanelsKey)) ?? ['left', 'right']

    const themeKey = 'theme'
    store.theme = this.getItem<BuilderTheme>(themeKey, getSystemTheme())

    this.#disposers = [
      autorun(() => this.setItem(resolutionKey, store.viewMode)),
      autorun(() => this.setItem(openedPanelsKey, JSON.stringify(store.openedPanels))),
      autorun(() => this.setItem(themeKey, store.theme)),
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
