import styled from '@emotion/styled'
import {Store} from '../../stores/Store'
import {namedObserver} from '../../utils'
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

/**
 * Form viewer slot metadata. **Internal use only.**
 */
export const slotModel = new Model(Slot, 'Slot', undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, 'slot')

const _SlotContent = ({parentStore}: { parentStore: Store }) => {
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
}

const SlotContent = namedObserver('SlotContent', _SlotContent)

const _SlotPlaceholder = () => {
  const {key} = useComponentData()
  return <SDiv>Slot: '{key}'</SDiv>
}

const SlotPlaceholder = namedObserver('SlotPlaceholder', _SlotPlaceholder)

const SDiv = styled.div`
  background-color: rgb(150, 150, 150, 25%);
  padding: 5px;
`
