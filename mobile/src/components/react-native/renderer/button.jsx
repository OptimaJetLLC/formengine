import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from '@ui-kitten/components';
import builderStyles from '../../../builder-styles';
import { register } from 'optimajet-builder-shared';

register('button', options => {
    const controlParams = builderStyles.controlParams(options.propsControl);
    const controlProps = {
        onPress: options.propsControl.onClick,
        children: options.propsControl.content,
        style: [builderStyles.baseMargin, {display: 'flex'}, options.propsControl.style, controlParams.style],
        ...controlParams.props
    };
    if (options.propsControl.icon) {
        controlProps.accessoryLeft = (props) => <Icon name={options.propsControl.icon} {...props}/>;
    }
    // todo form??
    // todo style
    // if (options.propsControl.isForm) {
    //     return (<Form.Button {...options.propsControl}/>);
    // }
    return (<Button {...controlProps}/>);
});
