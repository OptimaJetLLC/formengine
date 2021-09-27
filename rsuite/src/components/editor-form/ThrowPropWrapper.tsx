import React from 'react';

export default ({ children, ...propsToThrow }: any) => {
    const recursiveCloneChildren = (children: any, props?: any) => {
        return React.Children.map(children, child => {
            if (typeof child === 'object') return child;
            const childProps = propsToThrow;
            childProps.children = recursiveCloneChildren(child.props.children);
            return React.cloneElement(child, childProps);
        });
    };
    return recursiveCloneChildren(children, propsToThrow);
}
