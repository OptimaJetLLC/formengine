import type {FormViewerProps, Store} from '@react-form-builder/core'

/**
 * Applies viewer props and copies the resulting initial state onto the component tree.
 * @param store the form viewer store.
 * @param formViewerProps the properties to apply.
 */
export function applyViewerProps(store: Store, formViewerProps: FormViewerProps) {
  store.formViewerPropsStore.applyProps(formViewerProps)
  store.form.componentTree.state = store.formViewerPropsStore.initialState
}
