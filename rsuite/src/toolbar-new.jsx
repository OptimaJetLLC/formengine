import $ from 'jquery';
import { BaseToolbar, BuilderActions, isDefined, isUndefined } from 'optimajet-builder-shared';
import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Icon } from 'rsuite';
import SearchForm from './components/common/SearchForm';
import ToolbarPanel from './components/common/ToolbarPanel';

export default class ToolbarNew extends BaseToolbar {

    constructor(props) {
        super(props);
        this.state = { ...this.state, filtered: undefined };
        this.searchForm = React.createRef();
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

    render() {
        const me = this;
        let expandedbock = true;
        const itemsMap = this.state.filtered ? this.state.filtered : this.props.builderControls;

        return (
            <div className="formbuilder-rightbar" style={this.props.style}>
                <ToolbarPanel style={{ marginBottom: 15 }}
                              minimizable={true}
                              header={
                                  <>
                                      <h6 style={{ marginRight: 10 }}>Elements</h6>
                                      <SearchForm ref={this.searchForm}
                                                  handleChange={this.handleSearchChange.bind(this)}/>
                                  </>
                              }
                              content={
                                  <div className="formbuilder-toolbox">
                                      {this.state.filtered &&
                                      <li className="formbuilder-toolbox-subheader">
                                          Search results:
                                          {!this.state.filtered.length &&
                                          <div className="formbuilder-toolbox-search-nothing">
                                              Not found<br/>
                                              <Button block
                                                      onClick={() => this.searchForm.current.reset()}>Reset</Button>
                                          </div>
                                          }
                                      </li>
                                      }
                                      {itemsMap.map((parentItem, index) => {
                                          let iconName;
                                          let onclick;

                                          if (isUndefined(parentItem.isexpanded)) {
                                              const cookievalue = me.getCookie('toolbar_' + parentItem.key);
                                              parentItem.isexpanded = isDefined(cookievalue) ? (cookievalue === 'true') : parentItem.defaultopen;
                                          }

                                          if (parentItem.isexpanded) {
                                              expandedbock = true;
                                              onclick = me.onExpand.bind(me, parentItem, false);
                                              iconName = 'angle-down';
                                          } else {
                                              expandedbock = false;
                                              onclick = me.onExpand.bind(me, parentItem, true);
                                              iconName = 'angle-right';
                                          }

                                          return <>
                                              <h5 draggable="false" onClick={onclick} style={{ flexGrow: 1 }}
                                                  className="formbuilder-toolbox-subheader"
                                                  key={(parentItem.key + String(index))}>
                                                  <Icon icon={iconName}/>
                                                  {parentItem.title}
                                              </h5>
                                              {(expandedbock || this.state.filtered) && <Droppable droppableId={"TOOLBAR"} isDropDisabled={true}>
                                            {(cp) => (
                                                <div ref={cp.innerRef} className="formbuilder-toolbox-group">
                                                  {
                                                      parentItem.items.map((item, index) => {
                                                          let title = item.title;
                                                          if (isDefined(me.props.localization) && isDefined(me.props.localization[item.key])) {
                                                              title = me.props.localization[item.key];
                                                          }

                                                          return (
                                                            <Draggable key={(item.key + String(index))} draggableId={(item.key + String(index))} index={index}>
                                                            {(provided, snapshot) => (
                                                                <>
                                                                    <div className="formbuilder-toolbox-control"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                        <Icon icon='check2' />
                                                                        <div className="formbuilder-toolbox-control-text">{title}</div>
                                                                    </div>
                                                                    {snapshot.isDragging && (
                                                                        <div className="formbuilder-toolbox-control">
                                                                            <Icon icon='check2' />
                                                                            <div className="formbuilder-toolbox-control-text">{title}</div>
                                                                        </div>     
                                                                    )}
                                                                </>
                                                            )}
                                                        </Draggable>
                                                          );
                                                      })
                                                  }
                                               </div>
                                                )}
                                        </Droppable>
                                              }
                                          </>;
                                      })}
                                  </div>
                              }
                />
                {this.props.editForm}
            </div>
        );
    }

}
