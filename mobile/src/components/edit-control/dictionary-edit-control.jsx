import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import { Icon } from 'react-native-elements';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class DictionaryEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const filterPlaceholder = '[{"column":"columnName","value":"columnValue","term":"="}]';
        const textPlaceholder = 'data.Name + \' \' + data.Email';

        const filterIcon = (<Icon {...builderStyles.dictionaryEditor.iconProps} onPress={() => {
            this.props.parent.handleChange.call(
                this.props.parent,
                undefined,
                { name: 'filters', value: filterPlaceholder }
            );
        }} name='lightbulb-o' type='font-awesome'/>);

        return (<View>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'dictionaryform')}
                            value={data.key} onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'dictionaryform')}
                            value={data.label} onChange={handleChange('label')}/>
            </Row>
            <Row>
                <DWKitInput label={this.getLocalValue('datamodelfield', 'Data model', 'dictionaryform')}
                            value={data.dataModel} onChange={handleChange('dataModel')}/>
                <DWKitInput label={this.getLocalValue('placeholderfield', 'Placeholder', 'dictionaryform')}
                            value={data.placeholder} onChange={handleChange('placeholder')}/>
            </Row>
            <Row>
                <DWKitInput
                        label={this.getLocalValue('columnsfield', 'Columns (Name ASC, Email)', 'dictionaryform')}
                        value={data.columns} onChange={handleChange('columns')}/>
                    <DWKitInput label={this.getLocalValue('textfield', 'Text expression', 'dictionaryform')}
                                value={data.text} onChange={handleChange('text')} placeholder={textPlaceholder}/>
                    <DWKitInput label={<DWKitLabel>{this.getLocalValue(
                        'filtersfield',
                        'Filters',
                        'dictionaryform'
                    )}{filterIcon}</DWKitLabel>}
                                value={data.filters} onChange={handleChange('filters')}
                                placeholder={filterPlaceholder}/>
                    <DWKitInput label={this.getLocalValue('pagesizefield', 'Page Size', 'dictionaryform')}
                                disabled={!data.paging} value={data.pageSize} placeholder="100"
                                onChange={handleChange('pageSize')}/>
            </Row>
            <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'dictionaryform')}</DWKitLabel>
            <View style={{flexDirection: 'row'}}>
                {/* todo remove unused styles*/}
                <View>
                    <DWKitCheckBox label={this.getLocalValue('pagingfield', 'Server pagination', 'dictionaryform')}
                                    checked={data.paging} onChange={handleChange('paging')}/>
                    <DWKitCheckBox label={this.getLocalValue('searchfield', 'Search', 'dictionaryform')}
                                    checked={data.search} onChange={handleChange('search')}/>
                    {/* <DWKitCheckBox label={this.getLocalValue('multiplefield', 'Multiple', 'dictionaryform')}
                                    checked={data.multiple} onChange={handleChange('multiple')}/> */}
                </View>
                <View>
                    <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'dictionaryform')}
                                    checked={data.readOnly} onChange={handleChange('readOnly')}/>
                    <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'dictionaryform')}
                                    checked={data.disabled} onChange={handleChange('disabled')}/>
                </View>
                <View>
                    <DWKitCheckBox label={this.getLocalValue('clearablefield', 'Clearable', 'dictionaryform')}
                                    checked={data.clearable} onChange={handleChange('clearable')}/>
                    {/* <DWKitCheckBox label={this.getLocalValue('selectionfield', 'Selection', 'dictionaryform')}
                                    checked={data.selection} onChange={handleChange('selection')}/> */}
                    <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'dictionaryform')}
                                    checked={data.fluid} onChange={handleChange('fluid')}/>
                </View>
            </View>           
        </View>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
