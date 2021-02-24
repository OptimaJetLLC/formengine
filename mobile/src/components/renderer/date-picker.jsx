import React, {useState} from 'react';
import { register } from 'optimajet-builder-shared';
import { Platform, View, TouchableOpacity, Keyboard } from 'react-native';
import { Button, Card, Modal, Text, Input, Icon } from '@ui-kitten/components';
import builderStyles from '../../builder-styles';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
 
class NativeTimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDatePickerVisible: false
        };
    }

    convertCurrentValue = () => {
        const props = this.props;
        if(!props.value) {
            return undefined;
        }

        if(props.datePickerProps && props.datePickerProps.dateFormat)
            return moment(props.value).format(props.datePickerProps.dateFormat);
        else
            return moment(props.value).format('YYYY-MM-DD');
    }

    render() {
        const isDatePickerVisible = this.state.isDatePickerVisible;
        const props = this.props;
        const controlParams = builderStyles.controlParams(props);
 
        const showDatePicker = () => {
            if(this.props.disabled || this.props.readOnly)
                return;

            this.setState({isDatePickerVisible: true});
        };
       
        const hideDatePicker = () => {
            this.setState({isDatePickerVisible: false});
        };
       
        const handleConfirm = (date) => {
            hideDatePicker();

            if(this.props.disabled || this.props.readOnly)
                return;

            if (this.props.onValueChange)
                this.props.onValueChange(date);
        };

        let pickerDate = props.value;
        let pickerDefaultValue = new Date();;
        if(Object.prototype.toString.call(pickerDate) !== '[object Date]'){
            if(pickerDate == null || pickerDate == undefined || pickerDate == ""){
                pickerDate = pickerDefaultValue;
            }
            else if(typeof pickerDate == "object"){
                pickerDate = moment(pickerDate).toDate();
            }
            else if(typeof pickerDate == "string"){
                pickerDate = moment(pickerDate);
                if (pickerDate && pickerDate.isValid()) {
                    pickerDate = pickerDate.toDate();
                }
                else{
                    pickerDate = pickerDefaultValue;
                }
            }
            else{
                pickerDate = pickerDefaultValue;
            }
        }

        const accessoryRight = (p) => {
            if(this.props.disabled || this.props.readOnly)
                return <View/>;

            return <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row',}}>
                <TouchableOpacity onPress={() => showDatePicker()} accessible={false}>
                    <Icon {...p} name="calendar-outline"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleConfirm(null)} accessible={false}>
                    <Icon {...p} name="close-circle-outline"/>
                </TouchableOpacity>
            </View>;
        };

        return (
          <View>
            <TouchableOpacity onPress={showDatePicker} accessible={false}>
                <DWKitInput {...props}
                    onFocus={() => {
                        Keyboard.dismiss();
                        showDatePicker();
                    }}
                    value={props.value ? this.convertCurrentValue() : undefined}
                    style={[props.style, {display: 'flex'}, controlParams.style]}
                    textStyle={{color: 'black'}}
                    accessoryRight={accessoryRight}
                />
            </TouchableOpacity>
            <DateTimePickerModal
              date={pickerDate}
              isVisible={isDatePickerVisible}
              mode={props.type}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        );
    }
};

register('date-picker', options => {
    const controlProps = {
        ...options.props,
        status: options.props.error ? "danger" : undefined
    };

    const onChangeFn = options.props.onChange || options.props.onValueChange;

    if (onChangeFn) {
        controlProps.onValueChange = (value) => onChangeFn(
            value,
            { name: controlProps.name, value }
        );
        delete options.props.onChange;
    }

    // todo show error
    if (!options.props.isForm) {
        controlProps['data-buildertype'] = options.props.type;
    }
    return Platform.select({
        native: () => (<NativeTimePicker {...controlProps} datePickerProps={options.datePickerProps}/>),
        default: () => (<DWKitInput type={options.type}
                                value={options.date} {...controlProps}
                                placeholder={'Time/Date picker shows only on mobile device'}
                                />),
    })();
});
