"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_QUESTION = exports.API_STUDENT_LOGIN = exports.API_ADMIN_LOGIN = exports.API_ANSWER = exports.API_STUDENT = void 0;
var HOST = "https://www.sani.live"; // const HOST = "http://localhost:5000";

var API_STUDENT = HOST + "/student";
exports.API_STUDENT = API_STUDENT;
var API_ANSWER = HOST + "/answer";
exports.API_ANSWER = API_ANSWER;
var API_ADMIN_LOGIN = HOST + "/admin/login";
exports.API_ADMIN_LOGIN = API_ADMIN_LOGIN;
var API_STUDENT_LOGIN = HOST + "/student/login";
exports.API_STUDENT_LOGIN = API_STUDENT_LOGIN;
var API_QUESTION = HOST + "/question";
exports.API_QUESTION = API_QUESTION;