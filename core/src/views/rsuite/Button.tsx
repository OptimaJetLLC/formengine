import {Button} from "rsuite";
import {define} from "../../features/annotation/utils/define";
import {boolean, event, string} from "../../features/annotation";

export const button = define(Button)
    .props({
        children: string.isRequired("Button"),
        //appearance: {title: "Appearance", defaultValue: "default"},
        //title: {title: 'Title', defaultValue: "Button"},
        onClick: event,
        block: boolean.with({defaultValue: true}),
        //onMouseOver: event,
        //onMouseLeave: event,
    })

