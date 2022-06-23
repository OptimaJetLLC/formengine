import {Button} from "rsuite";
import {define} from "../../features/annotation/define";
import {boolean, event, string} from "../../features/annotation";
import {setProperty, setValue, validate} from "../../features/event/actions";

export const button = define("Button", Button, {
    children: string.isRequired("Button"),
    //appearance: {title: "Appearance", defaultValue: "default"},
    //title: {title: 'Title', defaultValue: "Button"},
    onClick: event,
    block: boolean.with({defaultValue: false}),
    //onMouseOver: event,
    //onMouseLeave: event,
}, [setValue, setProperty, validate])

