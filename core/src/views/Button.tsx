import {Button} from "rsuite";
import {define} from "../api/define";
import {event, string} from "../api/annotation";
import {setProperty, setValue} from "../utils/Actions";

export const button = define("Button", Button, {
        children: string.isRequired("Button"),
        //appearance: {title: "Appearance", defaultValue: "default"},
        //title: {title: 'Title', defaultValue: "Button"},
        onClick: event,
    },
    [setValue, setProperty]
)

