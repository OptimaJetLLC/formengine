import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class RepeaterEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;

        const pagertype = [
            { value: '', text: this.getLocalValue('pagertypenonefield', 'None', 'repeaterform') },
            { value: 'server', text: this.getLocalValue('pagertypeserverfield', 'Server', 'repeaterform') },
        ];

        var stylesource_ps = "/*** Example Code ***/\ncolor:red;\npaddingTop:5px;";
        const visiblecondition_ps = 'data.Type == 1';
        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', "repeaterform")} value={data.key} onChange={handleChange} />
            <Form.Checkbox name="slider" label={this.getLocalValue('sliderfield', 'Slider', "repeaterform")} checked={data.slider} onChange={handleChange} />
            <Form.TextArea name="item-visibleCondition" label={this.getLocalValue('itemvisibleconditionfield', 'Item Visible Condition', 'repeaterform')} placeholder={visiblecondition_ps} value={data["item-visibleCondition"]} onChange={handleChange} />
            <Form.Input name="defaultSort" label={this.getLocalValue('defaultsortfield', 'Default sort', "repeaterform")} placeholder="Name ASC" value={data.defaultSort} onChange={handleChange} />
            <Form.Group>
              <Form.Dropdown name="pagerType" selection fluid label={this.getLocalValue('pagertypefield', 'Pagination type', "repeaterform")} placeholder="None" options={pagertype} value={data.pagerType} onChange={handleChange} />
              {data.pagerType == "server" && <Form.Input name="pageSize" placeholder="20" label={this.getLocalValue('pagesizefield', 'Page size', "repeaterform")} value={data.pageSize} onChange={handleChange} />}
              {data.pagerType == "server" && <Form.Input name="loadButtonLabel" label={this.getLocalValue('loadbuttonlabelfield', 'Load Button Label', "repeaterform")} value={data.loadButtonLabel} onChange={handleChange} />}
              {data.pagerType == "server" && <Form.Input name="noRecordsLabel" label={this.getLocalValue('norecordslabelfield', 'No Record Button Label', "repeaterform")} value={data.noRecordsLabel} onChange={handleChange} />}
            </Form.Group>
            <Form.Field>
              <label>{this.getLocalValue('childrenviewfield', 'Children Container View', "repeaterform")}</label>
              <Form.Group>
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewnonefield', 'None', "repeaterform")} value='' checked={!data.childrenView} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewrowsfield', 'Rows', "repeaterform")} value='rows' checked={data.childrenView === 'rows'} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewcolumnsfield', 'Columns', "repeaterform")} value='columns' checked={data.childrenView === 'columns'} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewcolumnswrapfield', 'Columns Wrap', "repeaterform")} value='columnswrap' checked={data.childrenView === 'columnswrap'} onChange={handleChange} />
                {data.childrenView && <div className={"formbuilder-container-" + data.childrenView } />}
              </Form.Group>
            </Form.Field>
            {data.childrenView && <Form.TextArea name="children-style-source" placeholder={stylesource_ps} label={this.getLocalValue('childrenstylefield', 'Children Container Style', "repeaterform")} value={data["children-style-source"]} onChange={handleChange} />}        
          </Form>);    
    }
}
