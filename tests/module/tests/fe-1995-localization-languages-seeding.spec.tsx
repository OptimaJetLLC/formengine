import {BuilderView, Language} from '@react-form-builder/core'
import type {FormBuilderI18n, IFormStorage} from '@react-form-builder/designer'
import type {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {BuilderStore as BuilderStoreImpl} from '@react-form-builder/designer/src/stores/BuilderStore'
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

    expect(builderStore.formAvailableLanguages.map(language => language.fullCode)).toStrictEqual(['en-US', 'de-DE'])
  })

  it('stores custom default language in new form languages when using custom i18n', async () => {
    let savedForm = ''

    const formStorage: IFormStorage = {
      getForm: async () => '{}',
      getFormNames: async () => [],
      removeForm: async () => undefined,
      saveForm: async (_, formValue) => {
        savedForm = `${formValue}`
      },
    }

    const customI18n: FormBuilderI18n = {
      languages: [new Language('fr', 'FR', 'French', 'Français'), new Language('tr', 'TR', 'Turkish', 'Türkçe')],
      getData: async () => ({data: {}, componentsLocale: {}}),
    }

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: new BuilderView([]),
      formStorage,
      i18n: customI18n,
    })

    await builderStore.createForm('CustomLangForm')

    const createdForm = JSON.parse(savedForm) as {
      languages: Array<{code: string; dialect: string}>
      defaultLanguage: string
    }
    expect(createdForm.defaultLanguage).toBe('fr-FR')
    expect(createdForm.languages).toStrictEqual([
      {
        code: 'fr',
        dialect: 'FR',
        name: 'French',
        description: 'Français',
        bidi: 'ltr',
      },
    ])
  })

  it('does not persist secondary custom language without localization values', async () => {
    let savedForm = ''

    const formStorage: IFormStorage = {
      getForm: async () => '{}',
      getFormNames: async () => [],
      removeForm: async () => undefined,
      saveForm: async (_, formValue) => {
        savedForm = `${formValue}`
      },
    }

    const customI18n: FormBuilderI18n = {
      languages: [new Language('fr', 'FR', 'French', 'Français'), new Language('tr', 'TR', 'Turkish', 'Türkçe')],
      getData: async () => ({data: {}, componentsLocale: {}}),
    }

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: new BuilderView([]),
      formStorage,
      i18n: customI18n,
    })

    await builderStore.createForm('CustomLangFormWithSecondary')

    const createdForm = JSON.parse(savedForm) as {
      languages: Array<{code: string; dialect: string}>
    }
    expect(createdForm.languages.map(language => `${language.code}-${language.dialect}`)).toStrictEqual(['fr-FR'])
  })
})
