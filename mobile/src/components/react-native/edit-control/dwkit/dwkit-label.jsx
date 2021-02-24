import React, { Component } from 'react';
import builderStyles from '../../../../builder-styles';
import { Text } from '@ui-kitten/components';

export default class DWKitLabel extends Component {

    render() {
        return (<Text
                    {...this.props}
                    category='label' appearance='hint'>
                    {this.props.children}
                </Text>);
    }

}
