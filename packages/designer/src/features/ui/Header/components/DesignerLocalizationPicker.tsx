import type {Language} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../../customization/customizableObserver'
import {LocalizationPicker} from '../../../localization/components/LocalizationPicker'

type DesignerLocalizationPickerProps = Omit<ComponentProps<typeof LocalizationPicker>, 'value' | 'onSelect'>

const RawDesignerLocalizationPicker = (props: DesignerLocalizationPickerProps) => {
  const builderStore = useBuilderStore()

  const handleSelect = useCallback(
    (language: Language) => {
      builderStore.applyDesignerLanguageSelection(language)
    },
    [builderStore]
  )

  return (
    <LocalizationPicker
      {...props}
      data-testid={'designer-form-language'}
      value={builderStore.viewer.selectedLanguage?.fullCode}
      onSelect={handleSelect}
    />
  )
}

export const DesignerLocalizationPicker = customizableObserver('LocalizationSelect', RawDesignerLocalizationPicker)
