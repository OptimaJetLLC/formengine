import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useActionData} from '../../../event/EventEditor/components/ActionList/ActionItem/contexts/ActionDataContext'
import {ArgumentName} from '../../../event/types'

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
