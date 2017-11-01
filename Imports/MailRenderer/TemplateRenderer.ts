export function renderTemplate(content: string, data: any)
{
    if (data === null || data === undefined || content == undefined || content == null)
        return null;

    if ((typeof data) === "string")
    {
        try 
        {
            data = JSON.parse(data);
        }
        catch (e)
        {
            return null;
        }
    }

    console.log(data);
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