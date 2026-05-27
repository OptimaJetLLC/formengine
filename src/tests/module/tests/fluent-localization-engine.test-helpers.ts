import type {
  ComponentData,
  FluentLocalizationEngine,
  Form,
  IForm,
  IFormData,
  LanguageFullCode,
  LocalizationType,
  LocalizationValue
} from '@react-form-builder/core'
import {BiDi, ComponentStore, Language, LocalizationStore} from '@react-form-builder/core'

export const enUS = new Language('en', 'US', 'en-US', 'en-US', BiDi.LTR)

export const frFR = new Language('fr', 'FR', 'fr-FR', 'fr-FR', BiDi.LTR)

/**
 * Builds minimal {@link IFormData} for engine tests.
 * @param data form field values.
 * @returns form data stub.
 */
export const minimalFormData = (data: Record<string, unknown>): IFormData =>
  ({
    data,
  }) as IFormData

/**
 * Builds a Fluent message id for a component property.
 * @param engine localization engine.
 * @param componentKey component key.
 * @param propertyName property name.
 * @param type localization type.
 * @returns fluent message id.
 */
export const fluentMessageId = (
  engine: FluentLocalizationEngine,
  componentKey: string,
  propertyName: string,
  type: LocalizationType = 'component',
): string =>
  `${engine.getCompatibleId(componentKey)}_${type}_${engine.getCompatibleId(propertyName)}`

type FluentEngineTestContext = {
  engine: FluentLocalizationEngine
  form: IForm
  componentStore: ComponentStore
  formData: IFormData
  requestedLanguage: Language
}

type CreateFluentEngineTestContextOptions = {
  localization?: LocalizationValue
  defaultLanguage?: Language
  requestedLanguage?: Language
  componentKey?: string
  componentType?: string
  propertyKey?: string
  propValue?: unknown
  extraLocalizedProps?: Record<string, { value?: unknown }>
  nonLocalizedProps?: Record<string, { value?: unknown }>
  defaultProps?: Record<string, unknown>
}

/**
 * Creates an engine test context with {@link LocalizationStore} and optional component tree stub.
 * @param FluentLocalizationEngineCtor engine constructor.
 * @param options test context options.
 * @returns engine, form, component store, and form data.
 */
export const createFluentEngineTestContext = (
  FluentLocalizationEngineCtor: new (locale?: LanguageFullCode) => FluentLocalizationEngine,
  options: CreateFluentEngineTestContextOptions = {},
): FluentEngineTestContext => {
  const {
    localization = {},
    defaultLanguage = enUS,
    requestedLanguage = enUS,
    componentKey = 'target',
    componentType = 'CustomComponent',
    propertyKey = 'children',
    propValue,
    extraLocalizedProps = {},
    nonLocalizedProps = {},
    defaultProps,
  } = options

  const engine = new FluentLocalizationEngineCtor(defaultLanguage.fullCode)
  const localizationStore = new LocalizationStore(localization, engine)

  const componentStore = new ComponentStore(componentKey, componentType)
  componentStore.props[propertyKey] = propValue === undefined
    ? {computeType: 'localization'}
    : {value: propValue, computeType: 'localization'}

  for (const [key, prop] of Object.entries(extraLocalizedProps)) {
    componentStore.props[key] = {value: prop.value, computeType: 'localization'}
  }

  for (const [key, prop] of Object.entries(nonLocalizedProps)) {
    componentStore.props[key] = {value: prop.value, computeType: 'function'}
  }

  const form = {
    defaultLanguage,
    localization: localizationStore,
    ...(defaultProps === undefined
      ? {}
      : {
        componentTree: {
          findByKey: (key: string) => (
            key === componentKey
              ? {model: {defaultProps}}
              : undefined
          ),
        } as ComponentData,
      }),
  } as Form

  return {
    engine,
    form,
    componentStore,
    formData: minimalFormData({}),
    requestedLanguage,
  }
}

/**
 * Runs {@link FluentLocalizationEngine.localizeProperties} for the default property in a test context.
 * @param ctx test context.
 * @param type localization type.
 * @param formData optional form data override.
 * @returns localized property map.
 */
export const localizeDefaultProperty = (
  ctx: FluentEngineTestContext,
  type: LocalizationType = 'component',
  formData?: IFormData,
): Record<string, unknown> =>
  ctx.engine.localizeProperties(
    ctx.form,
    formData ?? ctx.formData,
    ctx.requestedLanguage,
    ctx.componentStore,
    type,
  )
