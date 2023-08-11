import {useCallback} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {Store} from '../../stores/Store'
import {useStore} from '../../utils/contexts/StoreContext'
import type {FormViewerProps} from '../form-viewer'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {localizeProperties} from './localizer'

function getDisplayedLanguage(formViewerProps: Readonly<FormViewerProps>, formViewerStore: Store) {
  if (formViewerProps.language) {
    const propsLanguage = formViewerStore.form.languages.find(l => l.fullCode === formViewerProps.language)
    if (propsLanguage) return propsLanguage
  }
  return formViewerStore.selectedLanguage ?? formViewerStore.form.defaultLanguage
}

/**
 * @returns the function to localize the properties of a component.
 */
export const useLocalization = () => {
  const formViewerProps = useViewerProps()
  const formViewerStore = useStore()
  const form = formViewerStore.form
  const displayedLanguage = getDisplayedLanguage(formViewerProps, formViewerStore)

  return useCallback((componentStore: ComponentStore) => {
    if (formViewerProps.localize) return formViewerProps.localize(componentStore, displayedLanguage)
    return localizeProperties(form, displayedLanguage, componentStore)
  }, [formViewerProps, displayedLanguage, form])
}
