import {ReactNode} from "react";
import {define} from "../utils/define";

export interface ContainerProps {
    children: ReactNode[]
}

export const Container = (props: ContainerProps) => {

    return (
        <div>
            {props.children}
        </div>
    )
}

export const container = define(Container, {
    key: null,
    children: null
})
