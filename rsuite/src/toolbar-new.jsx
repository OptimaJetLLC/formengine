import ReactDOM from 'react-dom';
import { BaseToolbar, BuilderActions, isDefined, isUndefined } from 'optimajet-builder-shared';
import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Popover, Whisper } from 'rsuite';
import SearchForm from './components/common/SearchForm';
import ToolbarPanel from './components/common/ToolbarPanel';

export default class ToolbarNew extends BaseToolbar {

    constructor(props) {
        super(props);
        this.state = { ...this.state, filtered: undefined };
        this.searchForm = React.createRef();
    }
    
    render() {
        return (
            <div className="formbuilder-toolbox" style={{width: 1500, height: 900}}>
                <h4 style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'baseline' }}>
                    Elements
                    <SearchForm ref={this.searchForm}
                            handleChange={this.handleSearchChange.bind(this)}/>
                </h4>
                
                {!!this.state.filtered &&
                    <li className="formbuilder-toolbox-subheader">
                        {!this.state.filtered.length &&
                        <div className="formbuilder-toolbox-search-nothing">
                            Not found<br/>
                            <Button block
                                    onClick={() => this.searchForm.current.reset()}>Reset</Button>
                        </div>
                        }
                    </li>
                }
                {this.items()}                
            </div>
        );
    }

    items = () => {
        const me = this;
        const itemsMap = this.state.filtered || this.props.builderControls;        

        return itemsMap.map((parentItem, index) => <>
            <h5 style={{ flexGrow: 1 }} className="formbuilder-toolbox-subheader"
                key={(parentItem.key + String(index))}>
                {parentItem.title}
            </h5>
            <Droppable droppableId={"TOOLBAR"} isDropDisabled={true}>
                {({innerRef}) => (
                    <div ref={innerRef} className="group">
                        {
                            parentItem.items.map((item, index) => {
                                const key = item.key + String(index);
                                const Control = item?.control?.renderer ?? (_ => 'none')
                                return (
                                    <div className="text">
                                        <Draggable key={key} draggableId={key} index={index} >
                                            {
                                                (p, s) => {
                                                    const portal = document.getElementById('container');
                                                    const control =  <div  className="control" ref={p.innerRef} {...p.dragHandleProps} {...p.draggableProps}>
                                                        <Control {...item.defaultValues}/>
                                                    </div>;
                                                    return s.isDragging 
                                                        ? ReactDOM.createPortal(control, portal) 
                                                        : control;
                                                }
                                            }
                                        </Draggable>
                                        {me.props?.localization?.[item.key] ?? item.title}
                                    </div>
                                )
                            })
                        }
                    </div>
                    )}
            </Droppable>
        </>)
    }

    handleSearchChange(value) {
        const isMatch = el => !el.separator && el.title.toLowerCase().includes(value);
        const filtered = [{
            key: '__filtered',
            title: 'Filtered',
            items: this.props.builderControls.flatMap(group => group.items).filter(isMatch),
        }];
        this.setState({
            filtered: value ? filtered : undefined
        });
    }

}
