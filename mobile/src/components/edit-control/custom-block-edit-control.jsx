import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import { isDefined } from 'optimajet-builder-shared';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class CustomBlockEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        // todo test placeholder (source json worked)
        const sourceTypeItems = [
            { value: 'form', label: this.getLocalValue('sourcetypeformfield', 'Form name', 'customblockform') },
            { value: 'source', label: this.getLocalValue('sourcetypejsonfield', 'JSON source', 'customblockform') },
            { value: 'placeholder', label: this.getLocalValue('placeholderfield', 'Placeholder', 'customblockform') },
        ];
        let sourceTypeValue = data.sourceType ? data.sourceType : 'form';

        return (<Column>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'customblockform')}
                            value={data.key} onChange={handleChange('key')}/>
            <DWKitRadioGroup label={this.getLocalValue('sourcetypefield', 'Source type', 'customblockform')}
                                 items={sourceTypeItems} selectedValue={sourceTypeValue}
                                 onChange={handleChange('sourceType')} style={{flexDirection: 'row', flexGrow: 0.5}}/>
            <DWKitInput label={this.getLocalValue('formnamefield', 'Form name', 'customblockform')}
                        value={data.formname} onChange={handleChange('formname')}
                        disabled={isDefined(data.sourceType) && data.sourceType !== 'form'}/>
            <DWKitTextArea label={this.getLocalValue('sourcefield', 'JSON source', 'customblockform')}
                           placeholder={this.getLocalValue('sourceplaceholderfield', 'Insert JSON here', 'customblockform')}
                           value={data['source']} onChange={handleChange('source')}
                           disabled={data.sourceType !== 'source'}/>
        </Column>);
    }
}
