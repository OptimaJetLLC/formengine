import {runInAction} from 'mobx'
import {useEffect} from 'react'
import {ComponentTreeProps} from '../../types'
import {namedObserver} from '../../utils'
import {useStore} from '../../utils/contexts/StoreContext'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {initForm} from '../validation/utils/initForm'
import {ComponentTreeProvider} from './ComponentTreeContext'
import {ComponentTreeItem} from './ComponentTreeItem'

export const ComponentTree = namedObserver('ComponentTree', ({parentStore, data}: ComponentTreeProps) => {
  const store = useStore()
  const props = useViewerProps()

  useEffect(() => {
    runInAction(() => initForm(data, store, props))
  }, [])

  return <>
    <ComponentTreeProvider value={ComponentTree}>
      {data.map((cs, index) => <ComponentTreeItem key={index} componentStore={cs} parentStore={parentStore}/>)}
    </ComponentTreeProvider>
  </>
})
