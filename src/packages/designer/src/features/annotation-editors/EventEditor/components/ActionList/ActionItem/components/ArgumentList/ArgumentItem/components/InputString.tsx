import {namedObserver} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {useCallback} from 'react'
import {Input as RInput, InputGroup} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

const RawInputString = ({name}: InputProps) => {
  const data = useActionData()
  const value = data.args?.[name]?.toString() ?? ''

  const handleChange = useCallback((value: string) => {
    return data.args = assign({}, data.args, {[name]: value})
  }, [data, name])

  return (
    <InputGroup size={'sm'}>
      <RInput value={value} onChange={handleChange}/>
    </InputGroup>
  )
}

export const InputString = namedObserver('InputString', RawInputString)
