import {FormStorage} from './FormStorage'

/**
 * The external form storage that always returns an error.
 * Used if the external form storage is not connected to the form builder.
 */
export class AlwaysRejectFormStorage implements FormStorage {
  #reason = 'Not implemented'

  /**
   * @inheritDoc
   */
  getForm(): Promise<string> {
    return Promise.reject(this.#reason)
  }

  /**
   * @inheritDoc
   */
  getFormNames(): Promise<string[]> {
    return Promise.reject(this.#reason)
  }

  /**
   * @inheritDoc
   */
  removeForm(): Promise<any> {
    return Promise.reject(this.#reason)
  }

  /**
   * @inheritDoc
   */
  saveForm(): Promise<any> {
    return Promise.reject(this.#reason)
  }
}
