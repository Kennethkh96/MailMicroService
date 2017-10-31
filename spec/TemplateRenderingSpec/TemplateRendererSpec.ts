import { renderTemplate } from '../../Imports/MailRenderer/TemplateRenderer';

let dataObject = {
    'name': 'Kenneth',
    'balance': 100000,
    'owner': 'Chr'
}

describe('RenderTemplate', () => {
    it('can render balance tag', () => {
        let content = renderTemplate('balance: [[balance]]', dataObject);
        expect(content).toBe('balance: ' + dataObject['balance']);
    });

    it('can render name tag', () => {
        let content = renderTemplate('name: [[name]]', dataObject);
        expect(content).toBe('name: ' + dataObject['name']);
    });
});
