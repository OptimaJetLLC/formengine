import React from 'react';
import { Menu } from 'semantic-ui-react';
import { isDefined, isUndefined, register } from 'optimajet-builder-shared';

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
            let titleSpan = <span dangerouslySetInnerHTML={{ __html: item.title }}/>;
            if (Array.isArray(item.children) && item.children.length > 0) {
                children.push(<Menu.Item key={key}>
                    <Menu.Header>{titleSpan}</Menu.Header>
                    <Menu.Menu>
                        {renderItems(item.children, key + '_')}
                    </Menu.Menu>
                </Menu.Item>);
            }
            else {
                let content = options.props.link ?
                    <a style={{ color: 'inherit' }} href={item.target}
                       onClick={options.handleItemClick2.bind(options.me, { name: item.target })}>{titleSpan}</a> :
                    titleSpan;

                if (options.props.link) {
                    children.push(<Menu.Item
                        key={key}
                        name={item.target}
                        active={options.state.activeitem === item.target}>{content}</Menu.Item>);
                }
                else {
                    children.push(<Menu.Item
                        key={key}
                        name={item.target}
                        active={options.state.activeitem === item.target}
                        onClick={options.handleItemClick}>{content}</Menu.Item>);
                }
            }
        }
        return children;
    }

    const children = renderItems(options.items);

    let controlProps = {};
    for (let p in options.props) {
        if (p == 'data-items' || p == 'activeItem' || p == 'handleEvent' || p == 'link') {
            continue;
        }
        controlProps[p] = options.props[p];
    }

    return (<Menu {...controlProps}>
        {children}
    </Menu>);
});
