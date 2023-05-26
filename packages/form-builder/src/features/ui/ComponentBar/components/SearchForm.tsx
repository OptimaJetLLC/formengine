import ClearIcon from '@rsuite/icons/Close.js'
import SearchIcon from '@rsuite/icons/Search.js'
import {CSSProperties, useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input, InputGroup} from 'rsuite'

interface SearchFormProps {
  onChange: (value: string) => void;
  style?: CSSProperties
  className?: string
}

export const SearchForm = ({style, className, onChange}: SearchFormProps) => {
  const [value, setValue] = useState<string>('')
  const Icon = value.length ? ClearIcon : SearchIcon
  const {t} = useTranslation()

  const clear = useCallback(() => setValue(''), [])

  useEffect(() => onChange(value), [value])

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
