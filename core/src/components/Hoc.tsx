import React from "react";

export function hoc<T extends object>(WrappedComponent: React.ComponentType<T>) {
    const ComponentWithTheme = (props: T) => <WrappedComponent {...props} />;

    return ComponentWithTheme;
}
