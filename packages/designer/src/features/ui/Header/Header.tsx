import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo.js'
import * as faSave from '@fortawesome/free-solid-svg-icons/faSave.js'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo.js'
import {ButtonGroup, IconButton} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'
import {customizableObserver} from '../../customization'
import {DesignerLocalizationPicker} from './components/DesignerLocalizationPicker'
import {ErrorsPanel} from './components/ErrorsPanel'
import {JsonViewButton} from './components/JsonViewButton'
import {Menu} from './components/Menu'
import {ResolutionPicker} from './components/ResolutionPicker'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'
import {useSaveForm} from './components/useSaveForm'

const Toolbar = customizableObserver('Header_Toolbar', ButtonGroup)

const Header = customizableObserver('Header', props => {
  const builderStore = useBuilderStore()
  const onSave = useSaveForm()
  const undoer = builderStore.undoer
  const showErrorsPanel = false
  return (
    <Container {...props}>
      <LeftPart>
        <Menu/>
        <Toolbar size={'sm'}>
          {builderStore.formStorageEnabled &&
            <IconButton onClick={() => onSave()}
                        icon={<FaIcon icon={faSave as unknown as IconDefinition}/>} size={'sm'}/>
          }
          <IconButton onClick={() => undoer.undo()} disabled={!undoer.hasUndo}
                      icon={<FaIcon icon={faUndo as unknown as IconDefinition}/>} size={'sm'}/>
          <IconButton onClick={() => undoer.redo()} disabled={!undoer.hasRedo}
                      icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>} size={'sm'}/>

        </Toolbar>
      </LeftPart>

      <CenterPart>
        <ToggleModeButton/>
      </CenterPart>

      <RightPart>
        <ResolutionPicker/>
        <DesignerLocalizationPicker/>
        {showErrorsPanel && <ErrorsPanel/>}
        <JsonViewButton/>
        <ToggleTheme/>
      </RightPart>
    </Container>
  )
})

const LeftPart = styled.div``

const RightPart = styled.div`
  justify-content: flex-end;
`

const CenterPart = styled.div`
  justify-content: center;
  flex: 0;
`

const Container = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 10px;

  & > * {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px
  }
`

export {Header}
