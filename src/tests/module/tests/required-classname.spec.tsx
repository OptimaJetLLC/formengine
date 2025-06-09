import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {createView, FormViewerPropsStore, Store} from '@react-form-builder/core'
import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
import form from '../data/required-classname.json'

describe(`The required className`, function () {
  it('should be added to components with required validation', () => {
    const components = rSuiteComponents.map(definer => definer.build().model)
    const view = createView(components)
    const store = new Store(new FormViewerPropsStore({view}), defaultComponentStateFactory)

    store.applyStringForm(JSON.stringify(form))
    const component = store.form.componentTree.findByKey('input')
    const className = component?.componentState.get.className as string

    expect(className.includes('required')).toBeTruthy()
  })
})
