const fs = require('fs');
const _ = require('lodash-es');
const stringify = require('json-stable-stringify');

function saveToFile(path, obj) {
  const windowsContent = stringify(obj, {space: '  '}).replaceAll('\n', '\r\n');
  const buffer = Buffer.from(String(windowsContent) + '\n', 'utf8');
  fs.writeFileSync(path, buffer);
}

const isObject = val => _.isArray(val) || _.isPlainObject(val)

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
    _.forIn(object, val => objectValues(val, result))
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
  return _.reduce(referenceObject, (result, value, key) => {
    if (_.isPlainObject(value)) {
      const diffResult = diffByKeys(value, targetObject[key] || {})
      if (!_.isEmpty(diffResult)) result[key] = diffResult;
    } else if (_.isUndefined(targetObject[key])) {
      result[key] = value;
    }
    return result;
  }, {});
}


function hasObsolete(referenceObject, targetObject) {
  return objectKeys(targetObject)?.length > objectKeys(referenceObject)?.length
}

function removeObsolete(referenceObject, targetObject) {
  return _.reduce(referenceObject, (result, value, key) => {
    if (_.isPlainObject(value)) {
      const filtered = removeObsolete(value, targetObject[key] || {})
      if (!_.isEmpty(filtered)) result[key] = filtered;
    } else if (!_.isUndefined(referenceObject[key])) {
      result[key] = targetObject[key];
    }
    return result;
  }, {});
}

function sortObject(object) {
  const sortedObj = {};
  const objectKeys = _.sortBy(_.keys(object), key => key);

  _.each(objectKeys, key => sortedObj[key] =
    isObject(object[key]) ? sortObject(object[key]) : object[key]
  );

  return sortedObj;
}

module.exports = {saveToFile, objectValues, objectKeys, flattenArrayToObject, diffByKeys, sortObject, hasObsolete, removeObsolete};
