import _ from 'lodash/fp'
import {useEffect} from 'react'
import {useActionData} from '../../../contexts/ActionDataContext'

// Delete arguments object on unmount if it is empty.
export const useClearableArguments = () => {
  const data = useActionData()

  useEffect(() => {
    return () => {
      if (_.isEmpty(data.weakArgs)) {
        delete data.weakArgs
      }
    }
  }, [])
}
