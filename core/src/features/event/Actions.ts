import defineLocalAction from "../annotation/defineAction";
import {ComponentStore} from "../../stores/ComponentStore";

const setValue = defineLocalAction("Set value", (actionArgs, eventArgs, c, e) => {
    let a = 1
    const componentStore: ComponentStore = eventArgs[2];
    //actionArgs.target.props.value = actionArgs.param1;
    //let b = args
    debugger
}, ["param1"]);

const setProperty = defineLocalAction("Set property", ({propertyName, value, target}, eventArgs) => {
    target.props[propertyName] = value;
    //let b = args
    debugger
}, ["propertyName", "value"]);

/*const setValue = defineLocalAction("setProperty", ({property, value}, eventArgs) => {
    property = value;
}, ["property", "value"]);*/

export {setValue, setProperty};