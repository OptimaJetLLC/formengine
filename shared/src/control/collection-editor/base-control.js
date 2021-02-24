import { Component } from 'react';

const isEqual = require('react-fast-compare');

export default class BaseControl extends Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    handleChange = (e, data) => {
        this.props.handleChange(this.props.row, e, data);
    }

}
