import React from 'react';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../../builder-styles';
import DWKitDropdown from '../../edit-control/dwkit/dwkit-dropdown.jsx';

register('collection-dropdown', options => {
    const controlParams = builderStyles.controlParams(options.props);
    const controlProps = Object.assign({}, options.props);
    controlProps.style = [controlParams.style, options.props.style];
    if (options.props.onChange) {
        controlProps.onValueChange = (value) => options.props.onChange(null, { name: controlProps.name, value });
    }
    delete controlProps.onChange;

return (<DWKitDropdown name={options.props.colName}
        multiple={options.props.multiple}
        placeholder={options.props.placeholder}
        options={options.props.options}
        error={options.props.errorFlag}
        value={options.props.value}
        disabled={options.props.readOnly}
        {...controlProps}
    />);
});
