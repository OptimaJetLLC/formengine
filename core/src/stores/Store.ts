import {action, autorun, computed, makeObservable, observable} from "mobx";
import toModel from "../utils/toModel";
import {ComponentStore} from "./ComponentStore";
import {Node} from "../utils/Node";
import {button} from "../views/Button";
import {container} from "../views/Container";
import {dropdown} from "../views/Dropdown";
import {header} from "../views/Header";
import {input} from "../views/Input";
import {textArea} from "../views/TextArea";
import _ from "lodash";
import React from "react";
import {TreeNode} from "../components/TreeNode";



class Store {
    currentModel: Node | null = null
    models: ComponentStore[] = []

    get tree(): Node {
        let root = new Node()
        root.children = this.models.map(child => new Node(child));
        return root
    }

    constructor() {
        makeObservable(this, {
            currentModel: observable.ref,
            models: observable.shallow,
            //render: computed,
            tree: computed,
            download: action.bound,
            upload: action.bound,
            clear: action.bound,
            fillFormModel: action.bound,
            add: action.bound,

        })

    }

    render() {
        return this.models.map(store => {
            return React.createElement(TreeNode, {key: store.key, store})
        })
    }

    download() {
        var data = "data:text/json;charset=utf-8," + encodeURIComponent(this.getModelSnapshot());

        const link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', "form.json");
        document.body.appendChild(link);
        link.onclick = () => {
            document.body.removeChild(link);
        };
        link.click();
    }

    upload() {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var content: string = readerEvent.target?.result as string ?? ""; // this is the content!

                this.setModelSnapshot(content)
            }

        }

        input.click();
    }

    clear() {
        this.models = [];
    }

    getModelSnapshot() {
        return JSON.stringify(this.models, null, 2)
    }

    setModelSnapshot(jsonString: string) {
        let json = JSON.parse(jsonString);
        //this.models = json.map(toModel)
    }

    add(type: string) {
        console.log(type)
        //console.log(Control[Control[type]])
        //let modelType = this.ModelType[type as any];
        //let key = (Math.random() + 1).toString(36).substring(7);
        //let model = new modelType(key)
        //this.models.push(model)
    }


    //TODO Test section
    fillFormModel(code: string, getForm: (code: string) => any[]) {
        //this.model = getForm(code);
        if (this.models.length > 0) return

        let formHeader = new ComponentStore("header 1", header)
        _.set(formHeader, "props.main.content",  "Application Form")
        _.set(formHeader, "props.main.subheader", "Make it easier")
        this.models.push(formHeader);

        let title = new ComponentStore("title", input)
        _.set(title, "props.main.label",  "Title")
        this.models.push(title)

        let nameContainer = new ComponentStore("name container", container)
        nameContainer.children = []
        this.models.push(nameContainer)

        let firstName = new ComponentStore("first name", input)
        _.set(firstName, "props.main.label",  "First Name")
        nameContainer.children.push(firstName)

        let lastName = new ComponentStore("last name", input)
        _.set(lastName, "props.main.label", "Last Name")
        nameContainer.children.push(lastName)

        let type = new ComponentStore("type", dropdown)
        _.set(type, "props.main.label",  "Type")
        _.set(type, "props.main.data", [
            {label: "Internal", value: "Internal"},
            {label: "External", value: "External"},
            {label: "Direct", value: "Direct"}])
        _.set(type, "props.design.block",  true)
        this.models.push(type)

        let comment = new ComponentStore("comment", textArea);
        _.set(comment, "props.main.label", "Comment")
        _.set(comment, "props.main.rows",  5)
        this.models.push(comment)

        let buttonContainer = new ComponentStore("button container", container)
        buttonContainer.children = []
        this.models.push(buttonContainer)

        let saveButton = new ComponentStore("save", button)
        _.set(saveButton, "props.children",  "Save")
        _.set(saveButton, "props.appearance" , "primary")
        buttonContainer.children.push(saveButton);
        //this.models.push(saveButton);

        let cancelButton = new ComponentStore("cancel", button)
        _.set(cancelButton, "props.children", "Cancel")
        buttonContainer.children.push(cancelButton);

    }
}

export const store = new Store()
