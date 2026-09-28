import type {BuilderMode} from '@react-form-builder/core'
import {nameObservable} from '@react-form-builder/core'
import {makeAutoObservable} from 'mobx'
import type {IFormBuilder} from '../utils/types'
import type {BuilderStore} from './BuilderStore'

/**
 * Form builder settings.
 */
export class FormBuilderImpl implements IFormBuilder {
  /**
   * Creates a new instance of the FormBuilderImpl.
   * @param builderStore the builder store.
   */
  constructor(private builderStore: BuilderStore) {
    makeAutoObservable(this, undefined, {name: nameObservable('FormBuilder')})
  }

  /**
   * @inheritDoc
   */
  get builderMode() {
    return this.builderStore.builderMode
  }

  /**
   * @inheritDoc
   */
  set builderMode(mode: BuilderMode) {
    this.builderStore.builderMode = mode
  }

  /**
   * @inheritDoc
   */
  get formAsString() {
    return this.builderStore.formAsString
  }

  /**
   * @inheritDoc
   */
  parseForm(text: string) {
    this.builderStore.parseForm(text)
  }

  /**
   * @inheritDoc
   */
  reloadFormList() {
    this.builderStore.reloadFormList()
  }
}
