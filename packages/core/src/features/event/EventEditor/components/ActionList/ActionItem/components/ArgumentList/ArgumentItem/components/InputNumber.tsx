import {assign} from 'lodash'
import {observer} from 'mobx-react'
import {InputGroup, InputNumber as RInputNumber} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

export const InputNumber = observer(({name}: InputProps) => {
  const data = useActionData()
  const value = Number(data.args?.[name] ?? 0)
  const handleChange = (value: string | number) => data.args = assign({}, data.args, {[name]: Number(value)})

  return (
    <InputGroup size={'sm'}>
      <RInputNumber value={value} onChange={handleChange}/>
    </InputGroup>
  )
})
