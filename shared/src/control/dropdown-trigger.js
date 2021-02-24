import { Component } from 'react'
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class DropdownTrigger extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // else if (control === DropdownTrigger) {
        //     props.defaultValue = model.defaultValue;
        //     props.items = model.items;
        //     props.imageUrl = model.imageUrl;
        //     props.handleEvent = handleEvent;
        //     res = (<DropdownTrigger {...props} />);
        //     }

        let controlProps = {};
        for (let p in this.props) {
            if (p === 'imageUrl' ||
                p === 'defaultValue' ||
                p === 'value' ||
                p === 'handleEvent' ||
                p === 'items' ||
                p === 'propertyName') {
                continue;
            }
            controlProps[p] = this.props[p];
        }

        controlProps.options = [];
        this.props.items.forEach(function (item) {
            let isSkip = false;
            if (item.visibleCondition !== undefined && item.visibleCondition !== null && item.visibleCondition !== '') {
                let args = '';
                let body = 'return ' + item.visibleCondition;
                try {
                    if (!new Function(args, body)()) {
                        isSkip = true;
                    }
                }
                catch (e) {
                }
            }

            if (!isSkip) {
                controlProps.options.push({ value: item.target, text: item.title, target: item.target });
            }

        });
        controlProps.value = '';
        controlProps.onChange = this.onChange;
        return draw('dropdown-trigger', {
            controlProps: controlProps,
            onMouseDown: this.onMouseDown,
            props: this.props,
        });
    }

    onChange = (e, { name, value }) => {
        if (this.state.opendialog == true) {
            this.state.opendialog = false;
            return;
        }

        if (isDefined(this.props.handleEvent)) {
            this.props.handleEvent({
                e,
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onItemClick',
                parameters: { target: value }
            });
        }
    };

    onMouseDown = (e) => {
        this.state.opendialog = !Boolean(this.state.opendialog);
    }
}
