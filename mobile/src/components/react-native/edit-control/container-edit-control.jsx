import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';

export default class ContainerEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const displayData = [
            { text: this.getLocalValue('displaynotsetfield', '(Not set)', 'containerform'), value: '' },
            { text: this.getLocalValue('displayflexfield', 'Flex', 'containerform'), value: 'flex' },
            { text: this.getLocalValue('displaynonefield', 'None', 'containerform'), value: 'none' },
        ];

        const verticalAlignOptions = [
            { text: this.getLocalValue('displaynotsetfield', '(Not set)', 'containerform'), value: '' },
            { text: this.getLocalValue('flexstretchfield', 'Stretch', 'containerform'), value: 'stretch' },
            { text: this.getLocalValue('flexcenterfield', 'Center', 'containerform'), value: 'center' },
            { text: this.getLocalValue('flexstartfield', 'Start', 'containerform'), value: 'flex-start' },
            { text: this.getLocalValue('flexendfield', 'End', 'containerform'), value: 'flex-end' },
        ];

        const horizontalAlignOptions = [
            { text: this.getLocalValue('displaynotsetfield', '(Not set)', 'containerform'), value: '' },
            { text: this.getLocalValue('flexcenterfield', 'Center', 'containerform'), value: 'center' },
            { text: this.getLocalValue('flexstartfield', 'Start', 'containerform'), value: 'flex-start' },
            { text: this.getLocalValue('flexendfield', 'End', 'containerform'), value: 'flex-end' },
            {
                text: this.getLocalValue('flexspacearoundfield', 'Space Around', 'containerform'),
                value: 'space-around'
            },
            {
                text: this.getLocalValue('flexspacebetweenfield', 'Space Between', 'containerform'),
                value: 'space-between'
            },
            {
                text: this.getLocalValue('flexspaceevenlyfield', 'Space Evenly', 'containerform'),
                value: 'space-evenly'
            },
        ];

        const childrenViewItems = [
            { value: undefined, label: this.getLocalValue('childrenviewnonefield', 'None', "containerform") },            
            { value: 'rows', label: this.getLocalValue('childrenviewrowsfield', 'Rows', "containerform") },
            { value: 'columns', label: this.getLocalValue('childrenviewcolumnsfield', 'Columns', "containerform") },
            { value: 'columnswrap', label: this.getLocalValue('childrenviewcolumnswrapfield', 'Columns Wrap', "containerform") }
        ];
        var stylesource_ps = "/*** Example Code ***/\ncolor:red;\npaddingTop:5px;";

        return (<Column>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', 'containerform')}
                        value={data.key} onChange={handleChange('key')}/>
            <DWKitRadioGroup label={this.getLocalValue('childrenviewfield', 'Children Container View', "containerform")}
                                         items={childrenViewItems} selectedValue={data.childrenView} style={{flexDirection: 'row', flexGrow: 0.5}}
                                         onChange={handleChange('childrenView')}/>
            {data.childrenView && <DWKitTextArea label={this.getLocalValue('childrenstylefield', 'Children Container Style', "containerform")}
                           placeholder={stylesource_ps} value={data['children-style-source']}
                           onChangeText={handleChange('children-style-source')}/>}
            {!data.childrenView && <DWKitDropdown options={displayData} placeholder={displayData[0].text}
                            label={this.getLocalValue('displayfield', 'Display', 'containerform')}
                            value={data['style-display']} onChange={handleChange('style-display')}/>}
            {!data.childrenView && data['style-display'] === 'flex' &&
            <Row>                
                <DWKitDropdown options={horizontalAlignOptions} placeholder={horizontalAlignOptions[0].text}
                               label={this.getLocalValue(
                                   'displayhorizontalalignfield',
                                   'Horizontal Align',
                                   'containerform'
                               )} value={data['style-display-horizontalalign']}
                               onChange={handleChange('style-display-horizontalalign')}/>
                <DWKitDropdown options={verticalAlignOptions} placeholder={verticalAlignOptions[0].text}
                               label={this.getLocalValue(
                                   'displayverticalalignfield',
                                   'Vertical Align',
                                   'containerform'
                               )} value={data['style-display-verticalalign']}
                               onChange={handleChange('style-display-verticalalign')}/>
            </Row>}
        </Column>);
    }

}
