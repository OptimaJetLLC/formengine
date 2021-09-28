import {ReactNode} from "react";
import {makeAutoObservable} from "mobx";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: {[key: string]: any} = {}
    //props: T
    children?: [ReactNode]

    constructor(key: string, type: string) {
        this.key = key
        this.type = type
        //this.props = props
        makeAutoObservable(this);
    }
}
