import React from 'react';
import NumberFormat from 'react-number-format';
import { register, Input } from 'optimajet-builder-shared';

register('number-format', options => {
    return (<NumberFormat {...options.controlProps}
        additionalParams={options.props.additionalParams}
        name={options.props.name}
        propertyName={options.props.propertyName}
        value={options.props.value}
        customInput={Input} />);
});
