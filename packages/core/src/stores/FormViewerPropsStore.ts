import {makeObservable, observable} from 'mobx'
import {View} from '../features/define'
import type {ActionValues} from '../features/event'
import type {FormViewerProps} from '../features/form-viewer'
import type {ComponentLocalizer} from '../features/form-viewer/ComponentLocalizer'
import {externalActionsToActionsValues} from '../features/form-viewer/ExternalActions'
import type {ExternalFormValidators} from '../features/form-viewer/ExternalFormValidators'
import {Language} from '../features/localization/types'
import type {ExternalValidators} from '../features/validation/types/ExternalValidationRules'
import {nameObservable} from '../utils/observableNaming'

/**
 * Represents the props passed to the FormViewer Store. **Internal use only.**
 */
export class FormViewerPropsStore {
  /**
   * The metadata of the form viewer components.
   */
  view: View = new View()
  /**
   * The initial form data.
   */
  initialData: Record<string, unknown> = {}
  /**
   * The set of metadata of external validation rules, grouped by the type of value being validated.
   */
  externalValidators?: ExternalValidators
  /**
   * The set of functions that validate the form data.
   */
  externalFormValidators?: ExternalFormValidators
  /**
   * The function to localize the properties of a component
   */
  externalLocalizer?: ComponentLocalizer
  /**
   * The set of external actions
   */
  externalActions?: ActionValues
  /**
   * The full language code passed in the FormViewer properties.
   */
  propsLanguage?: Language

  /**
   * Constructs a new FormViewerPropsStore from the given FormViewerProps.
   * @param formViewerProps the FormViewer props.
   * @returns the FormViewerPropsStore.
   */
  constructor(formViewerProps?: FormViewerProps) {
    if (formViewerProps) {
      this.applyProps(formViewerProps)
    }

    makeObservable(this, {
      view: observable.ref,
      initialData: observable.ref,
      externalValidators: observable.ref,
      externalFormValidators: observable.ref,
      externalLocalizer: observable.ref,
      externalActions: observable.ref,
      propsLanguage: observable.ref
    }, {name: nameObservable(`FormViewerPropsStore`)})
  }

  /**
   * Applies the given FormViewerProps.
   * @param formViewerProps the properties to apply.
   */
  applyProps(formViewerProps: FormViewerProps) {
    this.view = formViewerProps.view
    this.initialData = formViewerProps.initialData ?? {}
    this.externalValidators = formViewerProps.externalValidators
    this.externalFormValidators = formViewerProps.externalFormValidators
    this.externalLocalizer = formViewerProps.localize
    this.externalActions = externalActionsToActionsValues(formViewerProps.externalActions)
    this.propsLanguage = formViewerProps.language
  }

  /**
   * Returns the clone of the FormViewerPropsStore object.
   * @returns the clone of the FormViewerPropsStore object.
   */
  clone(): FormViewerPropsStore {
    const clone = new FormViewerPropsStore()
    clone.view = this.view
    clone.initialData = this.initialData
    clone.externalValidators = this.externalValidators
    clone.externalFormValidators = this.externalFormValidators
    clone.externalLocalizer = this.externalLocalizer
    clone.externalActions = this.externalActions
    clone.propsLanguage = this.propsLanguage
    return clone
  }
}
