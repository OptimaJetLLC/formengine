import {Button} from "rsuite";
import {define} from "../features/annotation/define";
import {event, string} from "../features/annotation";
import {setProperty, setValue} from "../features/event/Actions";

export const button = define("Button", Button, {
        children: string.isRequired("Button"),
        //appearance: {title: "Appearance", defaultValue: "default"},
        //title: {title: 'Title', defaultValue: "Button"},
        onClick: event,
        onMouseOver: event,
        onMouseLeave: event,
    },
    [setValue, setProperty]
)

