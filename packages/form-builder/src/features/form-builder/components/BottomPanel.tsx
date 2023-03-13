import styled from '@emotion/styled'
import ResponsiveNav from '@rsuite/responsive-nav'
import {useBuilderStore, useTranslationPart} from 'fb-core'
import {observer} from 'mobx-react'
import {ReactNode, useEffect, useState} from 'react'
import {CodeEditorPanel} from '../../calculation/components/CodeEditorPanel'
import {JsonView} from './JsonView'
import {Panel} from './Panel'

type Pane = {
  key: string
  view: ReactNode
}

const jsonPane: Pane = {key: 'json', view: <JsonView/>}
const codePane: Pane = {key: 'code', view: <CodeEditorPanel/>}

export const BottomPanel = observer(() => {
  const store = useBuilderStore()
  const t = useTranslationPart('bottomPanel.panes')
  const show = () => store.setPanelVisible('bottom', true)

  const [activeKey, setActiveKey] = useState<any>('code')
  const [items, setItems] = useState<Pane[]>([jsonPane])

  useEffect(() => {
    const hasCalc = !!store.calculatedProperty?.componentKey

    setItems([jsonPane, ...hasCalc ? [codePane] : []])
    setActiveKey(hasCalc ? 'code' : 'json')

    if (hasCalc) show()
  }, [store.calculatedProperty])

  return <Panel placement={'bottom'} hideCollapsed={false} collapsedSize={36} style={{padding: 0}}>
    <div style={{flex: 0}}>
      <ResponsiveNav
        removable
        appearance="subtle"
        moreProps={{noCaret: true}}
        activeKey={activeKey}
        onSelect={setActiveKey}
      >
        {items.map(({key}) => (
          <ResponsiveNav.Item key={key} eventKey={key} onClick={show}>
            {t(key)}
          </ResponsiveNav.Item>
        ))}
      </ResponsiveNav>
    </div>
    <SDiv>{items.find(({key}) => key === activeKey)?.view}</SDiv>
  </Panel>
})

const SDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
