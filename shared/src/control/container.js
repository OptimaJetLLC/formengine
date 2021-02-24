import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return draw('container', {
            props: this.props
        });
    }
}
