import React from 'react';
import { Dimensions, Image, ScrollView, SectionList, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { BaseToolbar, BuilderActions, isDefined, isUndefined } from 'optimajet-builder-shared';
import Draggable from './builder/dnd/draggable.jsx';
import builderStyles from './builder-styles';
import { getDisplayStyle } from './components/renderer/utils';
import builderDragAndDropContext from './builder/drag-and-drop-builder-context';
import { Text as KittenText, Button, Icon, Input } from '@ui-kitten/components';
import { applyStylesToProps } from './utils'

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.searchForm = React.createRef();
    }

    handleChange(value) {
        const newValue = value.toLowerCase();
        this.setState({ value: newValue });
        if (this.props.handleChange) this.props.handleChange(newValue);
    }

    reset() {
        this.handleChange('');
    }

    resetButton(props) {
        applyStylesToProps(props, { transform: 'translateX(-12px)', width: 18, height: 18 });

        return (
            <TouchableOpacity onPress={this.handleChange.bind(this, '')}>
                <Icon {...props} name={this.state.value.length ? 'close-outline' : 'search'} />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={builderStyles.toolbarStyles.searchContainer}>
                <Input
                    onChangeText={nextValue => this.handleChange(nextValue)}
                    placeholder='Search...'
                    value={this.state.value}
                    accessoryRight={this.resetButton.bind(this)}
                    status='control'
                    size='small'
                    appearance='noBorder'
                    style={{ borderWidth: 0, backgroundColor: 0, opacity: this.state.value ? 1 : 0.5 }}
                    textStyle={{ marginLeft: 0 }}
                />
            </View>

        )
    }

}

export default class Toolbar extends BaseToolbar {

    constructor(props) {
        super(props);
        this.state = { ...this.state, filtered: undefined };
        this.searchForm = React.createRef();
    }

    onDrop(item, droppable, element) {
        BuilderActions.add(item, element);
    }

    renderSectionItem(me, info) {
        const item = info.item;
        if (!info.section.separator) info.section.separator = { isexpanded: true };
        const isexpanded = info.section.separator.isexpanded == true;

        let title = item.title;
        if (isDefined(me.props.localization) && isDefined(me.props.localization[item.key])) {
            title = me.props.localization[item.key];
        }

        return (isexpanded && <Draggable onDrop={this.onDrop.bind(this, item)} context={builderDragAndDropContext}>
            <div style={builderStyles.toolbarCssStyles.sectionItem}
                    onDoubleClick={this.onDoubleClick.bind(this, item)}>
                    <View style={builderStyles.toolbarStyles.toolbarTextView}>
                        <Text style={builderStyles.toolbarStyles.sectionText}>{title}</Text>
                    </View>
                    <View style={builderStyles.toolbarStyles.toolbarIconView}>
                        <Icon key="copy" onPress={this.onDoubleClick.bind(this, item)}
                            name='copy' type='font-awesome' {...builderStyles.toolbarIconProps} />
                    </View>
                </div>
        </Draggable>);
    }

    renderSectionHeader(me, info) {
        const item = info.section.separator;

        if (isUndefined(item.isexpanded)) {
            const cookieValue = me.getCookie('toolbar_' + item.key);
            item.isexpanded = isDefined(cookieValue) ? (cookieValue === 'true') : item.defaultopen;
        }

        return (<TouchableOpacity onPress={me.onExpand.bind(me, item, !item.isexpanded)}>
            <View style={builderStyles.toolbarStyles.sectionHeader}>
                <Text style={builderStyles.toolbarStyles.sectionHeaderText}>{info.section.title}</Text>
                <Icon name={item.isexpanded ? 'chevron-down-outline' : 'chevron-right-outline'} style={StyleSheet.flatten(builderStyles.toolbarStyles.sectionIcon)} />
            </View>
        </TouchableOpacity>);
    }

    handleSearchChange(value) {
        const isMatch = el => !el.isseparate && el.title.toLowerCase().includes(value);
        this.setState({
            filtered: value
                ? this.state.items.filter(isMatch)
                : undefined
        });
    }

    render() {
        const items = this.state.filtered ? this.state.filtered : this.state.items;
        let data = [];
        for (let item of items) {
            if (item.isseparate) {
                data.push({
                    title: item.title,
                    separator: item,
                    data: []
                });
            }
            else {
                if (!data.length) {
                    data.push({
                        title: 'Collection',
                        data: []
                    });
                }
                let collection = data[data.length - 1].data;
                collection.push(item);
            }
        }

        return (<ScrollView style={StyleSheet.compose(builderStyles.toolbarStyles.container, {height: Dimensions.get('screen').height})}>
            <SearchForm ref={this.searchForm} handleChange={this.handleSearchChange.bind(this)} />
            {this.state.filtered &&
                <View style={StyleSheet.compose(builderStyles.toolbarStyles.sectionList, { paddingTop: 0 })}>
                    <KittenText style={StyleSheet.flatten([builderStyles.toolbarStyles.sectionHeaderText])} appearance='alternative'>Search results:</KittenText>
                    {!this.state.filtered.length &&
                        <>
                            <KittenText style={StyleSheet.flatten([builderStyles.toolbarStyles.searchResults])} appearance='alternative'>Not found</KittenText>
                            <Button onPress={() => this.searchForm.current.reset()} size='small' appearance='outline' status='control' style={StyleSheet.flatten([builderStyles.toolbarStyles.searchResults])}>Reset</Button>
                        </>
                    }
                </View>
            }
            <SectionList
                style={builderStyles.toolbarStyles.sectionList} sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={(info) => this.renderSectionItem(this, info)}
                renderSectionHeader={!this.state.filtered && ((info) => this.renderSectionHeader(this, info))}>
            </SectionList>
        </ScrollView>);
    }

}