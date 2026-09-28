import {
  BuilderView,
  ComponentStore,
  define,
  globalDefaultLanguage,
  Language,
  type LanguageFullCode,
  type PersistedForm,
} from '@react-form-builder/core'
import type {FormBuilderI18n} from '@react-form-builder/designer'
import {builtInLanguages, resolveBuilderUiLanguage} from '@react-form-builder/designer/src/features/localization/languageUtils'
import type {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {BuilderStore as BuilderStoreImpl} from '@react-form-builder/designer/src/stores/BuilderStore'
import {LocalStorageSynchronizer} from '@react-form-builder/designer/src/stores/LocalStorageSynchronizer'
import {expect} from 'vitest'
import {createMockStore} from '../common/createMockBuilderStore'

const mockComponent = define(() => <div />, 'MockField')
  .name('Mock')
  .category('fields')
  .build()

const builderView = new BuilderView([mockComponent])

const formPreviewLanguages = [
  new Language('en', 'US', 'English', 'American English'),
  new Language('fr', 'FR', 'French', 'Français'),
  new Language('de', 'DE', 'German', 'Deutsch'),
]

const persistedFormWithLanguages = (languages: Language[], defaultLanguage: LanguageFullCode): PersistedForm => ({
  form: ComponentStore.createFromObject({
    key: 'root',
    type: 'Screen',
    props: {},
  }),
  languages,
  defaultLanguage,
})

const customTwoLangI18n: FormBuilderI18n = {
  languages: [new Language('fr', 'FR', 'French', 'Français'), new Language('tr', 'TR', 'Turkish', 'Türkçe')],
  getData: async () => ({data: {}, componentsLocale: {}}),
}

describe('resolveBuilderUiLanguage', () => {
  const langs = builtInLanguages.languages

  it('returns undefined when the code is undefined', () => {
    expect(resolveBuilderUiLanguage(undefined, langs)).toBeUndefined()
  })

  it('returns undefined when the code is an empty string', () => {
    expect(resolveBuilderUiLanguage('' as LanguageFullCode, langs)).toBeUndefined()
  })

  it('returns undefined when the code is not in the list', () => {
    expect(resolveBuilderUiLanguage('xx-YY', langs)).toBeUndefined()
  })

  it('returns the matching language for a known full code', () => {
    const fr = resolveBuilderUiLanguage('fr-FR', langs)
    expect(fr?.fullCode).toBe('fr-FR')
    expect(fr?.name).toBe('Français')
  })

  it('returns the first match when duplicate full codes exist', () => {
    const first = new Language('de', 'DE', 'First', 'First German')
    const second = new Language('de', 'DE', 'Second', 'Second German')
    const resolved = resolveBuilderUiLanguage('de-DE', [first, second])
    expect(resolved?.description).toBe('First German')
  })
})

describe('BuilderStore initial builder chrome language', () => {
  it('uses global default when builderLanguage is omitted', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {view: builderView})
    expect(builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)
  })

  it('uses builderLanguage when it matches an available language', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'fr-FR',
    })
    expect(builderStore.formBuilderLanguage.fullCode).toBe('fr-FR')
  })

  it('falls back to default when builderLanguage does not match any available language', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'xx-YY',
    })
    expect(builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)
  })

  it('respects custom i18n order when resolving builderLanguage', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      i18n: customTwoLangI18n,
      defaultBuilderLanguage: 'tr-TR',
    })
    expect(builderStore.formBuilderLanguage.fullCode).toBe('tr-TR')
    expect(builderStore.availableLanguages[0].fullCode).toBe('fr-FR')
  })
})

