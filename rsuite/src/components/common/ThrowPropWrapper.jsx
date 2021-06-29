import React from "react";

export default ({children, ...propsToThrow}) => {
  const recursiveCloneChildren = (children, props) => {
    return React.Children.map(children, child => {
      if(!_.isObject(child)) return child;
      const childProps = propsToThrow;
      childProps.children = recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    })
  }
  return recursiveCloneChildren(children, propsToThrow);
}