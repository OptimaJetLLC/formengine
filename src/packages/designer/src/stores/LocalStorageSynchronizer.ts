import type {BuilderTheme, LanguageFullCode, ViewMode} from '@react-form-builder/core'
import {findLanguage, isUndefined, nameAutorun} from '@react-form-builder/core'
import type {IReactionDisposer} from 'mobx'
import {autorun, reaction} from 'mobx'
import {resolveBuilderUiLanguage} from '../features/localization/languageUtils'
import type {FormBuilderProps} from '../FormBuilderProps'
import {getSystemTheme} from '../utils/getSystemTheme'
import {parseJson} from '../utils/parseJson'
import type {BuilderStore} from './BuilderStore'
import {defaultBottomPanelHeight, defaultOpenedPanels, defaultViewMode} from './constants'

const viewerLanguageReactionName = nameAutorun('LocalStorageSynchronizer', 'vwLang')

/**
 * Applies viewer preview language from localStorage and/or the default viewer language prop
 * once the form languages list is populated (after the form schema is loaded).
 * @param builderStore the form builder settings.
 * @param viewerLanguageCodeFromStorage the language full code read from localStorage, if any.
 * @param defaultViewerLanguageCode the default viewer language full code from props, if any.
 * @returns a MobX disposer for the underlying reaction.
 */
export function subscribeViewerLanguageWhenFormReady(
  builderStore: BuilderStore,
  viewerLanguageCodeFromStorage: string | undefined,
  defaultViewerLanguageCode: LanguageFullCode | undefined,
): IReactionDisposer {
  let appliedOnce = false
  return reaction(
    () => builderStore.viewer.form.languages,
    (formLanguages) => {
      const languagesLength = formLanguages.length

      if (appliedOnce || languagesLength === 0) return

      appliedOnce = true
      const languages = builderStore.viewer.form.languages

      const viewerFromStorage = viewerLanguageCodeFromStorage
        ? findLanguage(languages, viewerLanguageCodeFromStorage as LanguageFullCode)
        : undefined

      const viewerFromProp = defaultViewerLanguageCode
        ? findLanguage(languages, defaultViewerLanguageCode)
        : undefined

      const finalViewerLanguage = viewerFromStorage ?? viewerFromProp ?? builderStore.viewer.form.defaultLanguage
      builderStore.viewer.selectedLanguage = finalViewerLanguage
      builderStore.localizationLanguage = finalViewerLanguage
    },
    {fireImmediately: true, name: viewerLanguageReactionName},
  )
}

/**
 * Synchronizes and saves form builder settings to the browser's localStorage.
 */
export class LocalStorageSynchronizer {
  readonly #disposers: IReactionDisposer[]

  /**
   * Creates {@link LocalStorageSynchronizer}.
   * @param builderStore the form builder settings.
   * @param builderProps the form builder props.
   */
  constructor(builderStore: BuilderStore, builderProps: FormBuilderProps) {
    const withPrefix = (name: string) => {
      const prefix = builderProps.localStoragePrefix
      return prefix ? `${prefix}-${name}` : name
    }

    const resolutionKey = withPrefix('resolution')
    builderStore.viewMode = this.getItem<ViewMode>(resolutionKey, defaultViewMode)

    const openedPanelsKey = withPrefix('openedPanels')
    builderStore.openedPanels = parseJson(this.getItem<string>(openedPanelsKey)) ?? defaultOpenedPanels

    const bottomPanelHeightKey = withPrefix('bottomPanelHeight')
    builderStore.bottomPanelHeight = parseJson(this.getItem<string>(bottomPanelHeightKey)) ?? defaultBottomPanelHeight

    const themeKey = withPrefix('theme')
    builderStore.theme = this.getItem<BuilderTheme>(themeKey, getSystemTheme()) === 'dark' ? 'dark' : 'light'

    const testingAutorunKey = withPrefix('testingAutorun')
    builderStore.testingAutorun = this.getItem<string>(testingAutorunKey) === 'true'

    const className = withPrefix('LocalStorageSynchronizer')

    const formNameKey = withPrefix('formName')
    if (builderProps.persistFormName !== false) {
      const formName = this.getItem<string>(formNameKey)
      if (formName) builderStore.activeFormName = formName
    }

    const builderLanguageKey = withPrefix('builderLanguage')
    const builderLanguage = this.getItem<string>(builderLanguageKey)
    const fromStorage = builderLanguage
      ? builderStore.availableLanguages.find(l => l.fullCode === builderLanguage)
      : undefined
    const fromProp = resolveBuilderUiLanguage(builderProps.defaultBuilderLanguage, builderStore.availableLanguages)
    const lang = fromStorage ?? fromProp ?? builderStore.defaultLanguage

    void builderStore.changeLanguage(lang)

    const viewerLanguageKey = withPrefix('viewerLanguage')
    const viewerLanguageCode = this.getItem<string>(viewerLanguageKey)
    const defaultViewerLanguageCode = builderProps.defaultViewerLanguage

    this.#disposers = [
      subscribeViewerLanguageWhenFormReady(builderStore, viewerLanguageCode, defaultViewerLanguageCode),
      autorun(
        () => this.updateItem(resolutionKey, builderStore.viewMode),
        {name: nameAutorun(className, 'saveResolution')}
      ),
      autorun(
        () => this.updateItem(openedPanelsKey, JSON.stringify(builderStore.openedPanels)),
        {name: nameAutorun(className, 'saveOpenedPanels')}
      ),
      autorun(
        () => this.updateItem(bottomPanelHeightKey, builderStore.bottomPanelHeight),
        {name: nameAutorun(className, 'saveBottomPanelHeight')}
      ),
      autorun(
        () => this.updateItem(themeKey, builderStore.theme),
        {name: nameAutorun(className, 'saveTheme')}
      ),
      autorun(
        () => this.updateItem(testingAutorunKey, builderStore.testingAutorun),
        {name: nameAutorun(className, 'saveTestingAutorunSetting')}
      ),
      reaction(
        () => builderStore.formBuilderLanguage.fullCode,
        code => this.updateItem(builderLanguageKey, code),
        {name: nameAutorun(className, 'saveI18nextLng')}
      ),
      reaction(
        () => builderStore.localizationLanguage.fullCode,
        code => this.updateItem(viewerLanguageKey, code),
        {name: nameAutorun(className, 'saveViewerLng')}
      )
    ]

    if (builderProps.persistFormName !== false) {
      this.#disposers.push(autorun(
        () => this.updateItem(formNameKey, builderStore.activeFormName),
        {name: nameAutorun(className, 'saveFormName')}
      ))
    }
  }

  /**
   * Releases allocated resources, must be used when destroying an object instance.
   */
  dispose = () => {
    this.#disposers.forEach(disposer => disposer())
  }

  private getItem = <T>(key: string, defaultValue?: T) => {
    const value = localStorage.getItem(key) ?? defaultValue
    return value as T
  }

  private updateItem = <T>(key: string, value: T) => {
    if (isUndefined(value)) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, value as string)
  }
}
