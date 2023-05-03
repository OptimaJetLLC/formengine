import {FormStorage} from 'form-builder'
import {autorun, IReactionDisposer, makeAutoObservable} from 'mobx'
import {kvCreateStore, kvDel, kvGet, kvKeys, kvSet} from './KeyValueStorage'

const formNameKey = 'formName'

export class IndexedDbFormStorage implements FormStorage {
  #customStore = kvCreateStore('form-builder-store', 'form-store')
  readonly #disposers: IReactionDisposer[]

  formName = IndexedDbFormStorage.getItem<string>(formNameKey)

  constructor() {
    makeAutoObservable(this)
    this.#disposers = [
      autorun(() => IndexedDbFormStorage.setItem(formNameKey, this.formName)),
    ]
  }

  destroy = () => {
    this.#disposers.forEach(disposer => disposer())
  }

  async getForm(formName: string) {
    const formValue = await kvGet(formName, this.#customStore)
    if (!formValue) throw `Cannot find form '${formName}'`
    this.formName = formName
    return formValue
  }

  getFormNames(): Promise<string[]> {
    return kvKeys(this.#customStore)
  }

  removeForm(formName: string): Promise<any> {
    return kvDel(formName, this.#customStore)
  }

  async saveForm(formName: string, formValue: string): Promise<any> {
    await kvSet(formName, formValue, this.#customStore)
    this.formName = formName
  }

  private static getItem = <T>(key: string, defaultValue?: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private static setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, value as string)
  }
}
