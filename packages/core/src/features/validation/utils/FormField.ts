import {autorun, makeAutoObservable} from 'mobx'
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

  /**
   * Creates the nested form field with form data for the component.
   * @param key the component key.
   * @param form the nested form.
   * @param props the form viewer React component properties.
   */
  constructor(readonly key: string, readonly form: Form, readonly props: FormViewerProps) {
    makeAutoObservable(this, {
      form: true
    })

    const disposer = autorun(() => {
      const component = this.form.store.parentStore?.findComponent(this.key)
      if (!component) {
        // dispose async
        setTimeout(() => disposer(), 0)
        return
      }

      const val = component.props['storeDataInParentForm']?.value
      this.storeDataInParentForm = typeof val === 'undefined' ? true : val
      const formData = this.storeDataInParentForm ? props.data : props.data?.[this.key]
      this.setValue(formData)
    })
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
  validate(): void {
    this.form.validate()
  }
}
