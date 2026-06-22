import type {IFormData} from '@react-form-builder/core'

/**
 * The class for accessing the test form data.
 */
export class TestFormData implements IFormData {
  index = undefined
  state = {}
  hasErrors = false
  isValidating = false
  parentData: Record<string, unknown> = {}
  rootData: Record<string, unknown> = {}

  /**
   * Constructor
   * @param data the test form data.
   * @param errors the test form errors.
   */
  constructor(public data = {}, public errors = {}) {
  }

  /** @inheritDoc */
  clear() {
    this.data = {}
  }

  /** @inheritDoc */
  validate() {
    return Promise.resolve({})
  }

  /** @inheritDoc */
  reset() {
  }

  /** @inheritDoc */
  setAllErrors() {
  }

  /** @inheritDoc */
  getValidationResult() {
    return Promise.resolve(undefined)
  }
}
