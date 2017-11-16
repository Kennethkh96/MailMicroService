"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateRenderer_1 = require("../../Imports/MailRenderer/TemplateRenderer");
let dataObject = {
    'name': 'Kenneth',
    'balance': 100000,
    'owner': 'Chr'
};
describe('RenderTemplate', () => {
    it('can render balance tag', () => {
        let content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', dataObject);
        expect(content).toBe('balance: ' + dataObject['balance']);
    });
    it('can render name tag', () => {
        let content = TemplateRenderer_1.renderTemplate('name: [[name]]', dataObject);
        expect(content).toBe('name: ' + dataObject['name']);
    });
    it('can render a string of json', () => {
        let dataobj = JSON.stringify(dataObject);
        let content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', dataobj);
        expect(content).toBe('balance: ' + dataObject['balance']);
    });
    it('will not crash if given a bad string of json', () => {
        let obj = 'test testing';
        let content = TemplateRenderer_1.renderTemplate('balance: [[balance]]', obj);
        console.log(content);
        expect(content).toBe(null);
    });
});
