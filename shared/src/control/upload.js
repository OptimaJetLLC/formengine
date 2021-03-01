import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Upload extends Component {

    getCustomFileName() {
        if (!this.props.additionalData || !this.props.additionalDataContext) {
            return null;
        }

        if (this.props.additionalData.customNameGetter) {
            return this.props.additionalData.customNameGetter(this.props.additionalDataContext);
        }

        return null;
    }

    getCustomContentType() {
        if (!this.props.additionalData || !this.props.additionalDataContext) {
            return null;
        }

        if (this.props.additionalData.customContentTypeGetter) {
            return this.props.additionalData.customContentTypeGetter(this.props.additionalDataContext);
        }

        return null;
    }

    render() {
        let model = this.props.additionalParams.model;
        return draw('upload', {
            getCustomContentType: this.getCustomContentType,
            getCustomFileName: this.getCustomFileName,
            me: this,
            onChange: this.onChange,
            onClear: this.onClear,
            props: this.props,
            model
        });
    }

    onChange = (e) => {
        const me = this;
        const formData = new FormData();
        formData.append(me.props.name, e.target.files[0]);

        // todo fetchFn
        // todo test fetch and remove jquery
        window.$.ajax({
            url: me.props.uploadUrl,
            type: 'POST',
            processData: false,
            contentType: false,
            dataType: 'json',
            data: formData,
            success: function (jsonData) {
                if (jsonData.success) {
                    if (me.props.onChange) {
                        me.props.onChange(e, {
                            name: me.props.name,
                            propertyName: me.props.propertyName,
                            value: jsonData.result.properties['Token'],
                            parameters: {
                                success: true,
                                properties: jsonData.result.properties
                            }
                        });
                    }
                }
                else {
                    if (me.props.onUploadFail) {
                        me.props.onUploadFail(e, {
                            name: me.props.name,
                            propertyName: me.props.propertyName,
                            message: jsonData.message,
                            details: jsonData.details,
                            success: false
                        });
                    }
                }
            }
        });
    };

    onClear = () => {
        if (this.props.onChange) {
            this.props.onChange(
                undefined,
                { name: this.props.name, propertyName: this.props.propertyName, value: null }
            );
        }
    }
}
