import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Textarea extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const controlProps = {
            className: this.props.className,
            style: this.props.style,
        };

        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;

        return draw('textarea', {
            props: this.props,
            controlProps: controlProps,
            label: model.label,
            onChange: this.onChange.bind(this),
            model
        });
    }

    onChange(e, {name, value}){
        let handleEvent = this.props.additionalParams.handleEvent;
        if (handleEvent !== null) {
            handleEvent({
                syntheticEvent: e,
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onChange',
                name: name,
                value: value
            });            
        }
    }
}
