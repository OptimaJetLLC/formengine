import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import BuilderActions from './actions';
import { isDefined } from './helpers';
import BaseControls from './base-controls';
import JSON5 from 'json5';

export default class BasePreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: [],
            data: {},
            editElement: null
        };

        FormBuilderStore.listen(this.modelChanged.bind(this));
    }

    modelChanged() {
        let model = FormBuilderStore.getTemporaryData();
        let settings = this.getSettings();
        let data = {};
        if(settings && settings.defaultvalues){
            try{
                data = JSON5.parse(settings.defaultvalues);
            }
            catch{}
        }
        this.setState({
            model,
            data: data,
            editElement: null
        });
    }

    _onEdit(item) {
        FormBuilderStore.select(item.key);
    }

    _onCopy(item) {
        FormBuilderStore.copy(item);
    }

    _onDestroy(item) {
        FormBuilderStore.remove(item);
    }

    _handleEvent(p) {
      if(p.eventName == "onChange"){
          this.state.data[p.propertyName] = p.value;

          var settings = this.getSettings();
          settings.defaultvalues = JSON5.stringify(this.state.data, null, 4);

          this.forceUpdate();
      }
    }

    getSettings(){
        let settings = FormBuilderStore.getByKey("__settings");
        if(!settings)
            settings = {key: "__settings", "data-buildertype": "__settings"};
        return settings;
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
                model: this.state.model,
                data: this.state.data,
                buildermode: this.props.buildermode,
                eventOnEdit: this._onEdit,
                eventOnDelete: this._onDestroy,
                eventOnCopy: this._onCopy,
                parentItem: undefined,
                handleEvent: this._handleEvent.bind(this),
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
        const dropzoneFooter = getDropzone('dropzone_footer', dropzoneText);
        return {
            dropzoneHeader: dropzoneHeader,
            dropzoneFooter: dropzoneFooter,
            items: items
        };
    }

}
