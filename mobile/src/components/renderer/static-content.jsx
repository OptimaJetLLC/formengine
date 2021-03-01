import React from 'react';
import { isDefined, register } from 'optimajet-builder-shared';
import { Text } from '@ui-kitten/components';
import { removeUnsupportedProps } from './utils';
import StaticHtml from './static-html.jsx';

register('static-content', options => {
    const content = isDefined(options.content) ?
        options.props.content.replace('\n', '<br/>') :
        undefined;
    if (!content) {
        return null;
    }
    removeUnsupportedProps(options.spanProps);
    if (options.props.isHtml) {
        return (<StaticHtml {...options.spanProps} content={options.props.content}/>);
    }
    return <Text {...options.spanProps}>{content}</Text>;
});
