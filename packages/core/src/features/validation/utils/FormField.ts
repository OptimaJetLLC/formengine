import {IReactionDisposer, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import type {IStore} from '../../../stores/IStore'
import {nameObservable} from '../../../utils/observableNaming'
import type {Field} from './Field'

/**
 * The field with the form data, contains the value of the nested form.
 */
export class FormField implements Field {

  /**
   * @inheritDoc
   */
  storeDataInParentForm = true

  /**
   * @inheritDoc
   */
  valued = ''

  /**
   * @inheritDoc
   */
  touched = false
  readonly #disposers: IReactionDisposer[]

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

    this.#disposers = [
      // todo fix storeDataInParentForm
      /*autorun(() => {
        const val = componentStore.props['storeDataInParentForm']?.value
        this.storeDataInParentForm = typeof val === 'undefined' ? true : val
        const formData = this.storeDataInParentForm ? props.data : props.data?.[this.componentStore.key]
        this.setValue(formData)
      })*/
    ]
  }

  /**
   * @inheritDoc
   */
  get value(): unknown {
    return this.viewerStore.rootComponentData.data
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.#disposers.forEach(dispose => dispose())
    this.viewerStore.destroy()
  }

  /**
   * @inheritDoc
   */
  clear(): void {
    this.viewerStore.rootComponentData.clear()
    this.touched = false
  }

  /**
   * @inheritDoc
   */
  reset(): void {
    this.viewerStore.rootComponentData.reset()
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
      this.viewerStore.rootComponentData.reset()
      return
    }
    if (!(typeof value === 'object')) throw new Error(`Expected 'object' type, got ${value}`)

    const data: Record<string, any> = value
    this.viewerStore.rootComponentData.fields.forEach((field, key) => {
      const val = data[key]
      // prevent uncontrolled value
      typeof val === 'undefined' ? field.reset() : field.setValue(val)
    })
  }

  /**
   * @inheritDoc
   */
  async validate() {
    await this.viewerStore.rootComponentData.validate()
  }
}
