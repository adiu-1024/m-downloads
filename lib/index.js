"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _download = _interopRequireDefault(require("./download"));

var download = function download(config) {
  return new _download["default"](config);
};

var _default = download;
exports["default"] = _default;