/* eslint-disable no-new-func */

import React from 'react';
import { isDefined, isUndefined, register, RepeaterControl } from 'optimajet-builder-shared';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from '../edit-control/dwkit/dwkit-button.jsx'
import BuilderContainerWrapper from '../../../builder/react-native/builder-container-wrapper.jsx'
import builderStyles from '../../../builder-styles';

register('repeater', options => {

    function renderItems(data, rowsCount, addContainer) {
        const me = options.me;
        let res = [];
        let index = 0;
        const style = [options.props.slider
            ? builderStyles.repeater.container.horizontal
            : builderStyles.repeater.container.vertical
        ];
        if (options.props.style) style.push(options.props.style);
        if (Array.isArray(data) && data.length > 0) {
            let _keyExtractor = (item, index) => index;

            res.push(<FlatList 
                    data={data}
                    horizontal={options.props.slider}
                    style={style}
                    renderItem={({index, item}) => {
                        return addContainer
                        ? <View key={"r_" + index}>{renderItem(index, item, !index && me.props.controlProps.buildermode)}</View>
                        : renderItem(index, item, !index && me.props.controlProps.buildermode)
                    }
                    }
                    keyExtractor={_keyExtractor}/>);
        }
        else if (options.props.controlProps.buildermode) {
            let itemElement = renderItem(index, {}, index === 0);
            if (isDefined(itemElement)) {
                if (addContainer) {
                    res.push(<View>{itemElement}</View>);
                }
                else {
                    res.push(itemElement);
                }
            }
        }
        else if (!options.state.loading && options.isServerMode) {
            let buttonLabel = options.props.noRecordsLabel;
            if (isUndefined(buttonLabel) || buttonLabel === '') {
                buttonLabel = 'No records. Refresh...';
            }

            let button = (<View key="norecords">
                <Button onPress={() => {
                    options.state.firstLoad = true;
                    options.loadNextPage();
                }} title={buttonLabel}/>
            </View>);
            res.push(button);
        }

        if (!options.state.loading && options.isServerMode && rowsCount > data.length && data.length > 0) {
            let buttonLabel = options.props.loadButtonLabel;
            if (isUndefined(buttonLabel) || buttonLabel === '') {
                buttonLabel = 'Load more...';
            }
            
            style.height = style.height + 40;

            let button = (<View key="loadmore">
                <Button onPress={options.loadNextPage} title={buttonLabel}/>
            </View>);
            res.push(button);
        }

        return <BuilderContainerWrapper>{res}</BuilderContainerWrapper>;
    }

    function renderItem(index, item, includeDropzone) {
        //Checking visible condition in builder mode
        if (!options.props.controlProps.buildermode) {
            if (options.props['item-visibleCondition'] !== '' &&
                options.props['item-visibleCondition'] !== undefined &&
                options.props['item-visibleCondition'] !== null) {
                let args = 'data';
                let body = 'return ' + options.props['item-visibleCondition'];
                try {
                    if (!new Function(args, body)(item)) {
                        return undefined;
                    }
                }
                catch (e) {
                    return undefined;
                }
            }
        }

        let element = undefined;
        const createBuilderDropzone = options.props.controlProps.createBuilderDropzone;

        if (isDefined(options.props.placeholders) &&
            Array.isArray(options.props.placeholders[options.psTemplate]) &&
            options.props.placeholders[options.psTemplate].length > 0) {
            let model = options.props.placeholders[options.psTemplate];
            if (isDefined(model)) {
                element = (
                    <RepeaterControl key={index} parent={options.me} model={model} psTemplate={options.psTemplate}
                                     item={item} controlProps={options.props.controlProps}
                                     includeDropzone={includeDropzone}
                                     errors={Array.isArray(options.props.error) ? options.props.error[index] : undefined}
                                     index={index} handleChange={options.handleChange} data={options.props.data}
                                     parentItem={options.props.model}
                    />);
            }
        }
        else if (includeDropzone && createBuilderDropzone) {
            element = createBuilderDropzone(
                'repeater_dropzone_footer',
                options.props.model.key,
                undefined,
                undefined,
                options.psTemplate
            );
        }

        return element;
    }

    if (options.isServerMode) {
        if (options.state.firstLoad) {
            options.state.firstLoad = false;
            options.loadNextPage();
            return (<View style={options.props.style}>
                {options.state.loading && <ActivityIndicator/>}
            </View>);
        }
    }

    let style = options.props.style;

    if(options.props.childrenView){
        style = StyleSheet.compose(options.props.style, StyleSheet.flatten(builderStyles.containerView[options.props.childrenView]));
    }

    return (<View style={style}>
        {renderItems(options.state.items, options.state.rowsCount)}
        {options.state.loading && <ActivityIndicator/>}
    </View>);
});
