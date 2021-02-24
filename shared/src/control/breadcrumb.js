import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Breadcrumb extends Component {

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

        let children = model.items.map((c)=> {
            return {
                text: replaceControlValue(c.text),
                url: replaceControlValue(c.url)
            };
        });

        return draw('breadcrumb', {
            props: this.props,
            controlProps: controlProps,
            children,
            onClick: this.onClick
        });
    }

    onClick(url, e){
        this.props.additionalParams.handleEvent({
            syntheticEvent: e,
            key: this.props.name,
            eventName: 'onItemClick',
            parameters: { target: url }
        });
    }
}
