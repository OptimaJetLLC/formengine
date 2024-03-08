import styled from '@emotion/styled'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop.js'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile.js'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet.js'
import type {ViewMode} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import {ButtonGroup, IconButton, Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'
import {OrientationIcon} from './OrientationIcon'

const resolutions: [ViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet]
]

export const ResolutionPicker = customizableObserver('ResolutionSelect', props => {
  const store = useBuilderStore()
  const t = useTranslationPart('rightMenu.modes')
  const {viewMode, landscapeMode} = store
  const getColor = (active?: boolean) => active ? 'var(--rs-navs-selected)' : undefined
  const toggleOrientation = () => store.landscapeMode = !landscapeMode

  return <SDiv {...props}>
    {(viewMode === 'mobile' || viewMode === 'tablet') &&
      <IconButton onClick={toggleOrientation} icon={<Icon as={OrientationIcon} color={getColor(landscapeMode)}/>} size={'sm'}/>
    }
    <ButtonGroup size={'sm'}>
      {resolutions.map(([value, icon], index) => (
        <Whisper key={index} speaker={<Tooltip>{t(value)}</Tooltip>} placement={'bottom'}>
          <IconButton onClick={() => store.viewMode = value}
                      icon={<FaIcon icon={icon} color={getColor(value === viewMode)}/>}/>
        </Whisper>
      ))}
    </ButtonGroup>
  </SDiv>
})

const SDiv = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`
