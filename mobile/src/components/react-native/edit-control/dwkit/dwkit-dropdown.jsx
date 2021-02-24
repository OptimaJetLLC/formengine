import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IndexPath, Select, SelectItem, Autocomplete, AutocompleteItem, Text } from '@ui-kitten/components';
import builderStyles from '../../../../builder-styles';
import ThemedView from './themed-view.jsx';

const isEqual = require('react-fast-compare');
const DEFAULT_PLACEHOLDER = ""//'Select option...'

let getSelectedIndex = function(value, options, multiple){
    let indexes = undefined;
    if(multiple){
        indexes = [];
        if(Array.isArray(value)){
            value.forEach(item => {
                let index = options.findIndex(el => el.value === item);

                if(index === undefined){
                    options.push({text: item, value: item});
                    index = options.length - 1;
                }
                indexes.push(new IndexPath(index));
            });
        }
    }
    else{
        const index = options.findIndex(el => el.value === value);
        if(index >= 0){
            indexes = new IndexPath(index);
        }
    }
    return indexes;
}

let getSelectedValues = function(indexes, options, multiple){
    if (indexes === undefined) {
        return undefined;
    }
    else if(multiple && Array.isArray(indexes)) {
        let value = [];
        if(Array.isArray(indexes)){
            indexes.forEach(item => {
                if (item.row >= 0) value.push(options[item.row].value);                
            });            
        }
        return value;
    }
    else if(indexes.row !== undefined && options[indexes.row]){
        return options[indexes.row].value;        
    }
    else if (options[indexes]) {
        return options[indexes].value || options[indexes].text || options[indexes];
    }

    return undefined;
}

const getSelectedPreview = (values, options, multiple, placeholder) => {
    let value;
    if (values === undefined || (Array.isArray(values) && !values.length)) {
        value = (p) => <Text appearance='hint'>{placeholder || DEFAULT_PLACEHOLDER}</Text>;
    }
    else if (typeof(values) === 'string' || typeof(values) === 'number') {
        const el = options.find(el => el.value === values);
        value = el ? el.text : values;
    }
    else if (multiple) {
        value = 
            <View style={builderStyles.controls.dropdown.labels.container}>
                    {values.map((val) => {
                        const el = options.find(el => el.value === val);
                        return el && <ThemedView style={builderStyles.controls.dropdown.labels.backdrop}>
                            <Text children={el.text} style={builderStyles.controls.dropdown.labels.text}/>
                        </ThemedView>
                    })}
            </View>;
    }

    return {value};
};

export default class DWKitDropdown extends React.Component {   
    constructor(props) {
        super(props);
        const initialOptions = Array.isArray(props.options) ? props.options : [];
        if (props.clearable)
            initialOptions.unshift({text: '', value: undefined});

        const initialIds = getSelectedIndex(props.value, initialOptions, props.multiple)
        const initialValue = getSelectedValues(initialIds, initialOptions, props.multiple)
        this.state = {
            //options: initialOptions,
            ids: initialIds,
            value: initialValue,
            preview: getSelectedPreview(initialValue, initialOptions, props.multiple, props.placeholder),
        }

        this.onValueChange = props.onValueChange;
        if (props.onChange) {
            this.onValueChange = props.onChange;
        }
    }

    onSelect(index) {
        const [state, props] = [this.state, this.props];
        const value = getSelectedValues(index, props.options, props.multiple);
        this.props.onSelect && this.props.onSelect(index);
        this.onValueChange(value);
        this.setState({value: value});
        this.setState({ids: getSelectedIndex(value, props.options, props.multiple)})
        this.setState({preview: getSelectedPreview(value, props.options, props.multiple, props.placeholder)});
    }

    onChangeText(query) {
        const { options } = this.props;
        this.setState({preview: {value: query}});
        this.setState({options: query 
            ? options.filter(item => item.text && item.text.toLowerCase().includes(query.toLowerCase()))
            : options});
    }

    componentDidUpdate() {        
        const [props, state] = [this.props, this.state];
        
        if(!isEqual(state.value, props.value) || !isEqual(state.options, props.options)){
            const indexes = getSelectedIndex(props.value, props.options, props.multiple);
            const values = getSelectedValues(indexes, props.options, props.multiple);
            this.setState({
                options: props.options,
                value: props.value,
                ids: indexes,
                preview: getSelectedPreview(values, props.options, props.multiple, props.placeholder)
            });
        }
    }

    render() {
        const me = this;
        const props = this.props;
        const style = StyleSheet.flatten([builderStyles.controls.dropdown.select, props.style]);

        const Container = props.search ? Autocomplete : Select;
        const Item = props.search ? AutocompleteItem : SelectItem;
        // todo style
        return <Container
            status={this.props.error ? "danger" : undefined}
            label={props.label}
            style={style}
            {...this.props}
            multiSelect={props.multiple}
            placeholder={props.placeholder || ""} //|| DEFAULT_PLACEHOLDER}
            selectedIndex={this.state.ids}
            {...this.state.preview}
            prompt={props.placeholder}
            onSelect={this.onSelect.bind(this)} 
            onChangeText={this.onChangeText.bind(this)}>
            {this.props.options.map((item) => {
                let icon;
                // if (item.icon) {
                //     icon = {
                //         accessoryLeft: (props) => <Icon size={16} name={me.getMaterialCommunityIconsIcon(item.icon)} />
                //     }
                // }

                let title = item.text || item.title;
                if(!title){
                    if(typeof item == "string")
                        title = item;
                    else
                        title = "";
                }

                return <Item key={title} title={title} {...icon}/>
            }
            )}
        </Container>;
    }

    getMaterialCommunityIconsIcon(icon){
        if(icon == "lightning"){
             return "language-javascript";
        }
        if(icon == "browser")
            return "file-document-outline";
        return icon;
    }
}
