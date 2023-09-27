import {assign} from 'lodash-es'
import {observer} from 'mobx-react'
import {SelectPicker} from 'rsuite'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

const booleanData = [
  {label: 'True', value: 1},
  {label: 'False', value: 0}
]

//TODO use the same components for arguments and properties.
// These TODOs refer to inputNumber and to InputBindableText in substitution
export const InputBoolean = observer(({name}: InputProps) => {
  const data = useActionData()
  const booleanValue = data.args?.[name]
  const value = booleanValue === undefined ? undefined : booleanValue ? 1 : 0
  const handleChange = (value: string) => data.args = assign({}, data.args, {[name]: Boolean(value)})

  /* TODO
  * The undefined value for arguments and bool in particular is not implemented right now.
  * It is assumed that if the value can be undefined, then the value
  * of cleanable will be true and the value can be erased.

  * TODO
  * The implementation of Bindings for boolean is not a priority at the moment.
  * */

  return (
    <SelectPicker
      data={booleanData}
      searchable={false}
      cleanable={false}
      value={value}
      onSelect={handleChange}
    />
  )
})
