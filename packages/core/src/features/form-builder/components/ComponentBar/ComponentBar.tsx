import {css} from '@emotion/css'
import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React, {useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {ComponentStore} from '../../../../stores/ComponentStore'
import {ComponentDataProvider} from '../../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {getKey} from '../../../../utils/getKey'
import {Definition} from '../../../define'
import {AddedComponent} from '../../../dnd'
import {SearchForm} from './components/SearchForm'
import {ToolbarItem} from './Items'

interface ComponentBarProps {

}

export const ComponentBar = (props: ComponentBarProps) => {
  const store = useStore()
  const {t} = useTranslation()
  const [filtered, setFiltered] = useState<ToolbarItem>()


  const handleSearchChange = (value: string) => {
    const isMatch = (el: Definition<any>) => el.name.toLowerCase().includes(value.toLowerCase())

    setFiltered({
      title: value ? '' : t('toolbar.baseControls'),
      controls: store.props.view.all().filter(isMatch)
    })
  }


  return <div className={componentBar}>
    <Header>
      <SearchForm style={{maxWidth: 300}} onChange={handleSearchChange}/>
    </Header>

    <FilteredComponents filtered={filtered}/>
  </div>
}

const FilteredComponents = observer(({filtered}: { filtered?: ToolbarItem }) => {

  if (!filtered?.controls.length) {
    return (
      <Subheader>
        <Trans i18nKey="toolbar.notFound">Not found</Trans>
      </Subheader>
    )
  }

  return (
    <ControlsGroup>
      <Subheader children={filtered.title}/>
      <AddedComponents definitions={filtered.controls}/>
    </ControlsGroup>
  )
})

interface AddedComponentsProps {
  definitions: Definition<any>[]
}

const AddedComponents = ({definitions}: AddedComponentsProps) => {
  const {props: {view}} = useStore()
  return (
    <Controls>
      {definitions.map(definition => {
        const componentStore = new ComponentStore(definition.type + ' ' + getKey(), definition.type)
        return (
          <ComponentDataProvider
            key={definition.name}
            value={{
              componentStore,
              model: view.getModel(componentStore)
            }}
          >
            <AddedComponent/>
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
  margin-bottom: 5px;
  flex-flow: wrap;
`

const Header = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
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
`
