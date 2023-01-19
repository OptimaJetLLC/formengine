import {autorun, IReactionDisposer} from 'mobx'
import {BuilderViewMode, Store} from './Store'

export class LocalStorageSynchronizer {
  readonly #disposer: IReactionDisposer

  constructor(private store: Store) {
    const resolutionKey = 'resolution'
    store.viewMode = this.getItem<BuilderViewMode>(resolutionKey, 'desktop')
    this.#disposer = autorun(() => this.setItem(resolutionKey, store.viewMode))
  }

  destroy = () => {
    this.#disposer()
  }

  private getItem = <T>(key: string, defaultValue: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, value as string)
  }
}
