import styled from '@emotion/styled'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet'
import {BuilderViewMode, FaIcon, makeLabeledIconStyles, useBuilderStore, useTranslationPart} from 'fb-core'
import {observer} from 'mobx-react'
import {SelectPicker} from 'rsuite'

const resolutions: [BuilderViewMode, any][] = [
  ['desktop', faDesktop],
  ['mobile', faMobile],
  ['tablet', faTablet]
]

const SItemContainer = styled.div`
  ${makeLabeledIconStyles()};
`

type Item = {
  value: BuilderViewMode
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
  const t = useTranslationPart('rightMenu')
  const resolutionsItems = resolutions.map(([value, icon]) => ({value, label: t(value), icon}))
  const renderValue = (value: string) => renderItem(resolutionsItems.find(({value: itemValue}) => value === itemValue))

  return <SelectPicker value={store.viewMode} data={resolutionsItems}
                       onSelect={val => store.viewMode = val}
                       renderValue={renderValue} renderMenuItem={(_, item) => renderItem(item as Item)}
                       searchable={false} cleanable={false} appearance="subtle" size={'sm'}/>
})
