import React from 'react';
import { View } from 'react-native';
import { register } from 'optimajet-builder-shared';
import { removeUnsupportedProps, textSizeToNumber } from './utils';
import { FormSizeContext } from './form-size-context';
import BuilderContainerWrapper from '../../builder/builder-container-wrapper.jsx'
import builderStyles from '../../builder-styles';

register('form', options => {
    removeUnsupportedProps(options.controlProps);
    const formSizeContext = {     
        formSize: options.model.size,
    }
    const props = options.controlProps;
    props.style =  [builderStyles.containerView.base, props.style];

    return (
        <BuilderContainerWrapper>
            <FormSizeContext.Provider value={formSizeContext}>
                    <View {...props} children={options.props.children} />
                </FormSizeContext.Provider>
        </BuilderContainerWrapper>
    );
});
