import React from 'react';
import { Image, SearchBar, Text } from 'react-native-elements';
import { isUndefined, register } from 'optimajet-builder-shared';
import { SectionList, View } from 'react-native';

register('search', options => {

    function renderSectionItem(info) {
        const item = info.item.item;
        return (<View>
            <Text style={{ fontWeight: '500' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Image source={{ uri: item.image }} style={{ width: 32, height: 32 }}/>
            <Text>{item.price}</Text>
        </View>);
    }

    function renderSectionHeader(info) {
        // todo style
        return (<Text h4>{info.section.title}</Text>);
    }

    function convertItems(items) {
        const result = [];
        if (!items) {
            return result;
        }
        for (let item of items) {
            result.push({
                item: item,
                title: item.title,
            })
        }
        return result;
    }

    function convertResults(results, withCategory) {
        if (withCategory !== true) {
            const items = convertItems(results);
            return [
                {
                    title: '',
                    separator: {
                        title: 'Search results',
                    },
                    data: items,
                }
            ];
        }

        const data = [];
        for (let item in results) {
            if (results.hasOwnProperty(item)) {
                const category = results[item];
                const items = convertItems(category.results);
                data.push({
                    title: category.name,
                    separator: category,
                    data: items,
                });
            }
        }
        return data;
    }

    function renderResults() {
        if (isUndefined(options.state.results) || options.state.results === null) {
            return undefined;
        }

        const data = convertResults(options.state.results, options.controlProps.category);
        // todo style
        return <SectionList sections={data}
                            keyExtractor={(item, index) => item + index}
                            renderItem={(info) => renderSectionItem(info)}
                            renderSectionHeader={(info) => renderSectionHeader(info)}/>
    }

    return (<View>
        <SearchBar
            {...options.controlProps}
            showLoading={options.state.isLoading}
            onChangeText={text => options.handleSearchChange(null, { value: text })}
            value={options.state.value}
        />
        <View>
            {renderResults()}
        </View>
    </View>);
});
