import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { CollectionEditor, isDefined } from 'optimajet-builder-shared';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import builderStyles from '../../../builder-styles';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class DropdownEditControl extends BaseEditControl {

    constructor(props) {
        super(props);

        this.state.defaultValuePreferInt = true;
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);
        const dataElementsChange = function (e, { name, value }) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (isDefined(e.value) && isDefined(e.value.match) && e.value.match(/^-?\d+$/)) {
                        e.value = parseInt(e.value);
                    }
                });
            }

            handleDataChange(e, { name, value });
        };

        const dataColumns = [
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'dropdownform') },
            { key: 'text', name: this.getLocalValue('datatextcolumn', 'Text', 'dropdownform') }
        ];

        return (
            <Column>
                <Row>
                    <DWKitInput label={this.getLocalValue('namefield', 'Name', 'dropdownform')} value={data.key}
                                onChange={handleChange('key')}/>
                    <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'dropdownform')}
                                value={data.label} onChange={handleChange('label')}/>
                                
                    <DWKitInput label="Placeholder" value={data.placeholder}
                                onChange={handleChange('placeholder')}/>
                </Row>

                <View>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'dropdownform')}</DWKitLabel>
                    <View style={{flexDirection: 'row'}}>
                        <DWKitCheckBox label={this.getLocalValue('multiplefield', 'Multiple', 'dropdownform')}
                                        checked={data.multiple} onChange={handleChange('multiple')}/>
                        {/* <DWKitCheckBox label={this.getLocalValue('searchfield', 'Search', 'dropdownform')}
                                        checked={data.search} onChange={handleChange('search')}/> */}
                        {/* <DWKitCheckBox label={this.getLocalValue(
                            'allowAddItemsfield',
                            'Allow add items',
                            'dropdownform'
                        )} disabled={!(data.search && data.multiple)} checked={data.allowAddItems}
                                        onChange={handleChange('allowAddItems')}/> */}
                        {/* todo remove unused styles*/}
                        <DWKitCheckBox label={this.getLocalValue('clearablefield', 'Clearable')}
                                        checked={data.clearable} onChange={handleChange('clearable')}/>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'dropdownform')}
                                        checked={data.disabled} onChange={handleChange('disabled')}/>
                        <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'dropdownform')}
                                        checked={data.fluid} onChange={handleChange('fluid')}/>
                        <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'dropdownform')}
                                        checked={data.readOnly} onChange={handleChange('readOnly')}/>
                    </View>
                </View>

                <CollectionEditor
                        key="data-elements"
                        style={{flexGrow: 1}}
                        draggable={true}
                        columns={dataColumns}
                        label={this.getLocalValue('datafield', 'Data', 'dropdownform')}
                        name="data-elements"
                        value={data['data-elements']}
                        onChange={dataElementsChange}/>
            </Column>
        );
    }

    getEventsList() {
        return ['onClick', 'onChange'];
    }
}
