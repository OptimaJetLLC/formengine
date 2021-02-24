import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { CollectionEditor, isUndefined } from 'optimajet-builder-shared';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class TabEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const panesChange = function (e, { name, value }) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (isUndefined(e.psid)) {
                        e.psid = 'id' + (new Date()).getTime();
                    }
                });
            }

            handleChange(e, { name, value });
        };

        const columns = [
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'tabform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('visibleConditioncolumn', 'Visible Condition', 'tabform')
            }
        ];

        const positionItems = [
            { value: 'top', label: this.getLocalValue('topfield', 'Top', 'tabform') },
            { value: 'bottom', label: this.getLocalValue('bottomfield', 'Bottom', 'tabform') },
            // { value: 'field', label: this.getLocalValue('orientationfieldfield', 'Field', 'formgroupform') },
        ];

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'tabform')} value={data.key}
                            onChange={handleChange('key')}/>
                {/*todo don't work in semantic? ask Betin*/}
                <DWKitInput label={this.getLocalValue('activepanefield', 'Active Pane', 'tabform')}
                            value={data.activePane} onChange={handleChange('activePane')}/>
            </Row>
            <CollectionEditor key="panes"
                    draggable={true}
                    columns={columns}
                    label={this.getLocalValue('panesfield', 'Panes', 'tabform')}
                    name="panes"
                    value={data['panes']}
                    onChange={panesChange}/>
           <DWKitRadioGroup label={this.getLocalValue('positionfield', 'Position', 'tabform')}
                            items={positionItems} selectedValue={data.position}
                            onChange={handleChange('position')} style={{flexDirection: 'row', flexGrow: 0.5}}/>
            {/* todo implement CollectionEditor*/}
            
        </Column>);
    }

    getEventsList() {
        return ['onTabChange'];
    }
}
