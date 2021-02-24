import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { isUndefined } from 'optimajet-builder-shared';

export default class DropzoneEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;

        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'uploadform')} value={data.key}
                        onChange={handleChange}/>
            <Form.Input name="iconFiletypes"
                        label={this.getLocalValue('iconFiletypes', 'Icon file types', 'uploadform')}
                        placeholder="*.png, *.jpg, *.gif"
                        value={isUndefined(data.iconFiletypes) ? '' : data.iconFiletypes} onChange={handleChange}/>
            <Form.Group>
                <Form.Checkbox name="showFiletypeIcon"
                               label={this.getLocalValue('showFiletypeIcon', 'Show file type icon', 'uploadform')}
                               checked={data.showFiletypeIcon} onChange={handleChange}/>
                <Form.Checkbox name="autoProcessQueue"
                               label={this.getLocalValue('autoProcessQueue', 'Auto process queue', 'uploadform')}
                               checked={data.autoProcessQueue} onChange={handleChange}/>
                <Form.Checkbox name="addRemoveLinks"
                               label={this.getLocalValue('addRemoveLinks', 'Add remove links', 'uploadform')}
                               checked={data.addRemoveLinks} onChange={handleChange}/>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['success', 'fail'];
    }
}
