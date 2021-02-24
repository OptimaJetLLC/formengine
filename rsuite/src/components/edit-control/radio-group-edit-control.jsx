import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class RadioGroupEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const dataColumns = [
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'radiogroupform') },
            { key: 'text', name: this.getLocalValue('datatextcolumn', 'Text', 'radiogroupform') }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'radiogroupform')}
                            value={data.key} onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'radiogroupform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <CollectionEditor key="data-elements"
                                  draggable={true}
                                  columns={dataColumns}
                                  label={this.getLocalValue('datafield', 'Data', 'radiogroupform')}
                                  name="data-elements"
                                  value={data['data-elements']}
                                  onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('groupdirectfield', 'Group direction', 'radiogroupform')}</label>
                    <Form.Radio name="direction"
                                label={this.getLocalValue('directionhorizontalfield', 'Horizontal', 'radiogroupform')}
                                value='g' checked={data.direction === undefined || data.direction === 'g'}
                                onChange={handleChange}/>
                    <Form.Radio name="direction"
                                label={this.getLocalValue('directionverticalfield', 'Vertical', 'radiogroupform')}
                                value='v' checked={data.direction === 'v'} onChange={handleChange}/>
                    <Form.Group>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'Read only', 'radiogroupform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
