import React from 'react';
import { DatePicker, register } from 'optimajet-builder-shared';

register('collection-date-time', options => {
    return (<DatePicker
        name={options.props.colName}
        error={options.props.errorFlag}
        value={options.props.value}
        readOnly={options.props.readOnly}
        onChange={options.me.handleChange}
        type={options.props.type} isForm
    />);
});
