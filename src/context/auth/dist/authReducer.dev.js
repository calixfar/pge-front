"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = require("../../types/auth");

var _alert = require("../../types/alert");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(state, action) {
  switch (action.type) {
    case _auth.REGISTRO_EXITOSO:
    case _auth.LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return _objectSpread({}, state, {
        auth: true,
        msg: null,
        loading: false,
        token: action.payload.token
      });

    case _auth.OBTENER_USUARIO:
      return _objectSpread({}, state, {
        loading: false,
        usuario: action.payload,
        auth: true
      });

    case _auth.LOGIN_ERROR:
    case _auth.REGISTRO_ERROR:
    case _auth.CERRAR_SESION:
      localStorage.removeItem('token');
      return _objectSpread({}, state, {
        token: null,
        usuario: null,
        auth: false,
        loading: false,
        msg: action.payload
      });

    case _alert.SHOW_ALERT:
      return _objectSpread({}, state, {
        alert: true
      });

    case _alert.HIDE_ALERT:
      return _objectSpread({}, state, {
        alert: false
      });

    default:
      return state;
  }
};

exports["default"] = _default;