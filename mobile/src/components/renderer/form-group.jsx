import React from 'react';
import { View } from 'react-native';
import { register } from 'optimajet-builder-shared';
import { removeUnsupportedProps } from './utils';
import builderStyles from '../../builder-styles';
import { FormWidthContext } from './form-width-context';
import BuilderContainerWrapper from '../../builder/builder-container-wrapper.jsx'
import {Column, Row} from '../edit-control/dwkit/dwkit-item-group.jsx';

register('formgroup', options => {

    function getWidth() {
        if (options.widthsCustom && options.widthsCustom >= 1 && options.widthsCustom <= 16) {
            return builderStyles.formGroupWidthCustom[options.widthsCustom].style;
        }
        return builderStyles.formGroupWidthEqual;
    }

    const props = options.controlProps;
    props.notStretchItems = true;
    props.style.flexDirection = options.orientation === 'grouped' ? 'column' : 'row';
    props.style =  [builderStyles.containerView.base, props.style];
    removeUnsupportedProps(options.controlProps);
    const childStyle = options.widths === 'custom' ? getWidth() : builderStyles.formGroupWidthEqual;
    const isColumn = options.orientation !== 'grouped';
    const formWidthContext = {
        formWidthStyle: childStyle,
        isColumn,
    }
    const OrientedView = isColumn ? Row : Column;
    return <BuilderContainerWrapper>
        <FormWidthContext.Provider value={formWidthContext}>
            <OrientedView {...props}>{options.children}</OrientedView>
        </FormWidthContext.Provider>
    </BuilderContainerWrapper>;
});
