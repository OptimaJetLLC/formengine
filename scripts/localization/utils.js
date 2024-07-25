import fs from 'fs';
import {each, forIn, isArray, isEmpty, isPlainObject, isUndefined, keys, sortBy} from 'lodash-es';
import stringify from 'json-stable-stringify';

function saveToFile(path, obj) {
  const windowsContent = stringify(obj, {space: '  '}).replaceAll('\n', '\r\n');
  const buffer = Buffer.from(String(windowsContent) + '\n', 'utf8');
  fs.writeFileSync(path, buffer);
}

const isObject = val => isArray(val) || isPlainObject(val)

function objectKeys(object, result = []) {
  for (let key in object) {
    if (isObject(object[key]))
      objectKeys(object[key], result);
    else result.push(key);
  }
  return result;
}

function objectValues(object, result = []) {
  if (isObject(object))
    forIn(object, val => objectValues(val, result))
  else result.push(object);
  return result;
}

function flattenArrayToObject(array, object, key = null, iterator = {i: 0}) {
  if (key === null || isObject(object[key])) {
    for (let key2 in object[key] ?? object) {
      flattenArrayToObject(array, object[key] ?? object, key2, iterator);
    }
  } else {
    object[key] = array[iterator.i];
    iterator.i += 1;
  }
}

function diffByKeys(referenceObject, targetObject) {
  return Object.entries(referenceObject).reduce((result, [key, value]) => {
    if (isPlainObject(value)) {
      const diffResult = diffByKeys(value, targetObject[key] || {})
      if (!isEmpty(diffResult)) result[key] = diffResult;
    } else if (isUndefined(targetObject[key])) {
      result[key] = value;
    }
    return result;
  }, {});
}


function hasObsolete(referenceObject, targetObject) {
  return objectKeys(targetObject)?.length > objectKeys(referenceObject)?.length
}

function removeObsolete(referenceObject, targetObject) {
  return Object.entries(referenceObject).reduce((result, [key, value]) => {
    if (isPlainObject(value)) {
      const filtered = removeObsolete(value, targetObject[key] || {})
      if (!isEmpty(filtered)) result[key] = filtered;
    } else if (!isUndefined(referenceObject[key])) {
      result[key] = targetObject[key];
    }
    return result;
  }, {});
}

function sortObject(object) {
  const sortedObj = {};
  const objectKeys = sortBy(keys(object), key => key);

  each(objectKeys, key => sortedObj[key] =
    isObject(object[key]) ? sortObject(object[key]) : object[key]
  );

  return sortedObj;
}

export {saveToFile, objectValues, objectKeys, flattenArrayToObject, diffByKeys, sortObject, hasObsolete, removeObsolete}
