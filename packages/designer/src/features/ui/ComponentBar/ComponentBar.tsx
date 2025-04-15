import {css, cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {Model, ComponentData} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver} from '@react-form-builder/core'
import {useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {transformComponentNameToCssClass} from '../../../utils/transformComponentNameToCssClass'
import {AddedComponent} from '../../dnd'
import {useTranslationPart} from '../../localization/hooks'
import {createAddedComponentData} from './addedComponentData'
import {SearchForm} from './components/SearchForm'

const componentGroupStaticClassname = 'FE_Palette_ComponentGroup'

/**
 * Properties of the draggable component.
 */
export interface DraggableProps {
  /**
   * The flag of dragging the component, if true - the component is dragged, false - otherwise.
   */
  draggable?: boolean
  /**
   * The callback function called when a component needs to be added to a target component.
   * @param source the component to be added.
   */
  onAdd?: (source: ComponentData) => void

  /**
   * The callback function called when a component is double-clicked.
   */
  onDoubleClick?: (source: ComponentData) => void
}

interface ControlGroupsProps extends DraggableProps {
  filter?: string
}

const RawControlGroups = (props: ControlGroupsProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('componentsList.categories')
  const {filter, ...componentProps} = props
  const isMatch = filter
    ? (el: Model) => el.name.toLowerCase().includes(filter.toLowerCase())
    : (_: Model) => true

  const byCategory: Record<string, Model[]> = {}
  builderStore.builderComponents
    .forEach(component => {
      if (!isMatch(component.model)) return

      const category = component.category || ''
      const components = byCategory[category] ?? []
      components.push(component.model)
      byCategory[category] = components
        .sort((a, b) => a.name.localeCompare(b.name))
    })

  const result = []

  for (const category in byCategory) {
    result.push(
      <div key={category} className={cx([componentGroupStaticClassname, transformComponentNameToCssClass(category)])}>
        <Subheader>{t(category) || category}</Subheader>
        <AddedComponents definitions={byCategory[category]} {...componentProps}/>
      </div>
    )
  }

  if (result.length === 0) return null

  return <Content>{result}</Content>
}

const ControlGroups = namedObserver('ControlGroups', RawControlGroups)

/**
 * The React form builder component that displays all available components for use.
 * @param componentProps the component properties.
 * @returns the React element.
 */
export const ComponentBar = (componentProps: DraggableProps) => {
  const t = useTranslationPart('toolbar')
  const [filtered, setFiltered] = useState<string>()
  const controls = <ControlGroups {...componentProps} filter={filtered}/>

  return <div className={componentBar}>
    <Header>
      <SearchForm style={{maxWidth: 300}} onChange={setFiltered}/>
    </Header>
    {controls || <Subheader>{t('notFound')}</Subheader>}
  </div>
}

interface AddedComponentsProps extends DraggableProps {
  definitions: Model[]
}

const RawAddedComponents = ({definitions, ...componentProps}: AddedComponentsProps) => {
  const builderStore = useBuilderStore()

  return (
    <ControlsGroup>
      {definitions.map(model => {
        const componentData = createAddedComponentData(model, builderStore)
        return (
          <ComponentDataProvider key={componentData.id} value={componentData}>
            <AddedComponent {...componentProps}/>
          </ComponentDataProvider>
        )
      })}
    </ControlsGroup>
  )
}

const AddedComponents = namedObserver('AddedComponents', RawAddedComponents)

const componentBar = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
`

const ControlsGroup = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 4px;
  margin-top: 2px;
`

const Header = styled.div`
  display: flex;
  flex: 0;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  padding-inline-start: 4px;

  > * {
    flex: 1;
  }
`

const Subheader = styled.label`
  padding-inline: 4px;
  font-size: 16px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-inline: 4px 2px;
  overflow-y: auto;
`
