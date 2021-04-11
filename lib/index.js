"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
* Binary stream file download
*
* @param {Object} config
* @return {Promise}
*/
var Download = /*#__PURE__*/function () {
  function Download(config) {
    (0, _classCallCheck2["default"])(this, Download);

    if (typeof config === 'string') {
      config = Object.assign({}, {
        url: arguments[0]
      }, arguments[1]);
    }

    this.$options = config;
    return this.fetchFile();
  }

  (0, _createClass2["default"])(Download, [{
    key: "saveAs",
    value: function saveAs(data, filename) {
      var blob = data instanceof Blob ? data : new Blob(data);
      var el = document.createElement('a');
      el.download = filename;
      el.href = URL.createObjectURL(blob);
      el.dispatchEvent(new MouseEvent('click'));
      URL.revokeObjectURL(el.href);
    }
  }, {
    key: "fetchFile",
    value: function fetchFile() {
      var _this = this;

      var _this$$options = this.$options,
          url = _this$$options.url,
          _this$$options$filena = _this$$options.filename,
          filename = _this$$options$filena === void 0 ? null : _this$$options$filena,
          _this$$options$getPro = _this$$options.getProgress,
          getProgress = _this$$options$getPro === void 0 ? null : _this$$options$getPro,
          aside = (0, _objectWithoutProperties2["default"])(_this$$options, ["url", "filename", "getProgress"]);
      return fetch(url, _objectSpread({
        mode: 'cors',
        credentials: 'same-origin'
      }, aside)).then(function (response) {
        var ok = response.ok,
            status = response.status,
            statusText = response.statusText,
            headers = response.headers;

        if (!ok) {
          return Promise.reject({
            status: status,
            statusText: statusText
          });
        } else {
          var contentDisposition = headers.get('Content-Disposition');
          filename = filename || decodeURI(contentDisposition && contentDisposition.split('filename=')[1]);
          return response;
        }
      }).then( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(response) {
          var _yield$response$clone, status, msg;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(typeof getProgress !== 'function')) {
                    _context.next = 21;
                    break;
                  }

                  _context.prev = 1;
                  _context.next = 4;
                  return response.clone().json();

                case 4:
                  _yield$response$clone = _context.sent;
                  status = _yield$response$clone.status;
                  msg = _yield$response$clone.msg;
                  return _context.abrupt("return", Promise.reject({
                    status: status,
                    statusText: msg
                  }));

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](1);
                  _context.t1 = _this;
                  _context.next = 15;
                  return response.clone().blob();

                case 15:
                  _context.t2 = _context.sent;
                  _context.t3 = filename;

                  _context.t1.saveAs.call(_context.t1, _context.t2, _context.t3);

                  return _context.abrupt("return", Promise.reject({
                    status: 200,
                    statusText: 'No need to get download progress.'
                  }));

                case 19:
                  _context.next = 22;
                  break;

                case 21:
                  return _context.abrupt("return", response);

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 10]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()).then( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(response) {
          var headers, stream, totalSize, reader;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  headers = response.headers, stream = response.body;
                  totalSize = headers.get('Content-Length') || 0;

                  if (!(totalSize === 0)) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt("return", Promise.reject({
                    status: 400,
                    statusText: 'Missing file size for Content-Length field.'
                  }));

                case 4:
                  reader = stream.getReader();
                  return _context2.abrupt("return", {
                    totalSize: totalSize,
                    reader: reader
                  });

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }()).then( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
          var totalSize, reader, receiveSize, chunks, _yield$reader$read, done, value;

          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  totalSize = _ref3.totalSize, reader = _ref3.reader;
                  receiveSize = 0, chunks = [];

                case 2:
                  if (!true) {
                    _context3.next = 17;
                    break;
                  }

                  _context3.next = 5;
                  return reader.read();

                case 5:
                  _yield$reader$read = _context3.sent;
                  done = _yield$reader$read.done;
                  value = _yield$reader$read.value;

                  if (done) {
                    _context3.next = 14;
                    break;
                  }

                  chunks.push(value);
                  receiveSize += value.length;
                  getProgress(Number((receiveSize / totalSize * 100).toFixed(2)));
                  _context3.next = 15;
                  break;

                case 14:
                  return _context3.abrupt("break", 17);

                case 15:
                  _context3.next = 2;
                  break;

                case 17:
                  _this.saveAs(chunks, filename);

                case 18:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }]);
  return Download;
}();

var _default = Download;
exports["default"] = _default;