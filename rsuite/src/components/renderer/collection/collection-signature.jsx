import React from 'react';
import { register, SignatureCanvas } from 'optimajet-builder-shared';

register('collection-signature', options => {
    return (<SignatureCanvas
        name={options.props.colName}
        error={options.props.errorFlag}
        value={options.props.value}
        readOnly={options.props.readOnly}
        onChange={options.me.handleChange}
        downloadUrl={options.props.downloadUrl}
        uploadUrl={options.props.uploadUrl}
        additionalData={options.props.additionalData}
        additionalDataContext={options.props.row}
        compact fluid isForm
    />);
});
