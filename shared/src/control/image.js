import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Image extends Component {

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

        

        return draw('image', {
            props: this.props,
            controlProps: controlProps,
            src: replaceControlValue(model.src),
            href: replaceControlValue(model.href)
        });
    }
}
