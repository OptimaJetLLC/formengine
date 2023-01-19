import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo'
import {observer} from 'mobx-react'
import {ButtonToolbar, IconButton} from 'rsuite'
import {FaIcon} from '../../../ui/Icons'
import {AddButton} from './components/AddButton'
import {Menu} from './components/Menu'
import {ResolutionPicker} from './components/ResolutionPicker'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'

const Header = observer(() => {
  return (
    <Container>
      <LeftPart>
        <ButtonToolbar>
          <Menu/>
          <AddButton/>
          <IconButton onClick={_ => {
          }} disabled={true /*TODO !!store.canUndo*/}
                      icon={<FaIcon icon={faUndo as unknown as IconDefinition}/>}/>
          <IconButton onClick={_ => {
          }} disabled={true /*TODO !store.canRedo*/}
                      icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>}/>
        </ButtonToolbar>
      </LeftPart>

      <CenterPart>
        <ResolutionPicker/>
        <ToggleModeButton/>
      </CenterPart>

      <RightPart>
        <ToggleTheme/>
      </RightPart>
    </Container>
  )
})

const LeftPart = styled.div``

const RightPart = styled.div`justify-content: flex-end;`

const CenterPart = styled.div`justify-content: center;`

const Container = styled.div`
  display: flex;

  & > * {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 4px
  }
`

export {Header}
