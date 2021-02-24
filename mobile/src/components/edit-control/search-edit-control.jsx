import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';

export default class SearchEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        return (<View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'searchform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('placeholderfield', 'Placeholder', 'searchform')}
                            value={data.placeholder}
                            onChange={handleChange('placeholder')}/>
            </View>
            <DWKitInput label={this.getLocalValue('urlfield', 'Url', 'searchform')} value={data.url}
                        onChange={handleChange('url')}/>
            <DWKitCheckBox label={this.getLocalValue('categoryfield', 'Enable Categories', 'searchform')}
                           checked={Boolean(data.category)} onChange={handleChange('category')}/>
        </View>);
    }

    getEventsList() {
        return ['onSelect'];
    }
}
