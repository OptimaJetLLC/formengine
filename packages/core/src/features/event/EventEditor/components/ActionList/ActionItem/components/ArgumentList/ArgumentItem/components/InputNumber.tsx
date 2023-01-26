import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {InputGroup, InputNumber as RInputNumber} from 'rsuite'
import {ArgumentName} from '../../../../../../../../args'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {InputProps} from '../InputProps'

export const InputNumber = ({name}: InputProps) => {
  const [value, setValue] = useSyncNumber(name)

  return (
    <InputGroup size={'sm'}>
      <RInputNumber value={value} onChange={value => setValue(value as number)}/>
    </InputGroup>
  )
}

const useSyncNumber = (name: ArgumentName): [number, Dispatch<SetStateAction<number>>] => {
  function getInitialState() {
    return Number(data.weakArgs?.[name])
  }

  function useChangeConnectedData() {
    useEffect(() => {
      data.weakArgs = Object.assign({}, data.weakArgs, {[name]: Number(value)})
    }, [value])
  }

  const data = useActionData()
  const [value, setValue] = useState<number>(getInitialState)
  useChangeConnectedData()

  return [value, setValue]
}
