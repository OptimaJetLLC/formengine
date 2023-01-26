import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {ArgumentName} from '../../../event/args'
import {useActionData} from '../../../event/EventEditor/components/ActionList/ActionItem/contexts/ActionDataContext'

export const useSyncText = (name: ArgumentName): [string, Dispatch<SetStateAction<string>>] => {
  function getInitialState() {
    return String(data.weakArgs?.[name] ?? '')
  }

  function useChangeConnectedData() {
    useEffect(() => {
      data.weakArgs = Object.assign({}, data.weakArgs, {[name]: value})
    }, [value])
  }

  const data = useActionData()
  const [value, setValue] = useState<string>(getInitialState)

  useChangeConnectedData()

  return [value, setValue]
}
