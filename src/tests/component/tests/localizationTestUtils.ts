import {BiDi, ComponentStore, Language, PersistedForm, PersistedFormVersion} from '@react-form-builder/core'

type CreateLocalizedFormOptions = {
  componentType: string
  componentKey?: string
  propertyKey: string
  propValue?: string
  defaultLanguage?: `${string}-${string}`
  requestedLanguage?: `${string}-${string}`
  localization?: PersistedForm['localization']
}

type CreateButtonLocalizationFormOptions = {
  testId: string
  defaultLanguage: `${string}-${string}`
  languages: Array<{ code: string; dialect: string; name: string; description: string; bidi?: 'ltr' | 'rtl' }>
  localization: PersistedForm['localization']
}

type CreateLocalizedScreenFormOptions = {
  children?: Array<Record<string, unknown>>
  localization?: PersistedForm['localization']
  languages: Array<{ code: string; dialect: string; name: string; description: string; bidi?: 'ltr' | 'rtl' }>
  defaultLanguage: `${string}-${string}`
}

type FormBuilderGetter = () => unknown

/**
 * Creates a minimal persisted form for localization tests.
 * @param options form construction options.
 * @returns persisted form and component test id.
 */
export const createLocalizedForm = (options: CreateLocalizedFormOptions) => {
  const {
    componentType,
    componentKey = 'target',
    propertyKey,
    propValue,
    defaultLanguage = 'en-US',
    requestedLanguage = 'en-US',
    localization = {},
  } = options
  const [defaultCode, defaultDialect] = defaultLanguage.split('-')
  const [requestedCode, requestedDialect] = requestedLanguage.split('-')

  const componentStore = new ComponentStore(componentKey, componentType)
  componentStore.props[propertyKey] = propValue === undefined
    ? {computeType: 'localization'}
    : {value: propValue, computeType: 'localization'}
  componentStore.htmlAttributes = [{name: 'data-testid', value: 'localized-target'}]

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [componentStore]

  const languages = [
    new Language(defaultCode, defaultDialect, defaultLanguage, defaultLanguage, BiDi.LTR),
  ]
  if (requestedLanguage !== defaultLanguage) {
    languages.push(new Language(requestedCode, requestedDialect, requestedLanguage, requestedLanguage, BiDi.LTR))
  }

  const form = {
    version: PersistedFormVersion.version1,
    form: screen,
    localization,
    languages,
    defaultLanguage,
  } satisfies PersistedForm

  return {form, testId: 'localized-target'}
}

/**
 * Creates a viewer form with a single localized button children property.
 * @param options form construction options.
 * @returns persisted form.
 */
export const createButtonLocalizationForm = (options: CreateButtonLocalizationFormOptions) => {
  return {
    version: PersistedFormVersion.version1,
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'rsButton1',
          type: 'RsButton',
          props: {
            children: {
              computeType: 'localization',
            },
          },
          htmlAttributes: [
            {
              name: 'data-testid',
              value: options.testId,
            },
          ],
        },
      ],
    },
    localization: options.localization,
    languages: options.languages,
    defaultLanguage: options.defaultLanguage,
  }
}

/**
 * Creates a minimal screen persisted form with localization metadata.
 * @param options form construction options.
 * @returns persisted form.
 */
export const createLocalizedScreenForm = (options: CreateLocalizedScreenFormOptions) => {
  return {
    version: PersistedFormVersion.version1,
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: options.children ?? [],
    },
    localization: options.localization ?? {},
    languages: options.languages,
    defaultLanguage: options.defaultLanguage,
  }
}

/**
 * Returns a typed builderStore from FormBuilder getter.
 * @param getFormBuilder function returning builder ref.
 * @returns typed builder store.
 */
export const getBuilderStore = <T>(getFormBuilder: FormBuilderGetter): T => {
  const builder = getFormBuilder() as { builderStore: T }
  return builder.builderStore
}

/**
 * Returns a typed localization store from FormBuilder getter.
 * @param getFormBuilder function returning builder ref.
 * @returns typed localization store.
 */
export const getBuilderFormLocalization = <T>(getFormBuilder: FormBuilderGetter): T => {
  const builderStore = getBuilderStore<{ viewer: { form: { localization: T } } }>(getFormBuilder)
  return builderStore.viewer.form.localization
}
