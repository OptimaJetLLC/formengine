import {autorun} from 'mobx'
import {createMockStore} from '../common/createMockBuilderStore'

describe('ComponentData user-defined properties', () => {
  it('publishes an initialized property bag without an intermediate empty value', () => {
    const store = createMockStore()
    const componentData = store.formData
    const snapshots: Array<Record<string, unknown> | undefined> = []
    const stop = autorun(() => {
      snapshots.push(componentData.userDefinedProps ? {...componentData.userDefinedProps} : undefined)
    })

    try {
      componentData.setUserDefinedProp('activeKey', 'second')

      expect(snapshots).toEqual([undefined, {activeKey: 'second'}])
    } finally {
      stop()
      store.dispose()
    }
  })

  it('updates one property while preserving unrelated overrides', () => {
    const store = createMockStore()
    const componentData = store.formData

    try {
      componentData.setUserDefinedProp('caption', 'Keep this caption')
      componentData.setUserDefinedProp('activeKey', 'first')
      componentData.setUserDefinedProp('activeKey', 'second')
      componentData.setUserDefinedProp('disabled', false)
      componentData.setUserDefinedProp('count', 0)
      componentData.setUserDefinedProp('optional', undefined)

      expect(componentData.userDefinedProps).toEqual({
        caption: 'Keep this caption',
        activeKey: 'second',
        disabled: false,
        count: 0,
        optional: undefined,
      })
      expect(componentData.store.props).toEqual({})
    } finally {
      store.dispose()
    }
  })
})
