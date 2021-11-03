import {ComponentStore} from "../stores/ComponentStore";
import {header} from "../views/Header";
import _ from "lodash";
import {container} from "../views/Container";
import {input} from "../views/Input";
import {dropdown} from "../views/Dropdown";
import {textArea} from "../views/TextArea";
import {button} from "../views/Button";
import {store} from "../stores/Store";

//TODO can stringify and parse to form
export function getForm(code: string, getForm: (code: string) => any[]) {
    //this.model = getForm(code);
    if (store.model.components.length > 0) return

    let formHeader = new ComponentStore("header 1", header)
    _.set(formHeader, "props.content",  "Application Form")
    _.set(formHeader, "props.subheader", "Make it easier")
    store.model.components.push(formHeader);

    let title = new ComponentStore("title", input)
    _.set(title, "props.label",  "Title")
    //this.models.push(title)
    store.model.components.push(title)

    let anotherContainer = new ComponentStore("input container", container)
    anotherContainer.children = []
    store.model.components.push(anotherContainer)

    let nameContainer = new ComponentStore("name container", container)
    nameContainer.children = []
    anotherContainer.children.push(nameContainer)
    //this.models.push(nameContainer)


    let firstName = new ComponentStore("first name", input)
    _.set(firstName, "props.label",  "First Name")
    nameContainer.children.push(firstName)

    let lastName = new ComponentStore("last name", input)
    _.set(lastName, "props.label", "Last Name")
    nameContainer.children.push(lastName)

    let type = new ComponentStore("type", dropdown)
    _.set(type, "props.label",  "Type")
    _.set(type, "props.data", [
        {label: "Internal", value: "Internal"},
        {label: "External", value: "External"},
        {label: "Direct", value: "Direct"}])
    _.set(type, "props.block",  true)
    store.model.components.push(type)

    let comment = new ComponentStore("comment", textArea);
    _.set(comment, "props.label", "Comment")
    _.set(comment, "props.rows",  5)
    store.model.components.push(comment)

    let buttonContainer = new ComponentStore("button container", container)
    buttonContainer.children = []
    store.model.components.push(buttonContainer)

    let saveButton = new ComponentStore("save", button)
    _.set(saveButton, "props.children",  "Save")
    _.set(saveButton, "props.appearance" , "primary")
    buttonContainer.children.push(saveButton);
    //this.models.push(saveButton);

    let cancelButton = new ComponentStore("cancel", button)
    _.set(cancelButton, "props.children", "Cancel")
    buttonContainer.children.push(cancelButton);


}
