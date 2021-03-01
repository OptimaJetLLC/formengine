import { Component } from 'react';
import { draw } from '../component-render-registry';

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let model = this.props.additionalParams.model;
        
        return draw('container', {
            props: this.props,
            model
        });
    }
}
