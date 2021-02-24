import React from 'react';
import { Popup } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('popup', options => {
    return <Popup key={options.key} trigger={options.trigger} on={options.popupOn} position={options.popupPosition}
                  className={options.className} header={options.header} content={options.content}/>
});
