const fs            = require('fs');
const Handlebars    = require('handlebars');

/**
 * Running Handlebars, completes a template and returns its content in plain text.
 * @module  @amjs/template
 * @param   {String}    tplPath     Template source path, must end in '.hbs'
 * @param   {Object}    tplContext  Context to apply into template
 * @returns {String|null|undefined} `String` with template output, `null` or `undefined` in case of error.
 */
module.exports = (tplPath = '', tplContext = {}) =>
{
    let error;
    let template;

    if (tplPath.endsWith('.hbs'))
    {
        if (fs.existsSync(tplPath))
        {
            // Build template
            try
            {
                template = fs.readFileSync(tplPath).toString();
                template = Handlebars.compile(template);
                template = template(tplContext);
            }
            catch (e)
            {
                error = e.message;
                template = null;
            }
        }
        else
        {
            error = `"${tplPath}" doesn't exists`;
        }
    }
    else
    {
        error = `"${tplPath}" is not a valid Handlebars file`;
    }

    if (error)
    {
        throw new Error(`[@amjs/templater] ${error}`);
    }

    return template;
};
