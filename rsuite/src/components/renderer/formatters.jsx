import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('checkbox-formatter', options => {
    const value = Boolean(options.props.value);
    return (<Checkbox checked={value} disabled/>);
});

register('number-formatter', options => {
    const value = options.props.value;
    return (<span style={{ textAlign: 'right' }}><div title={value}>{value}</div></span>);
});

register('date-formatter', options => {
    return (<span style={{ textAlign: 'right' }}><div title={options.strValue}>{options.strValue}</div></span>);
});

register('datetime-formatter', options => {
    return (<span style={{ textAlign: 'right' }}><div title={options.strValue}>{options.strValue}</div></span>);
});

register('time-formatter', options => {
    return (<span style={{ textAlign: 'right' }}><div title={options.strValue}>{options.strValue}</div></span>);
});
