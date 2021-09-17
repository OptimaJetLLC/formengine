import React from 'react';
import { Button } from 'rsuite';

export default function rsButton(props: any) {
    const { content, ...controlProps } = props;
    return (<Button {...controlProps}>{content}</Button>);
}
