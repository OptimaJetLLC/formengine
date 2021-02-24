import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import { isDefined } from './helpers';
import { vl, sle } from './license';
export default class BaseFormBuilder extends Component {

    constructor(props) {
        super(props);
        sle(vl());
        this.state = {
            apiurl: props.apiurl,
            imagefolder: props.imagefolder,
            dropzoneContext: {
                visible: true,
            },
        };
    }

    exists(code) {
        return FormBuilderStore.exists(code);
    }

    setBuilderMode(enabled) {
        this.setState({
            dropzoneContext: {
                visible: enabled,
            },
        });
    }

    create() {
        FormBuilderStore.setData([]);
    }

    setData(data) {
        FormBuilderStore.setData(data);        
    }

    getData() {
        return FormBuilderStore.getData();
    }

    getSettings(){
        let settings = FormBuilderStore.getByKey("__settings");
        if(!settings)
            settings = {key: "__settings", "data-buildertype": "__settings"};
        return settings;
    }

    setSettings(data){
        FormBuilderStore.updateItemByKey("__settings", data);
    }

    load(code) {
        let data = this.props.getFormFunc(code);
        if(!data)
            data = [];
        FormBuilderStore.setData(data);
        this.setState({
            code: code
        });
    }

    download() {
        const filename = (this.props.formName ? this.props.formName : "form") + ".json";
        const data = FormBuilderStore.getData();
        const json = JSON.stringify(data, null, 2),
            blob = new Blob([json], { type: 'octet/stream' }),
            encodedUri = window.URL.createObjectURL(blob);

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        }
    }

    upload(form, successFunc) {
        let me = this;
        const file = form.files[0];
        const reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                const data = JSON.parse(e.target.result);
                FormBuilderStore.setData(data);

                successFunc && successFunc(data);
                me.forceUpdate();
            };
        })(file);

        reader.readAsText(file);
    }

    onChooseFileUpload() {
        const button = document.getElementById('builderUploadFile');
        button.click();
    }

    onChangeFileUpload() {
        const button = document.getElementById('builderUploadSubmit');
        button.click();
    }

    onUpload(e) {
        e.preventDefault();
        this.upload(document.getElementById('builderUploadFile'));
    }

    onDownload(e) {
        this.download();
    }

    onDragOver = (e) => {
        const step = 10;
        if (e.clientY < 150) {
            this.scroll(-step);
        }

        if (e.clientY > (window.innerHeight - 150)) {
            this.scroll(step);
        }
    };

    scroll(step) {
        window.scrollTo(null, window.scrollY + step);
        if (!window.stop) {
            setTimeout(function () {
                window.scroll(step);
            }, 20);
        }
    }

    render() {
        return null;
    }
}
