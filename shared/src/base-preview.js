import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import BuilderActions from './actions';
import { isDefined } from './helpers';
import BaseControls from './base-controls';

export default class BasePreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editElement: null,
            //buildermode: props.buildermode || true 
        };

        FormBuilderStore.listen(this.dataChanged.bind(this));
    }

    dataChanged(data) {
        let tdata = FormBuilderStore.getTemporaryData();
        this.setState({
            data: tdata,
            editElement: null
        });
    }

    _onEdit(item) {
        BuilderActions.showEditForm(item.key);
    }

    _onCopy(item) {
        FormBuilderStore.copy(item);
    }

    _onDestroy(item) {
        FormBuilderStore.remove(item);
    }

    _handleEvent(p) {
      
    }

    getPreview() {

        function getDropzone(key, dropzoneText) {
            return BaseControls.createBuilderDropzone(
                key,
                undefined,
                undefined,
                dropzoneText
            );
        }

        const items = this.props.controls.createControls(
            this,
            {
                model: this.state.data,
                data: undefined,
                buildermode: this.props.buildermode,
                eventOnEdit: this._onEdit,
                eventOnDelete: this._onDestroy,
                eventOnCopy: this._onCopy,
                parentItem: undefined,
                handleEvent: this._handleEvent,
                getFormFunc: this.props.getFormFunc,
                getFormFist: this.props.getFormFist,
                getAdditionalDataForControl: this.props.getAdditionalDataForControl,
                disableRefs: true,
                downloadUrl: this.props.downloadUrl,
                uploadUrl: this.props.uploadUrl,
                controlsToReplace: [],
                needCheckReplace: false,
                externalControlRender: this.props.externalControlRender,
                externalControlList: this.props.externalControlList
            }
        );

        let dropzoneText = undefined;
        if (isDefined(this.props.localization) && isDefined(this.props.localization.preview)) {
            dropzoneText = this.props.localization.preview.dropzonetext;
        }
        const dropzoneHeader = getDropzone('dropzone_header', dropzoneText);
        const dropzoneFooter = items.length > 0 ? getDropzone('dropzone_footer', dropzoneText) : null;
        return {
            dropzoneHeader: dropzoneHeader,
            dropzoneFooter: dropzoneFooter,
            items: items
        };
    }

}
