import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {calculatePropertyValue} from '../../calculation/propertyCalculator'
import {Model} from '../../define'
import {FormViewerProps} from '../../form-viewer'
import {getTemplateName, templateTypeNamePrefix} from '../../ui/templateModel'
import {Form} from './Form'
import {FormField} from './FormField'
import {SimpleField} from './SimpleField'

function updateFnValue(form: Form) {
  return function (component: ComponentStore, key: string): [boolean, any?] {
    const property = component.props[key]
    if (property && property.useFn) {
      const value = calculatePropertyValue(property, form)
      return [true, value]
    }
    return [false]
  }
}

function createFormField(cs: ComponentStore, model: Model, store: Store, viewerProps: Readonly<FormViewerProps>) {
  if (!model.type.startsWith(templateTypeNamePrefix)) {
    return new SimpleField(store, viewerProps, cs, model, updateFnValue(store.form))
  }

  const formViewerProps = {
    event: viewerProps.event,
    getForm: viewerProps.getForm,
    formName: getTemplateName(model.type),
    view: viewerProps.view,
    actions: viewerProps.actions,
    data: viewerProps.data,
    erroneous: viewerProps.erroneous,
    slotWrapper: viewerProps.slotWrapper,
    viewMode: viewerProps.viewMode
  } as FormViewerProps

  const childStore = new Store(formViewerProps, store.actions, false, store, cs.key)
  return new FormField(cs, childStore.form, formViewerProps)
}

/**
 * Creates form data field for a component.
 * @param componentStore the component settings.
 * @param store the form viewer settings.
 * @param props the form viewer React component properties.
 * @returns initialized form data field.
 */
export function createField(componentStore: ComponentStore, store: Store, props: Readonly<FormViewerProps>) {
  const model = props.view.get(componentStore.type)
  if (model.valued) return createFormField(componentStore, model, store, props)
}
