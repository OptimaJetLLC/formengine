import { register } from 'optimajet-builder-shared';

register('collection-custom-control', options => {
    const model = options.props.model;
    return options.props.createControl(options.props.parent, model['data-buildertype'], {
        model,
        data: options.props.row,
        errors: options.props.errorOnRow,
        parentItem: options.props.name,
        buildermode: options.props.buildermode,
        handleEvent: options.handleEvent,
        getAdditionalDataForControl: options.getAdditionalDataForControl,
        readOnly: options.props.readOnly,
        uploadUrl: options.props.uploadUrl,
        downloadUrl: options.props.downloadUrl,
        controlsToReplace: [],
        formData: options.props.data,
        adaptiveViewType: options.props.adaptiveViewType
    }, options.props.controlBarParams);
});
