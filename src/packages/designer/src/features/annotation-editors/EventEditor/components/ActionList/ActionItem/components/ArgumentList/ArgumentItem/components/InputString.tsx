import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Input as RInput, InputGroup} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

const RawInputString = ({name}: InputProps) => {
  const data = useActionData()
  const value = data.args?.[name]?.toString() ?? ''

  const handleChange = useCallback((value: string) => {
    const next = Object.assign({}, data.args)
    next[name] = value
    return (data.args = next as any)
  }, [data, name])

  return (
    <InputGroup size={'sm'}>
      <RInput value={value} onChange={handleChange}/>
    </InputGroup>
  )
}

export const InputString = namedObserver('InputString', RawInputString)
