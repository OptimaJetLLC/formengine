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

    render() {
        const { model, selectedKey } = this.state;
        return <Tree className="formbuilder-control-tree" value={selectedKey}
                data={model} valueKey="key" labelKey="key"
                onSelect={({key}) => this.select(key)}
                style={{maxHeight: "100%"}}
                defaultExpandAll
        />
    }
}
