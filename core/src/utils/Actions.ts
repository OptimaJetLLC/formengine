import defineLocalAction from "../api/defineAction";
import {ComponentStore} from "../stores/ComponentStore";

const setValue = defineLocalAction("setValue", (actionArgs, eventArgs) => {
    let a = 1
    const componentStore: ComponentStore = eventArgs[1];
    actionArgs.target.props.value = actionArgs.param1;
    //let b = args
    debugger
}, ["param1"]);

const setProperty = defineLocalAction("setProperty", (actionArgs, eventArgs) => {
    actionArgs.target.props[actionArgs.propertyName] = actionArgs.value;
    //let b = args
    debugger
}, ["propertyName", "value"]);

export {setValue, setProperty};