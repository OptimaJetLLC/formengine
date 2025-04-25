import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, ComponentData, FormViewerPropsStore, Store} from '@react-form-builder/core'
import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
import {createAddedComponentData} from '@react-form-builder/designer/src/stores/AvailableComponents'
import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {beforeAll} from 'vitest'
import dropField from '../data/drop-field.json'
import fieldsForPreset from '../data/fields-for-preset.json'

describe(`The order of components from preset component,
should match their previous position in the form, not the order of selection`, function () {
  let builderStore: BuilderStore
  let componentData: ComponentData

  const getComponentTree = () => builderStore.viewer.form.componentTree

  const getChildrenOrder = (parentKey = 'Screen') => (getComponentTree().findByKey(parentKey)?.children ?? [])
    .map(({model}) => model.type)

  const find = (key: string) => {
    const node = getComponentTree().findByKey(key)
    if (!node) {
      console.log(builderStore.formAsString)
      throw new Error(`Node with key ${key} not found`)
    }
    return node
  }

  const getDropTarget = () => find('drop')

  const select = (order: string[]) => {
    builderStore.selected.clear()
    order.map(find)
      .forEach(node => builderStore.selectNode(node, true))
  }

  beforeAll(() => {
    const components = rSuiteComponents.map(definer => definer.build())
    const view = new BuilderView(components)
    const store = new Store(new FormViewerPropsStore({view}), defaultComponentStateFactory)
    builderStore = new BuilderStore(store, {view})
    builderStore.parseForm(JSON.stringify(fieldsForPreset))
    select(['3', '1', '2'])
    builderStore.createPresetComponentFromSelected('TestPreset', 'fields')

    const model = builderStore.builderComponents
      .find(({model}) => model.name === 'TestPreset')?.model

    if (!model) throw new Error('Preset not found')
    componentData = createAddedComponentData(model, builderStore, store)
  })

  beforeEach(() => {
    builderStore.parseForm(JSON.stringify(dropField))
  })

  it('when it is inserted after the target', () => {
    builderStore.add(componentData, getDropTarget(), 'after')
    expect(getChildrenOrder()).toEqual(['RsContainer', 'RsInput', 'RsDropdown', 'RsCheckbox'])
  })

  it('when it is inserted before the target', () => {
    builderStore.add(componentData, getDropTarget(), 'before')
    expect(getChildrenOrder()).toEqual(['RsInput', 'RsDropdown', 'RsCheckbox', 'RsContainer'])
  })

  it('when it is inserted into the target', () => {
    builderStore.add(componentData, getDropTarget(), 'inner')
    expect(getChildrenOrder()).toEqual(['RsContainer'])
    expect(getChildrenOrder('drop')).toEqual(['RsInput', 'RsDropdown', 'RsCheckbox'])
  })
})
