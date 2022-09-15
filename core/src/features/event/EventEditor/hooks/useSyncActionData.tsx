import _ from 'lodash'
import {observe} from 'mobx'
import {useLocalObservable} from 'mobx-react'
import {useEffect} from 'react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {WeakActionData} from '../../types'
import {toActionData} from '../../utils/toActionData'
import {toWeakActionData} from '../../utils/toWeakActionData'

/**
 * Return the shallow observable action data which connected with the stored weak action data: changing returned value change stored data.
 */
export const useSyncActionData = (weakData: WeakActionData) => {
  const store = useStore()
  const data = useLocalObservable(() => toActionData(weakData, store))

  useEffect(() => {
    const disposer = observe(data, () => {
      _.assign(weakData, toWeakActionData(data))
    })

    return () => disposer()
  }, [])

  return data
}
