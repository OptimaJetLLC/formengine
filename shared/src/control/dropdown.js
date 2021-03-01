import { Component } from 'react';
import { draw } from '../component-render-registry';
import JSON5 from 'json5';

export default class Dropdown extends Component {

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

        let items = [];
        if (model['data-elements'] !== undefined) {
            if (Array.isArray(model['data-elements'])) {
                items = model['data-elements'];
            }
            else {
                items = JSON5.parse(model['data-elements']);
            }
        }

        return draw('dropdown', {
            props: this.props,
            controlProps: controlProps,
            label: model.label,
            items: items,
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
