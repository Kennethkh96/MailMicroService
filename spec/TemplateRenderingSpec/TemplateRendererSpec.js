"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateRenderer_1 = require("../../Imports/MailRenderer/TemplateRenderer");
var ApiService_1 = require("../../Imports/ApiService/ApiService");
var dataObject = new ApiService_1.ApiService().getDataObj();
describe('RenderTemplate', function () {
    it('can render balance tag', function () {
        var content = TemplateRenderer_1.renderTemplate('balance: [[balance]]');
        expect(content).toBe('balance: ' + dataObject['balance']);
    });
    it('can render name tag', function () {
        var content = TemplateRenderer_1.renderTemplate('name: [[name]]');
        expect(content).toBe('name: ' + dataObject['name']);
    });
});
