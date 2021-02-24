import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';
import builderStyles from '../../../builder-styles.js';

export default class RepeaterEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const pagerType = [
            { value: '', text: this.getLocalValue('pagertypenonefield', 'None', 'repeaterform') },
            { value: 'server', text: this.getLocalValue('pagertypeserverfield', 'Server', 'repeaterform') },
        ];

        const childrenViewItems = [
            { value: undefined, label: this.getLocalValue('childrenviewnonefield', 'None', "containerform") },            
            { value: 'rows', label: this.getLocalValue('childrenviewrowsfield', 'Rows', "containerform") },
            { value: 'columns', label: this.getLocalValue('childrenviewcolumnsfield', 'Columns', "containerform") },
            { value: 'columnswrap', label: this.getLocalValue('childrenviewcolumnswrapfield', 'Columns Wrap', "containerform") }
        ];
        var stylesource_ps = "/*** Example Code ***/\ncolor:red;\npaddingTop:5px;";

        const visibleConditionPs = 'data.Type == 1';
        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'repeaterform')} value={data.key}
                        onChange={handleChange('key')}/>
                 <DWKitInput label={this.getLocalValue('defaultsortfield', 'Default sort', 'repeaterform')}
                        placeholder="Name ASC" value={data.defaultSort} onChange={handleChange('defaultSort')}/>
            </Row>
            <Row>
                <DWKitRadioGroup label={this.getLocalValue('childrenviewfield', 'Children Container View', "containerform")}
                            items={childrenViewItems} selectedValue={data.childrenView} style={{flexDirection: 'row', flexGrow: 0.5}}
                            onChange={handleChange('childrenView')}/>
                <DWKitCheckBox label={this.getLocalValue('sliderfield', 'Slider', 'repeaterform')}
                            checked={data.slider} onChange={handleChange('slider')} style={{marginTop: 28, alignSelf: 'flex-start', marginLeft: 84}}/>
            </Row>
            
            <DWKitTextArea label={this.getLocalValue(
                'itemvisibleconditionfield',
                'Item Visible Condition',
                'repeaterform'
            )} placeholder={visibleConditionPs} value={data['item-visibleCondition']}
                           onChangeText={handleChange('item-visibleCondition')}/>
            
            <DWKitDropdown label={this.getLocalValue('pagertypefield', 'Pagination type', 'repeaterform')}
                           placeholder="None" options={pagerType} value={data.pagerType}
                           onChange={handleChange('pagerType')}/>
            <View>
                {data.pagerType === 'server' && <DWKitInput placeholder="20" label={this.getLocalValue(
                    'pagesizefield',
                    'Page size',
                    'repeaterform'
                )} value={data.pageSize} onChange={handleChange('pageSize')}/>}
                {data.pagerType === 'server' && <DWKitInput label={this.getLocalValue(
                    'loadbuttonlabelfield',
                    'Load Button Label',
                    'repeaterform'
                )} value={data.loadButtonLabel} onChange={handleChange('loadButtonLabel')}/>}
                {data.pagerType === 'server' && <DWKitInput label={this.getLocalValue(
                    'norecordslabelfield',
                    'No Record Button Label',
                    'repeaterform'
                )} value={data.noRecordsLabel} onChange={handleChange('noRecordsLabel')}/>}
            </View>

            {data.childrenView && <DWKitTextArea label={this.getLocalValue('childrenstylefield', 'Children Container Style', "containerform")}
                           placeholder={stylesource_ps} value={data['children-style-source']}
                           onChangeText={handleChange('children-style-source')}/>}
        </Column>);
    }
}
