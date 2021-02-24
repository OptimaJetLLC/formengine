import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import DWKitRadioGroup from '../edit-control/dwkit/dwkit-radio-group.jsx';
import { ButtonGroup, Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import { Label } from './label.jsx';

class RadioItem extends Component {

    render() {
        const viewStyle = { flexDirection: 'row', alignItems: 'baseline' };
        const iconName = this.props.checked === true ? 'dot-circle-o' : 'circle-o';
        const iconColor = this.props.checked === true ? '#060607' : '#d6d6d7';
        const iconProps = {
            name: iconName,
            color: iconColor,
            containerStyle: {
                marginRight: 4
            },
            size: 18,
            type: 'font-awesome',
        };
        return (<View style={viewStyle}>
            <Icon {...iconProps}/>
            <Text>{this.props.label}</Text>
        </View>)
    }

}

class RadioGroup extends Component {
    render() {
        const containerStyle = { borderWidth: 0 };
        if (this.props.vertical === true) {
            containerStyle.flexDirection = 'column';
        }
        return (<DWKitRadioGroup {...this.props}
                             items={this.props.items}
                             containerStyle={containerStyle}
        />);
    }

}

register('radio-group', options => {

    // // todo style + show error
    // if (options.props.error) {
    //     className += ' error';
    // }

    let onChange = function(value){
        options.onChange(undefined, {name: options.props.name, value: value});
    }
    const vertical = options.props.direction === 'v';
    return (<View>
        <Label>{options.props.label}</Label>
        <DWKitRadioGroup error={options.props.error} style={options.props.style} vertical={vertical} items={ options.props.items} disabled={options.props.readOnly}
                    name={options.props.name} onChange={onChange} selectedValue={options.props.value} values={options.props.items}/>
    </View>);
});
