import styled from '@emotion/styled'
import {Language, namedObserver} from '@react-form-builder/core'
import {toUpper} from 'lodash-es'
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

  const data = Object.entries(langData).map(([key, {code}]) => {
    return ({value: key, label: toUpper(code)} as ItemDataType<string>)
  })

  const handleSelect = (code: string) => onSelect(langData[code])

  return <SPicker value={value} data={data} onSelect={handleSelect} cleanable={false} placement={'autoVerticalEnd'} size={'sm'}
                  searchable={false} width={62} renderMenuItem={(_, {value}) => !!value && renderLanguageItem(langData[value])}/>
})

/**
 * The function that renders the languages list item.
 * @param language the language.
 * @returns the React element.
 */
export const renderLanguageItem = (language: Language) => {
  const {name, code} = language
  return <LanguageItem><label>{toUpper(code)}</label>{name}</LanguageItem>
}

const LanguageItem = styled.div`
  display: flex;
  gap: 10px;

  label {
    min-width: 20px;
    text-align: center;
    font-weight: bold;
  }
`

const SPicker = styled(FixedSelectPicker)`
  .rs-picker-toggle-value {
    color: var(--rs-btn-default-text) !important;
    line-height: 22px;
  }

  .rs-picker-toggle {
    background-color: var(--rs-btn-default-bg) !important;
    border: none;
    min-width: 30px;
  }
`
