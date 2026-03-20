import {css, cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {ComponentData, Model} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver} from '@react-form-builder/core'
import {useCallback, useMemo, useState} from 'react'
import {EmptyComponentCategory} from '../../../stores/EmptyComponentCategory'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {transformComponentNameToCssClass} from '../../../utils/transformComponentNameToCssClass'
import {AddedComponent} from '../../dnd'
import {useTranslationPart} from '../../localization/hooks'
import {SearchForm} from './components/SearchForm'
import {useComponentLibraryDescription} from './useComponentLibraryDescription'

const searchFormStyle = {maxWidth: 300} as const

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

interface AddedComponentsProps extends DraggableProps {
  availableComponents: ComponentData[]
}

const RawAddedComponents = ({availableComponents, ...componentProps}: AddedComponentsProps) => {
  return (
    <ControlsGroup>
      {availableComponents.map(componentData => {
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

interface ControlGroupsProps extends DraggableProps {
  filter?: string
}

const RawControlGroups = (props: ControlGroupsProps) => {
  const {availableComponents} = useBuilderStore()
  const t = useTranslationPart('componentsList.categories')
  const tToolbar = useTranslationPart('toolbar')
  const getLibraryDescription = useComponentLibraryDescription()
  const {filter, ...componentProps} = props

  const getCategoryName = useCallback((category: string) => {
    return getLibraryDescription(libraryDescription => libraryDescription?.categories?.[category]?.name)
      || t(category)
      || category
  }, [getLibraryDescription, t])

  const isMatch = useCallback((el: Model) => {
    return filter ? el.name.toLowerCase().includes(filter.toLowerCase()) : true
  }, [filter])

  const filteredComponents = useMemo(() => {
    const result: Record<string, ComponentData[]> = {}
    const categories = Object.keys(availableComponents)
    const emptyCategoryIdx = categories.indexOf(EmptyComponentCategory)

    if (emptyCategoryIdx > -1) {
      categories.splice(emptyCategoryIdx, 1)
      categories.unshift(EmptyComponentCategory)
    }

    for (const category of categories) {
      const components = availableComponents[category]
      const filtered = components.filter(component => isMatch(component.model))
      if (filtered.length > 0) {
        result[category] = filtered
      }
    }
    return result
  }, [availableComponents, isMatch])

  const result = []

  for (const category in filteredComponents) {
    const noCategory = category === EmptyComponentCategory
    const header = noCategory ? null : <Subheader>{getCategoryName(category)}</Subheader>
    const className = noCategory ? 'top' : category
    result.push(
      <div key={category} className={cx([componentGroupStaticClassname, transformComponentNameToCssClass(className)])}
           data-testid={`${category}-palette-category`}>
        {header}
        <AddedComponents availableComponents={filteredComponents[category]} {...componentProps}/>
      </div>
    )
  }

  if (result.length === 0) {
    return <Subheader>{tToolbar('notFound')}</Subheader>
  }

  return <Content>{result}</Content>
}

const ControlGroups = namedObserver('ControlGroups', RawControlGroups)

/**
 * The React form builder component that displays all available components for use.
 * @param componentProps the component properties.
 * @returns the React element.
 */
export const ComponentBar = (componentProps: DraggableProps) => {
  const [filtered, setFiltered] = useState<string>()

  return <div className={componentBar}>
    <Header>
      <SearchForm style={searchFormStyle} onChange={setFiltered}/>
    </Header>
    <ControlGroups {...componentProps} filter={filtered}/>
  </div>
}
