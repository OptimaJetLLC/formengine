import { Component } from 'react';

const isEqual = require('react-fast-compare');

export default class RepeaterControl extends Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    handleEvent = (args) => {
        if (!args.parameters) {
            args.parameters = {};
        }

        if (!args.parameters.row) {
            args.parameters.row = this.props.item;
        }

        if (args.eventName === 'onChange') {
            if (!args.parameters.index) {
                args.parameters.index = this.props.index;
            }
            
            this.props.handleChange(this.props.item, args.syntheticEvent, args);
        }
        else {
            if (!args.parameters.index) {
                if(this.props.item && this.props.item.__originalIndex){
                    args.parameters.index = this.props.item.__originalIndex;
                }
                else{
                    args.parameters.index = this.props.index;
                }
            }
            
            this.props.controlProps.handleEvent(args);
        }
    };

    getAdditionalDataForControl = (control, parameters, callback) => {
        if (!parameters) {
            parameters = {};
        }

        if (!parameters.row) {
            parameters.row = this.props.item;
        }
        return this.props.controlProps.getAdditionalDataForControl(control, parameters, callback);
    };

    render() {
        const createBuilderDropzone = this.props.controlProps.createBuilderDropzone;
        const model = this.props.model;
        const dzkey = this.props.index + '_';
        const psTemplate = this.props.psTemplate;

        const element = this.props.controlProps.createControls(this.props.parent, {
            ...this.props.controlProps,
            model,
            parentPlaceholder: psTemplate,
            data: this.props.item,
            errors: this.props.errors,
            needCheckReplace: !this.props.controlProps.buildermode,
            formData: this.props.data,
            parentItem: this.props.parentItem,
            handleEvent: this.handleEvent,
            getAdditionalDataForControl: this.getAdditionalDataForControl
        });

        if (this.props.includeDropzone && createBuilderDropzone) {
            if (element.length > 0 && model.length > 0) {
                element.unshift(createBuilderDropzone(
                    dzkey + 'repeter_dropzone_header',
                    this.props.parentItem.key,
                    undefined,
                    undefined,
                    psTemplate
                ));
            }
            element.push(createBuilderDropzone(
                dzkey + 'repeter_dropzone_footer',
                this.props.parentItem.key,
                model[model.length - 1].key,
                undefined,
                psTemplate
            ));
        }

        return element;
    }
}
