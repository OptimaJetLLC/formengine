import { Component } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { draw } from '../component-render-registry';

export default class Files extends Component {

    onFileUploaded(parameters) {
        const data = this.props.value ? [...this.props.value] : [];
        const properties = parameters.properties;

        const row = {
            __id: 'CLIENT_' + uuidv1()
        };

        this.props.columns.filter(c => c.field).forEach(c => {
            row[c.field] = properties[c.property];
        });

        data.push(row);

        this.props.additionalParams.handleEvent({
            syntheticEvent: null,
            key: this.props.name,
            eventName: 'onChange',
            name: this.props.name,
            value: data,
            propertyName: this.props.propertyName
        });

        this.props.additionalParams.handleEvent({
            syntheticEvent: null,
            key: this.props.name,
            eventName: 'onUploadSuccess',
            name: this.props.name,
            parameters,
            propertyName: this.props.propertyName
        });
    }

    onFail(parameters) {
        this.props.additionalParams.handleEvent({
            syntheticEvent: null,
            key: this.props.name,
            eventName: 'onUploadFail',
            name: this.props.name,
            parameters,
            propertyName: this.props.propertyName
        });
    }

    onDropzoneUploadSuccess = (_name, _propertyName, parameters) => {
        this.onFileUploaded(parameters);
    };

    onDropzoneUploadFail = (_name, _propertyName, parameters) => {
        this.onFail(parameters);
    };

    onCollectionEditorChange = ({ eventName, parameters, value }) => {
        if (eventName === 'onDelete') {
            this.props.additionalParams.handleEvent({
                key: this.props.name, propertyName: this.props.propertyName, eventName, parameters
            });
        }

        if (eventName === 'onChange') {
            this.props.additionalParams.handleEvent({
                syntheticEvent: null,
                key: this.props.name,
                eventName,
                name: this.props.name,
                value,
                propertyName: this.props.propertyName
            });
        }
    };

    onUploadChange = (e, { parameters }) => {
        this.onFileUploaded(parameters);
    };

    onUploadFail = (e, parameters) => {
        this.onFail(parameters);
    };

    nameGetter = (row) => {
        const column = this.props.columns.find(c => c.property === 'Name');
        return row[column.field];
    };

    contentTypeGetter = (row) => {
        const column = this.props.columns.find(c => c.property === 'ContentType');
        return row[column.field];
    };

    render() {
        let model = this.props.additionalParams.model;
        // else if (control === Files) {

        //     props.iconFiletypes = model.iconFiletypes;
        //     props.postUrl = uploadUrl;
        //     props.showFiletypeIcon = model.showFiletypeIcon;
        //     props.autoProcessQueue = model.autoProcessQueue;
        //     props.useDropzone = model.useDropzone;
        //     props.columns = model.columns;
        //     props.idField = model.idField;
    
        //     props.downloadUrl = downloadUrl;
    
        //     res = <Files {...props} additionalParams={{ model, data, errors, children, handleEvent, parentItem }}/>;


        const columns = [];

        this.props.columns.filter(c => c.showcolumn).forEach(c => {
            const column = {
                key: c.field,
                name: c.title,
                control: c.control
            };

            if (c.property === 'Token') {
                column.additionalData = {
                    customNameGetter: this.nameGetter,
                    customContentTypeGetter: this.contentTypeGetter
                };
            }

            columns.push(column);
        });

        const editorProps = {
            readOnly: this.props.readOnly,
            value: this.props.value,
            idField: this.props.idField,
            downloadUrl: this.props.downloadUrl,
            columns,
            handleEvent: this.onCollectionEditorChange
        };

        return draw('files', {
            editorProps: editorProps,
            onDropzoneUploadSuccess: this.onDropzoneUploadSuccess,
            onDropzoneUploadFail: this.onDropzoneUploadFail,
            onUploadChange: this.onUploadChange,
            onUploadFail: this.onUploadFail,
            props: this.props,
            model
        });
    }

}
