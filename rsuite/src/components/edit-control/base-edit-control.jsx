/* eslint-disable eqeqeq */

import React, { Component } from 'react';
import { EventsEditor, isDefined, isUndefined } from 'optimajet-builder-shared';
import { Form, Menu, Message, Modal, Segment, Icon } from 'semantic-ui-react';
import { Button, Tag, Input, ButtonToolbar } from 'rsuite';
import Window from './../window'
import JSON5 from 'json5';

export default class BaseEditControl extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
            activeItem: 'general',
            defaultValuePreferInt: false
        };

        this.menuItems = [
            {
                key: 'general',
                name: 'general',
                content: this.getLocalValue('generaltab', 'General'),
                active: true,
                onClick: this.handleItemClick.bind(this)
            },
            {
                key: 'style',
                name: 'style',
                content: this.getLocalValue('styletab', 'Style'),
                active: false,
                onClick: this.handleItemClick.bind(this)
            },
            {
                key: 'events',
                name: 'events',
                content: this.getLocalValue('eventstab', 'Events'),
                active: false,
                onClick: this.handleItemClick.bind(this)
            },
            {
                key: 'tooltip',
                name: 'tooltip',
                content: this.getLocalValue('tooltiptab', 'Tooltip'),
                active: false,
                onClick: this.handleItemClick.bind(this)
            },
            {
                key: 'other',
                name: 'other',
                content: this.getLocalValue('othertab', 'Other'),
                active: false,
                onClick: this.handleItemClick.bind(this)
            }
        ];
    }

    getParam(name){
        if(localStorage){
            return localStorage.getItem("formbuilder-editform-" + name);
        }
    }

    setParam(name, value){
        localStorage.setItem("formbuilder-editform-" + name, value);
    }

    getLocalValue(key, defaultvalue, formname) {
        const local = this.props.localization;
        const block = isDefined(formname) ? formname : 'base';

        if (isUndefined(local) || isUndefined(local[block]) || isUndefined(local[block][key])) {
            return defaultvalue;
        }
        return local[block][key];
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    getJSONEditor(){
        const data = this.props.data;
        let value = JSON5.stringify(data, null, 4);
        return <Input componentClass="textarea" value={value} style={{width: "100%", height: "100%"}} />;
    }

    getDescription() {
        const activeItem = this.state.activeItem;

        this.menuItems.forEach(function (item) {
            item.active = item.name === activeItem;
        });

        return (<Modal.Description>
            <Menu key="descriptionMenu" pointing secondary items={this.menuItems}/>
            {this.getDetailDescription(activeItem)}
        </Modal.Description>);
    }

    getDetailDescription(activeItem) {
        let segment;

        if (activeItem === 'general') {
            segment = this.getGeneralDescription();
        }
        else if (activeItem === 'style') {
            segment = this.getStyleDescription();
        }
        else if (activeItem === 'events') {
            segment = this.getEventsDescription();
        }
        else if (activeItem === 'tooltip') {
            segment = this.getToolTipDescription();
        }
        else if (activeItem === 'other') {
            segment = this.getOtherDescription();
        }

        return segment;
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        return (<Form key="generalDescriptionForm">
            <Form.Input key="name" label="Name" name="key" value={data.key} onChange={handleChange}/>
        </Form>);
    }

    getStyleDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const stylesource_ps = '/*** Example Code ***/\ncolor:red;\npaddingTop:5px;';

        const showtypes = [
            { text: this.getLocalValue('adaptivedefault', 'Any'), value: '' },
            { text: this.getLocalValue('adaptivedesctop', 'Desktop'), value: 'desktop' },
            { text: this.getLocalValue('adaptivemobile', 'Mobile'), value: 'mobile' }
        ];

        return (<Form key="styleDescriptionForm">
            <Form.Group widths="equal">
                <Form.Input name="style-width" label={this.getLocalValue('widthfield', 'Width')} placeholder="100px"
                            value={data['style-width']} onChange={handleChange}/>
                <Form.Input name="style-height" label={this.getLocalValue('heightfield', 'Height')} placeholder="100px"
                            value={data['style-height']} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="style-marginTop" label={this.getLocalValue('margintopfield', 'Margin Top')}
                            placeholder="0px" value={data['style-marginTop']} onChange={handleChange}/>
                <Form.Input name="style-marginBottom" label={this.getLocalValue('marginbottomfield', 'Margin Bottom')}
                            placeholder="0px" value={data['style-marginBottom']} onChange={handleChange}/>
                <Form.Input name="style-marginLeft" label={this.getLocalValue('marginleftfield', 'Margin Left')}
                            placeholder="0px" value={data['style-marginLeft']} onChange={handleChange}/>
                <Form.Input name="style-marginRight" label={this.getLocalValue('marginrightfield', 'Margin Right')}
                            placeholder="0px" value={data['style-marginRight']} onChange={handleChange}/>
            </Form.Group>
            <Form.Input name="style-customcss" label={this.getLocalValue('customcssclassfield', 'Custom CSS class')}
                        placeholder="application-css (without '.')" value={data['style-customcss']}
                        onChange={handleChange}/>
            <Form.TextArea name="style-source" label={this.getLocalValue('stylefield', 'Style')}
                           placeholder={stylesource_ps} value={data['style-source']} onChange={handleChange}/>
             <Form.Group>
                <Form.Checkbox name="style-hidden" label={this.getLocalValue('hiddenfield', 'Hidden')} checked={data["style-hidden"]} onChange={handleChange} />
                <Form.Checkbox name="style-hiddeninprint" label={this.getLocalValue('hiddeninprintfield', 'Hidden in Print mode')} checked={data["style-hiddeninprint"]} onChange={handleChange} />
            </Form.Group>

            <Form.Checkbox name="style-adaptive" label={this.getLocalValue('adaptivefield', 'Adaptive Layout')}
                           checked={data['style-adaptive']} onChange={handleChange}/>
            {data['style-adaptive'] &&
            <Form.Dropdown name="style-renderwhen" selection fluid search options={showtypes} placeholder="Any"
                           label={this.getLocalValue('style-renderwhenfield', 'Render when')}
                           value={data['style-renderwhen']} onChange={handleChange}/>}
            {data['style-adaptive'] &&
            <Form.TextArea name="style-mobilesource" label={this.getLocalValue('mobilesourcefield', 'Mobile style')}
                           placeholder={stylesource_ps} value={data['style-mobilesource']} onChange={handleChange}/>}
        </Form>);
    }

    getEventsList() {
        return [];
    }

    getEventsDescription() {
        const data = this.props.data;
        if (isUndefined(data.events)) {
            data.events = {};
        }

        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const actions = this.props.actions;
        const events = this.getEventsList();
        let content;
        if (!Array.isArray(events) || events.length === 0) {
            content = <Message icon>
                <Icon name="info"/>
                <Message.Content>
                    {this.getLocalValue('controlhasnoeventsmsg', 'This control has no events.')}
                </Message.Content>
            </Message>;
        }
        else {
            const controlsOnForm = this.props.parent.getControlsList();
            const listControls = [];
            for (let i = 0; i < controlsOnForm.length; i++) {
                if (data.key === controlsOnForm[i]) {
                    continue;
                }
                listControls.push({ text: controlsOnForm[i], value: controlsOnForm[i] });
            }
            content = <EventsEditor
                key="events" name="events"
                data={data.events}
                events={events}
                actions={actions}
                targets={listControls}
                onAdditionActions={this.handleAdditionActions.bind(this)}
                onChange={handleChange}/>;
        }
        let timeout = null;
        if (events.includes('onChange')) {
            timeout = <Form.Input name="onChangeTimeout"
                                  style={{ width: 100 }}
                                  placeholder={'0'}
                                  type={'number'}
                                  label={this.getLocalValue('onchangetimeout', 'onChange timeout')}
                                  value={data.onChangeTimeout} onChange={handleChange}/>;
        }

        return (<Form key="eventsDescriptionForm">
            <Message icon>
                <Icon name="info"/>
                <Message.Content>
                    {this.getLocalValue('eventsinfomsg', 'These flags enable processing from this element.')}
                </Message.Content>
            </Message>
            {timeout}
            {content}
        </Form>);
    }

    getToolTipDescription() {
        const toolTipPositions = [
            { text: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { text: this.getLocalValue('tooltiptopcenter', 'Top Center'), value: 'top center' },
            { text: this.getLocalValue('tooltiptopleft', 'Top Left'), value: 'top left' },
            { text: this.getLocalValue('tooltiptopright', 'Top Right'), value: 'top right' },
            { text: this.getLocalValue('tooltipbottomcenter', 'Bottom Center'), value: 'bottom center' },
            { text: this.getLocalValue('tooltipbottomleft', 'Bottom Left'), value: 'bottom left' },
            { text: this.getLocalValue('tooltipbottomright', 'Bottom right'), value: 'bottom right' },
            { text: this.getLocalValue('tooltiprightright', 'Right Center'), value: 'right center' },
            { text: this.getLocalValue('tooltipleftcenter', 'Left Center'), value: 'left center' }
        ];

        const showtypes = [
            { text: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { text: this.getLocalValue('tooltiphover', 'Hover'), value: 'hover' },
            { text: this.getLocalValue('tooltipclick', 'Click'), value: 'click' },
            { text: this.getLocalValue('tooltipfocus', 'Focus'), value: 'focus' }
        ];

        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const tooltipart = data['tooltip-enabled'] ?
            (<Segment vertical>
                <Form.Checkbox name="tooltip-enabled" label={this.getLocalValue('tooltipenabledfield', 'Enabled')}
                               checked={data['tooltip-enabled']} onChange={handleChange}/>
                <Form.Input name="tooltip-header" label={this.getLocalValue('tooltipheaderfield', 'Tooltip Header')}
                            value={data['tooltip-header']} onChange={handleChange}/>
                <Form.Input name="tooltip-content" label={this.getLocalValue('tooltipcontentfield', 'Tooltip Content')}
                            value={data['tooltip-content']} onChange={handleChange}/>
                <Form.Group>
                    <Form.Input name="tooltip-classname"
                                label={this.getLocalValue('tooltipclassnamefield', 'ClassName')}
                                value={data['tooltip-classname']} onChange={handleChange}/>
                    <Form.Dropdown name="tooltip-showtype" selection fluid search options={showtypes}
                                   placeholder="Default"
                                   label={this.getLocalValue('tooltipshowtypefield', 'Tooptip showing type')}
                                   value={data['tooltip-showtype']} onChange={handleChange}/>
                    <Form.Dropdown name="tooltip-position" selection fluid search options={toolTipPositions}
                                   placeholder="Default"
                                   label={this.getLocalValue('tooltippositionfield', 'Tooptip position')}
                                   value={data['tooltip-position']} onChange={handleChange}/>
                </Form.Group>
            </Segment>) :
            (<Segment vertical>
                <Form.Checkbox name="tooltip-enabled" label={this.getLocalValue('tooltipenabledfield', 'Enabled')}
                               checked={data['tooltip-enabled']} onChange={handleChange}/>
            </Segment>);

        return (<Form key="tooltipDescriptionForm">
            <Segment vertical>
                <Form.Group>
                    <Form.Checkbox name="tooltip-errordisabled"
                                   label={this.getLocalValue('errortooltipdisabledfield', 'Disable error tooptip')}
                                   checked={data['tooltip-errordisabled']} onChange={handleChange}/>
                    <Form.Dropdown name="tooltip-errorshowtype" selection fluid search options={showtypes}
                                   placeholder="Default"
                                   label={this.getLocalValue('tooltiperrorshowtypefield', 'Error tooptip showing type')}
                                   value={data['tooltip-errorshowtype']} onChange={handleChange}/>
                    <Form.Dropdown name="tooltip-errorposition" selection fluid search options={toolTipPositions}
                                   placeholder="Default"
                                   label={this.getLocalValue('errortooltippositionfield', 'Error tooptip position')}
                                   value={data['tooltip-errorposition']} onChange={handleChange}/>
                </Form.Group>
            </Segment>
            {tooltipart}
        </Form>);
    }

    getOtherDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const customvalidation_ps = '/*** Example Code ***/\nvalue > 10 ? true : \'Must be more 10\'';
        const visibleconition_ps = '/*** Example Code ***/\ndata.type == 1 ? true : false';
        const readOnlyconition_ps = '/*** Example Code ***/\ndata.type == 1 ? true : false';

        const defaultValueHandle = this.state.defaultValuePreferInt ? function (e, { name, value }) {
            if (value && value.match && value.match(/^-?\d+$/)) {
                value = parseInt(value);
            }
            handleChange(e, { name, value });
        } : handleChange;

        return (<Form key="otherDescriptionForm">
            <Form.Input name="propertyName" label={this.getLocalValue('propertynamefield', 'Property Name')}
                        value={data['propertyName']} onChange={handleChange}/>
            <Form.Checkbox name="other-required" label={this.getLocalValue('requiredfield', 'Required')}
                           checked={data['other-required']} onChange={handleChange}/>
            <Form.Input name="defaultValue" label={this.getLocalValue('defaultvaluefield', 'Default value')}
                        value={data['defaultValue']} onChange={defaultValueHandle}/>
            <Form.TextArea name="other-customValidation"
                           label={this.getLocalValue('customvalidationfield', 'Custom Validation')}
                           placeholder={customvalidation_ps} value={data['other-customValidation']}
                           onChange={handleChange}/>
            <Form.TextArea name="other-visibleConition"
                           label={this.getLocalValue('visibleconditionfield', 'Visible condition')}
                           placeholder={visibleconition_ps} value={data['other-visibleConition']}
                           onChange={handleChange}/>
            <Form.TextArea name="other-readOnlyConition"
                           label={this.getLocalValue('readonlyconditionfield', 'ReadOnly condition')}
                           placeholder={readOnlyconition_ps} value={data['other-readOnlyConition']}
                           onChange={handleChange}/>
        </Form>);
    }

    onSwitchJson(){
        this.setState({
            jsoneditor: !this.state.jsoneditor
        });
    }

    render() {
        return (<Window 
                className="formbuilder-editform-default"
                onClose={this.props.onClose.bind(this.props.parent)}
                open={this.props.open} savePosition={true} name="editform">
                    <h3>{this.props.data['key']}</h3>
                    <Tag className="formbuilder-editform-controltype">{this.props.data['data-buildertype']}</Tag>
                    <div className="formbuilder-editform-form">
                        {this.state.jsoneditor && this.getJSONEditor()}
                        {!this.state.jsoneditor && this.getDescription()}
                    </div>
                    <div className="formbuilder-editform-buttons">
                        <ButtonToolbar>
                            <Button appearance="subtle"
                                onClick={this.onSwitchJson.bind(this)}>
                                {this.state.jsoneditor ? 
                                    this.getLocalValue('switchform','Switch to Form')
                                    : this.getLocalValue('switchjson','Switch to JSON Editor')}
                            </Button>
                            <Button appearance="primary"
                                onClick={this.props.onSave.bind(this.props.parent)}>{this.getLocalValue(
                                'savebutton',
                                'Save'
                            )}</Button>
                            <Button onClick={this.props.onClose.bind(this.props.parent)}>{this.getLocalValue(
                                'cancelbutton',
                                'Cancel'
                        )}</Button>
                        </ButtonToolbar>
                    </div>
            </Window>
        );
    }

    checkActionsList(value) {
        let isExists = false;

        for (let i = 0; i < this.props.actions.length; i++) {
            if (this.props.actions[i] == value) {
                isExists = true;
                break;
            }
        }

        if (!isExists) {
            this.props.actions.push({ text: value, value });
        }
    }

    handleAdditionActions(e, { value }) {
        this.checkActionsList(value);
        this.forceUpdate();
    }
}
