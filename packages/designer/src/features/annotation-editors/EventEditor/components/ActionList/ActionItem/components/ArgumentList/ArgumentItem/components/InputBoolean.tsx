import {namedObserver} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {FixedSelectPicker} from '../../../../../../../../../ui/FixedSelectPicker'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

const booleanData = [
  {label: 'True', value: 1},
  {label: 'False', value: 0}
]

const _InputBoolean = ({name}: InputProps) => {
  const data = useActionData()
  const booleanValue = data.args?.[name]
  const value = booleanValue === undefined ? undefined : booleanValue ? 1 : 0
  const handleChange = (value: string) => data.args = assign({}, data.args, {[name]: Boolean(value)})

  return (
    <FixedSelectPicker
      data={booleanData}
      searchable={false}
      cleanable={false}
      value={value}
      onSelect={handleChange}
      width={'100%'}
    />
  )
}

export const InputBoolean = namedObserver('InputBoolean', _InputBoolean)