describe('LocalStorageSynchronizer builder chrome language resolution', () => {
  let storage: Record<string, string>

  beforeEach(() => {
    storage = {}
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => (key in storage ? storage[key] : null),
      setItem: (key: string, value: string) => {
        storage[key] = value
      },
      removeItem: (key: string) => {
        delete storage[key]
      },
      clear: () => {
        storage = {}
      },
      key: (index: number) => Object.keys(storage)[index] ?? null,
      get length() {
        return Object.keys(storage).length
      },
    } as Storage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('prefers stored builderLanguage value over defaultBuilderLanguage', async () => {
    storage.builderLanguage = 'de-DE'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'fr-FR',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultBuilderLanguage: 'fr-FR',
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('de-DE')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('does not overwrite stored builderLanguage with the initial language on construction', async () => {
    storage.builderLanguage = 'de-DE'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'fr-FR',
      persistFormName: false,
    })

    expect(builderStore.formBuilderLanguage.fullCode).toBe('fr-FR')

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultBuilderLanguage: 'fr-FR',
      persistFormName: false,
    })

    expect(storage.builderLanguage).toBe('de-DE')

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('de-DE')
    expect(storage.builderLanguage).toBe('de-DE')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('does not write builderLanguage on construction when storage was empty', async () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    expect('builderLanguage' in storage).toBe(false)

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)
    expect('builderLanguage' in storage).toBe(false)

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('uses stored builderLanguage when builderLanguage is omitted', async () => {
    storage.builderLanguage = 'de-DE'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('de-DE')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('stores the builder language to localStorage when it changes', async () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    const de = builderStore.availableLanguages.find(l => l.fullCode === 'de-DE')
    if (!de) throw new Error('Language "de-DE" not found')

    await builderStore.changeLanguage(de)

    await expect.poll(() => storage.builderLanguage).toBe('de-DE')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('stores the builder language using localStoragePrefix', async () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    const ja = builderStore.availableLanguages.find(l => l.fullCode === 'ja-JP')
    if (!ja) throw new Error('Language "ja-JP" not found')

    await builderStore.changeLanguage(ja)

    await expect.poll(() => storage['app-builderLanguage']).toBe('ja-JP')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('falls back to default when stored builderLanguage is empty', async () => {
    storage.builderLanguage = ''

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('falls back to default when stored builderLanguage is unknown', async () => {
    storage.builderLanguage = 'xx-YY'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('reads builderLanguage using localStoragePrefix', async () => {
    storage['app-builderLanguage'] = 'ja-JP'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('ja-JP')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('does not read unprefixed builderLanguage when localStoragePrefix is set', async () => {
    storage.builderLanguage = 'de-DE'
    storage['app-builderLanguage'] = 'fr-FR'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('uses stored language when builderLanguage is invalid', async () => {
    storage.builderLanguage = 'ja-JP'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'xx-YY',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultBuilderLanguage: 'xx-YY',
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe('ja-JP')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('uses default when both builderLanguage and stored builderLanguage are invalid', async () => {
    storage.builderLanguage = 'bb-BB'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      defaultBuilderLanguage: 'xx-YY',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultBuilderLanguage: 'xx-YY',
      persistFormName: false,
    })

    await expect.poll(() => builderStore.formBuilderLanguage.fullCode).toBe(globalDefaultLanguage.fullCode)

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('dispose removes autorun listeners without throwing', () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    expect(() => synchronizer.dispose()).not.toThrow()

    builderStore.dispose()
  })
})

describe('LocalStorageSynchronizer viewer preview language', () => {
  let storage: Record<string, string>

  beforeEach(() => {
    storage = {}
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => (key in storage ? storage[key] : null),
      setItem: (key: string, value: string) => {
        storage[key] = value
      },
      removeItem: (key: string) => {
        delete storage[key]
      },
      clear: () => {
        storage = {}
      },
      key: (index: number) => Object.keys(storage)[index] ?? null,
      get length() {
        return Object.keys(storage).length
      },
    } as Storage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('applies stored viewerLanguage after form languages are loaded', async () => {
    storage.viewerLanguage = 'fr-FR'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('fr-FR')
    await expect.poll(() => builderStore.localizationLanguage.fullCode).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('uses defaultViewerLanguage when viewerLanguage is not stored', async () => {
    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultViewerLanguage: 'fr-FR',
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('fr-FR')
    await expect.poll(() => builderStore.localizationLanguage.fullCode).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('prefers stored viewerLanguage over defaultViewerLanguage', async () => {
    storage.viewerLanguage = 'de-DE'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultViewerLanguage: 'fr-FR',
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('de-DE')
    await expect.poll(() => builderStore.localizationLanguage.fullCode).toBe('de-DE')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('reads viewerLanguage using localStoragePrefix', async () => {
    storage['app-viewerLanguage'] = 'fr-FR'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      localStoragePrefix: 'app',
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('persists viewer preview language to localStorage after form languages load', async () => {
    storage.viewerLanguage = 'fr-FR'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => storage.viewerLanguage).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('falls back to defaultViewerLanguage when stored viewerLanguage is unknown', async () => {
    storage.viewerLanguage = 'xx-YY'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultViewerLanguage: 'fr-FR',
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('fr-FR')

    synchronizer.dispose()
    builderStore.dispose()
  })

  it('falls back to form defaultLanguage when stored and prop viewer languages are unknown', async () => {
    storage.viewerLanguage = 'xx-YY'

    const store = createMockStore()
    const builderStore: BuilderStore = new BuilderStoreImpl(store, {
      view: builderView,
      persistFormName: false,
    })

    const synchronizer = new LocalStorageSynchronizer(builderStore, {
      view: builderView,
      defaultViewerLanguage: 'yy-ZZ',
      persistFormName: false,
    })

    store.applyPersistedForm(persistedFormWithLanguages(formPreviewLanguages, 'en-US'))

    await expect.poll(() => builderStore.viewer.selectedLanguage?.fullCode).toBe('en-US')

    synchronizer.dispose()
    builderStore.dispose()
  })
})
