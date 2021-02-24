import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import builderStyles from '../../../builder-styles'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default class DWKitMultiSelect extends Component {

    // todo use react-native-sectioned-multi-select + use @community-picker

    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };
    }

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    };

    render() {

        // // todo multiple? todo search? todo add?
        // const pickerItems = props.options.map((item, index) => {
        //     return <Picker.Item key={`_${item.value}_${index}`} label={item.text} value={item.value}/>
        // });

        const items = [
            // this is the parent or 'item'
            {
                name: 'Fruits',
                id: 0,
                // these are the children or 'sub items'
                children: [
                    {
                        name: 'Apple',
                        id: 10,
                    },
                    {
                        name: 'Strawberry',
                        id: 17,
                    },
                    {
                        name: 'Pineapple',
                        id: 13,
                    },
                    {
                        name: 'Banana',
                        id: 14,
                    },
                    {
                        name: 'Watermelon',
                        id: 15,
                    },
                    {
                        name: 'Kiwi fruit',
                        id: 16,
                    },
                ],
            },
        ];

        // todo style
        return (<View style={builderStyles.dwKitDropdown.containerStyle}>
            <Text style={builderStyles.dwKitDropdown.labelStyle}>{this.props.label}</Text>
            <SectionedMultiSelect
                items={items}
                uniqueKey="id"
                subKey="children"
                selectText="Choose some things..."
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
            />
            // todo use
            {/*<Picker  {...builderStyles.dwKitDropdown.checkbox}*/}
            {/*         selectedValue={props.value}*/}
            {/*         onValueChange={props.onValueChange}*/}
            {/*         multiple={props.multiple}>*/}
            {/*    {pickerItems}*/}
            {/*</Picker>*/}
        </View>);
    }

}
