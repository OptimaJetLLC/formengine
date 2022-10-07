import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faRedo from '@fortawesome/free-solid-svg-icons/faRedo'
import * as faUndo from '@fortawesome/free-solid-svg-icons/faUndo'
import {observer} from 'mobx-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {ButtonToolbar, IconButton, SelectPicker} from 'rsuite'
import useLocalStorageState from 'use-local-storage-state'
import {FaIcon} from '../../../features/ui/Icons'
import {AddButton} from './components/AddButton'
import {Menu} from './components/Menu'
import {ToggleModeButton} from './components/ToggleModeButton'
import {ToggleTheme} from './components/ToggleTheme'

const resolutions = ['desktop', 'mobile']

const Header = observer(() => {
  const {t} = useTranslation()
  const resolutionsItems = resolutions.map(value => ({value, label: t('rightMenu.' + value)}))
  const [resolution, setResolution] = useLocalStorageState('resolution', {
    defaultValue: 'desktop'
  })

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
        <SelectPicker value={resolution} data={resolutionsItems} onSelect={setResolution}
                      searchable={false} cleanable={false} appearance="subtle" size={'sm'}/>
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
  flex: 1;

  & > * {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 4px
  }
`

export {Header}
