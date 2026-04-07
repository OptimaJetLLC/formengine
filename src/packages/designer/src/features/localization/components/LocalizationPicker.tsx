import type {Language} from '@react-form-builder/core'
import {namedObserver, toUpper} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo} from 'react'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import type {SelectProps} from 'rsuite/esm/SelectPicker'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FixedSelectPicker} from '../../ui/FixedSelectPicker'
import styles from './LocalizationPicker.module.css'

/**
 * The function that renders the languages list item.
 * @param language the language.
 * @returns the React element.
 */
export const renderLanguageItem = (language: Language) => {
  const {name, code} = language
  return (
    <div className={styles.languageItem}>
      <label>{toUpper(code)}</label>
      {name}
    </div>
  )
}

/**
 * LocalizationPicker React component properties.
 */
interface LocalizationPickerProps {
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

  return <FixedSelectPicker {...props}
                            value={value}
                            data={data}
                            onSelect={handleSelect}
                            cleanable={false}
                            placement={'autoVerticalEnd'}
                            size={'sm'}
                            searchable={false}
                            width={62}
                            renderMenuItem={renderMenuItem}
                            className={'subtle-style'}/>
}

export const LocalizationPicker = namedObserver('LocalizationPicker', RawLocalizationPicker)
