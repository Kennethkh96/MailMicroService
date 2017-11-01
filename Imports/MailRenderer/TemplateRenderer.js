"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderTemplate(content, data) {
    if (data === null || data === undefined || content == undefined || content == null)
        return null;
    if ((typeof data) === "string") {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            return null;
        }
    }
    console.log(data);
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
