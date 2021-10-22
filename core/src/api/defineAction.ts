
//export default (name: string, func: Function, args?: string[], description?: string) => {
import {Action} from "./Types";

//TODO we can get parameters dynamically https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
export default (name: string, func: (...args: any[]) => any, args?: string[], description?: string) => {

    return {name, func, args, description}
}
