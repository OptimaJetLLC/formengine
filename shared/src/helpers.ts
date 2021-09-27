export function isUndefined(variable: any | null | undefined) {
    return typeof variable === 'undefined';
}

export function isDefined(variable: any | null | undefined) {
    return !isUndefined(variable) && variable !== null;
}

export function isNotEmptyString(variable?: string | null | undefined) {
    return isDefined(variable) && variable !== '';
}
