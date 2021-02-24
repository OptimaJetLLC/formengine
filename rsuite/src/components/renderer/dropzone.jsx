import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { register } from 'optimajet-builder-shared';

register('dropzone', options => {
    const control = options.props.readOnly ?
        <div></div> :
        <DropzoneComponent config={options.componentConfig} eventHandlers={options.eventHandlers}
                           djsConfig={options.djsConfig}></DropzoneComponent>;

    if (options.isForm) {
        return (<div className="field">{control}</div>);
    }
    return control;
});
