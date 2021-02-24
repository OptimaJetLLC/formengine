import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('tree-picker-trigger', options => {
    //if (options.props.parentIsForm) {
        return <Form.Dropdown {...options.controlProps} onClick={options.handleOpen}
                              onChange={options.onDropdownChange}/>;
    //}

    // let divClass = 'ui labeled input';

    // if (options.props.fluid) {
    //     divClass += ' fluid';
    // }

    // if (options.props.error) {
    //     divClass += ' error';
    // }

    // return (<div className={divClass}>
    //     {options.props.label && <div className="ui label label">{options.props.label}</div>}
    //     <Dropdown {...options.controlProps} onChange={options.onDropdownChange} onClick={options.handleOpen}/>
    // </div>);
});
