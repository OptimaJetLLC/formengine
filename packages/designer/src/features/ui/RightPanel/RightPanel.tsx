import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {customizableObserver} from '../../customization/customizableObserver'
import type {PanelProps} from '../Panel'
import {Panel} from '../Panel'
import {PropertiesEditor} from './PropertiesEditor/PropertiesEditor'

const rightPanelViews = {
  builder: <PropertiesEditor />,
  viewer: null,
}

type RightPanelProps = Omit<PanelProps, 'placement'>

const RawRightPanel = (props: RightPanelProps) => {
  const store = useBuilderStore()
  const view = rightPanelViews[store.builderMode]

  return (
    <Panel {...props} placement="right">
      {view}
    </Panel>
  )
}

export const RightPanel = customizableObserver('RightPanel', RawRightPanel)
