import type {ComponentData, Model} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback, useMemo, useState} from 'react'
import {EmptyComponentCategory} from '../../../stores/EmptyComponentCategory'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {transformComponentNameToCssClass} from '../../../utils/transformComponentNameToCssClass'
import {AddedComponent} from '../../dnd/components/AddedComponent'
import {useTranslationPart} from '../../localization/hooks'
import styles from './ComponentBar.module.css'
import {SearchForm} from './components/SearchForm'
import type {DraggableProps} from './DraggableProps'
import {useComponentLibraryDescription} from './useComponentLibraryDescription'

const componentGroupStaticClassname = 'FE_Palette_ComponentGroup'

interface AddedComponentsProps extends DraggableProps {
  availableComponents: ComponentData[]
}

const RawAddedComponents = ({availableComponents, ...componentProps}: AddedComponentsProps) => {
  return (
    <div className={styles.controlsGroup}>
      {availableComponents.map(componentData => {
        return (
          <ComponentDataProvider key={componentData.id} value={componentData}>
            <AddedComponent {...componentProps}/>
          </ComponentDataProvider>
        )
      })}
    </div>
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
    const header = noCategory ? null : <label className={styles.subheader}>{getCategoryName(category)}</label>
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
    return <label className={styles.subheader}>{tToolbar('notFound')}</label>
  }

  return <div className={styles.content}>{result}</div>
}

const ControlGroups = namedObserver('ControlGroups', RawControlGroups)

/**
 * The ComponentBar React component properties.
 */
interface ComponentBarProps extends DraggableProps {
  /**
   * Additional CSS class name.
   */
  className?: string
}

/**
 * The React form builder component that displays all available components for use.
 * @param props the component properties.
 * @returns the React element.
 */
export const ComponentBar = (props: ComponentBarProps) => {
  const {className, ...componentProps} = props
  const [filtered, setFiltered] = useState<string>()

  return (
    <div className={cx(styles.componentBar, className)}>
      <div className={styles.header}>
        <SearchForm onChange={setFiltered} className={styles.search}/>
      </div>
      <ControlGroups {...componentProps} filter={filtered}/>
    </div>
  )
}
