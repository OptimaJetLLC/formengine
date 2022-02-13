import {ComponentDefinition} from "../../../features/annotation/types";
import styled from "@emotion/styled";
import SearchForm from "../SearchForm";
import React, {useRef, useState} from "react";
import {Trans} from "react-i18next";
import {Centered} from "../../../components/UI/Containers";
import {Button} from "rsuite";
import {ToolbarItem} from "./Items";
import {useStore} from "../../../utils/StoreContext";
import {DraggableComponent} from "../../../features/dnd/components/DraggableComponent";
import {ComponentDataProvider} from "../../../utils/ComponenDataContext";
import {ComponentStore} from "../../../stores/ComponentStore";
import {gen4Symbols} from "../../../utils/gen4Symbols";
import {observer} from "mobx-react";

interface ComponentBarProps {

}

export const ComponentBar = (props: ComponentBarProps) => {
    const searchForm = useRef<SearchForm | null>(null)
    const [filter, setFilter] = useState<ToolbarItem | null>(null)

    const handleSearchChange = (value: string) => {
        const isMatch = (el: ComponentDefinition<any>) =>
            el.name.toLowerCase().includes(value.toLowerCase());

        //TODO
        /*setFilter({
            title: 'Filtered',
            controls: ToolbarItems.flatMap((item) => item.controls).filter(isMatch)
        })*/

    }

    return <Container>
        <Header>
            <h4><Trans i18nKey="toolbar.elements">Elements</Trans></h4>
            <Centered>
                <StyledSearch ref={searchForm} style={{maxWidth: 300}}
                              handleChange={handleSearchChange}/>
            </Centered>
            <h4 style={{opacity: 0}}><Trans i18nKey="toolbar.elements">Elements</Trans></h4>
        </Header>

        {filter && filter.controls?.length &&
            <Centered alignItems={"baseline"}>
                <Subheader>
                    <Trans i18nKey="toolbar.notFound">Not found</Trans>
                    <br/>
                </Subheader>
                <Button style={{marginLeft: 20}} size={"xs"} onClick={() => {
                    setFilter(null)
                    searchForm.current?.reset()
                }}>
                    <Trans i18nKey="toolbar.reset">Reset</Trans>
                </Button>
            </Centered>
        }

        <Items filter={filter}/>
    </Container>
}

const Items = observer(({filter}: { filter: ToolbarItem | null }) => {
    const store = useStore()
    const itemsMap = filter?.controls.length ? [filter] : [
        {
            title: (<Trans i18nKey="toolbar.baseControls">Base controls</Trans>),
            controls: store.view.all()
        }
    ];

    return <>
        {itemsMap?.map((item: ToolbarItem, i: number) => <ControlsGroup key={(item.title + i)}>
            <Subheader>
                {item.title}
            </Subheader>
            <Controls>
                {item.controls.map((definition, index) => (
                    <ComponentDataProvider
                        key={definition.name}
                        componentStore={new ComponentStore(definition.name + " " + gen4Symbols(), definition.name)}>
                        <DraggableComponent/>
                    </ComponentDataProvider>
                ))}
            </Controls>
        </ControlsGroup>)}
    </>
})


const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 800px;
`

const StyledSearch = styled(SearchForm)`
  margin-left: 20px;
  flex: 1;
  justify-content: center;
  max-width: 200px;

  > * {
    color: white !important;
    background-color: transparent;
    margin-left: 0;
  }
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


const ControlsGroup = styled.div``

const Controls = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-flow: wrap;
`