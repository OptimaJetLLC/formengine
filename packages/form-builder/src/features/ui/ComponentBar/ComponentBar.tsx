import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentData, ComponentDataProvider, ComponentStore, getKey, Model, useStore} from '@react-form-builder/core'
import {useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {AddedComponent} from '../../dnd'
import {useTranslationPart} from '../../localization/hooks'
import {SearchForm} from './components/SearchForm'

// todo rename to ComponentBarProps properties?
/**
 * Properties of the draggable component.
 */
export interface DraggableProps {
  draggable?: boolean
  onAdd?: (source: ComponentData) => void
}

interface ControlGroupsProps extends DraggableProps {
  filter?: string
}

const ControlGroups = (props: ControlGroupsProps) => {
  const store = useBuilderStore()
  const {filter, ...componentProps} = props
  const isMatch = filter
    ? (el: Model) => el.name.toLowerCase().includes(filter.toLowerCase())
    : (_: Model) => true

  const byCategory: Record<string, Model[]> = {}
  store.view.builderComponents
    .forEach(component => {
      if (!isMatch(component.model)) return

      const category = component.category || ''
      const components = byCategory[category] ?? []
      components.push(component.model)
      byCategory[category] = components
        .sort((a, b) => a.name.localeCompare(b.name))
    })

  const result = []
  let i = 0
  for (const category in byCategory) {
    result.push(
      <div key={i++}>
        {!filter && <Subheader>{category}</Subheader>}
        <AddedComponents definitions={byCategory[category]} {...componentProps}/>
      </div>
    )
  }
  if (!result) return null
  return <Content>{result}</Content>
}

// todo rename componentProps to props
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

const AddedComponents = ({definitions, ...componentProps}: AddedComponentsProps) => {
  const viewerStore = useStore()
  return (
    <ControlsGroup>
      {definitions.map((model, index) => {
        const componentStore = new ComponentStore(model.type + ' ' + getKey(), model.type)
        const componentData = viewerStore.createComponentData(componentStore)
        return (
          <ComponentDataProvider key={index} value={componentData}>
            <AddedComponent {...componentProps}/>
          </ComponentDataProvider>
        )
      })}
    </ControlsGroup>
  )
}

const componentBar = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  background-color: var(--rs-btn-default-bg);
`

const ControlsGroup = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 4px;
  margin-bottom: 15px;
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

const Subheader = styled.h6`
  list-style: none;
  padding-bottom: 10px;
  padding-inline: 4px;
  font-weight: normal;
  cursor: pointer;
  border: none;
  font-size: 17px;
  text-align: left;
`

const Content = styled.div`
  width: 100%;
  flex: 1;
  padding-inline: 4px 2px;
  overflow-y: auto;
`
