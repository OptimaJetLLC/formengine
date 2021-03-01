/* eslint-disable react/no-direct-mutation-state */

import { Component } from 'react';
import moment from 'moment';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';
import { dwKitDateFormat, dwKitTimeFormat } from '../dwkit-util';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleChangeRaw = (e) => {
        let date = moment(e.target.value, this.state.dateFormat);
        this.onChange(date);
    };

    onChange = (date) => {
        if (this.props.readOnly) {
            return;
        }

        if (isDefined(this.props.onChange)) {
            let value = null;
            if (date != null && isDefined(date)) {
                let type = this.props.type;
                if (type === 'date') {
                    value = date.format('YYYY-MM-DD');
                }
                else {
                    value = date.toJSON();
                }
            }

            this.props.onChange(null, { propertyName: this.props.propertyName, name: this.props.name, value });
        }
    };

    render() {
        let type = this.props.type;
        let date = this.props.value ? moment(this.props.value) : undefined;
        if (date && !date.isValid()) {
            date = undefined;
        }

        let model = this.props.additionalParams.model;

        let controlProps = {
            style: this.props.style,
            className: this.props.className,
            onBlur: this.props.onBlur,
            onClick: this.props.onClick,
            onFocus: this.props.onFocus,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave
        };

        let datePickerProps = {};

        if (type === 'date') {
            datePickerProps.dateFormat = dwKitDateFormat('DD.MM.YYYY');
        }
        else if (type === 'time') {
            datePickerProps.showTimeSelect = true;
            datePickerProps.showTimeSelectOnly = true;
            datePickerProps.timeIntervals = 10;
            datePickerProps.dateFormat = dwKitTimeFormat();
            if (!datePickerProps.dateFormat) {
                datePickerProps.dateFormat = 'HH:mm';
                datePickerProps.timeFormat = 'HH:mm';
            }
        }
        else if (type === 'datetime') {
            datePickerProps.showTimeSelect = true;
            if (dwKitDateFormat()) {
                datePickerProps.dateFormat = dwKitDateFormat() + ' ' + dwKitTimeFormat('HH:ss')
            }
            else {
                datePickerProps.dateFormat = 'DD.MM.YYYY HH:mm';
                datePickerProps.timeFormat = 'HH:mm';
            }
        }

        this.state.dateFormat = datePickerProps.dateFormat;

        return draw('date-picker', {
            controlProps: controlProps,
            date: date,
            datePickerProps: datePickerProps,
            handleChangeRaw: this.handleChangeRaw,
            onChange: this.onChange,
            state: this.state,
            placeholder: this.placeholder,
            props: this.props,
            model
        });
    }

}
