import React from 'react';
import { BuilderActions, BaseToolbar, isDefined, isUndefined } from 'optimajet-builder-shared';
import SearchForm from './components/common/SearchForm'
import ToolbarPanel from './components/common/ToolbarPanel'
import { Icon, Button } from 'rsuite';
import Split from 'react-split'
import $ from 'jquery';
export default class Toolbar extends BaseToolbar {
    constructor(props) {
        super(props);
        this.state = {...this.state, filtered: undefined};
        this.searchForm = React.createRef();
    }

    onDragStart(item, e) {
        e.dataTransfer.setData('data', JSON.stringify({key: item, new: true}));
    }

    onDrop(item, e) {
        const el = $(e.target);
        if (el.length > 0) {
            BuilderActions.add(item, el[0]);
        }

        this.onDragEnd(item);
        return false;
    }

    handleSearchChange(value) {
        const isMatch = el => !el.separator && el.title.toLowerCase().includes(value);
        this.setState({
            filtered: value
                ? this.state.items.filter(isMatch)
                : undefined
        });
    }

    render() {
        const me = this;
        let expandedbock = true;
        const items = this.state.filtered ? this.state.filtered : this.state.items;
        return (
            <Split className="formbuilder-rightbar"  style={{height: "calc(100vh - 80px)", flex: 1}}  sizes={[50, 50]} direction="vertical" cursor="row-resize" gutterAlign="center">
                <ToolbarPanel
                header={
                    <>
                       <h6 style={{marginRight: 10}}>Controls</h6>                    
                        <SearchForm ref={this.searchForm} items={this.state.items} handleChange={this.handleSearchChange.bind(this)}/>
                    </>
                }
                content={
                    <div className="formbuilder-toolbox">
                        <ul>
                            {this.state.filtered && 
                                <li className="formbuilder-toolbox-subheader">
                                    Search results:
                                    {!this.state.filtered.length && 
                                        <div className="formbuilder-toolbox-search-nothing">
                                            Not found<br/>
                                            <Button block onClick={() => this.searchForm.current.reset()}>Reset</Button>
                                        </div>
                                    }
                                </li>
                            }
                            {
                                items.map((item, index) => {
                                    let title = item.title;
                                    if (isDefined(me.props.localization) && isDefined(me.props.localization[item.key])) {
                                        title = me.props.localization[item.key];
                                    }

                                    if (item.separator) {
                                        let iconName;
                                        let onclick;

                                        if (isUndefined(item.isexpanded)) {
                                            const cookievalue = me.getCookie('toolbar_' + item.key);
                                            item.isexpanded = isDefined(cookievalue) ? (cookievalue === 'true') : item.defaultopen;
                                        }

                                        if (item.isexpanded) {
                                            expandedbock = true;
                                            onclick = me.onExpand.bind(me, item, false);
                                            iconName = 'angle down';
                                        }
                                        else {
                                            expandedbock = false;
                                            onclick = me.onExpand.bind(me, item, true);
                                            iconName = 'angle right';
                                        }

                                        return <li draggable="false" onClick={onclick}
                                                className="formbuilder-toolbox-subheader" key={(item.key + String(index))}>
                                            {title}
                                            <Icon name={iconName}/></li>;
                                    }

                                    if (expandedbock || this.state.filtered) {
                                        return (<li draggable="true" className="formbuilder-toolbox-control"
                                                    key={(item.key + String(index))}
                                                    onDragStart={this.onDragStart.bind(this, item)}
                                                    onDoubleClick={this.onDoubleClick.bind(this, item)}>
                                            <Icon icon='check2' />
                                            <div className="formbuilder-toolbox-control-text">{title}</div>
                                        </li>);
                                    }
                                })
                            }
                        </ul>
                    </div>
                }
            />                          
                {this.props.editForm}
            </Split>
        );
    }

}
