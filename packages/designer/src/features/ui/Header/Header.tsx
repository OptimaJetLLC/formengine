import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo.js'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo.js'
import {namedObserver} from '@react-form-builder/core'
import {ButtonGroup, IconButton} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {FaIcon} from '../../components/Icons'
import {ErrorsPanel} from './components/ErrorsPanel'
import {JsonViewButton} from './components/JsonViewButton'
import {LocalizationLanguagePicker} from './components/LocalizationLanguagePicker'
import {Menu} from './components/Menu'
import {ResolutionPicker} from './components/ResolutionPicker'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'

const Header = namedObserver('Header', () => {
  const builderStore = useBuilderStore()
  const undoer = builderStore.undoer
  return (
    <Container>
      <LeftPart>
        <Menu/>
        <ButtonGroup size={'sm'}>
          <IconButton onClick={() => undoer.undo()} disabled={!undoer.hasUndo}
                      icon={<FaIcon icon={faUndo as unknown as IconDefinition}/>} size={'sm'}/>
          <IconButton onClick={() => undoer.redo()} disabled={!undoer.hasRedo}
                      icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>} size={'sm'}/>

        </ButtonGroup>
      </LeftPart>

      <CenterPart>
        <ToggleModeButton/>
      </CenterPart>

      <RightPart>
        <ResolutionPicker/>
        <LocalizationLanguagePicker/>
        <ErrorsPanel/>
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
