"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProvider = exports.postProvider = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postProvider = function postProvider(params) {
  return regeneratorRuntime.async(function postProvider$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            _axios["default"].post(params).then(function (res) {
              switch (res.status) {
                case 401:
                  reject({
                    message: "unauthorized."
                  });
                  break;

                case 403:
                  reject({
                    message: "forbidden."
                  });
                  break;

                case 200 || 201:
                  resolve(res);
                  break;

                default:
                  reject({
                    message: "unknown"
                  });
              }
            })["catch"](function (err) {
              console.log("----- over this ----");
              reject(err);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.postProvider = postProvider;

var getProvider = function getProvider(params) {
  return regeneratorRuntime.async(function getProvider$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            _axios["default"].get(params).then(function (res) {
              resolve(res);
            })["catch"](function (err) {
              console.log("----- over this ----", err.message.includes("401"));

              switch (err.status) {
                case 401:
                  reject({
                    message: "unauthorized."
                  });
                  break;

                case 403:
                  reject({
                    message: "forbidden."
                  });
                  break;

                default:
                  reject({
                    message: "unknown"
                  });
              }

              reject(err);
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getProvider = getProvider;