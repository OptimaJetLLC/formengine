import styled from '@emotion/styled'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop.js'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile.js'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet.js'
import {ViewMode} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {ButtonGroup, IconButton, Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'
import {OrientationIcon} from './OrientationIcon'

const resolutions: [ViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet]
]

export const ResolutionPicker = observer(() => {
  const store = useBuilderStore()
  const t = useTranslationPart('rightMenu.modes')
  const {viewMode, landscapeMode} = store
  const getColor = (active?: boolean) => active ? 'var(--rs-navs-selected)' : undefined
  const toggleOrientation = () => store.landscapeMode = !landscapeMode

  return <SDiv>
    <ButtonGroup size={'sm'}>
      {resolutions.map(([value, icon]) => (
        <Whisper speaker={<Tooltip>{t(value)}</Tooltip>} placement={'bottom'}>
          <IconButton onClick={() => store.viewMode = value}
                      icon={<FaIcon icon={icon} color={getColor(value === viewMode)}/>}/>
        </Whisper>
      ))}
    </ButtonGroup>
    {(viewMode === 'mobile' || viewMode === 'tablet') &&
      <IconButton onClick={toggleOrientation} icon={<Icon as={OrientationIcon} color={getColor(landscapeMode)}/>} size={'sm'}/>
    }
  </SDiv>
})

const SDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: max-content;
`
