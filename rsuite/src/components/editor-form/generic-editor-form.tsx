import React, { Component } from 'react';
import { isDefined, isUndefined } from 'optimajet-builder-shared/src/helpers';
import JSON5 from 'json5';
import { Form, Checkbox, Button, Tag, Input, Nav, Icon } from 'rsuite';
import { Message } from 'semantic-ui-react';
import ToolbarPanel from '../common/ToolbarPanel';
import { FormInput, FormSelect } from './form-input';
import ThrowPropWrapper from './ThrowPropWrapper';
import { GeneralDescription } from './general-description';
import L10n from './l10n';
import { localize } from './localization';
import { BuilderControlDefinition } from '../../contol-library-wrapper';

interface MenuItem {
    key: string;
    name: string;
    content: string;
    active: boolean;
    onClick: any;
}

interface GenericEditorFormProps {
    control: any;
    localization: L10n;
    parent: any;
    data: any;
    actions: any;
    editorControls: Map<string, BuilderControlDefinition>;
}

export default class GenericEditorForm extends Component<GenericEditorFormProps, any> {

    menuItems: MenuItem[];

    constructor(props: any) {
        super(props);

        this.state = {
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
            },
            {
                key: 'json',
                name: 'json',
                content: this.getLocalValue('jsontab', 'JSON'),
                active: false,
                onClick: this.handleItemClick.bind(this)
            }
        ];
    }

    handleChange = this.props.parent.handleChange.bind(this.props.parent);

    formChange = (value: any, e?: any) => {
        this.handleChange(e, { value });
    };

    checkboxChange = (value: any, checked: any, e: any) => this.handleChange(e, { name: e.currentTarget.name, value, checked });

    getParam(name: string) {
        if (localStorage) {
            return localStorage.getItem('formbuilder-editform-' + name);
        }
    }

    setParam(name: string, value: string) {
        localStorage.setItem('formbuilder-editform-' + name, value);
    }

    getLocalValue(key: string, defaultvalue: any, formname?: string): string {
        return localize(key, defaultvalue, formname, this.props.localization);
    }

    handleItemClick(e: any, { name }: { name: string }) {
        this.setState({ activeItem: name });
    }

    getJSONEditor() {
        const data = this.props.data;
        let value = JSON5.stringify(data, null, 4);
        return <Input componentClass="textarea" value={value} style={{ width: '100%', height: '100%' }}/>;
    }

    getDescription() {
        const { parent } = this.props;
        const activeItem = parent.state.activeItem;

        this.menuItems.forEach(function (item) {
            item.active = item.name === activeItem;
        });

        return (<div className="formbuilder-editform-description">
            <Nav activeKey={activeItem} onSelect={parent.setActiveItem} appearance="subtle" justified>
                {this.menuItems.map(item => <Nav.Item key={item.key} eventKey={item.key}>{item.name}</Nav.Item>)}
            </Nav>
            <div className="form">
                {this.getDetailDescription(activeItem)}
            </div>
        </div>);
    }

    getDetailDescription(activeItem: string) {
        let segment;

        if (activeItem === 'general') {
            segment = this.getGeneralDescription();
        } else if (activeItem === 'style') {
            segment = this.getStyleDescription();
        } else if (activeItem === 'events') {
            segment = this.getEventsDescription();
        } else if (activeItem === 'tooltip') {
            segment = this.getToolTipDescription();
        } else if (activeItem === 'other') {
            segment = this.getOtherDescription();
        } else if (activeItem === 'json') {
            segment = this.getJSONEditor();
        }

        return segment;
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        console.log(data);
        return (<GeneralDescription control={this.props.control}
                                    editorControls={this.props.editorControls}
                                    data={this.props.data['control-model']}
        />);
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

        const LeftLabel = (props: any) => <b {...props} style={{
            textAlign: 'left',
            marginBottom: 11,
            alignSelf: 'flex-end',
            minWidth: 50,
            flexGrow: 0
        }}/>;

        return (<div key="styleDescriptionForm">
            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                <LeftLabel>Size: </LeftLabel>
                <FormInput name="style-width" label={this.getLocalValue('widthfield', 'Width')} placeholder="100px"/>
                <FormInput name="style-height" label={this.getLocalValue('heightfield', 'Height')} placeholder="50px"/>
            </Form>
            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                <LeftLabel>Margin: </LeftLabel>
                <FormInput name="style-marginTop" label={this.getLocalValue('margintopfield', 'Top')}
                           placeholder="0px"/>
                <FormInput name="style-marginBottom" label={this.getLocalValue('marginbottomfield', 'Bottom')}
                           placeholder="0px"/>
                <FormInput name="style-marginLeft" label={this.getLocalValue('marginleftfield', 'Left')}
                           placeholder="0px"/>
                <FormInput name="style-marginRight" label={this.getLocalValue('marginrightfield', 'Right')}
                           placeholder="0px"/>
            </Form>

            <Form formValue={data} onChange={this.formChange} className="dwkit-list-form" fluid>
                <FormInput name="style-customcss" label={this.getLocalValue('customcssclassfield', 'Custom CSS class')}
                           placeholder="application-css (without '.')"/>
                <FormInput name="style-source" label={this.getLocalValue('stylefield', 'Style')}
                           placeholder={stylesource_ps} componentClass="textarea" rows={3}/>
            </Form>

            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form checkboxes" fluid>
                <Checkbox name="pinned" checked={data.pinned} onChange={this.checkboxChange}
                          children={<>
                              {this.getLocalValue('pinnedfield', <>Pinned <Icon icon="thumb-tack"/> (absolute
                                  position)</>)}
                          </>}/>
                <Checkbox name="style-hidden" checked={data['style-hidden']} onChange={this.checkboxChange}
                          children={this.getLocalValue('hiddenfield', 'Hidden')}/>
            </Form>

            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form checkboxes" fluid>
                <Checkbox name="style-hiddeninprint" checked={data['style-hiddeninprint']}
                          onChange={this.checkboxChange}
                          children={this.getLocalValue('hiddeninprintfield', 'Hidden in Print mode')}/>
                <Checkbox name="style-adaptive" checked={data['style-adaptive']} onChange={this.checkboxChange}
                          children={this.getLocalValue('adaptivefield', 'Adaptive Layout')}/>
            </Form>
            {/*
            {data['style-adaptive'] &&
            <Form.Dropdown name="style-renderwhen" selection fluid search options={showtypes} placeholder="Any"
                           label={this.getLocalValue('style-renderwhenfield', 'Render when')}
                           value={data['style-renderwhen']} onChange={handleChange}/>}
            {data['style-adaptive'] &&
            <Form.TextArea name="style-mobilesource" label={this.getLocalValue('mobilesourcefield', 'Mobile style')}
                           placeholder={stylesource_ps} value={data['style-mobilesource']} onChange={handleChange}/>} */}
        </div>);
    }

    getEventsList(): string[] {
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
                <Icon icon="info"/>
                <Message.Content>
                    {this.getLocalValue('controlhasnoeventsmsg', 'This control has no events.')}
                </Message.Content>
            </Message>;
        } else {
            const controlsOnForm = this.props.parent.getControlsList();
            const listControls = [];
            for (let i = 0; i < controlsOnForm.length; i++) {
                if (data.key === controlsOnForm[i]) {
                    continue;
                }
                listControls.push({ text: controlsOnForm[i], value: controlsOnForm[i] });
            }
            // todo
            // content = <EventsEditor
            //     key="events" name="events"
            //     data={data.events}
            //     events={events}
            //     actions={actions}
            //     targets={listControls}
            //     onAdditionActions={this.handleAdditionActions.bind(this)}
            //     onChange={handleChange}/>;
        }
        let timeout = null;
        if (events.includes('onChange')) {
            // todo
            // timeout = <Form.Input name="onChangeTimeout"
            //                       style={{ width: 100 }}
            //                       placeholder={'0'}
            //                       type={'number'}
            //                       label={this.getLocalValue('onchangetimeout', 'onChange timeout')}
            //                       value={data.onChangeTimeout} onChange={handleChange}/>;
        }

        return (<Form key="eventsDescriptionForm">
            <Message icon>
                <Icon icon="info"/>
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
            { label: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { label: this.getLocalValue('tooltiptopcenter', 'Top Center'), value: 'top center' },
            { label: this.getLocalValue('tooltiptopleft', 'Top Left'), value: 'top left' },
            { label: this.getLocalValue('tooltiptopright', 'Top Right'), value: 'top right' },
            { label: this.getLocalValue('tooltipbottomcenter', 'Bottom Center'), value: 'bottom center' },
            { label: this.getLocalValue('tooltipbottomleft', 'Bottom Left'), value: 'bottom left' },
            { label: this.getLocalValue('tooltipbottomright', 'Bottom right'), value: 'bottom right' },
            { label: this.getLocalValue('tooltiprightright', 'Right Center'), value: 'right center' },
            { label: this.getLocalValue('tooltipleftcenter', 'Left Center'), value: 'left center' }
        ];

        const showtypes = [
            { label: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { label: this.getLocalValue('tooltiphover', 'Hover'), value: 'hover' },
            { label: this.getLocalValue('tooltipclick', 'Click'), value: 'click' },
            { label: this.getLocalValue('tooltipfocus', 'Focus'), value: 'focus' }
        ];

        const data = this.props.data;
        return (<>
            <Checkbox name="tooltip-enabled" checked={data['tooltip-enabled']} onChange={this.checkboxChange}
                      children={<b>{this.getLocalValue('tooltipenabledfield', 'Tooltip')}</b>}
            />
            <ThrowPropWrapper disabled={!data['tooltip-enabled']}>
                <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                    <FormInput name="tooltip-header"
                               label={this.getLocalValue('tooltipheaderfield', 'Tooltip Header')}/>
                    <FormInput name="tooltip-classname"
                               label={this.getLocalValue('tooltipclassnamefield', 'ClassName')}/>
                </Form>
                <Form formValue={data} onChange={this.formChange} className="dwkit-list-form" fluid>
                    <FormInput name="tooltip-content"
                               label={this.getLocalValue('tooltipcontentfield', 'Tooltip Content')}
                               componentClass="textarea" rows={2}/>
                </Form>
                <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                    <FormSelect name="tooltip-showtype" data={showtypes}
                                label={this.getLocalValue('tooltipshowtypefield', 'Tooptip showing type')}/>
                    <FormSelect name="tooltip-position" data={toolTipPositions}
                                label={this.getLocalValue('tooltippositionfield', 'Tooptip position')}/>
                </Form>
            </ThrowPropWrapper>


            <Checkbox name="tooltip-errordisabled" checked={data['tooltip-errordisabled']}
                      onChange={this.checkboxChange}
                      children={<b>{this.getLocalValue('errortooltipdisabledfield', 'Error tooptip')}</b>}
                      style={{ marginTop: 10 }}
            />
            <ThrowPropWrapper disabled={!data['tooltip-errordisabled']}>
                <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                    <FormSelect name="tooltip-errorshowtype" data={showtypes}
                                label={this.getLocalValue('tooltiperrorshowtypefield', 'Error tooptip showing type')}/>
                    <FormSelect name="tooltip-errorposition" data={toolTipPositions}
                                label={this.getLocalValue('errortooltippositionfield', 'Error tooptip position')}/>
                </Form>
            </ThrowPropWrapper>
        </>);
    }

    getOtherDescription() {
        const data = this.props.data;
        const customvalidation_ps = '/*** Example Code ***/\nvalue > 10 ? true : \'Must be more 10\'';
        const visibleconition_ps = '/*** Example Code ***/\ndata.type == 1 ? true : false';
        const readOnlyconition_ps = '/*** Example Code ***/\ndata.type == 1 ? true : false';

        const defaultValueHandle = !this.state.defaultValuePreferInt ? (value: any) => {
            if (value && value.match && value.match(/^-?\d+$/)) {
                value = parseInt(value);
            }
            this.formChange({ defaultValue: value });
        } : undefined;

        return (<Form formValue={data} onChange={this.formChange} className="dwkit-list-form" fluid>
            <FormInput name="propertyName" label={this.getLocalValue('propertynamefield', 'Property Name')}/>
            <Checkbox name="other-required" checked={data['other-required']} onChange={this.checkboxChange}
                      children={this.getLocalValue('requiredfield', 'Required')}/>
            <FormInput name="defaultValue" label={this.getLocalValue('defaultvaluefield', 'Default value')}
                       onChange={defaultValueHandle}
            />
            <FormInput name="other-customValidation"
                       label={this.getLocalValue('customvalidationfield', 'Custom Validation')}
                       placeholder={customvalidation_ps} value={data['other-customValidation']}
                       componentClass="textarea" rows={2}/>
            <FormInput name="other-visibleConition"
                       label={this.getLocalValue('visibleconditionfield', 'Visible condition')}
                       placeholder={visibleconition_ps} value={data['other-visibleConition']}
                       componentClass="textarea" rows={2}/>
            <FormInput name="other-readOnlyConition"
                       label={this.getLocalValue('readonlyconditionfield', 'ReadOnly condition')}
                       placeholder={readOnlyconition_ps} value={data['other-readOnlyConition']}
                       componentClass="textarea" rows={2}/>
        </Form>);
    }

    onSwitchJson() {
        this.setState({
            jsoneditor: !this.state.jsoneditor
        });
    }

    render() {
        return (
            <ToolbarPanel style={{ height: 'auto' }} className="formbuilder-editform-panel" minimizable={true}
                          header={
                              <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                  <h6 style={{ color: 'white' }}>{this.props.data['key']}</h6>
                                  <Tag
                                      className="formbuilder-editform-controltype">{this.props.data['data-buildertype']}</Tag>
                              </div>
                          }
                          content={this.getDescription()}
            />
        );
    }

    checkActionsList(value: any) {
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

    handleAdditionActions(e: any, { value }: any) {
        this.checkActionsList(value);
        this.forceUpdate();
    }
}
