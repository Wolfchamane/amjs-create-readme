const assert        = require('assert');
const fs            = require('fs');
const Handlebars    = require('handlebars');
const path          = require('path');
const templater     = require('../index');

// Test invalid templates file extensions
[
    '',
    path.resolve(__dirname, 'index.js')
].forEach(
    file =>
    {
        try
        {
            templater(file);
        }
        catch (e)
        {
            assert.equal(
                e.message === `[@amjs/templater] "${file}" is not a valid Handlebars file`,
                true,
                `Using "${file}" throws an error`);
        }
    }
);

// Test non-existing file path
const ghostFile = path.join(__dirname, 'foo.hbs');
try
{
    templater(ghostFile);
}
catch (e)
{
    assert.equal(
        e.message === `[@amjs/templater] "${ghostFile}" doesn't exists`,
        true,
        `Using "${ghostFile}" throws an error`
    )
}

// Test OK result
const okPath = path.resolve(__dirname, 'tpl.hbs');
const okContext = { value : 'It works!' };
let expectedOK = Handlebars.compile(fs.readFileSync(okPath).toString());
expectedOK = expectedOK(okContext);
assert.equal(templater(okPath, okContext), expectedOK, `"${expectedOK}" is well compiled`);
