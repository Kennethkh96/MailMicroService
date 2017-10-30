import { renderTemplate } from '../../Imports/MailRenderer/TemplateRenderer';
import { ApiService } from '../../Imports/ApiService/ApiService';

let dataObject = new ApiService().getDataObj();

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
