import { Component } from 'react';
import { draw } from '../component-render-registry';

const isEqual = require('react-fast-compare');

export default class RadioGroup extends Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    onChange = (e, { name, value }) => {
        if (this.props.onChange) {
            this.props.onChange(e, { name: this.props.name, propertyName: this.props.propertyName, value });
        }
        else {
            let handleEvent = this.props.additionalParams.handleEvent;
            if (handleEvent) {
                handleEvent({ syntheticEvent: e, key: this.props.name, eventName: 'onChange', name, value, propertyName: this.props.propertyName });
            }
            else {
                console.error('Set onChange property for RadioGroup!');
            }
        }
    };

    render() {

        // else if (control === RadioGroup) {
        //     let items = [];
        //     if (model['data-elements'] !== undefined) {
        //         if (Array.isArray(model['data-elements'])) {
        //             items = model['data-elements'];
        //         }
        //         else {
        //             items = JSON5.parse(model['data-elements']);
        //         }
        //     }
    
        //     props.handleEvent = handleEvent;
    
        //     if (errors && errors[model.key] !== undefined) {
        //         props.error = errors[model.key];
        //     }
    
        //     res = (<RadioGroup {...props}
        //                         label={model.label}
        //                         direction={model.direction}
        //                         placeholder={model.placeholder}
        //                         items={items}>
        //     </RadioGroup>);

        const controlProps = {
            className: this.props.className,
            style: this.props.style,
        };

        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;

        return draw('radio-group', {
            props: this.props,
            controlProps: controlProps,
            onChange: this.onChange.bind(this),
            label: replaceControlValue(model.label),
            items: replaceControlValue(model["data-elements"])
        });
    }
}
