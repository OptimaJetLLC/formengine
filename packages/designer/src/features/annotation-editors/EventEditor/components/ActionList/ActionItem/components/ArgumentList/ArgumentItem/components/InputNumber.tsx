import {namedObserver} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {InputGroup, InputNumber as RInputNumber} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

export const InputNumber = namedObserver('InputNumber', ({name}: InputProps) => {
  const data = useActionData()
  const value = Number(data.args?.[name] ?? 0)
  const handleChange = (value: string | number) => data.args = assign({}, data.args, {[name]: Number(value)})

  return (
    <InputGroup size={'sm'}>
      <RInputNumber value={value} onChange={handleChange}/>
    </InputGroup>
  )
})
