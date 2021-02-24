/* eslint-disable no-new-func */

import React from 'react';
import { isDefined, isUndefined, register } from 'optimajet-builder-shared';
import { ButtonGroup, Text } from 'react-native-elements';
import StaticHtml from './static-html.jsx';
import { View } from 'react-native';
import Link from './link.jsx';

function toButton(item) {
    return { element: item };
}

function MenuHeader(props) {
    return (<Text {...props}/>);
}

function MenuItem(props) {
    const style = props.active === true ? { fontWeight: '600' } : {};
    return (<View {...props}>
        <Text style={[props.style, style]}>{props.label}</Text>
        {props.children}
    </View>);
}

function Menu(props) {
    return (<ButtonGroup {...props}/>);
}

register('menu-group', options => {

    function renderItems(items, keyPrefix) {
        let children = [];
        if (isUndefined(keyPrefix)) {
            keyPrefix = '';
        }

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            if (isDefined(item.visibleCondition) && item.visibleCondition !== null && item.visibleCondition !== '') {
                let args = '';
                let body = 'return ' + item.visibleCondition;
                try {
                    if (!new Function(args, body)()) {
                        continue;
                    }
                }
                catch (e) {
                }
            }

            let key = String(keyPrefix) + String(i);
            let titleSpan = (<StaticHtml content={item.title}/>);
            if (Array.isArray(item.children) && item.children.length > 0) {
                children.push(toButton(() => <MenuItem key={key}>
                    <MenuHeader>{titleSpan}</MenuHeader>
                    <Menu buttons={renderItems(item.children, key + '_')}/>
                </MenuItem>));
            }
            else {
                let content = options.props.link ?
                    <Link style={{ color: 'inherit' }} href={item.target}
                          onPress={options.handleItemClick2.bind(
                              options.me,
                              { name: item.target }
                          )}>{titleSpan}</Link> :
                    titleSpan;

                if (options.props.link) {
                    children.push(toButton(() =>
                        <MenuItem key={key} name={item.target}
                                  active={options.state.activeitem === item.target}>{content}
                        </MenuItem>));
                }
                else {
                    children.push(toButton(() =>
                        <MenuItem key={key} name={item.target}
                                  active={options.state.activeitem === item.target}
                                  onPress={options.handleItemClick}>{content}</MenuItem>));
                }
            }
        }
        return children;
    }

    let controlProps = {};
    for (let p in options.props) {
        if (p === 'data-items' || p === 'activeItem' || p === 'handleEvent' || p === 'link') {
            continue;
        }
        controlProps[p] = options.props[p];
    }
    controlProps.buttons = renderItems(options.items);

    // todo style
    return (<ButtonGroup {...controlProps}/>);
});
