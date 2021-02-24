import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class StaticContent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const spanProps = {
            name: this.props.name,
            className: this.props.className,
            style: this.props.style,
                    
        };

        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;

        let content = replaceControlValue(model.content);
        let isHtml = model.isHtml;        

        return draw('static-content', {
            props: this.props,
            spanProps: spanProps,
            content,
            isHtml
        });
    }
}
