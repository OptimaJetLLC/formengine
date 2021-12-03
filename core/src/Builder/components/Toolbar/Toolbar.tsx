import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled'
import {Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided} from "react-beautiful-dnd";
import {Button} from 'rsuite';
import SearchForm from '../SearchForm';
import {ToolbarItem, ToolbarItems} from "./Items";
import {ComponentDefinition} from "../../../features/annotation/types";
import _ from "lodash";
import {Centered} from "../../../components/UI/Containers";

interface ToolbarState {
    filtered?: ToolbarItem | null,
}

export class Toolbar extends React.Component<any, ToolbarState> {
    searchForm: React.RefObject<SearchForm> = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {filtered: null};
    }

    render() {
        return (
            <Droppable droppableId={"TOOLBAR"} isDropDisabled={true}>
                {(provided: DroppableProvided) => (
                    <Container ref={provided.innerRef}>
                        <Header>
                            <h4>Elements</h4>
                            <Centered>
                                <StyledSearch ref={this.searchForm} style={{maxWidth: 300}}
                                              handleChange={this.handleSearchChange.bind(this)}/>
                            </Centered>
                            <h4 style={{opacity: 0}}>Elements</h4>
                        </Header>

                        {this.state.filtered && !this.state.filtered.controls?.length &&

                        <Centered alignItems={"baseline"}>
                            <Subheader>Not found<br/></Subheader>
                            <Button style={{marginLeft: 20}} size={"xs"} onClick={() => {
                                this.setState({filtered: null})
                                this.searchForm.current?.reset()
                            }}>Reset</Button>
                        </Centered>
                        }
                        {this.items()}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        );
    }

    items = () => {
        const itemsMap = this.state.filtered?.controls?.length ? [this.state.filtered] : ToolbarItems;

        return itemsMap?.map((item: ToolbarItem, i: number) => <ControlsGroup key={(item.title + i)}>
            <Subheader>
                {item.title}
            </Subheader>
            <Controls> {item.controls?.map(this.controlItem)} </Controls>
        </ControlsGroup>)
    }

    controlItem = (control: ComponentDefinition<any>, index: number) => {
        const key = control.name + String(index);
        const ControlView = control?.view ?? (() => 'none')
        return (
            <Draggable key={key} draggableId={control.name} index={index} disableInteractiveElementBlocking>
                {
                    (p: DraggableProvided, s: DraggableStateSnapshot) => {
                        const {isDragging} = s;
                        const element = (
                            <ControlContainer ref={p.innerRef} {...p.dragHandleProps} {...p.draggableProps}>
                                <ControlView {...getDefaultValue(control)}
                                             style={{border: isDragging ? '2px solid #1262E2' : 'none'}}/>
                            </ControlContainer>
                        );

                        const mainContainer: any = document.getElementById('root');
                        const portal = ReactDOM.createPortal(element, mainContainer);
                        return <ControlItem>
                            {isDragging ? portal : element}
                            {this.props?.localization?.[control.name] ?? control.name}
                        </ControlItem>
                    }
                }
            </Draggable>
        )
    }

    handleSearchChange(value: string) {
        const isMatch = (el: ComponentDefinition<any>) =>
            el.name.toLowerCase().includes(value.toLowerCase());

        this.setState({
            filtered: {
                title: 'Filtered',
                controls: ToolbarItems.flatMap((item: any) => item.controls).filter(isMatch)
            }
        });
    }

}

function getDefaultValue(definition: ComponentDefinition<any>) {
    const props: any = {};

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        props[key] = props[key] ?? value.defaultValue
    })

    return props;
}

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

const ControlItem = styled.div`
  color: white;
  cursor: grab;
  margin: 7px 5px;
  min-width: 180px;
  max-width: 180px;
  height: 100px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`

const ControlContainer = styled.div`
  padding: 8px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: rgb(255 255 255 / 21%);

  &:hover {
    border: 2px solid #1262e2;
  }
`


const ControlsGroup = styled.div``

const Controls = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-flow: wrap;
`

export default Toolbar;
