import * as React from "react";
import {ComponentClass} from "react";

type CompositeComponent<P> =
    | React.ComponentClass<P>
    | React.StatelessComponent<P>;

interface ComponentDecorator<TOwnProps, TMergedProps> {
    (component: CompositeComponent<TMergedProps>): React.ComponentType<TOwnProps>;
}

interface withValidationConfig {

}

export function withValidation<OuterProps extends object>(config: withValidationConfig): ComponentDecorator<OuterProps, OuterProps> {
    return function (Component: CompositeComponent<OuterProps>): ComponentClass<OuterProps> {
        const componentDisplayName =
            Component.displayName ||
            Component.name ||
            (Component.constructor && Component.constructor.name) ||
            'Component';

        class Class extends React.Component<OuterProps, {}> {
            static displayName = `WithValidation(${componentDisplayName})`

            renderComponent = () => <Component {...this.props}/>

            render() {
                return this.renderComponent();
            }
        }

        return Class
    }

}