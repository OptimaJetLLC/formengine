function isUndefined(variable) {
    return typeof variable === 'undefined';
}

function isDefined(variable) {
    return !isUndefined(variable) && variable !== null;
}

function isNotEmptyString(variable) {
    return isDefined(variable) && variable !== '';
}

export { isDefined, isUndefined, isNotEmptyString };
