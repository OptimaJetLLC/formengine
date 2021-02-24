import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const controlProps = {
            key: this.props.name,
            className: this.props.className,
            style: this.props.style,
        };

        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;       

        let content = replaceControlValue(model.content);
        let subheader = replaceControlValue(model.subheader);

        return draw('header', {
            props: this.props,
            controlProps: controlProps,
            content,
            subheader,
            size: model.subheader,
            textAlign: model.textAlign
        });
    }
}
