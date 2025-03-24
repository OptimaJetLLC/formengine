import {ComponentData} from '@react-form-builder/core'
import {createAddedComponentData} from '@react-form-builder/designer/src/features/ui/ComponentBar/addedComponentData'
import {beforeAll} from 'vitest'
import {createMockBuilderStore, mockComponent} from '../common/createMockBuilderStore'

describe(`Should init component palette components in a right way`, function () {
  let componentData: ComponentData

  beforeAll(() => {
    componentData = createAddedComponentData(mockComponent.model, createMockBuilderStore())
  })

  it('Component data should not contain field', async () => {
    expect(componentData.field).toBeUndefined()
  })
})
