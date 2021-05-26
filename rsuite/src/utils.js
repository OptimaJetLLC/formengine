// import merge from 'deepmerge';

// const dontMerge = (destination, source) => source;

// const mergeDeep = function(target, source) {
//   let result = merge(target, source, { arrayMerge: dontMerge });
//   return result;
// };

const getCookie = (name) => {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const setCookie = (name, value, options) => {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

const getChangedFieldKeys = (oldObject, changedObject) => {
  let result = [];
  Object.keys({...oldObject, ...changedObject}).forEach((key) => {
    if (!changedObject.hasOwnProperty(key) || !oldObject.hasOwnProperty(key) || !_.isEqual(oldObject[key], changedObject[key])) {
      result.push(key);
    }
  });

  return result;
}

const dispatchWindowResize = () => {
  var resizeEvent = window.document.createEvent('UIEvents'); 
  resizeEvent.initUIEvent('resize', true, false, window, 0); 
  window.dispatchEvent(resizeEvent);
}

export { getCookie, setCookie, getChangedFieldKeys, dispatchWindowResize}
