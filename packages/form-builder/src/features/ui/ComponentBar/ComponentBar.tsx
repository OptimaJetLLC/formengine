import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentDataProvider, ComponentStore, getKey, Model} from '@react-form-builder/core'
import {useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {ComponentMove} from '../../../utils/types'
import {AddedComponent} from '../../dnd'
import {useTranslationPart} from '../../localization/hooks'
import {SearchForm} from './components/SearchForm'

export interface DraggableProps {
  draggable?: boolean
  onAdd?: (source: ComponentMove) => void
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
  store.view.builderComponents.forEach(component => {
    if (!isMatch(component.model)) return

    const category = component.category || ''
    const components = byCategory[category] ?? []
    components.push(component.model)
    byCategory[category] = components
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
  const store = useBuilderStore()
  return (
    <ControlsGroup>
      {definitions.map(model => {
        const componentStore = new ComponentStore(model.type + ' ' + getKey(), model.type)
        return (
          <ComponentDataProvider
            key={model.name}
            value={{
              key: componentStore.key,
              store: componentStore,
              model: store.view.get(componentStore.type)
            }}
          >
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
  height: 100%;
  background-color: var(--rs-btn-default-bg);
`

const ControlsGroup = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 10px;
  padding-inline-end: 5px;
  padding-bottom: 15px;
`

const Header = styled.div`
  display: flex;
  flex: 0;
  justify-content: center;
  align-items: center;
  font-weight: normal;

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
  overflow-y: scroll;
  overflow-x: hidden;
`
