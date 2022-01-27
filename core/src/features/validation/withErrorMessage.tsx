import * as React from "react";
import {ComponentClass, ComponentType, ReactNode} from "react";
import {FieldMetaProps} from "formik";
import {ErrorMessage} from "./components/ErrorMessage";

interface ComponentDecorator<TOwnProps, TMergedProps> {
    (component: ComponentType<TMergedProps>): React.ComponentType<TOwnProps>;
}

interface withValidationConfig {
    meta: FieldMetaProps<any>,

}

export function withErrorMessage<OuterProps extends object>(config: withValidationConfig): ComponentDecorator<OuterProps, OuterProps> {
    return function (Component: ComponentType<OuterProps>): ComponentClass<OuterProps> {
        const componentDisplayName =
            Component.displayName ||
            Component.name ||
            (Component.constructor && Component.constructor.name) ||
            'Component';

        class Class extends React.Component<OuterProps, {}> {
            static displayName = `WithValidation(${componentDisplayName})`

            renderComponent = () => <Component {...this.props}/>

            render() {
                return <div>
                    {this.renderComponent()}
                    <ErrorMessage {...config.meta}/>
                </div>
            }
        }

        return Class
    }
}

export const WithErrorMessage = ({meta, child}: {meta: FieldMetaProps<any>, child: ReactNode}) => {
  return <div>
      {child}
      <ErrorMessage {...meta}/>
  </div>
}
