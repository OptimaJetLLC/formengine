import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class StatisticEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const sizedata = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        const datacolumns = [
            { key: 'label', name: this.getLocalValue('datakeycolumn', 'Label', 'statisticform') },
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'statisticform') }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'statisticform')} value={data.key}
                            onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'statisticform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="horizontal"
                                       label={this.getLocalValue('horizontalfield', 'Horizontal', 'statisticform')}
                                       checked={data.horizontal} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Group widths="equal">
                <CollectionEditor key="data-elements"
                                  columns={datacolumns}
                                  label={this.getLocalValue('datafield', 'Data', 'statisticform')}
                                  name="data-elements"
                                  value={data['data-elements']}
                                  onChange={handleChange}/>
                <Form.Dropdown name="size" selection fluid options={sizedata} placeholder={sizedata[0].text}
                               label={this.getLocalValue('sizefield', 'Size', 'statisticform')} value={data.size}
                               onChange={handleChange}/>
            </Form.Group>
        </Form>);
    }
}
