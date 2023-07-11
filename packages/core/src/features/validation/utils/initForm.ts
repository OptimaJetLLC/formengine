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

function createFormField(key: string, model: Model, store: Store, viewerProps: Readonly<FormViewerProps>) {
  if (!model.type.startsWith(templateTypeNamePrefix)) {
    return new SimpleField(store, viewerProps, key, model, updateFnValue(store.form))
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

  const childStore = new Store(formViewerProps, store.actions, false, store, key)
  return new FormField(key, childStore.form, formViewerProps)
}

/**
 * Creates form data for a component.
 * @param componentStores the array of component settings.
 * @param store the form viewer settings.
 * @param props the form viewer React component properties.
 */
export function initForm(componentStores: ComponentStore[], store: Store, props: Readonly<FormViewerProps>) {
  componentStores.forEach(componentStore => {
    const model = props.view.get(componentStore.type)
    if (!model.valued) return

    let field = store.form.fields.get(componentStore.key)
    if (!field) {
      field = createFormField(componentStore.key, model, store, props)
      store.form.fields.set(componentStore.key, field)
    }
  })
}
