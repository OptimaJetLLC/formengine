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
        const { onClear, onUpload } = this;
        const additionalParams = this.props.additionalParams;

        let additional = {}
        if (additionalParams.handleEvent != null) {
            additional.onChange = function (e, { name, value, parameters }) {
                let res = value;
                additionalParams.handleEvent({
                    syntheticEvent: e,
                    key: this.props.name,
                    propertyName: this.props.propertyName,
                    eventName: 'onChange',
                    name: name,
                    value: res,
                    parameters
                });
            };
        }

        return draw('camera', {
            handleChange: this.handleChange,
            me: this,
            onClear,
            onUpload,
            props: {
                uploadUrl: additionalParams.uploadUrl,
                downloadUrl: additionalParams.downloadUrl,
                ...this.props,
                ...additionalParams.model,
                ...additional
            },
            state: this.state,
            model: additionalParams.model
        });
    }
}
