import React from 'react';
import { BaseControlTree } from 'optimajet-builder-shared';
import SearchForm from './components/common/SearchForm'
import ToolbarPanel from './components/common/ToolbarPanel'
import { Tree, Icon } from 'rsuite';
import Split from 'react-split'
import $ from 'jquery';

export default class ControlTree extends BaseControlTree {
    constructor(props) {
        super(props);
    }

    onKeyDown = (e) => {        
        e.preventDefault();
        if (e.key === "Delete" || e.key === "Backspace") {
            this.onRemoveControl(this.state.selectedKey);
        }
    }

    render() {
        const { model, selectedKey } = this.state;
        return <div  onKeyDown={this.onKeyDown} className="formbuilder-control-tree">
            {this.props.show && <Tree value={selectedKey} style={{backgroundColor: "initial"}}
                data={model} valueKey="key" labelKey="key"
                onSelect={({key}) => this.select(key)}
                style={{maxHeight: "100%"}}
                defaultExpandAll tabIndex="0"
            />}
        </div>
    }
}
