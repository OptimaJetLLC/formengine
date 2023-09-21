import {FluentBundle, FluentResource} from '@fluent/bundle'
import {autorun, IReactionDisposer, makeAutoObservable} from 'mobx'
import {getFluentCompatibleId} from '../features/localization/getFluentCompatibleId'
import {nameAutorun, nameObservable} from '../utils/observableNaming'

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

type ComponentsLocalization = Record<ComponentKey, TypedLocalization>

type TypedLocalization = Partial<Record<LocalizationType, ComponentPropsLocalization>>

type ComponentPropsLocalization = Record<ComponentPropertyName, string>

type LanguageFullCode = string

type ComponentKey = string

type ComponentPropertyName = string

const className = 'LocalizationStore'

/**
 * Represents the type of localization. The localization can be for a component, tooltip or for validator.
 */
export type LocalizationType = 'component' | 'tooltip' | string

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
   * @param type the type of localization.
   * @returns the value of localization constant.
   */
  getLocalization(languageFullCode: string, componentKey: string, propertyName: string, type: LocalizationType) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const fluentCompatiblePropertyName = getFluentCompatibleId(propertyName)
    return this.value[languageFullCode]?.[fluentCompatibleComponentKey]?.[type]?.[fluentCompatiblePropertyName]
  }

  /**
   * Sets localization for component property.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language in which localization will be set.
   * @param componentKey the component key that requires localization.
   * @param propertyName the component's property name to be localized.
   * @param type the type of localization.
   * @param value the localization value.
   */
  setLocalization(languageFullCode: string, componentKey: string, propertyName: string, type: LocalizationType, value: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const fluentCompatiblePropertyName = getFluentCompatibleId(propertyName)
    this.value[languageFullCode] ??= {}
    this.value[languageFullCode][fluentCompatibleComponentKey] ??= {}
    this.value[languageFullCode][fluentCompatibleComponentKey][type] ??= {}
    this.value[languageFullCode][fluentCompatibleComponentKey][type]![fluentCompatiblePropertyName] = value
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
   * Removes localization for component with specified type.
   * @param componentKey the component key that requires localization removal.
   * @param type the localization type.
   */
  removeLocalizationForType(componentKey: string, type: LocalizationType) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    for (const key in this.value) {
      if (!this.value[key][fluentCompatibleComponentKey]) continue
      delete this.value[key][fluentCompatibleComponentKey][type]
      if (Object.keys(this.value[key][fluentCompatibleComponentKey]).length === 0) {
        delete this.value[key][fluentCompatibleComponentKey]
      }
      if (Object.keys(this.value[key]).length === 0) {
        delete this.value[key]
      }
    }
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
   * Changes the component key for all languages in the value object.
   * @param oldComponentKey the old component key to be replaced.
   * @param newComponentKey the new component key to replace the old component key.
   */
  changeComponentKey(oldComponentKey: string, newComponentKey: string) {
    const fluentCompatibleOldComponentKey = getFluentCompatibleId(oldComponentKey)
    const fluentCompatibleNewComponentKey = getFluentCompatibleId(newComponentKey)
    for (const languageFullCode in this.value) {
      const component = this.value[languageFullCode][fluentCompatibleOldComponentKey]
      if (component) {
        this.value[languageFullCode][fluentCompatibleNewComponentKey] = component
        delete this.value[languageFullCode][fluentCompatibleOldComponentKey]
      }
    }
  }

  /**
   * Retrieves the localization values for a given component key.
   * @param componentKey the key of the component to retrieve localization for.
   * @returns the object containing the localization values for the component in each supported language.
   */
  getLocalizationForComponent(componentKey: string) {
    const fluentCompatibleComponentKey = getFluentCompatibleId(componentKey)
    const localization: LocalizationValue = {}
    for (const languageFullCode in this.value) {
      const component = this.value[languageFullCode][fluentCompatibleComponentKey]
      if (component) {
        localization[languageFullCode] = {}
        localization[languageFullCode][componentKey] = component
      }
    }
    return localization
  }

  /**
   * Inserts the localization values for a given component key. Replaces the old component key with the new component key.
   * @param localization the localization object for insertion.
   * @param oldComponentKey the old component key that needs to be replaced.
   * @param newComponentKey the new component key to be added.
   */
  addLocalizationWithNewKey(localization: LocalizationValue, oldComponentKey: string, newComponentKey: string) {
    const fluentCompatibleNewComponentKey = getFluentCompatibleId(newComponentKey)
    for (const languageFullCode in localization) {
      const component = localization[languageFullCode][oldComponentKey]
      if (component) {
        this.value[languageFullCode][fluentCompatibleNewComponentKey] = component
      }
    }
  }

  /**
   * The constructor.
   * @param value the initial localization value.
   */
  constructor(value: LocalizationValue = {}) {
    makeAutoObservable(this, undefined, {name: nameObservable(className)})

    this.value = value

    this.#disposers = [
      autorun(
        () => {
          Object.keys(this.value).forEach(value => {
            this.localizationCache.set(value, this.#compileFluentBundle(value, this))
          })
        }
        , {name: nameAutorun(className, `compileFluentBundle`)}),
    ]
  }

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  dispose() {
    this.#disposers.forEach(dispose => dispose())
  }

  #compileFluentBundle = (languageFullCode: string, localization: LocalizationStore) => {
    if (!localization.hasLanguage(languageFullCode)) {
      return new FluentBundle(`${languageFullCode}`)
    }

    const localizationItems = localization.#getLocalizationItems(languageFullCode)
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

  /**
   * Returns all localization constants for the specified languageFullCode.
   * @param languageFullCode the full code (en-US, en-GB etc.) of the language we are looking to localize.
   * @returns all localization constants for the specified languageFullCode.
   */
  #getLocalizationItems(languageFullCode: string) {
    const localizationItems: string[] = []
    Object.entries(this.value[languageFullCode]).forEach(([componentKey, allComponentsLocalizationConstants]) => {
      Object.entries(allComponentsLocalizationConstants ?? {}).forEach(([type, componentLocalizationConstants]) => {
        Object.entries(componentLocalizationConstants ?? {}).forEach(([propertyName, localizationConstant]) => {
          if (localizationConstant) localizationItems.push(`${componentKey}_${type}_${propertyName} = ${localizationConstant}`)
        })
      })
    })
    return localizationItems
  }
}
