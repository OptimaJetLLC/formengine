import styled from '@emotion/styled'
import type {Language} from '@react-form-builder/core'
import {namedObserver, toUpper} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo} from 'react'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import type {SelectProps} from 'rsuite/esm/SelectPicker'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FixedSelectPicker} from '../../ui/FixedSelectPicker'

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

/**
 * The function that renders the languages list item.
 * @param language the language.
 * @returns the React element.
 */
export const renderLanguageItem = (language: Language) => {
  const {name, code} = language
  return <LanguageItem><label>{toUpper(code)}</label>{name}</LanguageItem>
}

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

const RawLocalizationPicker = ({value, onSelect, ...props}: LocalizationPickerProps) => {
  const {availableLanguages} = useBuilderStore()

  const langData = useMemo(() => {
    return availableLanguages.reduce((result, language) => {
      result[language.fullCode] = language
      return result
    }, {} as Record<string, Language>)
  }, [availableLanguages])

  const data = useMemo(() => Object.entries(langData).map(([key, {code}]) => {
    return ({value: key, label: toUpper(code)} as ItemDataType<string>)
  }), [langData])

  const handleSelect = useCallback((code: string) => onSelect(langData[code]), [langData, onSelect])

  const renderMenuItem: SelectProps<string>['renderMenuItem'] = useCallback((_: ReactNode, {value}: ItemDataType) => {
    return !!value && renderLanguageItem(langData[value])
  }, [langData])

  return <SPicker {...props}
                  value={value}
                  data={data}
                  onSelect={handleSelect}
                  cleanable={false}
                  placement={'autoVerticalEnd'}
                  size={'sm'}
                  searchable={false}
                  width={62}
                  renderMenuItem={renderMenuItem}/>
}

export const LocalizationPicker = namedObserver('LocalizationPicker', RawLocalizationPicker)
