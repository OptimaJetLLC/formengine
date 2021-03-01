import { Component } from 'react'
import JSON5 from 'json5'
import { isDefined, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class MenuGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        if (isDefined(props.value)) {
            this.state.activeitem = props.value;
        }
        else if (props.activeitem != null) {
            this.state.activeitem = props.activeitem;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.activeitem !== nextProps.value) {
            return { activeitem: nextProps.value };
        }

        return null;
    }

    handleItemClick = (e, { name }) => {
        if (isDefined(this.props.handleEvent)) {
            const res = this.props.handleEvent({
                e,
                key: this.props.name,
                eventName: 'onItemClick',
                parameters: { target: name }
            });
            if (res != false) {
                this.setState({ activeitem: name });
            }
        }
    };

    handleItemClick2(p, e) {
        this.handleItemClick(e, p);
        e.preventDefault();
    }

    render() {
        let model = this.props.additionalParams.model;
        // else if (control === MenuGroup) {
        //     props['data-items'] = replaceControlValue(model.items);
        //     props.pointing = model.pointing;
        //     props.secondary = model.secondary;
        //     props.tabular = model.tabular;
        //     props.fluid = model.fluid;
        //     props.vertical = model.vertical;
        //     props.activeitem = model.activeitem;
        //     props.link = model.link;
        //     props.handleEvent = handleEvent;
        //     res = (<MenuGroup {...props} />);
        //     }

        let items = this.props['data-items'];
        if (isUndefined(items) || items == '') {
            items = [];
        }
        else if (!Array.isArray(items)) {
            items = JSON5.parse(items);
        }

        return draw('menu-group', {
            handleItemClick: this.handleItemClick,
            handleItemClick2: this.handleItemClick2,
            items: items,
            me: this,
            props: this.props,
            state: this.state,
            model
        });
    }
}
