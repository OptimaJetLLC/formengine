import {define} from "../features/annotation/define";
import {ReactNode} from "react";
import {reactElements} from "../features/annotation";

interface PageProps {
    children: ReactNode
}

const Page = (props: PageProps) => {

    return (
        <div>
            {props.children}
        </div>
    );
}

export const page = define("Page", Page, {
    children: reactElements
})

