import { Component } from 'react';
import { draw } from '../../component-render-registry';

export default class CustomControl extends Component {

    handleEvent = (args) => {
        if (!args.parameters) {
            args.parameters = {};
        }

        if (!args.parameters.row) {
            args.parameters.row = this.props.row;
        }

        if (args.eventName === 'onChange') {
            this.props.handleChange(this.props.row, args.syntheticEvent, args);
        }
        else {
            this.props.handleEvent(args);
        }
    };

    getAdditionalDataForControl = (control, parameters, callback) => {
        if (!parameters) {
            parameters = {};
        }

        if (!parameters.row) {
            parameters.row = this.props.row;
        }
        return this.props.getAdditionalDataForControl(control, parameters, callback);
    };

    render() {
        return draw('collection-custom-control', {
            getAdditionalDataForControl: this.getAdditionalDataForControl,
            handleEvent: this.handleEvent,
            props: this.props,
        });
    }

}
