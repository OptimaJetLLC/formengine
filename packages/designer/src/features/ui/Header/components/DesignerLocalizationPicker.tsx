import {Language, namedObserver, useStore} from '@react-form-builder/core'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {LocalizationPicker} from '../../../localization/components/LocalizationPicker'

export const DesignerLocalizationPicker = namedObserver('DesignerLocalizationPicker', () => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const handleSelect = (language: Language) => {
    viewerStore.selectedLanguage = language
    builderStore.localizationLanguage = language
  }

  return <LocalizationPicker value={builderStore.localizationLanguage.fullCode} onSelect={handleSelect}/>
})
