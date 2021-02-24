import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class MenuEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'target', name: this.getLocalValue('itemstargetcolumn', 'Target', 'menuform'), width: 150 },
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'menuform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('visibleConditioncolumn', 'Visible Condition', 'menuform')
            }
        ];
        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'menuform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="activeItem" label={this.getLocalValue('activeitemfield', 'Active Item', 'menuform')}
                            value={data.activeItem} onChange={handleChange}/>
            </Form.Group>
            <div className="field">
                <label>{this.getLocalValue('optionsfield', 'Options', 'menuform')}</label>
                <Form.Group>
                    <Form.Checkbox name="pointing" label={this.getLocalValue('pointingfield', 'Pointing', 'menuform')}
                                   checked={data.pointing} onChange={handleChange}/>
                    <Form.Checkbox name="secondary"
                                   label={this.getLocalValue('secondaryfield', 'Secondary', 'menuform')}
                                   checked={data.secondary} onChange={handleChange}/>
                    <Form.Checkbox name="tabular" label={this.getLocalValue('tabularfield', 'Tabular', 'menuform')}
                                   checked={data.tabular} onChange={handleChange}/>
                    <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'menuform')}
                                   checked={data.fluid} onChange={handleChange}/>
                    <Form.Checkbox name="vertical" label={this.getLocalValue('verticalfield', 'Vertical', 'menuform')}
                                   checked={data.vertical} onChange={handleChange}/>
                    <Form.Checkbox name="link" label={this.getLocalValue('linkfield', 'Link', 'menuform')}
                                   checked={data.link} onChange={handleChange}/>
                </Form.Group>
            </div>
            <CollectionEditor key="items"
                              draggable={true}
                              hierarchical={true}
                              childrenField="children"
                              columns={columns}
                              label={this.getLocalValue('itemsfield', 'Items', 'menuform')}
                              name="items"
                              value={data['items']}
                              onChange={handleChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
