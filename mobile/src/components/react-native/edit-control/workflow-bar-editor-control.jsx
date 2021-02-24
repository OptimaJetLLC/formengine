import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class WorkflowBarEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        return (
            <Column>
                <Row>
                    <DWKitInput label={this.getLocalValue('namefield', 'Name', 'workflowform')} value={data.key}
                            onChange={handleChange('key')}/>
                    <DWKitInput label={this.getLocalValue('setstatebuttonfield', 'Set state button', 'workflowform')}
                            value={data.setStateButton} onChange={handleChange('setStateButton')}/>
                    <DWKitInput label={this.getLocalValue(
                                    'selectschemedropdownfield',
                                    'Select scheme dropdown',
                                    'workflowform')}
                                value={data.selectSchemeDropdown}
                                onChange={handleChange('selectSchemeDropdown')} disabled={data.blockSelectScheme}/>
                </Row>               
                <View>
                    <DWKitCheckBox label={this.getLocalValue('blocksetstatefield', 'Block SetState', 'workflowform')}
                                checked={Boolean(data.blockSetState)} onChange={handleChange('blockSetState')}/>
                    <DWKitCheckBox label={this.getLocalValue('blockcommandsfield', 'Block Commands', 'workflowform')}
                                checked={Boolean(data.blockCommands)} onChange={handleChange('blockCommands')}/>
                    <DWKitCheckBox
                        label={this.getLocalValue('blockloadparametersfield', 'Block load parameters', 'workflowform')}
                        checked={data.blockLoadParameters !== undefined ? data.blockLoadParameters : true}
                        onChange={handleChange('blockLoadParameters')}/>
                    <DWKitCheckBox label={this.getLocalValue(
                        'blockselectschemefield',
                        'Block select scheme',
                        'workflowform'
                    )} checked={data.blockSelectScheme} onChange={handleChange('blockSelectScheme')}/>
                </View>
            </Column>
        );
    }

    getEventsList() {
        return ['onCommandClick', 'onSetStateClick', 'onReceivedCommands', 'onSchemeSelected'];
    }
}
