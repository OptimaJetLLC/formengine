import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop.js'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile.js'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet.js'
import type {ViewMode} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useCallback, useMemo} from 'react'
import {ButtonGroup, IconButton, Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization/customizableObserver'
import {useTranslationPart} from '../../../localization/hooks'
import {JsonViewButton} from './JsonViewButton'
import {OrientationIcon} from './OrientationIcon'
import styles from './ViewModes.module.css'

const resolutions: [ViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet],
]

const getColor = (active?: boolean) => (active ? 'var(--rs-navs-selected)' : undefined)

interface ResolutionButtonProps {
  value: ViewMode
  icon: any
}

const RawResolutionButton = ({value, icon}: ResolutionButtonProps) => {
  const store = useBuilderStore()

  const {viewMode} = store
  const isActive = value === viewMode

  const t = useTranslationPart('rightMenu.modes')
  // eslint-disable-next-line react-hooks/immutability
  const handleClick = useCallback(() => (store.viewMode = value), [store, value])
  const tooltipContent = useMemo(() => <Tooltip>{t(value)}</Tooltip>, [t, value])
  const color = useMemo(() => getColor(isActive), [isActive])
  const faIcon = useMemo(() => <FaIcon icon={icon} color={color} />, [icon, color])

  return (
    <Whisper speaker={tooltipContent} placement={'bottom'}>
      <IconButton onClick={handleClick} icon={faIcon} />
    </Whisper>
  )
}

const ResolutionButton = namedObserver('ResolutionButton', RawResolutionButton)

const RawViewModes = (props: ComponentProps<'div'>) => {
  const store = useBuilderStore()
  const {viewMode, landscapeMode} = store
  // eslint-disable-next-line react-hooks/immutability
  const toggleOrientation = useCallback(() => (store.landscapeMode = !landscapeMode), [store, landscapeMode])

  const orientationIcon = useMemo(() => <Icon as={OrientationIcon} color={getColor(landscapeMode)} />, [landscapeMode])

  const resolutionButtons = useMemo(
    () =>
      resolutions.map(([value, icon], index) => {
        return <ResolutionButton key={index} value={value} icon={icon} />
      }),
    []
  )
  const t = useTranslationPart('rightMenu.modes')
  const tooltipContent = useMemo(() => <Tooltip>{t('orientation')}</Tooltip>, [t])

  return (
    <div {...props} className={cx(styles.root, props.className)}>
      {(viewMode === 'mobile' || viewMode === 'tablet') && (
        <Whisper speaker={tooltipContent} placement={'bottom'}>
          <IconButton onClick={toggleOrientation} icon={orientationIcon} size={'sm'} />
        </Whisper>
      )}
      <ButtonGroup size={'sm'}>
        {resolutionButtons}
        <JsonViewButton />
      </ButtonGroup>
    </div>
  )
}

export const ViewModes = customizableObserver('ResolutionSelect', RawViewModes)
