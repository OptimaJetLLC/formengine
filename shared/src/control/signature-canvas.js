import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class SignatureCanvas extends Component {


    onUpload = (file, response) => {
        const me = this;
        const parameters = {
            name: file.name,
            token: response.result.properties['Token'],
            success: response.success,
            properties: response.result.properties
        };

        if (response.success) {
            if (me.props.onChange) {
                me.props.onChange(null, {
                    name: me.props.name,
                    propertyName: me.props.propertyName,
                    value: response.result.properties['Token'],
                    parameters,
                });
            }
        }
        else {
            if (me.props.onUploadFail) {
                me.props.onUploadFail(null, {
                    name: me.props.name,
                    propertyName: me.props.propertyName,
                    message: response.result.message,
                    details: response.result.details,
                    success: false
                });
            }
        }
    }

    onClear = (e) => {
        const me = this;
        if (me.props.onChange) {
            me.props.onChange(null, {
                name: me.props.name,
                propertyName: me.props.propertyName,
                value: null,
            });
        }
    }

    render() {
        const { onClear, onUpload } = this;

        // else if (control === SignatureCanvas) {
        //     props = { ...props, ...model };
        //     props.uploadUrl = uploadUrl;
        //     props.downloadUrl = downloadUrl;
    
        //     if (handleEvent != null) {
        //         props.onChange = function (e, { name, value, parameters }) {
        //             let res = value;
        //             handleEvent({
        //                 syntheticEvent: e,
        //                 key: props.name,
        //                 propertyName: props.propertyName,
        //                 eventName: 'onChange',
        //                 name: name,
        //                 value: res,
        //                 parameters
        //             });
        //         };
        //     }
    
        //     res = <SignatureCanvas {...props} additionalParams={{ model, data, errors, children, handleEvent, parentItem }}/>;

        return draw('signature-canvas', {
            handleChange: this.handleChange,
            me: this,
            onClear,
            onUpload,
            props: this.props,
            state: this.state,
        });
    }
}
