import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class SearchEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;
        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'searchform')} value={data.key}
                        onChange={handleChange}/>
            <Form.Input name="url" label={this.getLocalValue('urlfield', 'Url', 'searchform')} value={data.url}
                        onChange={handleChange}/>
            <Form.Checkbox name="category"
                           label={this.getLocalValue('categoryfield', 'Enable Categories', 'searchform')}
                           checked={Boolean(data.category)} onChange={handleChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onSelect'];
    }
}
