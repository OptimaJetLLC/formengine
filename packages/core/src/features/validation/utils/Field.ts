import {makeAutoObservable} from 'mobx'
import * as yup from 'yup'
import {Form} from './Form'

export class Field {
  schema?: yup.AnySchema
  error?: string
  touched = false
  value: unknown = undefined
  initialValue: unknown = null

  constructor(
    readonly form: Form,
  ) {
    makeAutoObservable(this)
  }

  setValue(value: unknown) {
    this.value = value
    this.validate()
  }

  setTouched() {
    this.touched = true
  }

  validate() {
    this.schema?.validate(this.value)
      .then(value => {
        return this.error = undefined
      })
      .catch(reason => {
        return this.error = reason.errors[0]
      })
  }

  reset() {
    this.value = this.initialValue ?? this.schema?.getDefault()
  }

  clear() {
    //TODO typed clear value
    this.value = ''
    this.touched = false
    this.error = undefined
  }
}
