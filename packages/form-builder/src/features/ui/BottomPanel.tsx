import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditorPanel} from '../calculation/CodeEditorPanel'
import {Panel} from './Panel'

export const BottomPanel = observer(() => {
  const store = useBuilderStore()
  useEffect(() => {
    if (store.calculatedProperty?.componentKey) return
    store.setPanelVisible('bottom', true)
  }, [store.calculatedProperty])
  if (!store.calculatedProperty?.componentKey) return null

  return <Panel placement={'bottom'} hideCollapsed={false} collapsedSize={10} style={{padding: 0}}>
    <SDiv><CodeEditorPanel editableProperty={store.calculatedProperty} onClose={() => store.calculatedProperty = undefined}/></SDiv>
  </Panel>
})

const SDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
