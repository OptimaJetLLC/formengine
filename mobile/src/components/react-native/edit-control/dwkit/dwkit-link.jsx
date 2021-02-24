import React, { Component } from 'react';
import Link from '../../renderer/link';

export default class DWKitLink extends Component {

    render() {
        return (<Link {...this.props}/>);
    }

}
