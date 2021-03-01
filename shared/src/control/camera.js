/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable eqeqeq */

import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Camera extends Component {

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


        // else if (control === Camera) {
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
    
        //     res = <Camera {...props} additionalParams={{ model, data, errors, children, handleEvent, parentItem }}/>;

        const { onClear, onUpload } = this;

        return draw('camera', {
            handleChange: this.handleChange,
            me: this,
            onClear,
            onUpload,
            props: this.props,
            state: this.state,
            model
        });
    }
}
