import {isEmpty} from 'lodash-es'
import {useEffect} from 'react'
import {useActionData} from '../../../contexts/ActionDataContext'

// Delete arguments object on unmount if it is empty.
export const useClearableArguments = () => {
  const data = useActionData()

  useEffect(() => {
    return () => {
      if (isEmpty(data.args)) {
        delete data.args
      }
    }
  }, [])
}
