import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class TreePickerHeader extends Component {

    componentDidMount() {
        this.props.onMount(this);
    }

    render() {
        return draw('tree-picker-header', {
            props: this.props,
        });
    }
}
