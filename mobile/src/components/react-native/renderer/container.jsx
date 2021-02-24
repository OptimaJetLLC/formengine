import React from 'react';
import { StyleSheet } from 'react-native';
import builderStyles from '../../../builder-styles';
import { View } from 'react-native';
import { register } from 'optimajet-builder-shared';
import { removeUnsupportedProps } from './utils';
import BuilderContainerWrapper from '../../../builder/react-native/builder-container-wrapper.jsx';
import {Column, Row} from '../edit-control/dwkit/dwkit-item-group.jsx';

register('container', options => {
    const controlProps = { ...options.props };
    controlProps.notStretchItems = true;
    controlProps.style = [builderStyles.containerView.base, controlProps.style];
    if(options.props.childrenView){
        controlProps.style.push(builderStyles.containerView[options.props.childrenView]);
    }    
    delete controlProps.childrenView;

    const OrientedView = options.props.childrenView === 'rows' || !options.props.childrenView ? Column : Row

    removeUnsupportedProps(controlProps);
    return (
        <BuilderContainerWrapper>
            <OrientedView {...controlProps} />
        </BuilderContainerWrapper>
    );
});
