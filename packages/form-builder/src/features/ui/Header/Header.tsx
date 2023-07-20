import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo.js'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo.js'
import {observer} from 'mobx-react'
import {IconButton} from 'rsuite'
import {FaIcon} from '../../components/Icons'
import {JsonViewButton} from './components/JsonViewButton'
import {LocalizationLanguagePicker} from './components/LocalizationLanguagePicker'
import {Menu} from './components/Menu'
import {ResolutionPicker} from './components/ResolutionPicker'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'

const Header = observer(() => {
  return (
    <Container>
      <LeftPart>
        <div>
          <Menu/>
          <IconButton onClick={_ => {
          }} disabled={true /*TODO !!store.canUndo*/}
                      icon={<FaIcon icon={faUndo as unknown as IconDefinition}/>}/>
          <IconButton onClick={_ => {
          }} disabled={true /*TODO !store.canRedo*/}
                      icon={<FaIcon icon={faRedo as unknown as IconDefinition}/>}/>
        </div>
      </LeftPart>

      <CenterPart>
        <LocalizationLanguagePicker/>
        <ToggleModeButton/>
      </CenterPart>

      <RightPart>
        <ResolutionPicker/>
        <JsonViewButton/>
        <ToggleTheme/>
      </RightPart>
    </Container>
  )
})

const LeftPart = styled.div``

const RightPart = styled.div`
  justify-content: flex-end;
  gap: 10px;
  padding-inline-end: 10px;
`

const CenterPart = styled.div`
  justify-content: center;
  gap: 10px;
`

const Container = styled.div`
  display: flex;
  padding: 10px 10px;

  & > * {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px
  }
`

export {Header}
