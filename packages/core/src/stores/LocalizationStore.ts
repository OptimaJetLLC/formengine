import {FluentBundle, FluentResource} from '@fluent/bundle'
import {autorun, IReactionDisposer, makeAutoObservable} from 'mobx'
import {getFluentCompatibleId} from '../features/localization/getFluentCompatibleId'

/**
 * The format in which localization is stored.
 * @example
 * {
 *  "en-US" :
 *  {
 *    "componentKey:
 *      {
 *        "property" : "This {$value} is localized!"
 *      }
 *  }
 * }
 */
export type LocalizationValue = Record<LanguageFullCode, ComponentsLocalization>

type ComponentsLocalization = Record<ComponentKey, ComponentPropsLocalization>

type ComponentPropsLocalization = Record<ComponentPropertyName, string>

type LanguageFullCode = string

type ComponentKey = string

type ComponentPropertyName = string

/**
 * Observable storage of localization.
 */
export class LocalizationStore {

  #disposers: IReactionDisposer[]

  localizationCache = new Map<string, FluentBundle>()

  readonly value: LocalizationValue = {}

  /**
   * Returns value of localization constant.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language we are looking to localize.
   * @param componentKey the component we are looking to localize.
   * @param propertyName the property name we are looking to localize.
   * @returns the value of localization constant.
   */
  getLocalization(languageFullCode: string, componentKey: string, propertyName: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const fluentCompatiblePropertyName = getFluentCompatibleId(propertyName)
    const languageLocalization = this.value[languageFullCode]
    if (!languageLocalization) return
    const componentLocalization = languageLocalization[fluentCompatibleComponentKey]
    if (!componentLocalization) return
    return componentLocalization[fluentCompatiblePropertyName]
  }

  /**
   * Returns all localization constants for the specified languageFullCode.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language we are looking to localize.
   * @returns all localization constants for the specified languageFullCode.
   */
  getLocalizationItems(languageFullCode: string) {
    const localizationItems: string[] = []
    Object.keys(this.value[languageFullCode]).forEach(componentKey => {
      const allComponentsLocalizationConstants = this.value[languageFullCode][componentKey]
      if (!allComponentsLocalizationConstants) {
        return
      }
      Object.keys(allComponentsLocalizationConstants).forEach(attributeName => {
        const localizationValue = allComponentsLocalizationConstants[attributeName]
        if (!localizationValue) {
          return
        }
        localizationItems.push(`${componentKey}_${attributeName} = ${localizationValue}`)
      })
    })
    return localizationItems
  }


  /**
   * Sets localization for component property.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language in which localization will be set.
   * @param componentKey the component key that requires localization.
   * @param propertyName the component's property name to be localized.
   * @param value the localization value.
   */
  setLocalization(languageFullCode: string, componentKey: string, propertyName: string, value: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const fluentCompatiblePropertyName = getFluentCompatibleId(propertyName)
    this.value[languageFullCode] ??= {}
    this.value[languageFullCode][fluentCompatibleComponentKey] ??= {}
    this.value[languageFullCode][fluentCompatibleComponentKey][fluentCompatiblePropertyName] = value
  }

  /**
   * Removes localization for component.
   * @param componentKey the component key that requires localization removal.
   */
  removeLocalization(componentKey: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    for (const key in this.value) {
      delete this.value[key][fluentCompatibleComponentKey]
      if (Object.keys(this.value[key]).length === 0) {
        delete this.value[key]
      }
    }
  }

  /**
   * Check whether the component has localization.
   * @param componentKey the key of checked component.
   * @param propertyName the component's property name to be checked.
   * @returns true if the specified component property has a localization constant.
   */
  hasComponentProperty(componentKey: string, propertyName: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const fluentCompatiblePropertyName = getFluentCompatibleId(propertyName)
    for (const languageFullCode in this.value) {
      const component = this.value[languageFullCode][fluentCompatibleComponentKey]
      if (component && component[fluentCompatiblePropertyName]) {
        return true
      }
    }

    return false
  }

  /**
   * Checks that the specified language exists in the localization.
   * @param languageFullCode The full code (en-US, en-GB etc.) of the language to be checked.
   * @returns true if the specified language exists in the localization.
   */
  hasLanguage(languageFullCode: string) {
    return !!this.value[languageFullCode]
  }

  /**
   * If the FluentBundle for the specified language is found, this function returns it.
   * Otherwise, an empty FluentBundle is returned.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language to get fluent bundle.
   * @returns the FluentBundle for the specified language.
   */
  getFluentBundle(languageFullCode: string) {
    return this.localizationCache.get(languageFullCode) ?? new FluentBundle(`${languageFullCode}`)
  }

  /**
   * The constructor.
   * @param value the initial localization value.
   */
  constructor(value: LocalizationValue = {}) {
    makeAutoObservable(this)

    this.value = value

    this.#disposers = [
      autorun(() => {
        Object.keys(this.value).forEach(value => {
          this.localizationCache.set(value, this.#compileFluentBundle(value, this))
        })
      })
    ]
  }

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  destroy() {
    this.#disposers.forEach(dispose => dispose())
  }

  #compileFluentBundle = (languageFullCode: string, localization: LocalizationStore) => {
    if (!localization.hasLanguage(languageFullCode)) {
      return new FluentBundle(`${languageFullCode}`)
    }

    const localizationItems = localization.getLocalizationItems(languageFullCode)
    const bundle = new FluentBundle(`${languageFullCode}`)

    localizationItems.forEach(item => {
      const errors = bundle.addResource(new FluentResource(item))
      if (errors.length > 0) {
        console.error(`Unable to add localization resource: ${item}`)
        errors.forEach(error => {
          console.error(error)
        })
      }
    })

    return bundle
  }
}
