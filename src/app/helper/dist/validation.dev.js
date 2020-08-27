"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = validateEmail;
exports.checkNonEmpty = void 0;

var checkNonEmpty = function checkNonEmpty(str) {
  return str.length > 0;
};

exports.checkNonEmpty = checkNonEmpty;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}