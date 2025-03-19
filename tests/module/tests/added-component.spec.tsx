import {
    BuilderView,
    ComponentData,
    define,
    FormViewerPropsStore,
    Store
} from '@react-form-builder/core'
import {
    defaultComponentStateFactory
} from "@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider";
import {createAddedComponentData} from '@react-form-builder/designer/src/features/ui/ComponentBar/addedComponentData'
import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {beforeAll} from 'vitest'


describe(`Should init component palette components in a right way`, function () {
    let componentData: ComponentData

    beforeAll(() => {
        const store = new Store(new FormViewerPropsStore(), defaultComponentStateFactory)
        const component = define(() => <div></div>, 'MockComponent').name('Component mock').category('fields').build()
        const view = new BuilderView([component])
        const builderStore = new BuilderStore(store, {view})

        componentData = createAddedComponentData(component.model, builderStore)
    })

    it('Component data should not contain field', async () => {
        expect(componentData.field).toBeUndefined()
    })
})
