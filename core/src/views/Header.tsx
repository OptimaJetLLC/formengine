import {define} from "../utils/define";

export interface HeaderProps {
    main: {
        content: string
        subheader: string
    }
}

export const Header = (props : HeaderProps ) => {

    return (
        <div style={{textAlign: 'center'}}>
            <h4>{props.main.content}</h4>
            <label>{props.main.subheader}</label>
        </div>
    );
}

export const header = define(Header, {
    "main.content": {title: 'Content', type: 'string', defaultValue: ''},
    "main.subheader": {title: 'Subheader', type: 'string', defaultValue: ''},
    key: {title: 'Key', type: 'string', defaultValue: ''},
    main: null
})
