import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {Store} from '../../stores/Store'
import {ComponentDataProvider, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {StoreProvider, useStore} from '../../utils/contexts/StoreContext'
import {Model} from '../define'
import {ViewerPropsProvider} from '../form-viewer/components/ViewerPropsContext'
import {useTemplate} from './templateModel'

const Slot = () => {
  const store = useStore()
  return store.parentStore
    ? <SlotContent parentStore={store.parentStore}/>
    : <SlotPlaceholder/>
}
Slot.displayName = 'Slot'

export const slotModel = new Model(Slot, 'Slot')

const SlotContent = observer(({parentStore}: { parentStore: Store }) => {
  const {key} = useComponentData()
  const {viewerProps, data, templateProps} = useTemplate()

  return (
    <StoreProvider value={parentStore}>
      <ViewerPropsProvider value={viewerProps}>
        <ComponentDataProvider value={data}>
          {templateProps[key]}
        </ComponentDataProvider>
      </ViewerPropsProvider>
    </StoreProvider>
  )
})

const SlotPlaceholder = observer(() => {
  const {key} = useComponentData()
  return <SDiv>Components slot: '{key}'</SDiv>
})

const SDiv = styled.div`
  background: lightblue;
  padding: 5px;
`
