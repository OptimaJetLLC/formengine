import {Close as ClearIcon, Search as SearchIcon} from '@rsuite/icons'
import {CSSProperties, useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input, InputGroup} from 'rsuite'

interface SearchFormProps {
  onChange: (value: string) => void;
  style?: CSSProperties
  className?: string
}

/**
 * Search input.
 * @param props the React component properties.
 * @param props.style the CSS style.
 * @param props.className the CSS class name.
 * @param props.onChange callback to process the entered data.
 * @returns the React element.
 */
export const SearchForm = ({style, className, onChange}: SearchFormProps) => {
  const [value, setValue] = useState<string>('')
  const Icon = value.length ? ClearIcon : SearchIcon
  const {t} = useTranslation()

  const clear = useCallback(() => setValue(''), [])

  useEffect(() => onChange(value), [onChange, value])

  return (
    <InputGroup className={className} inside size="sm" style={style}>
      <Input
        onChange={setValue}
        placeholder={t('searchForm.search')}
        value={value}
        autoFocus
      />
      <InputGroup.Addon style={{cursor: 'pointer'}} onClick={clear} children={<Icon/>}/>
    </InputGroup>
  )
}
