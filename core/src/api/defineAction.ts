
//export default (name: string, func: Function, args?: string[], description?: string) => {
import {Action} from "./Types";

export default (name: string, func: (...args: any[]) => any, args?: string[], description?: string) => {

    return {name, func, args, description}
}
