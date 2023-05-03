import {FormStorage} from './FormStorage'

export class AlwaysRejectFormStorage implements FormStorage {
  #reason = 'Not implemented'

  getForm(): Promise<string> {
    return Promise.reject(this.#reason)
  }

  getFormNames(): Promise<string[]> {
    return Promise.reject(this.#reason)
  }

  removeForm(): Promise<any> {
    return Promise.reject(this.#reason)
  }

  saveForm(): Promise<any> {
    return Promise.reject(this.#reason)
  }
}
