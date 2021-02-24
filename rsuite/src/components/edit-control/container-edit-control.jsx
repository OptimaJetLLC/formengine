import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class ContainerEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const floatData = [
            { text: this.getLocalValue('floatnonefield', 'None', 'containerform'), value: '' },
            { text: this.getLocalValue('floatleftfield', 'Left', 'containerform'), value: 'left' },
            { text: this.getLocalValue('floatrightfield', 'Right', 'containerform'), value: 'right' },
            { text: this.getLocalValue('floatinheritfield', 'Inherit', 'containerform'), value: 'inherit' },
            { text: this.getLocalValue('floatinitialfield', 'Initial', 'containerform'), value: 'initial' }
        ];

        const displayData = [
            { text: this.getLocalValue('displaynotsetfield', '(Not set)', 'containerform'), value: '' },
            { text: this.getLocalValue('displayflexfield', 'Flex', 'containerform'), value: 'flex' },
            { text: this.getLocalValue('displayblockfield', 'Block', 'containerform'), value: 'block' },
            { text: this.getLocalValue('displayinlinefield', 'Inline', 'containerform'), value: 'inline' },
            { text: this.getLocalValue('displayflowfield', 'Flow', 'containerform'), value: 'flow' },
            { text: this.getLocalValue('displayflowrootfield', 'Flow-root', 'containerform'), value: 'flow-root' },
            { text: this.getLocalValue('displaytablefield', 'Table', 'containerform'), value: 'table' },
            { text: this.getLocalValue('displaygridfield', 'Grid', 'containerform'), value: 'grid' },
            { text: this.getLocalValue('displaycontentsfield', 'Contents', 'containerform'), value: 'contents' },
            {
                text: this.getLocalValue('displayinlineblockfield', 'Inline-block', 'containerform'),
                value: 'inline-block'
            },
            {
                text: this.getLocalValue('displayinlinetablefield', 'Inline-table', 'containerform'),
                value: 'inline-table'
            },
            {
                text: this.getLocalValue('displayinlineflexfield', 'Inline-flex', 'containerform'),
                value: 'inline-flex'
            },
            {
                text: this.getLocalValue('displayinlinegridfield', 'Inline-grid', 'containerform'),
                value: 'inline-grid'
            },
            { text: this.getLocalValue('displayinheritfield', 'Inherit', 'containerform'), value: 'inherit' },
            { text: this.getLocalValue('displayinitialfield', 'Initial', 'containerform'), value: 'initial' },
            { text: this.getLocalValue('displaynonefield', 'None', 'containerform'), value: 'none' }
        ];

        const flexOptions = [
            { text: this.getLocalValue('displaynotsetfield', '(Not set)', 'containerform'), value: '' },
            { text: this.getLocalValue('flexbaselinefield', 'Baseline', 'containerform'), value: 'baseline' },
            { text: this.getLocalValue('flexstretchfield', 'Stretch', 'containerform'), value: 'stretch' },
            { text: this.getLocalValue('flexcenterfield', 'Center', 'containerform'), value: 'center' },
            { text: this.getLocalValue('flexstartfield', 'Start', 'containerform'), value: 'flex-start' },
            { text: this.getLocalValue('flexendfield', 'End', 'containerform'), value: 'flex-end' },
            {
                text: this.getLocalValue('flexspacearoundfield', 'Space Around', 'containerform'),
                value: 'space-around'
            },
            {
                text: this.getLocalValue('flexspacebetweenfield', 'Space Between', 'containerform'),
                value: 'space-between'
            }
        ];

        var stylesource_ps = "/*** Example Code ***/\nbackgroundColor:red;\npaddingTop:5px;";

        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', "containerform")} value={data.key} onChange={handleChange} />
            <Form.Field>
              <label>{this.getLocalValue('childrenviewfield', 'Children Container View', "containerform")}</label>
              <Form.Group>
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewnonefield', 'None', "containerform")} value='' checked={!data.childrenView} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewrowsfield', 'Rows', "containerform")} value='rows' checked={data.childrenView === 'rows'} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewcolumnsfield', 'Columns', "containerform")} value='columns' checked={data.childrenView === 'columns'} onChange={handleChange} />
                <Form.Radio name="childrenView" label={this.getLocalValue('childrenviewcolumnswrapfield', 'Columns Wrap', "containerform")} value='columnswrap' checked={data.childrenView === 'columnswrap'} onChange={handleChange} />
                {data.childrenView && <div className={"formbuilder-container-icon-" + data.childrenView } />}
              </Form.Group>
            </Form.Field>
            {data.childrenView && <Form.TextArea name="children-style-source" placeholder={stylesource_ps} label={this.getLocalValue('childrenstylefield', 'Children Container Style', "containerform")} value={data["children-style-source"]} onChange={handleChange} />}        
            {!data.childrenView && <Form.Group widths="equal">
              <Form.Dropdown name="style-display" selection search fluid options={displayData} placeholder={displayData[0].text} label={this.getLocalValue('displayfield', 'Display', "containerform")} value={data["style-display"]} onChange={handleChange} />
              {data["style-display"] !== "flex" && <Form.Dropdown name="style-float" selection fluid options={floatData} placeholder={floatData[0].text} label={this.getLocalValue('floatfield', 'Float', "containerform")} value={data["style-float"]} onChange={handleChange} />}
            </Form.Group>}
            {!data.childrenView && data["style-display"] === "flex" &&
              <Form.Group widths="equal">
                <Form.Dropdown name="style-display-horizontalalign" selection search fluid options={flexOptions} placeholder={flexOptions[0].text} label={this.getLocalValue('displayhorizontalalignfield', 'Horizontal Align', "containerform")} value={data["style-display-horizontalalign"]} onChange={handleChange} />
                <Form.Dropdown name="style-display-verticalalign" selection search fluid options={flexOptions} placeholder={flexOptions[0].text} label={this.getLocalValue('displayverticalalignfield', 'Vertical Align', "containerform")} value={data["style-display-verticalalign"]} onChange={handleChange} />
            </Form.Group>}            
          </Form>);
    }
}
