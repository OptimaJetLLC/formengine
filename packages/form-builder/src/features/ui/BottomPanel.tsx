import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {Nav} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditorPanel} from '../calculation/CodeEditorPanel'
import {LocalizationEditorPanel} from '../localization/LocalizationEditorPanel'
import {Panel} from './Panel'

export const BottomPanel = observer(() => {
  const getActive = () => {
    return builderStore.calculatedProperty?.property?.useFluentLocalization ? 'localization' : 'code'
  }
  const builderStore = useBuilderStore()
  const [active, setActive] = useState(getActive())
  useEffect(() => {
    if (!builderStore.calculatedProperty?.componentKey) return
    builderStore.setPanelVisible('bottom', true)
    setActive(getActive())
  }, [builderStore.calculatedProperty])
  const onSave = () => {
    if (builderStore.calculatedProperty?.property?.useFn) {
      builderStore.calculatedProperty.saveProperty({useFluentLocalization: false})
    } else if (builderStore.calculatedProperty?.property?.useFluentLocalization) {
      builderStore.calculatedProperty.saveProperty({useFn: false})
    }
  }

  if (!builderStore.calculatedProperty) {
    console.error('BottomPanel. calculatedProperty is undefined')
    return null
  }

  const calculable = builderStore.calculatedProperty.annotation.calculable
  const localizable = builderStore.calculatedProperty.annotation.localizable
  const codeEditorPanel = <CodeEditorPanel editableProperty={builderStore.calculatedProperty}
                                           onClose={() => builderStore.calculatedProperty = undefined} onSave={onSave}/>
  const localizationEditorPanel = <LocalizationEditorPanel editableProperty={builderStore.calculatedProperty}
                                                           onClose={() => builderStore.calculatedProperty = undefined} onSave={onSave}/>
  if (!localizable && !calculable) {
    console.error('BottomPanel. Both localizable and calculable')
    return null
  }

  return <Panel placement={'bottom'} hideCollapsed={false} collapsedSize={10} style={{padding: 0}}>
    <SDiv>
      {
        calculable && localizable ?
          <>
            <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
              <Nav.Item eventKey="code">Code</Nav.Item>
              <Nav.Item eventKey="localization">Fluent localization ({builderStore.localizationLanguage.name})</Nav.Item>
            </Nav>
            {active === 'code' ? codeEditorPanel : localizationEditorPanel}
          </>
          : localizable ? <>{localizationEditorPanel}</>
            : calculable ? <>{codeEditorPanel}</>
              : null
      }
    </SDiv>
  </Panel>
})

const SDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
