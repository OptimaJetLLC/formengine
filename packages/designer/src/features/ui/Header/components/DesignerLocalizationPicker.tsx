import {Language, useStore} from '@react-form-builder/core'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../../customization'
import {LocalizationPicker} from '../../../localization/components/LocalizationPicker'

export const DesignerLocalizationPicker = customizableObserver('LocalizationSelect', props => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const handleSelect = (language: Language) => {
    viewerStore.selectedLanguage = language
    builderStore.localizationLanguage = language
  }

  return <LocalizationPicker value={builderStore.localizationLanguage.fullCode} onSelect={handleSelect} {...props}/>
})
