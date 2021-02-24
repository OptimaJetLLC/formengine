import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { isDefined, register } from 'optimajet-builder-shared';

register('dictionary', options => {
    //if (options.props.parentIsForm) {
        return (<Form.Dropdown {...options.propsControl} error={isDefined(options.propsControl.error)}/>);
    // }

    // let divClass = 'ui labeled input';

    // if (options.props.fluid) {
    //     divClass += ' fluid';
    // }

    // if (options.props.error) {
    //     divClass += ' error';
    // }

    // if (options.props.className) {
    //     divClass += ' ' + options.props.className;
    // }

    // return (<div className={divClass}>
    //     {options.props.label && <div className="ui label label">{options.props.label}</div>}
    //     <Dropdown {...options.propsControl} error={isDefined(options.propsControl.error)}/>
    // </div>);
});
