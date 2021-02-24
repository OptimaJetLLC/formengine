import React from 'react';
import { FormGroup } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('formgroup', options => {
    return <FormGroup {...options.propsControl}
                children={options.props.children}>
            </FormGroup>;
});
