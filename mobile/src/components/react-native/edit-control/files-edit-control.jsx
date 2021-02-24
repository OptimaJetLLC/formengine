import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';

export default class FilesEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const columns = [
            {
                key: 'property',
                name: this.getLocalValue('propertycolumn', 'File property', 'filecontrolform'),
                control: 'span'
            },
            { key: 'title', name: this.getLocalValue('titlecolumn', 'Column title', 'filecontrolform') },
            { key: 'field', name: this.getLocalValue('fieldcolumn', 'Table field', 'filecontrolform') },
            {
                key: 'showcolumn',
                name: this.getLocalValue('showpropertycolumn', 'Show property', 'filecontrolform'),
                control: 'checkbox'
            }
        ];

        return (<View>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', 'filecontrolform')} value={data.key}
                        onChange={handleChange('key')}/>
            <DWKitInput label={this.getLocalValue('iconFiletypes', 'Icon file types', 'filecontrolform')}
                        placeholder="*.png, *.jpg, *.gif"
                        value={data.iconFiletypes === undefined ? '' : data.iconFiletypes}
                        onChange={handleChange('iconFiletypes')}
            />
            <View>
                <DWKitCheckBox label={this.getLocalValue('showFiletypeIcon', 'Show file type icon', 'filecontrolform')}
                               checked={data.showFiletypeIcon} onChange={handleChange('showFiletypeIcon')}/>
                <DWKitCheckBox label={this.getLocalValue('autoProcessQueue', 'Auto process queue', 'filecontrolform')}
                               checked={data.autoProcessQueue} onChange={handleChange('autoProcessQueue')}/>
                <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'filecontrolform')}
                               checked={data.readOnly} onChange={handleChange('readOnly')}/>
                <DWKitCheckBox label={this.getLocalValue('usedropzonefield', 'Use dropzone', 'filecontrolform')}
                               checked={data.useDropzone} onChange={handleChange('useDropzone')}/>
            </View>
            <View>
                <DWKitInput label={this.getLocalValue('idfield', 'Id field', 'filecontrolform')}
                            value={data.idField} onChange={handleChange('idField')}/>

            </View>
            {/*todo implement*/}
            {/*<CollectionEditor key="columns" draggable disableAdd disableDelete columns={columns}*/}
            {/*                  label={this.getLocalValue('propertiesfield', 'File properties', 'filecontrolform')}*/}
            {/*                  name="columns" value={data.columns} onChange={handleChange}*/}
            {/*/>*/}
        </View>);
    }

    getEventsList() {
        return ['onChange', 'onDelete', 'onUploadSuccess', 'onUploadFail'];
    }
}
