import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {InputGroup, Input as RInput} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

const RawInputString = ({name}: InputProps) => {
  const data = useActionData()
  const arg = data.args?.[name]
  const value = !arg || typeof arg === 'object' ? '' : String(arg)

  const handleChange = useCallback(
    (value: string) => {
      const next = Object.assign({}, data.args)
      next[name] = value
      // eslint-disable-next-line react-hooks/immutability
      data.args = next as any
    },
    [data, name]
  )

  return (
    <InputGroup size={'sm'}>
      <RInput value={value} onChange={handleChange} />
    </InputGroup>
  )
}

export const InputString = namedObserver('InputString', RawInputString)
