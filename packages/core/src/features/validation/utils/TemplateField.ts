import {makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import type {IStore} from '../../../stores/IStore'
import {nameObservable} from '../../../utils/observableNaming'
import type {Field} from './Field'
import {isStoreDataInParentForm} from './util'

/**
 * The field with the form data, contains the value of the nested form.
 */
export class TemplateField implements Field {

  /**
   * @inheritDoc
   */
  valued = ''

  /**
   * @inheritDoc
   */
  touched = false

  /**
   * Creates the nested form field with form data for the component.
   * @param componentStore the component settings.
   * @param viewerStore viewerStore the form viewer settings.
   */
  constructor(
    readonly componentStore: ComponentStore,
    readonly viewerStore: IStore,
  ) {
    makeAutoObservable(this, undefined,
      {name: nameObservable('FormField', {key: componentStore.key})})
  }

  /**
   * @inheritDoc
   */
  get storeDataInParentForm() {
    return isStoreDataInParentForm(this.componentStore)
  }

  /**
   * @inheritDoc
   */
  get value(): unknown {
    return this.form.data
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.viewerStore.dispose()
  }

  /**
   * @inheritDoc
   */
  clear(): void {
    this.form.clear()
    this.touched = false
  }

  /**
   * @inheritDoc
   */
  reset(): void {
    this.form.reset()
  }

  /**
   * @inheritDoc
   */
  setTouched(): void {
    this.touched = true
  }

  /**
   * @inheritDoc
   */
  setValue(value: unknown): void {
    if (!value) {
      this.form.reset()
      return
    }
    if (typeof value !== 'object') throw new Error(`Expected 'object' type, got '${typeof value}'`)

    const data: Record<string, any> = value
    this.form.fields.forEach((field, key) => {
      const val = data[key]
      // prevent uncontrolled value
      typeof val === 'undefined' ? field.reset() : field.setValue(val)
    })
  }

  /**
   * @inheritDoc
   */
  async validate() {
    await this.form.validate()
  }

  /**
   * @inheritDoc
   */
  init() {
    this.form.fields.forEach(field => field.init())
  }

  /**
   * @returns the form for the field.
   */
  get form() {
    return this.viewerStore.form.componentTree
  }
}
