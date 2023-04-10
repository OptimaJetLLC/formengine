import styled from '@emotion/styled'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet'
import {Icon} from '@rsuite/icons'
import {ViewMode} from 'fb-core'
import {observer} from 'mobx-react'
import {IconButton, SelectPicker} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {makeLabeledIconStyles} from '../../../components/Containers'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'
import {OrientationIcon} from './OrientationIcon'

const resolutions: [ViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet]
]

const SItemContainer = styled.div`
  ${makeLabeledIconStyles()};
`

type Item = {
  value: ViewMode
  label: string
  icon: any
}

const renderItem = (item?: Item) => {
  if (!item) return null

  return <SItemContainer>
    <FaIcon icon={item.icon as any}/>
    {item.label}
  </SItemContainer>
}

export const ResolutionPicker = observer(() => {
  const store = useBuilderStore()
  const {viewMode, landscapeMode} = store
  const t = useTranslationPart('rightMenu')
  const resolutionsItems = resolutions.map(([value, icon]) => ({value, label: t(value), icon}))
  const renderValue = (value: string) => renderItem(resolutionsItems.find(({value: itemValue}) => value === itemValue))
  const toggleOrientation = () => store.landscapeMode = !landscapeMode

  return <SDiv>
    {(viewMode === 'mobile' || viewMode === 'tablet') &&
      <IconButton onClick={toggleOrientation} icon={<Icon as={OrientationIcon}/>} circle
                  appearance={landscapeMode ? 'primary' : 'default'} size={'sm'}/>
    }
    <SPicker value={viewMode} data={resolutionsItems} onSelect={val => store.viewMode = val}
             renderValue={renderValue} renderMenuItem={(_, item) => renderItem(item as Item)}
             searchable={false} cleanable={false} appearance="subtle" size={'sm'}/>
  </SDiv>
})

const SDiv = styled.div`
  display: flex;
  align-items: center;
`

const SPicker = styled(SelectPicker<string>)`
  .rs-picker-toggle-value {
    color: var(--rs-btn-default-text) !important;
  }
`
