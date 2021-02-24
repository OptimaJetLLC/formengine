import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import { CollectionEditor } from 'optimajet-builder-shared';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class CollectionEditorEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const columns = [
            { key: 'key', name: this.getLocalValue('keycolumn', 'Key', 'collectioneditorform') },
            { key: 'name', name: this.getLocalValue('namecolumn', 'Name', 'collectioneditorform') },
            {
                key: 'control',
                name: this.getLocalValue('controlcolumn', 'Control', 'collectioneditorform'),
                dataList: [{text: 'input'}, {text: 'checkbox'}, {text: 'span'}, {text: 'number'}, {text: 'file'}, {text: 'date'}, {text: 'datetime'}, {text: 'custom'}]
            },
            { key: 'width', name: this.getLocalValue('widthcolumn', 'Width', 'collectioneditorform') }
        ];

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'collectioneditorform')}
                            value={data.key} onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('idfield', 'Id field', 'collectioneditorform')}
                            value={data.idField} onChange={handleChange('idField')}/>
            </Row>
            <View style={builderStyles.formGroupEqual}>
                {/* <Row style={builderStyles.halfSize}>
                    //todo remove percentage, use flex only
                    <DWKitInput
                            label={this.getLocalValue('parentidfield', 'ParentId field', 'collectioneditorform')}
                            disabled={!data.hierarchical || data.childrenField} value={data.parentIdField}
                            onChange={handleChange('parentIdField')}/>
                    <DWKitInput
                            label={this.getLocalValue('childrenField', 'Children field', 'collectioneditorform')}
                            disabled={!data.hierarchical || data.parentIdField} value={data.childrenField}
                            onChange={handleChange('childrenField')}/>
                </Row> */}
            </View>
            <CollectionEditor key="columns"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('columnsfield', 'Columns', 'collectioneditorform')}
                              name="columns"
                              value={data['columns']}
                              height="200"
                              onChange={handleDataChange}
                              />
            <View>   
                <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'collectioneditorform')}</DWKitLabel>
                <View style={builderStyles.formGroupEqual}>
                    <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'ReadOnly', 'collectioneditorform')}
                                checked={data.readOnly} onChange={handleChange('readOnly')}/>
                    <DWKitCheckBox label={this.getLocalValue('draggablefield', 'Draggable', 'collectioneditorform')}
                                checked={data.draggable} onChange={handleChange('draggable')}/>
                    <DWKitCheckBox label={this.getLocalValue('disableAdd', 'Disable Add', 'collectioneditorform')}
                                checked={data.disableAdd} onChange={handleChange('disableAdd')}/>
                    {/* <DWKitCheckBox
                        label={this.getLocalValue('hierarchicalfield', 'Hierarchical', 'collectioneditorform')}
                        checked={data.hierarchical} onChange={handleChange('hierarchical')}/> */}
                    {/* <View>

                        <DWKitLabel>{data.hierarchical}</DWKitLabel>
                        <DWKitCheckBox
                            label={this.getLocalValue('collapseallfield', 'Collapse all', 'collectioneditorform')}
                            disabled={data.hierarchical !== true} checked={data.collapseAll}
                            onChange={handleChange('collapseAll')}/>
                    </View> */}
                </View>  
            </View>
        </Column>);
    }

    getEventsList() {
        return ['onChange', 'onAdd', 'onDelete', 'onCopy'];
    }
}
