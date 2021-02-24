import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class FilesEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
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

        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'filecontrolform')} value={data.key}
                        onChange={handleChange}/>
            <Form.Input name="iconFiletypes"
                        label={this.getLocalValue('iconFiletypes', 'Icon file types', 'filecontrolform')}
                        placeholder="*.png, *.jpg, *.gif"
                        value={data.iconFiletypes === undefined ? '' : data.iconFiletypes} onChange={handleChange}
            />
            <Form.Group>
                <Form.Checkbox name="showFiletypeIcon"
                               label={this.getLocalValue('showFiletypeIcon', 'Show file type icon', 'filecontrolform')}
                               checked={data.showFiletypeIcon} onChange={handleChange}/>
                <Form.Checkbox name="autoProcessQueue"
                               label={this.getLocalValue('autoProcessQueue', 'Auto process queue', 'filecontrolform')}
                               checked={data.autoProcessQueue} onChange={handleChange}/>
                <Form.Checkbox name="readOnly"
                               label={this.getLocalValue('readonlyfield', 'Read only', 'filecontrolform')}
                               checked={data.readOnly} onChange={handleChange}/>
                <Form.Checkbox name="useDropzone"
                               label={this.getLocalValue('usedropzonefield', 'Use dropzone', 'filecontrolform')}
                               checked={data.useDropzone} onChange={handleChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Input name="idField" label={this.getLocalValue('idfield', 'Id field', 'filecontrolform')}
                            value={data.idField} onChange={handleChange}/>

            </Form.Group>
            <CollectionEditor key="columns" draggable disableAdd disableCopy disableDelete columns={columns}
                              label={this.getLocalValue('propertiesfield', 'File properties', 'filecontrolform')}
                              name="columns" value={data.columns} onChange={handleChange}
            />
        </Form>);
    }

    getEventsList() {
        return ['onChange', 'onDelete', 'onUploadSuccess', 'onUploadFail'];
    }
}
