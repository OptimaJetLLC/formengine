import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class FormGroupEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        // const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);

        // const widthsItems = [
        //     { value: 'equal', label: this.getLocalValue('widthsequalfield', 'Equal', 'formgroupform') },
        //     { value: 'custom', label: this.getLocalValue('widthscustomfield', 'Custom (1 - 16)', 'formgroupform') },
        // ];

        const orientationItems = [
            { value: 'inline', label: this.getLocalValue('orientationcolumnsfield', 'Columns', 'formgroupform') },
            { value: 'grouped', label: this.getLocalValue('orientationrowsfield', 'Rows', 'formgroupform') },
            // { value: 'field', label: this.getLocalValue('orientationfieldfield', 'Field', 'formgroupform') },
        ];

        return (<Column>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', 'formgroupform')} value={data.key}
                        onChange={handleChange('key')}/>
            <DWKitRadioGroup label={this.getLocalValue('typefield', 'Type', 'formgroupform')}
                        items={orientationItems} selectedValue={data.orientation}
                        onChange={handleChange('orientation')}/>
            {/* <Row> //todo
                <DWKitRadioGroup label={this.getLocalValue('widthsfield', 'Widths', 'formgroupform')}
                                 items={widthsItems} selectedValue={data.widths} onChange={handleChange('widths')}/>
                <DWKitInput label={this.getLocalValue('widthscustomlabelfield', 'Rowss/Columns', 'formgroupform')}
                            disabled={data.widths !== 'custom'} placeholder="2"
                            value={data.widthsCustom} onChange={handleIntChange('widthsCustom')}/>
            </Row> */}
        </Column>);
    }
}
