import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {beforeAll} from 'vitest'
import {createMockBuilderStore, createMockStore} from '../common/createMockBuilderStore'
import orderedFields from '../data/ordered-fields.json'

const initialOrder = ['1', '2', '3', '4', 'drop']

describe(`The order of the multiple moved components,
should match their previous position in the form, not the order of selection`, function () {
  let builderStore: BuilderStore
  const componentTree = () => builderStore.viewer.form.componentTree
  const childrenOrder = (parentKey = 'Screen') => (componentTree().findByKey(parentKey)?.children ?? [])
    .map(({key}) => key)
  const dropTarget = () => componentTree().findByKey('drop')
  const select = (order: string[]) => {
    builderStore.selected.clear()
    order.forEach(key => {
      const node = componentTree().findByKey(key)
      if (!node) {
        console.log(builderStore.formAsString)
        throw new Error(`Node with key ${key} not found`)
      }
      builderStore.selectNode(node, true)
    })
  }

  beforeAll(() => {
    const store = createMockStore()
    builderStore = createMockBuilderStore(store)
    builderStore.parseForm(JSON.stringify(orderedFields))
    expect(childrenOrder()).toEqual(initialOrder)
  })

  it('when it is inserted after the target', () => {
    select(['3', '1', '4', '2'])
    builderStore.multipleMove(dropTarget()!, 'after')

    expect(childrenOrder()).toEqual(['drop', '1', '2', '3', '4'])
  })

  it('when it is inserted before the target', () => {
    select(['3', '4', '2'])
    builderStore.multipleMove(dropTarget()!, 'before')

    expect(childrenOrder()).toEqual(['2', '3', '4', 'drop', '1'])
  })

  it('when it is inserted into the target', () => {
    select(['3', '4', '2'])
    builderStore.multipleMove(dropTarget()!, 'inner')

    expect(childrenOrder('drop')).toEqual(['2', '3', '4'])
  })
})
