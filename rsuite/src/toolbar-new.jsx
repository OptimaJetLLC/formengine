import React from 'react';
import { BaseToolbar, BuilderActions, isDefined, isUndefined } from 'optimajet-builder-shared';
import SearchForm from './components/common/SearchForm';
import ToolbarPanel from './components/common/ToolbarPanel';
import Grid from './components/common/Grid';
import { Button, Icon } from 'rsuite';
import $ from 'jquery';

export default class ToolbarNew extends BaseToolbar {

    constructor(props) {
        super(props);
        this.state = { ...this.state, filtered: undefined };
        this.searchForm = React.createRef();
    }

    onDragStart(item, e) {
        e.dataTransfer.setData('data', JSON.stringify({ key: item, new: true }));
    }

    onDrop(item, e) {
        // todo remove $
        const el = $(e.target);
        if (el.length > 0) {
            BuilderActions.add(item, el[0]);
        }

        this.onDragEnd(item);
        return false;
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
                                              {(expandedbock || this.state.filtered) && <Grid itemMinWidth="129px">
                                                  {
                                                      parentItem.items.map((item, index) => {
                                                          let title = item.title;
                                                          if (isDefined(me.props.localization) && isDefined(me.props.localization[item.key])) {
                                                              title = me.props.localization[item.key];
                                                          }

                                                          return (<li draggable="true"
                                                                      className="formbuilder-toolbox-control"
                                                                      key={(item.key + String(index))}
                                                                      onDragStart={this.onDragStart.bind(this, item)}
                                                                      onDoubleClick={this.onDoubleClick.bind(this, item)}>
                                                              <Icon icon="check2"/>
                                                              <div
                                                                  className="formbuilder-toolbox-control-text">{title}</div>
                                                          </li>);
                                                      })
                                                  }
                                              </Grid>
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
