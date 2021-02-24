import React from 'react';
import { Tooltip } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('label', options => {
    return (<Tooltip {...options.propsControl} visible>
            {options.content}
        </Tooltip>);
});
