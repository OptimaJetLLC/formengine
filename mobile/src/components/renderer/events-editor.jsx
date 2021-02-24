/* eslint-disable eqeqeq */

import React from 'react';
import { CollectionEditor, isDefined, isUndefined, register } from 'optimajet-builder-shared';
import { View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import DWKitCheckBox from '../edit-control/dwkit/dwkit-check-box.jsx';
import DWKitDropdown from '../edit-control/dwkit/dwkit-dropdown.jsx';
import builderStyles from '../../builder-styles';

register('events-editor', options => {

    function handleTextChange(eventName, name) {
        return function (value) {
            let event = options.me.props.data[eventName];
            if (isUndefined(event)) {
                event = {};
                options.me.props.data[eventName] = event;
            }

            event[name] = value;
            if (isDefined(value)) {
                event.active = value;
            }
            if (isDefined(options.me.props.onChange)) {
                options.me.props.onChange(name)(value);
            }
        }
    }

    function handleMultiplePicker(eventName, name, source) {
        return function (value) {
            let event = options.me.props.data[eventName];
            if (isUndefined(event)) {
                event = {};
                options.me.props.data[eventName] = event;
            }

            

            event[name] = value;
            if (isDefined(options.me.props.onChange)) {
                options.me.props.onChange(name)(value);
            }
        }
    }

    const data = options.props.data;
    const events = options.props.events;
    let res = [];
    events.forEach(function (e) {
        let key = e + '_events';
        let event = isDefined(data) ? data[e] : undefined;

        let dropdownControl = {
            element: DWKitDropdown,
            props: {
                className: "dwkit-action-dropdown",                
                multiple: true,
            }
        };
        let collectionEditorControl = {
            element: CollectionEditor,
            props: {
                className: "parameters-editor",
                style:{marginRight: 40, marginTop: -20}
            }
        };

        res.push(<View key={key}>
            <DWKitCheckBox width={3} key="active" label={
                                <Text {...(event.active ? {category: 'label', style: {fontSize: 14}} : {})}>
                                    {e}
                                </Text>}
                            name="active" checked={event.active}
                           onChange={handleTextChange(e, 'active')}/>
            {event.active && <View key="divGroup" style={[builderStyles.formGroupEqual, {flexDirection: 'column', marginBottom: 30, marginLeft: 15}]}>
                <CollectionEditor draggable
                        columns={[
                            {
                                key: 'actions', name: 'Actions', control: 'custom', customControl: dropdownControl.element,
                                style: builderStyles.eventsEditor.actions,
                                customControlGetPropsFunc: data => ({
                                    options: options.actionOptions, value: data.actions,
                                    onValueChange: handleMultiplePicker(e, 'actions', event.actions), ...dropdownControl.props
                                    })
                            },
                            {
                                key: 'parameters', name: 'Parameters',  control: 'custom', customControl: collectionEditorControl.element,
                                style: builderStyles.eventsEditor.parameters,
                                customControlGetPropsFunc: data => ({
                                    value: data.parameters,
                                    columns: [{key: 'name', name: 'Name'}, {key: 'value', name: 'Value'}],
                                    onValueChange: handleMultiplePicker(e, 'parameters', event.parameters),
                                    ...collectionEditorControl.props
                                })
                            },
                            {
                                key: 'targets', name: 'Targets', control: 'custom', customControl: dropdownControl.element,
                                style: builderStyles.eventsEditor.targets,
                                customControlGetPropsFunc: data => ({
                                    options: options.targetOptions, value: data.targets,
                                    onValueChange: handleMultiplePicker(e, 'targets', event.targets), ...dropdownControl.props
                                    })
                            }
                        ]}
                        name="triggers"
                        disableAdd
                        style={{flexShrink: 1}}
                        value={event.triggers}
                        onChange={options.me.handleChange.bind(options.me, e)}
                    />
                    <Button onPress={() => {
                        options.me.initNewTrigger.call(options.me, e);
                        options.me.forceUpdate();
                    }}
                            {...builderStyles.eventsEditor.addButton}>
                        <Text category='label' style={{fontSize: 18}}>+</Text>
                    </Button>
            </View>}
        </View>);
    });

    return (<View>{res}</View>);
});
