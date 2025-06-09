import {BuilderView, define, FormViewerPropsStore, Store} from '@react-form-builder/core'
import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'

export const mockComponent = define(() => <div></div>, 'MockComponent')
  .name('Component mock')
  .category('fields')
  .build()

export const createMockStore = () => {
  return new Store(new FormViewerPropsStore(), defaultComponentStateFactory)
}

export const createMockBuilderStore = (store: Store) => {
  const component = define(() => <div></div>, 'MockComponent')
    .name('Component mock')
    .category('fields')
    .build()
  const view = new BuilderView([component])
  return new BuilderStore(store, {view})
}
