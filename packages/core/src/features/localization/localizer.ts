import {FluentBundle, FluentResource} from '@fluent/bundle'
import {FluentVariable} from '@fluent/bundle/esm/bundle.js'
import {ComponentStore, isLocalizedProperty} from '../../stores/ComponentStore'
import {Form} from '../../stores/Form'
import type {LocalizationType} from '../../stores/LocalizationStore'
import {getFluentCompatibleId} from './getFluentCompatibleId'
import {Language} from './types'

/**
 * Localization testing result.
 */
export type LocalizationTestResult = {
  error: boolean
  result?: string
  exceptions?: Error[]
}

/**
 * Localization testing request.
 */
export type LocalizationTestRequest = {
  localization: string,
  localizationStringId: string,
  language: Language,
  data: Record<string, FluentVariable>
}

/**
 * Localization testing function.
 * @param request the localization testing request.
 * @returns the localization testing result.
 */
export const testFluentLocalization = (request: LocalizationTestRequest): LocalizationTestResult => {
  const localizationSting = `${request.localizationStringId} = ${request.localization}`
  const resource = new FluentResource(localizationSting)
  const bundle = new FluentBundle(`${request.language.fullCode}`)
  const errors = bundle.addResource(resource)
  if (errors.length > 0) {
    return {
      error: true,
      exceptions: [...errors]
    }
  }

  const message = bundle.getMessage(request.localizationStringId)

  if (message === undefined) {
    return {
      error: true,
      exceptions: [{message: 'Localization message not found', name: 'MessageNotFound'}]
    }
  }

  if (message.value === null) {
    return {
      error: true,
      exceptions: [{message: 'Localization message is null', name: 'MessageIsNull'}]
    }
  }

  let result = ''

  try {
    result = bundle.formatPattern(message.value, request.data)
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: true,
        exceptions: [e]
      }
    }

    throw e
  }

  return {
    error: false,
    result: result
  }
}

/**
 * Localizes all props of the specified component.
 * @param form the form.
 * @param language the displayed language.
 * @param componentStore the full state of a localizable component.
 * @param type the localization type.
 * @returns the object containing only the localized props of the specified component.
 */
export const localizeProperties = (form: Form, language: Language, componentStore: ComponentStore, type: LocalizationType = 'component') => {
  const componentTree = form.componentTree
  const fluentBundle = form.localization.getFluentBundle(language.fullCode)

  const needConsiderDefaultLanguage = form.defaultLanguage !== language
  const defaultBundle = needConsiderDefaultLanguage
    ? form.localization.getFluentBundle(form.defaultLanguage.fullCode)
    : undefined

  const data: Record<string, any> = {}

  Object.keys(componentStore.props).forEach(value => {
    const componentProperty = componentStore.props[value]
    if (!isLocalizedProperty(componentProperty)) return

    const messageId = getFluentCompatibleId(`${componentStore.key}_${type}_${value}`)

    let message = fluentBundle.getMessage(messageId)
    if (!message && needConsiderDefaultLanguage && defaultBundle) {
      message = defaultBundle.getMessage(messageId)
    }
    if (!message) {
      console.error(`Localization message ${messageId} not found`)
      return
    }
    try {
      data[value] = fluentBundle.formatPattern(message.value!, componentTree.fluentData)
    } catch (e) {
      console.error(e)
    }
  })

  return data
}
