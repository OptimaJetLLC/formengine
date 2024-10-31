import {FluentBundle, FluentResource} from '@fluent/bundle'
import type {FluentVariable} from '@fluent/bundle/esm/bundle'
import type {ComponentStore} from '../../stores/ComponentStore'
import {isLocalizedProperty} from '../../stores/ComponentStore'
import type {Form} from '../../stores/Form'
import type {LocalizationType} from '../../stores/LocalizationStore'
import {CalculableResult} from '../../utils/CalculableResult'
import type {IFormData} from '../../utils/IFormData'
import {getValidatorPropertyBlockType} from '../ui/PropertyBlockType'
import {getFluentCompatibleId} from './getFluentCompatibleId'
import type {Language} from './types'

/**
 * Localization testing request.
 */
export type LocalizationTestRequest = {
  /**
   * Localization value to be tested.
   */
  localization: string,
  /**
   * The identifier of the localization string.
   */
  localizationStringId: string,
  /**
   * The localization Language.
   */
  language: Language,
  /**
   * The test form data.
   */
  data: Record<string, FluentVariable>
}

/**
 * Localization testing function. **Internal use only.**
 * @param request the localization testing request.
 * @returns the localization testing result.
 */
export const testFluentLocalization = (request: LocalizationTestRequest): CalculableResult => {
  const localizationSting = `${request.localizationStringId} = ${request.localization}`
  const resource = new FluentResource(localizationSting)
  const bundle = new FluentBundle(`${request.language.fullCode}`)
  const errors = bundle.addResource(resource)
  if (errors.length > 0) {
    return CalculableResult.error([...errors])
  }

  const message = bundle.getMessage(request.localizationStringId)

  if (typeof message === 'undefined') {
    return CalculableResult.error([{message: 'Localization message not found', name: 'MessageNotFound'}])
  }

  if (message.value === null) {
    return CalculableResult.error([{message: 'Localization message is null', name: 'MessageIsNull'}])
  }

  let result = ''

  try {
    result = bundle.formatPattern(message.value, request.data)
  } catch (e) {
    if (e instanceof Error) {
      return CalculableResult.error([e])
    }

    throw e
  }

  return CalculableResult.success(result)
}

/**
 * Localizes all props of the specified component.
 * @param form the form.
 * @param formData the form data.
 * @param language the displayed language.
 * @param componentStore the full state of a localizable component.
 * @param type the localization type.
 * @returns the object containing only the localized props of the specified component.
 */
export const localizeProperties = (form: Form, formData: IFormData, language: Language,
                                   componentStore: ComponentStore, type: LocalizationType = 'component') => {
  const {defaultBundle, fluentBundle} = getFluentBundles(form, language)
  const data: Record<string, any> = {}

  Object.keys(componentStore.props).forEach(value => {
    const componentProperty = componentStore.props[value]
    if (!isLocalizedProperty(componentProperty)) return

    const messageId = getFluentCompatibleId(`${componentStore.key}_${type}_${value}`)
    const message = fluentBundle.getMessage(messageId) ?? defaultBundle?.getMessage(messageId)
    if (!message) {
      data[value] = '[NOT LOCALIZED]'
      return
    }
    try {
      data[value] = fluentBundle.formatPattern(message.value!, formData.fluentData)
    } catch (e) {
      console.error(e)
    }
  })

  return data
}

/**
 * Localizes a validator error message.
 * @param form the form.
 * @param formData the form data.
 * @param language the displayed language.
 * @param componentStore the full state of a localizable component.
 * @param ruleKey the validator rule key.
 * @returns the object containing only the localized props of the specified component.
 */
export const localizeErrorMessage = (form: Form, formData: IFormData, language: Language,
                                     componentStore: ComponentStore, ruleKey: string) => {
  const type = getValidatorPropertyBlockType(ruleKey)
  const value = 'message'
  const messageId = getFluentCompatibleId(`${componentStore.key}_${type}_${value}`)
  const {defaultBundle, fluentBundle} = getFluentBundles(form, language)
  const message = fluentBundle.getMessage(messageId) ?? defaultBundle?.getMessage(messageId)
  if (!message) {
    return
  }
  try {
    return fluentBundle.formatPattern(message.value!, formData.fluentData)
  } catch (e) {
    console.error(e)
  }
}

const getFluentBundles = (form: Form, language: Language) => {
  const defaultBundle = form.defaultLanguage !== language
    ? form.localization.getFluentBundle(form.defaultLanguage.fullCode)
    : undefined
  const fluentBundle = form.localization.getFluentBundle(language.fullCode)
  return {defaultBundle, fluentBundle}
}
