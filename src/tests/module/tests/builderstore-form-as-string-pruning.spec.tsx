import type {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {createMockBuilderStore, createMockStore} from '../common/createMockBuilderStore'

describe('BuilderStore formAsString pruning', () => {
  it('removes top-level empty localization object from serialized form', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = createMockBuilderStore(store)

    const form = {
      version: '1',
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [],
      },
      localization: {
        'en-US': {
          c1: {
            component: {
              p1: 'value',
            },
          },
        },
      },
      languages: [
        {
          code: 'en',
          dialect: 'US',
          name: 'English',
          description: 'English',
          bidi: 'ltr',
        },
      ],
      defaultLanguage: 'en-US',
    }

    builderStore.parseForm(JSON.stringify(form))
    builderStore.viewer.form.localization.setLocalization('en-US', 'c1', 'p1', 'component', '')

    const serialized = JSON.parse(builderStore.formAsString)
    expect(serialized.localization).toBeUndefined()
  })
})
