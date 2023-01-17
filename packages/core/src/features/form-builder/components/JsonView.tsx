import {useStore} from '../../../utils/contexts/StoreContext'
import {CodeEditor} from '../../calculation/components/CodeEditor'

export const JsonView = () => {
  const store = useStore()
  const value = JSON.stringify(store.screen, null, 2)
  return <CodeEditor source={value} readonly={true}/>
}
