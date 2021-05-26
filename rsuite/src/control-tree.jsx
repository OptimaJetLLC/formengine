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
        // this.state = {...this.state, filtered: undefined};
        // this.searchForm = React.createRef();
    }

    onDragStart(item, e) {
        let selector = '.formbuilder-zone';
        e.dataTransfer.setData('text', '');

        if (isDefined(item.forContainerType)) {
            let cTypes = item.forContainerType.split(',');
            let subSelector = '';
            cTypes.forEach(function (c) {
                if (subSelector.length > 0) {
                    subSelector += ',';
                }
                subSelector += '[data-buildertype=\'' + c + '\'] > ' + selector;
            });
            selector = subSelector;
        }

        $(selector)
            .addClass('formbuilder-zone-active')
            .on('dragenter', this.onTargetDragEnter.bind(this, item, 'formbuilder-zone-select'))
            .on('dragleave', this.onTargetDragLeave.bind(this, item, 'formbuilder-zone-select'))
            .on('dragover', function (e) {
                e.preventDefault();
            })
            .on('drop', this.onDrop.bind(this, item));
    }

    onTargetDragEnter(item, css, e) {
        $(e.target).addClass(css);
    }

    onTargetDragLeave(item, css, e) {
        $(e.target).removeClass(css);
    }

    onDragEnd(item) {
        this.stop = false;
        const zones = $('.formbuilder-zone');

        zones.removeClass('formbuilder-zone-active');
        zones.removeClass('formbuilder-zone-select');
        zones.off();
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
        const {props} = this;
        const {model} = this.state;
        return <ToolbarPanel {...props}
                header={
                    <>                
                        <SearchForm ref={this.searchForm} items={this.state.items} handleChange={this.handleSearchChange.bind(this)}/>
                        <Icon className="formbuilder-clickable-icon" icon="close" onClick={props.onClose} size="lg" style={{marginLeft: 12, marginRight: -9}}/>
                    </>
                }
                content={
                    <div className="formbuilder-toolbox">
                        <Tree
                            data={model} valueKey="key" labelKey="key"
                            onSelect={({key}) => this.onSelect(key)}
                            draggable style={{maxHeight: "100%"}}
                            defaultExpandAll
                            onDrop={({ createUpdateDataFunction }, event) =>
                                this.setState({model: createUpdateDataFunction(model)})
                            }
                        />
                    </div>
                }
        />;
    }

}
