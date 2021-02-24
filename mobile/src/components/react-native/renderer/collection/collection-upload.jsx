import React from 'react';
import { register, Upload } from 'optimajet-builder-shared';

register('collection-upload', options => {
    return (<Upload
        name={options.props.colName}
        error={options.props.errorFlag}
        value={options.props.value}
        readOnly={options.props.readOnly}
        onChange={options.me.handleChange}
        downloadUrl={options.props.downloadUrl}
        uploadUrl={options.props.uploadUrl}
        additionalData={options.props.additionalData}
        additionalDataContext={options.props.row}
        isForm
        hideClearButton={options.props.control === 'file2'}
    />);
});
