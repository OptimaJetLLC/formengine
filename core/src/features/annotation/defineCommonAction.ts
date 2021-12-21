
export const defineCommonAction = (
    name: string,
    func: (...args: any[]) => any,
    args?: string[],
    description?: string) => ({name, func, args, description})