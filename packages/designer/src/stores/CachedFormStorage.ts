import type {BuilderComponent} from '@react-form-builder/core'
import {BuilderView, nameObservable} from '@react-form-builder/core'
import {makeAutoObservable} from 'mobx'
import type {IFormStorage} from './IFormStorage'

/**
 * An implementation of the IFormStorage interface that stores forms metadata in a cache.
 */
export class CachedFormStorage implements IFormStorage {
  private readonly cache = new Map<string, BuilderComponent>()

  /**
   * Constructor.
   * @param delegate IFormStorage delegate.
   */
  constructor(private readonly delegate: IFormStorage) {
    makeAutoObservable(this, undefined, {name: nameObservable('CachedFormStorage')})
  }

  /**
   * @returns the cached instances of BuilderComponent.
   */
  get builderComponents(): BuilderComponent[] {
    return [...this.cache.values()]
  }

  /**
   * @inheritDoc
   */
  async getForm(formName?: string, options?: any): Promise<string> {
    const result = await this.delegate.getForm(formName, options)
    if (formName) this.#addToCache(formName)
    return result
  }

  /**
   * @inheritDoc
   */
  async getFormNames(): Promise<string[]> {
    const result = await this.delegate.getFormNames()

    const keysToRemove = []
    for (const [key] of this.cache) {
      if (result.indexOf(key) < 0) keysToRemove.push(key)
    }
    result.forEach(formName => this.#addToCache(formName))
    keysToRemove.forEach(key => this.cache.delete(key))

    return result
  }

  /**
   * @inheritDoc
   */
  async removeForm(formName: string): Promise<any> {
    const result = await this.delegate.removeForm(formName)
    this.cache.delete(formName)
    return result
  }

  /**
   * @inheritDoc
   */
  async saveForm(formName: string, formValue: string): Promise<any> {
    const result = await this.delegate.saveForm(formName, formValue)
    this.#addToCache(formName)
    return result
  }

  /**
   * Creates and adds a new value to the cache if the key does not exist in the cache.
   * @param name the cache key.
   */
  #addToCache(name: string) {
    if (this.cache.has(name)) return
    this.cache.set(name, BuilderView.createTemplateComponent(name))
  }
}
