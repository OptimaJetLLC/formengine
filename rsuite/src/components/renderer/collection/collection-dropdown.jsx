import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('collection-dropdown', options => {
    return (<Dropdown
        name={options.props.colName}
        multiple={options.props.multiple}
        placeholder={options.props.placeholder}
        options={options.props.options}
        error={options.props.errorFlag}
        value={options.props.value}
        readOnly={options.props.readOnly}
        onChange={options.me.handleChange}
        selection fluid search
    />);
});
