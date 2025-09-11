import styled from '@emotion/styled'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop.js'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile.js'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet.js'
import type {ViewMode} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {useCallback, useMemo} from 'react'
import {ButtonGroup, IconButton, Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {useTranslationPart} from '../../../localization/hooks'
import {JsonViewButton} from './JsonViewButton'
import {OrientationIcon} from './OrientationIcon'

const SDiv = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`

const resolutions: [ViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet]
]

const getColor = (active?: boolean) => active ? 'var(--rs-navs-selected)' : undefined

interface ResolutionButtonProps {
  value: ViewMode
  icon: any
}

const RawResolutionButton = ({value, icon}: ResolutionButtonProps) => {
  const store = useBuilderStore()

  const {viewMode} = store
  const isActive = value === viewMode

  const t = useTranslationPart('rightMenu.modes')
  const handleClick = useCallback(() => store.viewMode = value, [store, value])
  const tooltipContent = useMemo(() => <Tooltip>{t(value)}</Tooltip>, [t, value])
  const color = useMemo(() => getColor(isActive), [isActive])
  const faIcon = useMemo(() => <FaIcon icon={icon} color={color}/>, [icon, color])

  return <Whisper speaker={tooltipContent} placement={'bottom'}>
    <IconButton onClick={handleClick} icon={faIcon}/>
  </Whisper>
}

const ResolutionButton = namedObserver('ResolutionButton', RawResolutionButton)

const RawViewModes = (props: ComponentProps<typeof SDiv>) => {
  const store = useBuilderStore()
  const {viewMode, landscapeMode} = store
  const toggleOrientation = useCallback(() => store.landscapeMode = !landscapeMode, [store, landscapeMode])

  const orientationIcon = useMemo(() => <Icon as={OrientationIcon} color={getColor(landscapeMode)}/>, [landscapeMode])

  const resolutionButtons = useMemo(() => resolutions.map(([value, icon], index) => {
    return <ResolutionButton key={index} value={value} icon={icon}/>
  }), [])

  return <SDiv {...props}>
    {(viewMode === 'mobile' || viewMode === 'tablet') &&
      <IconButton onClick={toggleOrientation} icon={orientationIcon} size={'sm'}/>
    }
    <ButtonGroup size={'sm'}>
      {resolutionButtons}
      <JsonViewButton/>
    </ButtonGroup>
  </SDiv>
}

export const ViewModes = customizableObserver('ResolutionSelect', RawViewModes)
