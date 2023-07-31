import {IReactionDisposer, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {nameObservable} from '../../../utils/observableNaming'
import {FormViewerProps} from '../../form-viewer'
import {Field} from './Field'
import {Form} from './Form'

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
   * @param form the nested form.
   * @param props the form viewer React component properties.
   */
  constructor(
    readonly componentStore: ComponentStore,
    readonly form: Form,
    readonly props: FormViewerProps
  ) {
    makeAutoObservable(this, {
      form: true
    }, {name: nameObservable('FormField', {key: componentStore.key})})

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
    return this.form.data
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.#disposers.forEach(dispose => dispose())
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
    if (!(typeof value === 'object')) throw new Error(`Expected 'object' type, got ${value}`)

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
}
