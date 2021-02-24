import React from 'react';
import { dwKitAdminLangWorkflowBar, isNotEmptyString, isUndefined, register, DropdownControl as Dropdown } from 'optimajet-builder-shared';
import { Button } from '@ui-kitten/components';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';

register('workflow-bar', options => {

    function renderSelectScheme() {
        if (options.state.processExists || options.props.blockSelectScheme || options.props.schemes.length <= 1) {
            return null;
        }

        let selectSchemeDropdown = 'Select scheme';

        if (options.props.selectSchemeDropdown) {
            selectSchemeDropdown = options.props.selectSchemeDropdown;
        }
        else {
            const adminLangWorkflowBar = dwKitAdminLangWorkflowBar();
            if (adminLangWorkflowBar && adminLangWorkflowBar.selectscheme) {
                selectSchemeDropdown = adminLangWorkflowBar.startworkflow;
            }
        }

        const schemes = [];
        schemes.push({ value: null, text: '' });
        options.props.schemes.forEach(s => schemes.push({ value: s, text: s }));

        return (<Dropdown
            key="setstate"
            name="setstate"
            options={schemes}
            placeholder={selectSchemeDropdown}
            onChange={options.selectWorkflowScheme}
            value={options.props.selectedScheme}
            style={builderStyles.layout.elementInRow}
        />);
    }

    function renderCommands(commands) {
        if (options.props.blockCommands) {
            return null;
        }

        if (!options.props.blockSelectScheme && (!options.props.selectedScheme && options.props.schemes.length > 1)) {
            return null;
        }

        if (Array.isArray(commands) && commands.length > 0) {
            let res = [];

            commands.forEach(function (b) {
                
                const controlParams = builderStyles.controlParams({floated: 'flex-start', primary: b.type === 1, secondary: b.type === 2});
                res.push(<Button key={b.value} onPress={options.onCommand.bind(options.me, b)} children={b.text}
                            style={[controlParams.style, builderStyles.layout.elementInRow]} {...controlParams.props}/>);
            });

            return res;
        }
        return undefined;
    }

    function renderSetState(states) {
        if (options.props.blockSetState) {
            return;
        }

        if (Array.isArray(states) && states.length > 0) {
            const disableClick = isUndefined(options.state['setstate']) || options.state['setstate'] === '';

            let setStateButton = 'Set state';

            if (isNotEmptyString(options.props.setStateButton)) {
                setStateButton = options.props.setStateButton;
            }
            else {
                const adminLangWorkflowBar = dwKitAdminLangWorkflowBar();
                if (adminLangWorkflowBar) {
                    setStateButton = adminLangWorkflowBar.setstate;
                }
            }

            const controlParams = builderStyles.controlParams({floated: 'flex-start'});
            return [
                <Dropdown
                    key="setstate"
                    name="setstate"
                    placeholder="States"
                    options={states}
                    onChange={options.handleChanged}
                    style={builderStyles.layout.elementInRow}
                    />,
                <Button key="btnsetstate" disabled={disableClick} onPress={options.onSetState.bind(options.me)} children={setStateButton}
                    style={[controlParams.style, builderStyles.layout.elementInRow]} {...controlParams.props}/>
            ];
        }
        return undefined;
    }

    const style = options.props.style;

    let commands = options.state.commands ? options.state.commands : options.props.commands;
    if (options.props.selectedScheme && commands) {
        commands = commands.filter(c => c.scheme === options.props.selectedScheme);
    }

    const states = options.state.states ? options.state.states : options.props.states;

    // todo style
    return (<View style={style}>
        <View style={{flexDirection: 'row'}}>
            {renderSelectScheme()}
            {renderCommands(commands)}
            {renderSetState(states)}
        </View>
    </View>);
});
