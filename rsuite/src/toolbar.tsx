import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';
import SearchForm from './components/common/SearchForm';
import styled from '@emotion/styled'

const Header = styled.h4`
    display: flex; flex: 1;
    justify-content: space-between;
    align-items: baseline; max-width: 400;
    font-weight: normal;
    > * {
        flex: 1;
    }
`

const Subheader = styled.li`
    list-style: none;
    padding: 10px 0;
    font-weight: normal;
    cursor: pointer;
    border: none;
    min-width: 100%;
    font-size: 17px;
    text-align: left;
`

const ControlItem = styled.div` 
    color: white;
    cursor: grab;    
    margin: 0 5px;
    width: 200px;
    height: 100px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`

const ControlContainer = styled.div`    
    padding: 8px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    background-color: rgb(255 255 255 / 21%);
    &:hover{
        border: 2px solid #1262e2;
    }
`


const ControlsGroup = styled.div``

const Controls = styled.div`  
    display: flex;
`

interface ToolbarItem {
    key: string, title: string,
    control?: any, defaultValues?: any,
    items?: Array<ToolbarItem>,
    
}

interface ToolbarProps {
    builderControls: Array<ToolbarItem>,
    localization?: any,
}

interface ToolbarState {
    filtered: Array<ToolbarItem> | undefined,
}

export default class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    searchForm: React.RefObject<SearchForm> = React.createRef();

    constructor(props: ToolbarProps) {
        super(props);
        this.state = { ...this.state, filtered: undefined };
    }
    
    render() {
        return (
            <Droppable droppableId={"TOOLBAR"} isDropDisabled={true}>
                {({innerRef} : any) => (
                    <div ref={innerRef} className="formbuilder-toolbox">
                        <Header>
                            Elements
                            <SearchForm ref={this.searchForm}
                                    handleChange={this.handleSearchChange.bind(this)}/>
                        </Header>
                        
                        {!!this.state.filtered &&
                            <Subheader>
                                {!this.state.filtered.length &&
                                <div className="formbuilder-toolbox-search-nothing">
                                    Not found<br/>
                                    <Button block
                                            onClick={() => this.searchForm.current?.reset()}>Reset</Button>
                                </div>
                                }
                            </Subheader>
                        }
                        {this.items()}                
                    </div>
                )}
            </Droppable>
        );
    }

    items = () => {
        const itemsMap = this.state.filtered || this.props.builderControls;

        return itemsMap?.map((parentItem, i) => <ControlsGroup>
            <Subheader key={(parentItem.key + i)}>
                {parentItem.title}
            </Subheader>
            <Controls> { parentItem.items?.map(this.controlItem) } </Controls>
        </ControlsGroup>)
    }

    controlItem = (item: ToolbarItem, index: number) => {
        const key = item.key + String(index);
        const Control = item?.control?.renderer ?? (() => 'none')
        return (
            <Draggable key={key} draggableId={key} index={index} disableInteractiveElementBlocking >
                {
                    (p: any, s : any) => {
                        const { isDragging } = s;
                        const control = (
                            <ControlContainer ref={p.innerRef} {...p.dragHandleProps} {...p.draggableProps}>
                                <Control {...item.defaultValues}
                                            style={{border: isDragging ? '2px solid #1262E2' : 'none'}}/>
                            </ControlContainer>
                        );

                        const mainContainer: any = document.getElementById('container');
                        const portal = ReactDOM.createPortal(control, mainContainer);
                        return <ControlItem> 
                            { isDragging ? portal : control }
                            { this.props?.localization?.[item.key] ?? item.title }
                        </ControlItem>
                    }
                }
            </Draggable>
        )
    }

    handleSearchChange(value: string) {
        const isMatch = (el: any) => !el.separator && el.title.toLowerCase().includes(value);
        const filtered: Array<ToolbarItem> = [{
            key: '__filtered',
            title: 'Filtered',
            items: this.props.builderControls.flatMap((group: any) => group.items).filter(isMatch),
        }];
        this.setState({
            filtered: value ? filtered : undefined
        });
    }

}
