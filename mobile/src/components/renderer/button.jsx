import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from '@ui-kitten/components';
import builderStyles from '../../builder-styles';
import { register } from 'optimajet-builder-shared';

register('button', options => {
    let model = options.model;
    const controlParams = builderStyles.controlParams(model);
    const buttonProps = {
        onPress: options.onClick,
        children: options.content,
        primary: model.primary,
        style: [builderStyles.baseMargin, {display: 'flex'}, options.controlProps.style, controlParams.style],
        ...controlParams.props
    };
    if (options.controlProps.icon) {
        buttonProps.accessoryLeft = (props) => <Icon name={options.controlProps.icon} {...props}/>;
    }
  
    return (<Button {...buttonProps}/>);
});
