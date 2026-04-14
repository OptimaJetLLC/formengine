import {isUndefined, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {FixedSelectPicker} from '../../../../../../../../../ui/FixedSelectPicker'
import {useActionData} from '../../../../contexts/ActionDataContext'
import type {InputProps} from '../InputProps'

const booleanData = [
  {label: 'True', value: true},
  {label: 'False', value: false}
]

const RawInputBoolean = ({name}: InputProps) => {
  const data = useActionData()

  const handleChange = useCallback((value?: string) => {
    const newArgs = Object.assign({}, data.args)
    delete newArgs[name]
    if (!isUndefined(value)) {
      newArgs[name] = value
    }
    // eslint-disable-next-line react-hooks/immutability
    data.args = newArgs
  }, [data, name])

  const handleReset = useCallback(() => {
    handleChange(undefined)
  }, [handleChange])

  return (
    <FixedSelectPicker
      onClean={handleReset}
      data={booleanData}
      searchable={false}
      value={data.args?.[name] ?? ''}
      onSelect={handleChange}
      size={'sm'}
      width={'100%'}
    />
  )
}

export const InputBoolean = namedObserver('InputBoolean', RawInputBoolean)
