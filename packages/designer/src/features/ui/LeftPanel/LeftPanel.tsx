import type {BuilderMode} from '@react-form-builder/core'
import type {ComponentProps, ReactElement} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {Rows} from '../../components/Containers'
import {customizableObserver} from '../../customization'
import {Panel} from '../Panel'
import {FormViewerState} from './components/FormViewerState'
import {LeftPanelNav} from './components/LeftPanelNav'

const ViewerContent = () => (
  <Rows style={{marginTop: 55, paddingInlineStart: 5, minHeight: 80}}>
    <FormViewerState/>
  </Rows>
)

const leftPanelViews: Record<BuilderMode, ReactElement> = {
  'builder': <LeftPanelNav/>,
  'viewer': <ViewerContent/>
}

type LeftPanelProps = Omit<ComponentProps<typeof Panel>, 'placement'>

const RawLeftPanel = (props: LeftPanelProps) => {
  const store = useBuilderStore()
  const view = leftPanelViews[store.builderMode]

  return (
    <Panel {...props} placement="left">
      {view}
    </Panel>
  )
}

export const LeftPanel = customizableObserver('LeftPanel', RawLeftPanel)
