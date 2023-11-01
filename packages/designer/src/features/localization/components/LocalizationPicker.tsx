import styled from '@emotion/styled'
import {Language, namedObserver} from '@react-form-builder/core'
import {useMemo} from 'react'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FixedSelectPicker} from '../../ui/FixedSelectPicker'

/**
 * LocalizationPicker React component properties.
 */
export interface LocalizationPickerProps {
  /**
   * The full code of the selected language.
   */
  value: string
  /**
   * The callback function called when the selected language is changed.
   * @param language the selected language.
   */
  onSelect: (language: Language) => void
}

export const LocalizationPicker = namedObserver('LocalizationPicker', ({value, onSelect}: LocalizationPickerProps) => {
  const {availableLanguages} = useBuilderStore()
  const langData = useMemo(() => {
    return availableLanguages.reduce((result, language) => {
      result[language.fullCode] = language
      return result
    }, {} as Record<string, Language>)
  }, [availableLanguages])

  const data = Object.entries(langData).map(([key, language]) => {
    return ({value: key, label: language.name} as ItemDataType<string>)
  })

  const handleSelect = (code: string) => onSelect(langData[code])

  return <SPicker value={value} data={data} onSelect={handleSelect} cleanable={false} placement={'auto'} size={'sm'}
                  searchable={false} width={100}/>
})

const SPicker = styled(FixedSelectPicker<string>)`
  .rs-picker-toggle-value {
    color: var(--rs-btn-default-text) !important;
  }
`
