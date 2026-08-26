import {BuilderView, createView, define, type FormViewerProps, FormViewerPropsStore, Store} from '@react-form-builder/core'
import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'

export const mockComponent = define(() => <div></div>, 'MockComponent')
  .name('Component mock')
  .category('fields')
  .build()

/**
 * Creates a FormViewer store for module tests.
 * @param props the FormViewer properties.
 * @returns the store.
 */
export function createViewerStore(props: FormViewerProps) {
  return new Store(new FormViewerPropsStore(props), defaultComponentStateFactory)
}

export const createMockStore = () => createViewerStore({view: createView([])})

export const createMockBuilderStore = (store: Store) => {
  const component = define(() => <div></div>, 'MockComponent')
    .name('Component mock')
    .category('fields')
    .build()
  const view = new BuilderView([component])
  return new BuilderStore(store, {view})
}
