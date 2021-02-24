import React from 'react';
import BaseEditControl from '../base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from '../dwkit/dwkit-input.jsx';
import { BaseControls, isUndefined } from 'optimajet-builder-shared';
import PropertyEditor from '../property-editor/property-editor';

export default class RnBaseEditControl extends BaseEditControl {

    getPropertyEditor() {
        const propsData = this.getControlModel();
        return new PropertyEditor(this, this.props.data['data-buildertype'], propsData);
    }

    getFormName() {
        return this.props.data['data-buildertype'] + 'form';
    }

    getControlModel() {
        const data = this.props.data;
        if (isUndefined(data['control-model']) || data['control-model'] === null) {
            data['control-model'] = {};
        }
        return data['control-model'];
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const propertyEditor = this.getPropertyEditor();

        return (<View>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', propertyEditor.getFormName())}
                        value={data.key} onChange={handleChange('key')}/>
            {this.getDescriptionPart(propertyEditor)}
        </View>);
    }

    getDescriptionPart(propertyEditor) {
        return null;
    }

    convertStyle(dataKey, styleKey) {
        const controlModel = this.getControlModel();
        const newValue = {};
        if (controlModel[dataKey]) {
            BaseControls.getCustomStyle(controlModel[dataKey], newValue);
            controlModel[styleKey] = newValue;
        }
    }

}
