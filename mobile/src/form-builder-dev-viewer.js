import React, { Component } from 'react';
import DWKitFormViewer from './dwkit/viewer';
import fetch from 'isomorphic-fetch';

export default class FormBuilderDevViewer extends Component {

    getForm(formName) {
        return async () => {
            const formUrl = formName + '.json';
            const response = await fetch(formUrl);
            return await response.json();
        }
    }

    eventProcess(obj, p) {
        console.log('Event from form:', obj, p);
    }

    eventErrProcess(obj, message) {
        alert('Error from the form: ' + message);
    }

    render() {
        const props = {
            eventFunc: this.eventProcess,
            eventErrFunc: this.eventErrProcess,
            getFormFunc: this.props.getFormFunc ? this.props.getFormFunc : this.getForm,
            dataurl: this.props.dataUrl,
            downloadUrl: 'download.html?file=',
            uploadUrl: 'upload.html?file=',
            modelurl: this.props.formUrl,
            model: this.props.model,
            parent: this.props.parent,
            showHeader: this.props.showHeader,
            externalControlList: this.props.externalControlList,
            externalControlRender: this.props.externalControlRender,
            externalControlsOnly: this.props.externalControlsOnly
        };
        return (<DWKitFormViewer {...props} />);
    }

}
