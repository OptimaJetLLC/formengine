import React from 'react';
import { CollectionEditor, Dropzone, register, Upload } from 'optimajet-builder-shared';

register('files', options => {

    function getUploadControl() {
        if (options.props.readOnly) {
            return null;
        }

        if (options.props.useDropzone) {
            const dropzoneProps = {
                iconFiletypes: options.props.iconFiletypes,
                postUrl: options.props.postUrl,
                showFiletypeIcon: options.props.showFiletypeIcon,
                autoProcessQueue: options.props.autoProcessQueue,
                additionalParams: options.props.additionalParams,
                onSuccess: options.onDropzoneUploadSuccess,
                onFail: options.onDropzoneUploadFail
            };

            return (<Dropzone addRemoveLinks {...dropzoneProps} />);
        }

        const uploadProps = {
            uploadUrl: options.props.postUrl,
            downloadUrl: options.props.downloadUrl,
            readOnly: options.props.readOnly,
            onChange: options.onUploadChange,
            onUploadFail: options.onUploadFail
        };

        return (<Upload isForm {...uploadProps} />);
    }

    return (<div>
        <CollectionEditor disableAdd disableCopy {...options.editorProps} />
        {getUploadControl()}
    </div>);
});
