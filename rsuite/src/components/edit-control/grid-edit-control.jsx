import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor, RadioGroup } from 'optimajet-builder-shared';

export default class GridEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const pagertype = [
            { value: '', text: this.getLocalValue('pagertypenonefield', 'None', 'gridform') },
            { value: 'server', text: this.getLocalValue('pagertypeserverfield', 'Server', 'gridform') },
        ];

        const editformtype = [
            { value: '', text: this.getLocalValue('editformtypedefaultfield', 'Default', 'gridform') },
            { value: 'modal', text: this.getLocalValue('editformtypemodalfield', 'Modal', 'gridform') },
            { value: 'sidebar', text: this.getLocalValue('editformtypesidebarfield', 'Sidebar', 'gridform') }
        ];

        const sidebarDirections = [
            { value: 'right', text: this.getLocalValue('editformsidebarderectionrightfield', 'Right', 'gridform') },
            { value: 'left', text: this.getLocalValue('editformsidebarderectionleftfield', 'Left', 'gridform') },
            //{ value: "bottom", text: this.getLocalValue('editformsidebarderectionbottomfield', 'Bottom', "gridform") }
        ];

        let columns = [
            { key: 'key', name: this.getLocalValue('keycolumn', 'Key', 'gridform') },
            { key: 'name', name: this.getLocalValue('namecolumn', 'Name', 'gridform') },
            {
                key: 'type',
                name: this.getLocalValue('typecolumn', 'Type', 'gridform'),
                dataList: ['', 'number', 'checkbox', 'date', 'datetime', 'time', 'custom']
            },
            { key: 'width', name: this.getLocalValue('widthcolumn', 'Width', 'gridform'), control: 'number' },
            {
                key: 'resizable',
                name: this.getLocalValue('resizablecolumn', 'Resizable', 'gridform'),
                control: 'checkbox'
            }
        ];

        const editTypeItems = [
            { key: 'form', text: 'Form', value: undefined },
            { key: 'flow', text: 'Flow', value: 'flow' }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'gridform')} value={data.key}
                            onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'gridform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="multiselect"
                                       label={this.getLocalValue('multiselectfield', 'Multiselect', 'gridform')}
                                       checked={data.multiselect} onChange={handleChange}/>
                        <Form.Checkbox name="disableSort"
                                       label={this.getLocalValue('disablesortfield', 'Disable sorting', 'gridform')}
                                       checked={data.disableSort} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Group widths="equal">
                        <RadioGroup
                            name="editType"
                            label={this.getLocalValue('edittypefield', 'Edit type', 'gridform')}
                            items={editTypeItems}
                            value={data.editType}
                            onChange={handleChange}>
                        </RadioGroup>
                        {data.editType !== 'flow' &&
                        <Form.Input name="editForm" label={this.getLocalValue('editformfield', 'Edit form', 'gridform')}
                                    disabled={data.inline == true} value={data.editForm} onChange={handleChange}/>}
                        {data.editType === 'flow' &&
                        <Form.Input name="editFlow" label={this.getLocalValue('editflowfield', 'Edit flow', 'gridform')}
                                    disabled={data.inline == true} value={data.editFlow} onChange={handleChange}/>}
                    </Form.Group>
                    <Form.Input name="rowKey" label={this.getLocalValue('rowkeyfield', 'Row key', 'gridform')}
                                value={data.rowKey} onChange={handleChange}/>
                    <Form.Input name="pageSize" label={this.getLocalValue('pagesizefield', 'Page size', 'gridform')}
                                value={data.pageSize} onChange={handleChange}/>
                    <Form.Input name="defaultSort"
                                label={this.getLocalValue('defaultsortfield', 'Default sort', 'gridform')}
                                placeholder="Name ASC" value={data.defaultSort} onChange={handleChange}/>
                </div>
                <div className="field">
                    <Form.Dropdown name="editFormShowType" selection fluid label={this.getLocalValue(
                        'editformshowtypefield',
                        'Edit form show type',
                        'gridform'
                    )} placeholder={editformtype[0].text} options={editformtype} value={data.editFormShowType}
                                   onChange={handleChange}/>
                    <Form.Dropdown name="sidebarDirection" selection fluid
                                   label={this.getLocalValue(
                                       'editformsidebardirectionfield',
                                       'Sidebar direction',
                                       'gridform'
                                   )}
                                   placeholder={sidebarDirections[0].text} options={sidebarDirections}
                                   value={data.sidebarDirection}
                                   onChange={handleChange} disabled={data.editFormShowType !== 'sidebar'}
                    />
                    <Form.Dropdown name="pagerType" selection fluid
                                   label={this.getLocalValue('pagertypefield', 'Pagination type', 'gridform')}
                                   placeholder="None" options={pagertype} value={data.pagerType}
                                   onChange={handleChange}/>
                    <Form.Input name="rowHeight" label={this.getLocalValue('rowheightfield', 'Row height', 'gridform')}
                                value={data.rowHeight} onChange={handleChange}/>
                    <Form.Input name="minHeight" label={this.getLocalValue('minheightfield', 'Min height', 'gridform')}
                                value={data.minHeight} onChange={handleChange}/>
                    <Form.Group widths="equal">
                        <Form.Checkbox name="autoHeight"
                                       label={this.getLocalValue('autoheightfield', 'Auto Height', 'gridform')}
                                       checked={Boolean(data.autoHeight)} onChange={handleChange}/>
                        <Form.Input name="offSet" label={this.getLocalValue('offsetfield', 'OffSet', 'gridform')}
                                    disabled={!Boolean(data.autoHeight)} value={data.offSet} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <div className="field">
                <CollectionEditor key="columns"
                                  draggable={true}
                                  columns={columns}
                                  label={this.getLocalValue('columnsfield', 'Columns', 'gridform')}
                                  name="columns"
                                  value={data['columns']}
                                  onChange={handleChange}/>
            </div>
        </Form>);
    }

    getEventsList() {
        return ['onRowClick', 'onRowDblClick', 'onSelectionChanged', 'onModalClosed'];
    }
}
