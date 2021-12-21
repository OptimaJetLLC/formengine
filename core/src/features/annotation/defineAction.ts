//export default (name: string, func: Function, args?: string[], description?: string) => {

//TODO we can get parameters dynamically https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
export const defineLocalAction = (
    name: string,
    func: (...args: any[]) => any,
    args?: string[],
    description?: string) => ({name, func, args, description})
