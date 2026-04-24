import type {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {createMockBuilderStore, createMockStore} from '../common/createMockBuilderStore'

const providedFormDefinition = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [],
  },
  localization: {},
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'English',
      bidi: 'ltr',
    },
    {
      code: 'de',
      dialect: 'DE',
      name: 'German',
      description: 'Deutsch',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
}

describe('Localization languages seeding FE-1995', () => {
  it('seeds viewer localization.langCodes from persisted languages when localization is empty', () => {
    const store = createMockStore()

    expect(store.form.localization.langCodes).toStrictEqual([])

    store.applyStringForm(JSON.stringify(providedFormDefinition))

    expect(store.form.localization.langCodes).toStrictEqual(['en-US', 'de-DE'])
  })

  it('keeps designer formAvailableLanguages populated right after parseForm', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = createMockBuilderStore(store)

    builderStore.parseForm(JSON.stringify(providedFormDefinition))

    expect(builderStore.formAvailableLanguages.map((language) => language.fullCode)).toStrictEqual(['en-US', 'de-DE'])
  })
})
