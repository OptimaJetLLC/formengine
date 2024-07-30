import type {Language} from '@react-form-builder/core'
import {useStore} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../../customization'
import {LocalizationPicker} from '../../../localization/components/LocalizationPicker'

type DesignerLocalizationPickerProps = Omit<ComponentProps<typeof LocalizationPicker>, 'value' | 'onSelect'>

const RawDesignerLocalizationPicker = (props: DesignerLocalizationPickerProps) => {
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const handleSelect = useCallback((language: Language) => {
    viewerStore.selectedLanguage = language
    builderStore.localizationLanguage = language
  }, [builderStore, viewerStore])

  return <LocalizationPicker {...props} value={builderStore.localizationLanguage.fullCode} onSelect={handleSelect}/>
}

export const DesignerLocalizationPicker = customizableObserver('LocalizationSelect', RawDesignerLocalizationPicker)
