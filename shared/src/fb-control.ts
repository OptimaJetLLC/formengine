import { Component } from 'react';
import { FbEvent } from './fb-event';
import { FbProps } from './fb-props';

const isEqual = require('react-fast-compare');

class FbComponent<P extends FbProps, S> extends Component<P, S> {

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return !isEqual(this.props, nextProps);
    }

    handleChange = (e: FbEvent | null, data: any | null) => {
        this.props.handleChange(this.props.row, e, data);
    }

}
