"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiService_1 = require("../ApiService/ApiService");
var service = new ApiService_1.ApiService();
function renderTemplate(content) {
    var data = service.getDataObj();
    Object.keys(data).forEach(function (k) {
        var identifier = '[[' + k + ']]';
        content = replaceAll(content, identifier, data[k]);
    });
    return content;
}
exports.renderTemplate = renderTemplate;
function replaceAll(str, identifier, value) {
    while (str.indexOf(identifier) != -1) {
        str = str.replace(identifier, value);
    }
    return str;
}
