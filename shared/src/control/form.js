import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Form extends Component {

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

        

        return draw('form', {
            props: this.props,
            controlProps: controlProps
        });
    }
}
