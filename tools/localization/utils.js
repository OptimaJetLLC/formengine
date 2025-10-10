import fs from 'fs';
import stringify from 'json-stable-stringify';

const isUndefined = (v) => typeof v === 'undefined';

const isPlainObject = (v) => v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype;

const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === 'string') return v.length === 0;
  if (Array.isArray(v)) return v.length === 0;
  if (v instanceof Map || v instanceof Set) return v.size === 0;
  if (typeof v === 'object') return Object.keys(v).length === 0;
  return false;
}

const sortBy = (arr, iteratee) => [...arr].sort((a, b) => {
  const ka = iteratee(a);
  const kb = iteratee(b);
  return ka < kb ? -1 : ka > kb ? 1 : 0;
});

const forIn = (obj, fn) => {
  for (const k in obj) fn(obj[k], k);
};

function saveToFile(path, obj) {
  const windowsContent = stringify(obj, {space: '  '}).replaceAll('\n', '\r\n');
  const buffer = Buffer.from(String(windowsContent) + '\n', 'utf8');
  fs.writeFileSync(path, buffer);
}

const isObject = val => Array.isArray(val) || isPlainObject(val)

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
  const objectKeys = sortBy(Object.keys(object), key => key);

  objectKeys.forEach(key => sortedObj[key] =
    isObject(object[key]) ? sortObject(object[key]) : object[key]
  );

  return sortedObj;
}

const extractPlaceholders = text => {
  const matches = [...text.matchAll(/\{\{([^{}]+)\}\}/g)]
  const result = new Set([])

  matches.forEach(m => {
    result.add(m[0]);
  })

  return Array.from(result.values());
}

function wrapPlaceholders(text) {
  return text.replace(/\{\{([^}]+)\}\}/g, '<span translate="no">{{$1}}</span>');
}

function stripSpanTags(text) {
  return text.replace(/<span\s+translate\s*=\s*["']?no["']?\s*>({{[^}]+}})<\/span>/gi, '$1');
}

export {
  saveToFile,
  objectValues,
  objectKeys,
  flattenArrayToObject,
  diffByKeys,
  sortObject,
  hasObsolete,
  removeObsolete,
  extractPlaceholders,
  wrapPlaceholders,
  stripSpanTags
}
