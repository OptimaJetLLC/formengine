import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class CustomEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'customform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="type" label={this.getLocalValue('typefield', 'Control type', 'customform')}
                            value={data.type} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea key="props" label={this.getLocalValue('propsfield', 'Props', 'customform')} name="props"
                               value={data['props']}
                               onChange={handleChange}
                               rows={5}/>
                <Form.TextArea key="children" label={this.getLocalValue('childrenfield', 'Children', 'customform')}
                               name="children"
                               value={data['children']}
                               onChange={handleChange}
                               rows={5}/>
            </Form.Group>
        </Form>);
    }
}
