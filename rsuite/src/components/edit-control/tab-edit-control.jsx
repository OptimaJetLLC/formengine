import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor, isUndefined } from 'optimajet-builder-shared';

export default class TabEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const panesChange = function (e, { name, value }) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (isUndefined(e.psid)) {
                        e.psid = 'id' + (new Date()).getTime();
                    }
                });
            }

            handleChange(e, { name, value });
        };

        const columns = [
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'tabform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('visibleConditioncolumn', 'Visible Condition', 'tabform')
            }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'tabform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="activePane" label={this.getLocalValue('activepanefield', 'Active Pane', 'tabform')}
                            value={data.activePane} onChange={handleChange}/>
            </Form.Group>
            <div className="field">
                <label>{this.getLocalValue('optionsfield', 'Options', 'menuform')}</label>
                <Form.Group>
                    <Form.Checkbox name="pointing" label={this.getLocalValue('pointingfield', 'Pointing', 'tabform')}
                                   checked={data.pointing} onChange={handleChange}/>
                    <Form.Checkbox name="secondary" label={this.getLocalValue('secondaryfield', 'Secondary', 'tabform')}
                                   checked={data.secondary} onChange={handleChange}/>
                    <Form.Checkbox name="tabular" label={this.getLocalValue('tabularfield', 'Tabular', 'tabform')}
                                   checked={data.tabular} onChange={handleChange}/>
                    <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'tabform')}
                                   checked={data.fluid} onChange={handleChange}/>
                    <Form.Checkbox name="vertical" label={this.getLocalValue('verticalfield', 'Vertical', 'tabform')}
                                   checked={data.vertical} onChange={handleChange}/>
                </Form.Group>
            </div>
            <CollectionEditor key="panes"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('panesfield', 'Panes', 'tabform')}
                              name="panes"
                              value={data['panes']}
                              onChange={panesChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onTabChange'];
    }
}
