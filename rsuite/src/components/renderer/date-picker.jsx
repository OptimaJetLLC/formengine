import React from 'react';
//import ReactDatePicker from 'react-datepicker';
import { isDefined, register } from 'optimajet-builder-shared';

register('date-picker', options => {
    return <div></div>;
    // let control = <ReactDatePicker {...options.datePickerProps}
    //                                peekNextMonth
    //                                showMonthDropdown
    //                                showYearDropdown
    //                                dropdownMode="select"
    //                                isClearable={!options.props.readOnly}
    //                                placeholderText={options.placeholder}
    //                                selected={options.date}
    //                                onChange={options.onChange}
    //                                onChangeRaw={options.handleChangeRaw}
    // />;

    // if (!options.props.labelPosition || options.props.isForm) {
    //     if (options.controlProps.className) {
    //         options.controlProps.className += ' field';
    //     }
    //     else {
    //         options.controlProps.className = 'field';
    //     }

    //     if (options.props.error) {
    //         options.controlProps.className += ' error';
    //     }

    //     if (options.props.readOnly) {
    //         options.controlProps.className += ' datepicker-readonly';
    //     }

    //     return (<div {...options.controlProps}>
    //         {isDefined(options.props.label) && <label>{options.props.label}</label>}
    //         <div data-buildertype={options.props.type}>
    //             {control}
    //         </div>
    //     </div>);
    // }

    // if (options.controlProps.className) {
    //     options.controlProps.className += ' ui fluid labeled input';
    // }
    // else {
    //     options.controlProps.className = 'ui fluid labeled input';
    // }

    // if (options.props.error) {
    //     options.controlProps.className += ' error';
    // }

    // if (options.props.readOnly) {
    //     options.controlProps.className += ' datepicker-readonly';
    // }

    // return (<div {...options.controlProps} data-buildertype={options.props.type}>
    //     {isDefined(options.props.label) && <div className="ui label label">{options.props.label}</div>}
    //     {control}
    // </div>);
});
