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
});
