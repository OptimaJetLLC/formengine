import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import builderStyles from '../../builder-styles';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';

export default class TreePickerEditControl extends BaseEditControl {

    getStyleDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const styleSourcePs = '/*** Example Code ***/\ncolor:red;\npaddingTop:5;';

        return (<View key="styleDescriptionForm">
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('widthfield', 'Width')} placeholder="100"
                            value={data['style-width']} onChange={handleChange('style-width')}/>
                <DWKitInput label={this.getLocalValue('heightfield', 'Height')} placeholder="100"
                            value={data['style-height']} onChange={handleChange('style-height')}/>
            </View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('margintopfield', 'Margin Top')}
                            placeholder="0" value={data['style-marginTop']} onChange={handleChange('style-marginTop')}/>
                <DWKitInput label={this.getLocalValue('marginbottomfield', 'Margin Bottom')}
                            placeholder="0" value={data['style-marginBottom']}
                            onChange={handleChange('style-marginBottom')}/>
                <DWKitInput label={this.getLocalValue('marginleftfield', 'Margin Left')}
                            placeholder="0" value={data['style-marginLeft']}
                            onChange={handleChange('style-marginLeft')}/>
                <DWKitInput label={this.getLocalValue('marginrightfield', 'Margin Right')}
                            placeholder="0" value={data['style-marginRight']}
                            onChange={handleChange('style-marginRight')}/>
            </View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitTextArea label={this.getLocalValue('buttonstyle', 'Button style', 'treepickerform')}
                               placeholder={styleSourcePs} value={data['style-source']}
                               onChange={handleChange('style-source')}/>
                <DWKitTextArea label={this.getLocalValue('modalstyle', 'Modal style', 'treepickerform')}
                               placeholder={styleSourcePs} value={data['style-modalsource']}
                               onChange={handleChange('style-modalsource')}/>
            </View>
            <DWKitCheckBox label={this.getLocalValue('hiddenfield', 'Hidden')}
                           checked={data['style-hidden']} onChange={handleChange('style-hidden')}/>
        </View>);
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const textPlaceholder = 'data.Name + \' \' + data.Email';

        return (<View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'treepickerform')}
                            value={data.key} onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'treepickerform')}
                            value={data.label} onChange={handleChange('label')}/>
            </View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('datamodelfield', 'Data model', 'treepickerform')}
                            value={data.dataModel} onChange={handleChange('dataModel')}/>
                <DWKitInput label={this.getLocalValue('parentidfield', 'ParentId field', 'treepickerform')}
                            value={data.parentIdField} onChange={handleChange('parentIdField')}/>
            </View>
            <View style={builderStyles.formGroupEqual}>
                <View>
                    <DWKitInput label={this.getLocalValue(
                        'columnsfield',
                        'Columns (Name ASC, Email)',
                        'treepickerform'
                    )} value={data.columns} onChange={handleChange('columns')}/>
                    <DWKitInput label={this.getLocalValue('textfield', 'Text expression', 'treepickerform')}
                                value={data.text} onChange={handleChange('text')} placeholder={textPlaceholder}/>
                </View>
                <View>
                    <DWKitInput label={this.getLocalValue('pagesizefield', 'Page Size', 'treepickerform')}
                                disabled={!data.paging} value={data.pageSize} placeholder="100"
                                onChange={handleChange('pageSize')}/>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'treepickerform')}</DWKitLabel>
                    <View>
                        {/* todo remove unsupported styles*/}
                        <DWKitCheckBox label={this.getLocalValue('pagingfield', 'Server pagination', 'treepickerform')}
                                       checked={data.paging} onChange={handleChange('paging')}/>
                        <DWKitCheckBox label={this.getLocalValue('multiplefield', 'Multiple', 'treepickerform')}
                                       checked={data.multiple} onChange={handleChange('multiple')}/>
                        <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'treepickerform')}
                                       checked={data.fluid} onChange={handleChange('fluid')}/>
                        <DWKitCheckBox label={this.getLocalValue('selectionfield', 'Selection', 'treepickerform')}
                                       checked={data.selection} onChange={handleChange('selection')}/>
                    </View>
                    <View>
                        <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'treepickerform')}
                                       checked={data.readOnly} onChange={handleChange('readOnly')}/>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'treepickerform')}
                                       checked={data.disabled} onChange={handleChange('disabled')}/>
                        <DWKitCheckBox label={this.getLocalValue('clearablefield', 'Clearable', 'treepickerform')}
                                       checked={data.clearable} onChange={handleChange('clearable')}/>
                    </View>
                </View>
            </View>
        </View>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
