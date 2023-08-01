import {FluentBundle, FluentResource} from '@fluent/bundle'
import {FluentVariable} from '@fluent/bundle/esm/bundle.js'
import {ComponentStore} from '../../stores/ComponentStore'
import {Store} from '../../stores/Store'
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
 * @param viewerStore the full state of Form Viewer.
 * @param componentStore the full state of a localizable component.
 * @returns the object containing only the localized props of the specified component.
 */
export const localizeProperties = (viewerStore: Store, componentStore: ComponentStore) => {
  const rootComponentData = viewerStore.rootComponentData
  const language = viewerStore.displayedLanguage
  const fluentBundle = viewerStore.localization.getFluentBundle(language.fullCode)

  const needConsiderDefaultLanguage = !viewerStore.isDefaultLanguage && viewerStore.defaultLanguage
  const defaultBundle = needConsiderDefaultLanguage
    ? viewerStore.localization.getFluentBundle(viewerStore.defaultLanguage!.fullCode)
    : undefined

  const data: Record<string, any> = {}

  Object.keys(componentStore.props).forEach(value => {
    const componentProperty = componentStore.props[value]
    if (!componentProperty) return
    if (componentProperty.useFluentLocalization) {
      const messageId = getFluentCompatibleId(`${componentStore.key}_${value}`)
      let message = fluentBundle.getMessage(messageId)
      if (!message && needConsiderDefaultLanguage && defaultBundle) {
        message = defaultBundle.getMessage(messageId)
      }
      if (!message) {
        console.error(`Localization message ${messageId} not found`)
        return
      }
      try {
        data[value] = fluentBundle.formatPattern(message.value!, rootComponentData.fluentData)
      } catch (e) {
        console.error(e)
      }
    }
  })

  return data
}
