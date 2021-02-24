/* eslint-disable eqeqeq */

import React, { Component } from 'react';
import { Divider } from '@ui-kitten/components';
import { EventsEditor, isDefined, isUndefined } from 'optimajet-builder-shared';
import DWKitModal from './dwkit/dwkit-modal.jsx';
import { Image, Text } from 'react-native-elements';
import DWKitButton from './dwkit/dwkit-button.jsx';
import DWKitMenu from './dwkit/dwkit-menu.jsx';
import { View } from 'react-native';
import DWKitMessage from './dwkit/dwkit-message.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';

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
            },
            {
                key: 'style',
                name: 'style',
                content: this.getLocalValue('styletab', 'Style'),
            },
            {
                key: 'events',
                name: 'events',
                content: this.getLocalValue('eventstab', 'Events'),
            },
            // TODO Fix tooltips for android
            // {
            //     key: 'tooltip',
            //     name: 'tooltip',
            //     content: this.getLocalValue('tooltiptab', 'Tooltip'),
            // },
            {
                key: 'other',
                name: 'other',
                content: this.getLocalValue('othertab', 'Other'),
            }
        ];
    }

    getLocalValue(key, defaultValue, formName) {
        const local = this.props.localization;
        const block = isDefined(formName) ? formName : 'base';

        if (isUndefined(local) || isUndefined(local[block]) || isUndefined(local[block][key])) {
            return defaultValue;
        }
        return local[block][key];
    }

    handleItemClick(index) {
        const menuItem = this.menuItems[index];
        this.setState({ activeItem: menuItem.name });
    }

    getDescription() {
        const activeItem = this.state.activeItem;
        let selectedIndex = 0;
        const items = this.menuItems.map((item, index) => {
            selectedIndex = item.name === activeItem ? index : selectedIndex;
            return item.content;
        });
        return (<DWKitMenu items={items} onPress={this.handleItemClick.bind(this)} selectedIndex={selectedIndex}>
            {this.getDetailDescription(activeItem)}
        </DWKitMenu>);
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
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        return (<View key="generalDescriptionForm" style={builderStyles.formGroupEqual}>
            <DWKitInput label="Name" value={data.key} onChange={handleChange('key')}/>
        </View>);
    }

    getStyleDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);
        const styleSourcePs = '/*** Example Code ***/\ncolor:red;\npaddingTop:5px;';

        const showTypes = [
            { text: this.getLocalValue('adaptivedefault', 'Any'), value: '' },
            { text: this.getLocalValue('adaptivedesctop', 'Desktop'), value: 'desktop' },
            { text: this.getLocalValue('adaptivemobile', 'Mobile'), value: 'mobile' }
        ];

        return (<Column key="styleDescriptionForm">
            <Row>
                <DWKitInput label={this.getLocalValue('widthfield', 'Width')} placeholder="100"
                            value={data['style-width']} onChange={handleIntChange('style-width')}/>
                <DWKitInput label={this.getLocalValue('heightfield', 'Height')} placeholder="100"
                            value={data['style-height']} onChange={handleIntChange('style-height')}/>
            </Row>
            <Row>
                <DWKitInput label={this.getLocalValue('margintopfield', 'Margin Top')}
                            placeholder="0" value={data['style-marginTop']}
                            onChange={handleIntChange('style-marginTop')}/>
                <DWKitInput label={this.getLocalValue('marginbottomfield', 'Margin Bottom')}
                            placeholder="0" value={data['style-marginBottom']}
                            onChange={handleIntChange('style-marginBottom')}/>
                <DWKitInput label={this.getLocalValue('marginleftfield', 'Margin Left')}
                            placeholder="0" value={data['style-marginLeft']}
                            onChange={handleIntChange('style-marginLeft')}/>
                <DWKitInput label={this.getLocalValue('marginrightfield', 'Margin Right')}
                            placeholder="0" value={data['style-marginRight']}
                            onChange={handleIntChange('style-marginRight')}/>
            </Row>
            <DWKitTextArea label={this.getLocalValue('stylefield', 'Style')}
                           placeholder={styleSourcePs} value={data['style-source']}
                           onChangeText={handleChange('style-source')}/>
            <DWKitCheckBox label={this.getLocalValue('hiddenfield', 'Hidden')}
                           checked={data['style-hidden']} onChange={handleChange('style-hidden')}/>
            {/* <DWKitCheckBox label={this.getLocalValue('adaptivefield', 'Adaptive Layout')}
                           checked={data['style-adaptive']} onChange={handleChange('style-adaptive')}/> */}
            {/*               todo test */}
            {/* {data['style-adaptive'] &&
            <DWKitDropdown options={showTypes} placeholder="Any"
                           label={this.getLocalValue('style-renderwhenfield', 'Render when')}
                           value={data['style-renderwhen']} onChange={handleChange('style-renderwhen')}/>}
            {data['style-adaptive'] &&
            <DWKitTextArea label={this.getLocalValue('mobilesourcefield', 'Mobile style')}
                           placeholder={styleSourcePs} value={data['style-mobilesource']}
                           onChangeText={handleChange('style-mobilesource')}/>} */}
        </Column>);
    }

    getEventsList() {
        return [];
    }

    getEventsDescription() {
        const data = this.props.data;
        if (isUndefined(data.events)) {
            data.events = {};
        }

        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);

        const actions = this.props.actions;
        const events = this.getEventsList();
        let content;
        if (!Array.isArray(events) || events.length === 0) {
            content = <DWKitMessage>
                <Image source={{ uri: '/images/dwkitbuilder-info.png' }} style={builderStyles.dwKitMessageIcon}/>
                <DWKitMessage.Content>
                    <Text>{this.getLocalValue('controlhasnoeventsmsg', 'This control has no events.')}</Text>
                </DWKitMessage.Content>
            </DWKitMessage>;
        }
        else {
            const controlsOnForm = this.props.parent.getControlsList();
            const listControls = [];
            for (let i = 0; i < controlsOnForm.length; i++) {
                if (data.key == controlsOnForm[i]) {
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
            timeout = <DWKitInput placeholder='0'
                                  label={this.getLocalValue('onchangetimeout', 'onChange timeout')}
                                  value={data.onChangeTimeout}
                                  onChange={handleIntChange('onChangeTimeout', true)}/>;
        }

        return (<Column key="eventsDescriptionForm">
            <DWKitMessage>
                <Image source={{ uri: '/images/dwkitbuilder-info.png' }} style={{ width: 32, height: 32 }}/>
                <DWKitMessage.Content>
                    <Text>{this.getLocalValue(
                        'eventsinfomsg',
                        'These flags enable processing from this element.'
                    )}</Text>
                </DWKitMessage.Content>
            </DWKitMessage>
            {timeout}
            {content}
        </Column>);
    }

    getToolTipDescription() {
        const toolTipPositions = [
            { text: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { text: this.getLocalValue('tooltiptopcenter', 'Top Center'), value: 'top' },
            { text: this.getLocalValue('tooltiptopleft', 'Top Left'), value: 'top start' },
            { text: this.getLocalValue('tooltiptopright', 'Top Right'), value: 'top end' },
            { text: this.getLocalValue('tooltipbottomcenter', 'Bottom Center'), value: 'bottom' },
            { text: this.getLocalValue('tooltipbottomleft', 'Bottom Left'), value: 'bottom start' },
            { text: this.getLocalValue('tooltipbottomright', 'Bottom right'), value: 'bottom end' },            
            { text: this.getLocalValue('tooltipleftcenter', 'Left Center'), value: 'left' },
            { text: this.getLocalValue('tooltiprightright', 'Right Center'), value: 'right' },
        ];

        const showTypes = [
            { text: this.getLocalValue('tooltipdefault', 'Default'), value: '' },
            { text: this.getLocalValue('tooltiphover', 'Hover'), value: 'hover' },
            { text: this.getLocalValue('tooltipclick', 'Click'), value: 'click' },
            { text: this.getLocalValue('tooltipfocus', 'Focus'), value: 'focus' }
        ];

        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);


        return (<Column key="tooltipDescriptionForm">            
            <DWKitCheckBox label={this.getLocalValue('tooltipenabledfield', 'Enabled')}
                               checked={data['tooltip-enabled']} onChange={handleChange('tooltip-enabled')}/>
            <Row>
                <DWKitInput label={this.getLocalValue('tooltipheaderfield', 'Tooltip Header')}
                            value={data['tooltip-header']} onChange={handleChange('tooltip-header')}
                            disabled={!data['tooltip-enabled']}
                            />
                <DWKitInput label={this.getLocalValue('tooltipcontentfield', 'Tooltip Content')}
                            value={data['tooltip-content']} onChange={handleChange('tooltip-content')}
                            disabled={!data['tooltip-enabled']}
                            />
            </Row>                
            <DWKitDropdown options={toolTipPositions} placeholder="Default"
                            label={this.getLocalValue('tooltippositionfield', 'Tooptip position')}
                            value={data['tooltip-position']} onChange={handleChange('tooltip-position')}
                            disabled={!data['tooltip-enabled']}
                                />

            <View style={{marginTop: 30}}>
                <DWKitLabel>{this.getLocalValue('errortooltipfield', 'Error-tooltip')}</DWKitLabel>
                <Divider style={{marginBottom: 10}}/>
                <Row>
                    <DWKitCheckBox label={this.getLocalValue('errortooltipdisabledfield', 'Disable error tooptip')}
                                checked={data['tooltip-errordisabled']}
                                onChange={handleChange('tooltip-errordisabled')}/>
                    <DWKitDropdown options={toolTipPositions} placeholder="Default"
                                label={this.getLocalValue('errortooltippositionfield', 'Error tooptip position')}
                                value={data['tooltip-errorposition']}
                                onChange={handleChange('tooltip-errorposition')}/>
                </Row>
            </View>            
        </Column>);
    }

    getOtherDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);
        const customValidationPs = '/*** Example Code ***/\nvalue > 10 ? true : \'Must be more 10\'';
        const visibleConditionPs = '/*** Example Code ***/\ndata.type == 1 ? true : false';
        const readOnlyConditionPs = '/*** Example Code ***/\ndata.type == 1 ? true : false';

        const defaultValueHandle = this.state.defaultValuePreferInt ? handleIntChange : handleChange;

        return (<Column key="otherDescriptionForm">
            <DWKitInput label={this.getLocalValue('propertynamefield', 'Property Name')}
                        value={data['propertyName']} onChange={handleChange('propertyName')}/>
            <DWKitCheckBox label={this.getLocalValue('requiredfield', 'Required')}
                           checked={data['other-required']} onChange={handleChange('other-required')}/>
            <DWKitInput label={this.getLocalValue('defaultvaluefield', 'Default value')}
                        value={data['defaultValue']} onChange={defaultValueHandle('defaultValue')}/>
            <DWKitTextArea label={this.getLocalValue('customvalidationfield', 'Custom Validation')}
                           placeholder={customValidationPs} value={data['other-customValidation']}
                           onChangeText={handleChange('other-customValidation')}/>
            <DWKitTextArea label={this.getLocalValue('visibleconditionfield', 'Visible condition')}
                           placeholder={visibleConditionPs} value={data['other-visibleConition']}
                           onChangeText={handleChange('other-visibleConition')}/>
            <DWKitTextArea label={this.getLocalValue('readonlyconditionfield', 'ReadOnly condition')}
                           placeholder={readOnlyConditionPs} value={data['other-readOnlyConition']}
                           onChangeText={handleChange('other-readOnlyConition')}/>
        </Column>);
    }

    render() {
        return (
            <DWKitModal visible={this.props.open} onClose={this.props.onClose.bind(this.props.parent)}>
                <DWKitModal.Header>
                    <Text style={builderStyles.dwKitModalComponentName}>{this.props.data['data-buildertype']}</Text>
                </DWKitModal.Header>
                <DWKitModal.Content>
                    {this.getDescription()}
                </DWKitModal.Content>
                <DWKitModal.Actions>
                    <DWKitButton onPress={(...args) => {
                        this.beforeSave();
                        this.props.onSave.bind(this.props.parent).call(...args);
                    }} title={this.getLocalValue(
                        'savebutton',
                        'Save'
                    )} type='solid'/>
                    <DWKitButton onPress={this.props.onClose.bind(this.props.parent)} appearance='outline' title={this.getLocalValue(
                        'cancelbutton',
                        'Cancel'
                    )}/>
                </DWKitModal.Actions>
            </DWKitModal>
        );
    }

    beforeSave() {
        // do nothing
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
