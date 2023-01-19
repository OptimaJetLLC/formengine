import {observer} from 'mobx-react'
import {useStore} from '../../../utils/contexts/StoreContext'
import {CodeEditor} from '../../calculation/components/CodeEditor'

const _JsonView = () => {
  const store = useStore()
  const value = JSON.stringify(store.screen, null, 2)
  return <CodeEditor source={value} readonly={true}/>
}

export const JsonView = observer(_JsonView)
