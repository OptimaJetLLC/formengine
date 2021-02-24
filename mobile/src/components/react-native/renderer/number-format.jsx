import React from 'react';
import NumberFormat from 'react-number-format';
import { register } from 'optimajet-builder-shared';
import { Input } from '@ui-kitten/components';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'


class NativeNumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    render() {
        const [props, state] = [this.props, this.state];
        return (
            <NumberFormat {...props}
                displayType={'text'}
                renderText={val => {
                    if (state.value.endsWith(".") && !val.includes(".")) {
                        val = val + "."; 
                    } 
                    if (!state.value.endsWith(".") && val.endsWith(".")) { 
                        val = val.slice(0,-1); 
                    }
                    return <DWKitInput {...props}
                        onChangeText={text => this.setState({value: text})}
                        keyboardType={props.keyboardType || 'number-pad'}
                        placeholder={props.placeholder}
                        value={val}/>
                }}
                value={state.value}
                />
        )
    }

}


register('number-format', options => {
    
    var controlProps = {
        ...options.propsControl,
        status: options.propsControl.error ? "danger" : undefined
    };

    if (options.propsControl.onChange || options.propsControl.onValueChange) {
        controlProps.onValueChange = options.propsControl.onChange || options.propsControl.onValueChange;
        delete options.propsControl.onChange;
    }

    delete controlProps.type;

    return <NativeNumberInput {...controlProps}/>;
});
