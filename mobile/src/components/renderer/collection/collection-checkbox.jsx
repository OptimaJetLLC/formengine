import React from 'react';
import { register } from 'optimajet-builder-shared';
import DWKitCheckBox from '../../edit-control/dwkit/dwkit-check-box.jsx';

register('collection-checkbox', options => {

    function onChange() {
        options.me.handleChange(null, { name: options.props.colName, checked: !options.props.checked });
    }

    return (<DWKitCheckBox
        name={options.props.colName}
        checked={options.props.checked}
        error={options.props.errorFlag}
        disabled={options.props.disabled}
        onChange={onChange}
    />);
});
