import {defineLocalAction} from "../annotation/defineAction";
import {ComponentStore} from "../../stores/ComponentStore";
import {Store} from "../../stores/Store";

const setValue = defineLocalAction("Set value", (actionArgs, eventArgs, c, e) => {
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

const validate = defineLocalAction("Validate", ({}, eventArgs) => {
    let c: Store = eventArgs.store
    c.validateForm()

}, []);

export {setValue, setProperty, validate};