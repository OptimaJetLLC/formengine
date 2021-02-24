import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('collection-checkbox', options => {
    
    let props = {

    };
    if(options.props.errorFlag){
        props.className = "error";
    }

    return (<Checkbox
        {...props}
        name={options.props.colName}
        checked={options.props.checked}
        readOnly={options.props.readOnly}
        onChange={options.me.handleChange}
    />);
});
