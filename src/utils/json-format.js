function evil(fn) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}
export const isJson = function(obj) {
  try {
    obj = JSON.parse(obj);
  } catch (error) {
    obj = obj;
  }
  var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
  return isjson;
};
export const jsonToString = function(json) {
  json = JSON.stringify(json, function(key, val) {
    if (typeof val === 'function') {
      return val + '';
    }
    return val;
  });
  return json;
};
export const stringToJson = function(json) {
  json = JSON.parse(json, function(key, val) {
    if (typeof val === 'string') {
      if (val.indexOf && val.indexOf('function') > -1) {
        return evil('(function(){return ' + val + ';})()');
      }
    }
    return val;
  });
  return json;
};
