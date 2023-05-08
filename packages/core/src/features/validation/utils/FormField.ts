import {autorun, makeAutoObservable} from 'mobx'
import {FormViewerProps} from '../../form-viewer'
import {Field} from './Field'
import {Form} from './Form'

export class FormField implements Field {
  storeDataInParentForm = true
  valued: string = ''
  touched = false

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

  get value(): unknown {
    return this.form.data
  }

  clear(): void {
    this.form.clear()
    this.touched = false
  }

  reset(): void {
    this.form.reset()
  }

  setTouched(): void {
    this.touched = true
  }

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

  validate(): void {
    this.form.validate()
  }
}
