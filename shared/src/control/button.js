import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let me = this;
        const controlProps = {
            className: this.props.className,
            style: this.props.style,
        };

        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;
        let content = replaceControlValue(model.content);

        let onClickFunc = this.props.onClick;
        let handleEvent = this.props.additionalParams.handleEvent;
        if (handleEvent !== undefined) {
            let onClickParent = onClickFunc;
            onClickFunc = function (e) {
                if(onClickParent)
                    onClickParent(e);

                // if(e.currentTarget && e.currentTarget.classList)
                //     e.currentTarget.classList.add("loading");

                let res = handleEvent({syntheticEvent: e, key: me.props.name, eventName: "onClick"});
                
                // if(e.currentTarget && e.currentTarget.classList)
                //     e.currentTarget.classList.remove("loading");
        
                return res;
            };
        }

        return draw('button', {
            props: this.props,
            controlProps: controlProps,
            content,
            onClick: onClickFunc
        });
    }
}
