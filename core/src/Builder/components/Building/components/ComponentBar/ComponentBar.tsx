import {ComponentDefinition} from "../../../../../features/annotation/types";
import styled from "@emotion/styled";
import {SearchForm} from "./components/SearchForm";
import React, {useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {ToolbarItem} from "./Items";
import {useStore} from "../../../../../utils/contexts/StoreContext";
import {AddedComponent} from "../../../../../features/dnd";
import {ComponentDataProvider} from "../../../../../utils/contexts/ComponenDataContext";
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {getKey} from "../../../../../utils/getKey";
import {observer} from "mobx-react";
import {css} from "@emotion/css";

interface ComponentBarProps {

}

export const ComponentBar = (props: ComponentBarProps) => {
    const store = useStore()
    const {t} = useTranslation();
    const [filtered, setFiltered] = useState<ToolbarItem>()


    const handleSearchChange = (value: string) => {
        const isMatch = (el: ComponentDefinition<any>) => el.name.toLowerCase().includes(value.toLowerCase());

        setFiltered({
            title: value ? "" : t("toolbar.baseControls"),
            controls: store.view.all().filter(isMatch)
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

    if (!filtered?.controls.length)
        return (
            <Subheader>
                <Trans i18nKey="toolbar.notFound">Not found</Trans>
            </Subheader>
        )

    return (
        <ControlsGroup>
            <Subheader children={filtered.title}/>
            <AddedComponents definitions={filtered.controls}/>
        </ControlsGroup>
    )
})

interface AddedComponentsProps {
    definitions: ComponentDefinition<any>[]
}

const AddedComponents = ({definitions}: AddedComponentsProps) => {

    return (
        <Controls>
            {definitions.map(definition => (
                <ComponentDataProvider
                    key={definition.name}
                    value={{
                        componentStore: new ComponentStore(definition.name + " " + getKey(), definition.name),
                        definition
                    }}

                >
                    <AddedComponent/>
                </ComponentDataProvider>
            ))}
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
