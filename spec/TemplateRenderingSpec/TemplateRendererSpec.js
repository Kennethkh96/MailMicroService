"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateRenderer_1 = require("../../Imports/MailRenderer/TemplateRenderer");
var dataObject = {
    'name': 'Kenneth',
    'balance': 100000,
    'owner': 'Chr'
};
describe('RenderTemplate', function () {
    it('can render balance tag', function () {
        var content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', dataObject);
        expect(content).toBe('balance: ' + dataObject['balance']);
    });
    it('can render name tag', function () {
        var content = TemplateRenderer_1.renderTemplate('name: [[name]]', dataObject);
        expect(content).toBe('name: ' + dataObject['name']);
    });
    it('can render a string of json', function () {
        var dataobj = JSON.stringify(dataObject);
        var content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', dataobj);
        expect(content).toBe('balance: ' + dataObject['balance']);
    });
    it('will not crash if given a bad string of json', function () {
        var obj = 'test testing';
        var content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', obj);
        console.log(content);
        expect(content).toBe(null);
    });
});
