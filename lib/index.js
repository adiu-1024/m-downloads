"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    value: function () {
      var _saveAs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, filename) {
        var blob, el;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                blob = data instanceof Blob ? data : new Blob(data);
                el = document.createElement('a');
                el.download = filename;
                el.href = URL.createObjectURL(blob);
                _context.next = 6;
                return el.dispatchEvent(new MouseEvent('click'));

              case 6:
                _context.next = 8;
                return URL.revokeObjectURL(el.href);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function saveAs(_x, _x2) {
        return _saveAs.apply(this, arguments);
      }

      return saveAs;
    }()
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
          opts = (0, _objectWithoutProperties2["default"])(_this$$options, ["url", "filename", "getProgress"]);
      return fetch(url, _objectSpread({
        mode: 'cors',
        credentials: 'same-origin'
      }, opts)).then(function (response) {
        if (!response.ok) {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        } else {
          filename = filename || decodeURI(response['headers'].get('Content-Disposition').split('filename=')[1]);
          return response;
        }
      }).then( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(response) {
          var totalSize, reader;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(typeof getProgress !== 'function')) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.t0 = _this;
                  _context2.next = 4;
                  return response.blob();

                case 4:
                  _context2.t1 = _context2.sent;
                  _context2.t2 = filename;

                  _context2.t0.saveAs.call(_context2.t0, _context2.t1, _context2.t2);

                  return _context2.abrupt("return", Promise.reject({
                    status: 200,
                    statusText: 'No need to get download progress.'
                  }));

                case 10:
                  totalSize = response['headers'].get('Content-Length') || 0;

                  if (!(totalSize === 0)) {
                    _context2.next = 13;
                    break;
                  }

                  return _context2.abrupt("return", Promise.reject({
                    status: 400,
                    statusText: 'Missing file size for Content-Length field.'
                  }));

                case 13:
                  reader = response.body.getReader();
                  return _context2.abrupt("return", {
                    totalSize: totalSize,
                    reader: reader
                  });

                case 15:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }()).then( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
          var totalSize, reader, receiveSize, chunks, _yield$reader$read, done, value;

          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  totalSize = _ref2.totalSize, reader = _ref2.reader;
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

        return function (_x4) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }]);
  return Download;
}();

var _default = Download;
exports["default"] = _default;