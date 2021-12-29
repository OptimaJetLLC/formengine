import {ComponentStore} from "../stores/ComponentStore";
import _ from "lodash";
import {Store} from "../stores/Store";

//TODO can stringify and parse to form
export function getForm(code: string, getForm: (code: string) => any[], store: Store) {
    //this.model = getForm(code);
    if (store.model.components.length > 0) return

    let formHeader = new ComponentStore("header 1", "Header")
    _.set(formHeader, "props.content",  "Application Form")
    _.set(formHeader, "props.subheader", "Make it easier")
    store.model.components.push(formHeader);

    let title = new ComponentStore("title", "Input")
    _.set(title, "props.label",  "Title")
    //this.models.push(title)
    store.model.components.push(title)

    let anotherContainer = new ComponentStore("input container", "Container")
    anotherContainer.children = []
    store.model.components.push(anotherContainer)

    let nameContainer = new ComponentStore("name container", "Container")
    nameContainer.children = []
    anotherContainer.children.push(nameContainer)
    //this.models.push(nameContainer)


    let firstName = new ComponentStore("first name", "Input")
    _.set(firstName, "props.label",  "First Name")
    nameContainer.children.push(firstName)

    let lastName = new ComponentStore("last name", "Input")
    _.set(lastName, "props.label", "Last Name")
    nameContainer.children.push(lastName)

    let type = new ComponentStore("type", "Dropdown")
    _.set(type, "props.label",  "Type")
    _.set(type, "props.data", [
        {label: "Internal", value: "Internal"},
        {label: "External", value: "External"},
        {label: "Direct", value: "Direct"}])
    _.set(type, "props.block",  true)
    store.model.components.push(type)

    let comment = new ComponentStore("comment", "TextArea")
    _.set(comment, "props.label", "Comment")
    _.set(comment, "props.rows",  5)
    store.model.components.push(comment)

    let buttonContainer = new ComponentStore("button container", "Container")
    buttonContainer.children = []
    store.model.components.push(buttonContainer)

    let saveButton = new ComponentStore("save", "Button")
    _.set(saveButton, "props.children",  "Save")
    _.set(saveButton, "props.appearance" , "primary")
    buttonContainer.children.push(saveButton);
    //this.models.push(saveButton);

    let cancelButton = new ComponentStore("cancel", "Button")
    _.set(cancelButton, "props.children", "Cancel")
    buttonContainer.children.push(cancelButton);


}
