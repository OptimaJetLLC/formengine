import {define} from "../utils/define";
import {string} from "../utils/AnnotationBuilder";

export interface HeaderProps {
    content: string
    subheader: string
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
    //"content": {title: 'Content', type: 'string', defaultValue: ''},
    //"subheader": {title: 'Subheader', type: 'string', defaultValue: ''},

    content: string,
    subheader: string,
})
