import React from 'react';
//import { Row } from 'react-data-grid';
import { register } from 'optimajet-builder-shared';

register('row-loading-renderer', options => {
    return (<div className={options.className}>
        {/* <Row ref={node => options.me.row = node} {...options.props}/> */}
            </div>);
});
