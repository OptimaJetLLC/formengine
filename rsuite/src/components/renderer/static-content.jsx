import React from 'react';
import { isDefined, register } from 'optimajet-builder-shared';

register('static-content', options => {
    if (options.isHtml) {
        return <span {...options.spanProps} dangerouslySetInnerHTML={{ __html: options.content }}/>
    }

    const content = isDefined(options.content) ?
        options.content.replaceAll('\n', '<br/>') :
        undefined;
        
    return <span {...options.spanProps} dangerouslySetInnerHTML={{ __html: content }}/>;
});
