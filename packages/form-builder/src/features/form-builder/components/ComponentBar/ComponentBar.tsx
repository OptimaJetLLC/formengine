import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentDataProvider, ComponentMove, ComponentStore, Definition, useStore, useTranslationPart} from 'fb-core'
import {useState} from 'react'
import {getKey} from '../../../../utils/getKey'
import {AddedComponent} from '../../../dnd'
import {SearchForm} from './components/SearchForm'
import {ToolbarItem} from './Items'

export interface DraggableProps {
  draggable?: boolean
  onAdd?: (source: ComponentMove) => void
}

export const ComponentBar = (componentProps: DraggableProps) => {
  const store = useStore()
  const t = useTranslationPart('toolbar')
  const [filtered, setFiltered] = useState<ToolbarItem>()

  const handleSearchChange = (value: string) => {
    const isMatch = (el: Definition<any>) => el.name.toLowerCase().includes(value.toLowerCase())

    setFiltered({
      title: value ? '' : t('baseControls'),
      controls: store.props.view.all().filter(isMatch)
    })
  }

  const controls = !!filtered?.controls.length && <ControlsGroup>
    <Subheader>{filtered.title}</Subheader>
    <AddedComponents definitions={filtered.controls} {...componentProps}/>
  </ControlsGroup>


  return <div className={componentBar}>
    <Header>
      <SearchForm style={{maxWidth: 300}} onChange={handleSearchChange}/>
    </Header>
    {controls || <Subheader>{t('notFound')}</Subheader>}
  </div>
}

interface AddedComponentsProps extends DraggableProps {
  definitions: Definition<any>[]
}

const AddedComponents = ({definitions, ...componentProps}: AddedComponentsProps) => {
  const {props: {view}} = useStore()
  return (
    <Controls>
      {definitions.map(definition => {
        const componentStore = new ComponentStore(definition.type + ' ' + getKey(), definition.type)
        return (
          <ComponentDataProvider
            key={definition.name}
            value={{
              key: componentStore.key,
              componentStore,
              model: view.initModel(componentStore)
            }}
          >
            <AddedComponent {...componentProps}/>
          </ComponentDataProvider>
        )
      })}
    </Controls>
  )
}

const componentBar = css`
  display: flex;
  margin-bottom: 5px;
  flex-flow: wrap;
  overflow: hidden;
  gap: 10px;
`

const Controls = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 10px;
  padding-inline-end: 5px;
`

const Header = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: normal;

  > * {
    flex: 1;
  }
`

const Subheader = styled.li`
  list-style: none;
  padding: 10px 0;
  margin-top: 5px;
  font-weight: normal;
  cursor: pointer;
  border: none;
  font-size: 17px;
  text-align: left;
`

const ControlsGroup = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`
