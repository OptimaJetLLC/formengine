import React from 'react';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'
import { register } from 'optimajet-builder-shared';

register('textarea', options => {
    // todo
    // if (options.isForm) {
    //     return (<Form.TextArea {...options.propsControl} />);
    // }
    // todo
    // let divClass = 'ui labeled input';
    // if (options.propsControl.fluid) {
    //     divClass += ' fluid';
    // }
    //
    // if (options.propsControl.error) {
    //     divClass += ' error';
    // }
    //
    // if (isNotEmptyString(options.props.className)) {
    //     divClass += ' ' + options.props.className;
    // }

    const propsControl = {
        multiline: true,
        numberOfLines: options.propsControl.rows ? options.propsControl.rows : 3,
        disabled: options.propsControl.readOnly,
        onChange: value => options.propsControl.onChange(
            value,
            { name: options.propsControl.name, value }
        ),
        value: options.propsControl.value,
        placeholder: options.propsControl.placeholder,
        style: {marginTop: 7},
        error: options.propsControl.error
    };
    // todo remove all styles from renderer code!!!!
    return <DWKitInput label={options.propsControl.label} {...propsControl}/>;
});
