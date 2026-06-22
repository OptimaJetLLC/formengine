import {ComponentData} from '@react-form-builder/core'
import {createAddedComponentData} from '@react-form-builder/designer'
import {beforeAll} from 'vitest'
import {createMockBuilderStore, createMockStore, mockComponent} from '../common/createMockBuilderStore'

describe(`Should init component palette components in a right way`, function () {
  let componentData: ComponentData

  beforeAll(() => {
    const store = createMockStore()
    componentData = createAddedComponentData(mockComponent.model, createMockBuilderStore(store), store)
  })

  it('Component data should not contain field', async () => {
    expect(componentData.field).toBeUndefined()
  })
})
