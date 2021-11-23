import {define} from "../features/annotation/define";
import {string} from "../features/annotation";

export interface HeaderProps {
    content: string
    subheader?: string
}

export const Header = (props : HeaderProps ) => {

    return (
        <div style={{textAlign: 'center'}}>
            <h4>{props.content}</h4>
            <label>{props.subheader}</label>
        </div>
    );
}

export const header = define("Header", Header, {
    content: string.isRequired(""),
    subheader: string,
})
