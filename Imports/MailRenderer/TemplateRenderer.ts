import { ApiService } from '../ApiService/ApiService';

let service = new ApiService();

export function renderTemplate(content: string, data: any)
{
    if (data === null || data === undefined)
        return null;

    Object.keys(data).forEach((k: string) => {
        let identifier = '[[' + k + ']]';
        content = replaceAll(content, identifier, data[k]);
    });

    return content;

}

function replaceAll(str: string, identifier: string, value: string)
{
    while (str.indexOf(identifier) != -1) 
    {
        str = str.replace(identifier, value);
    }

    return str;
}