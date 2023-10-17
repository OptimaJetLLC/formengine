import {namedObserver} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {Input as RInput, InputGroup} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

export const InputString = namedObserver('InputString', ({name}: InputProps) => {
  const data = useActionData()
  const value = data.args?.[name]?.toString() ?? ''
  const handleChange = (value: string) => data.args = assign({}, data.args, {[name]: value})

  return (
    <InputGroup size={'sm'}>
      <RInput value={value} onChange={handleChange}/>
    </InputGroup>
  )
})
