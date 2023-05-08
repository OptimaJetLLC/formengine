import styled from '@emotion/styled'
import {Fragment} from 'react'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {Model} from '../define'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {ComponentTree} from './ComponentTree'

const SDiv = styled.div`
  background: lightblue;
`

const SlotContent = () => {
  const {key} = useComponentData()
  const store = useStore()

  const slotCs = store.slotsContent?.[key]
  if (!slotCs) return null

  return <ComponentTree data={[slotCs]}/>
}

const SlotOutlet = () => {
  const {key} = useComponentData()
  const store = useStore()
  return store.isBuilderMode ? <SDiv>Template outlet '{key}'</SDiv> : <SlotContent/>
}

const SlotDropZone = () => {
  const {key} = useComponentData()
  const store = useStore()
  const viewerProps = useViewerProps()

  //todo render as dropzone/with wrapper inside template
  const Wrapper = viewerProps.slotWrapper || Fragment
  const slotCs = store.slotsContent?.[key]
  const wrappedContent = slotCs ? <SlotContent/> : <SDiv>Paste your components here! {key}</SDiv>
  return <Wrapper>{wrappedContent}</Wrapper>
}

const Slot = () => {
  const store = useStore()

  if (!store.isTemplateStore) return <SlotOutlet/>
  if (store.templateBuilderMode) return <SlotDropZone/>
  return <SlotContent/>
}

export const slotModel = new Model(Slot)
