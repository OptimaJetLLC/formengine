import React, { Component } from 'react';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';

function content(props) {
    return (<View style={builderStyles.dwKitMessageContent}>
        {props.children}
    </View>);
}

export default class DWKitMessage extends Component {

    static Content = content;

    render() {
        return (<View style={builderStyles.dwKitMessage}>
            {this.props.children}
        </View>);
    }

}
