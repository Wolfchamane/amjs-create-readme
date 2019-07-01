# @amjs/templater

Running Handlebars, completes a template and returns its content in plain text.

## Installation

```bash
$ npm i @amjs/templater
```

## Use

Given following [Handlebars](https://handlebarsjs.com/) template:
```handlebars
{{value}}
```

Within your code:
```javascript
const templater = require('@amjs/templater');
console.log(templater('path_to_hbs_file', { value : 'It works!' })); // It works!
```
