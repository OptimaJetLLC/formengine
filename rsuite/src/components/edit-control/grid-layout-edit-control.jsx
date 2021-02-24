import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor, isUndefined } from 'optimajet-builder-shared';

export default class GridLayoutEditControl extends BaseEditControl {

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
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'gridlayout') },
            { key: 'cssclass', name: this.getLocalValue('cssclass', 'CSS Class', 'gridlayout') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('visibleConditioncolumn', 'Visible Condition', 'gridlayout')
            }
        ];
        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'gridlayout')} value={data.key}
                        onChange={handleChange}/>
            <Form.Group>
                <Form.Input name="cols" label={this.getLocalValue('colsfield', 'Columns', 'gridlayout')}
                            placeholder={12} value={data.cols} onChange={handleChange}/>
            </Form.Group>
            <div className="field">
                <label>{this.getLocalValue('optionsfield', 'Options', 'gridlayout')}</label>
                <Form.Group>
                    <Form.Checkbox name="draggable"
                                   label={this.getLocalValue('draggablefield', 'Draggable', 'gridlayout')}
                                   checked={data.draggable} onChange={handleChange}/>
                    <Form.Checkbox name="resizable"
                                   label={this.getLocalValue('resizablefield', 'Resizable', 'gridlayout')}
                                   checked={data.resizable} onChange={handleChange}/>
                    <Form.Checkbox name="scroll" label={this.getLocalValue('scrollfield', 'Scroll', 'gridlayout')}
                                   checked={data.scroll} onChange={handleChange}/>
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
        return ['onLayoutChange'];
    }
}
