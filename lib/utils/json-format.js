'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function evil(fn) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}
var isJson = exports.isJson = function isJson(obj) {
  try {
    obj = JSON.parse(obj);
  } catch (error) {
    obj = obj;
  }
  var isjson = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
  return isjson;
};
var jsonToString = exports.jsonToString = function jsonToString(json) {
  json = JSON.stringify(json, function (key, val) {
    if (typeof val === 'function') {
      return val + '';
    }
    return val;
  });
  return json;
};
var stringToJson = exports.stringToJson = function stringToJson(json) {
  json = JSON.parse(json, function (key, val) {
    if (typeof val === 'string') {
      if (val.indexOf && val.indexOf('function') > -1) {
        return evil('(function(){return ' + val + ';})()');
      }
    }
    return val;
  });
  return json;
};