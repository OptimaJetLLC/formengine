import {isNumber, isUndefined, namedObserver} from '@react-form-builder/core'
import {Close} from '@rsuite/icons'
import {useCallback} from 'react'
import {InputGroup, InputNumber as RInputNumber} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

const RawInputNumber = ({name}: InputProps) => {
  const data = useActionData()
  const value = !isUndefined(data.args?.[name]) ? Number(data.args[name]) : ''

  const handleChange = useCallback((value: string | number | null) => {
    const newArgs = Object.assign({}, data.args)
    delete newArgs[name]
    if (typeof value === 'string' || isNumber(value)) {
      newArgs[name] = Number(value)
    }
    // eslint-disable-next-line react-hooks/immutability
    data.args = newArgs
  }, [data, name])

  const handleReset = useCallback(() => {
    handleChange(null)
  }, [handleChange])

  return (
    <InputGroup size={'sm'}>
      <RInputNumber value={value} onChange={handleChange} onReset={handleReset} size={'sm'}/>
      <InputGroup.Button onClick={handleReset}>
        <Close/>
      </InputGroup.Button>
    </InputGroup>
  )
}

export const InputNumber = namedObserver('InputNumber', RawInputNumber)
