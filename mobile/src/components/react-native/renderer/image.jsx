import React from 'react';
import { register } from 'optimajet-builder-shared';
import { Image } from 'react-native-elements';
import Link from './link.jsx';
import { View } from 'react-native';

register('image', options => {
    const defaultStyle = { width: options.props.style.width, height: options.props.style.height };
    const avatarStyle = options.model.avatar === true ? { width: 28, height: 28, borderRadius: '500rem' } : {};
    const borderedStyle = options.model.bordered === true ? { borderWidth: 1, borderColor: 'lightgrey' } : {};
    
    let isLocalPath = function(p){
        if(p && p[0] == '/')
            return true;
        return false;
    }

    let src = options.props.src;
    if(isLocalPath(src) && window.DWKitApp && window.DWKitApp.backendUrl){
        src = window.DWKitApp.backendUrl + src;
    }
    
    let control = undefined;
    const controlProps = {
        ...options.propsControl,
        source: { uri: src },
    };
    delete controlProps.src;
    control = (<Image {...controlProps} style={[controlProps.style, avatarStyle]}
                            containerStyle={[defaultStyle, controlProps.containerStyle, avatarStyle, borderedStyle]}/>);
    if (options.props.href) {
        control = (<Link href={options.props.href}>{control}</Link>);
    }  

    const viewStyle = {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'center',
    };
    if (options.model.floated === 'left') {
        viewStyle.justifyContent = 'flex-start';
    }
    if (options.model.floated === 'right') {
        viewStyle.justifyContent = 'flex-end';
    }
    if (options.model.verticalAlign === 'top') {
        viewStyle.alignItems = 'flex-start';
    }
    if (options.model.verticalAlign === 'middle') {
        viewStyle.alignItems = 'center';
    }
    if (options.model.verticalAlign === 'bottom') {
        viewStyle.alignItems = 'flex-end';
    }
    return (<View style={viewStyle}>{control}</View>)
});
