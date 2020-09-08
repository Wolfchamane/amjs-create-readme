# @amjs/create-readme 0.1.4

> Allows to create the README.md file of a project

## Installation

```bash
$ npm i @amjs/create-readme
```
## Usage

Declare an additional script in your `package.json` file:
```json
{
    "scripts": {
        "doc": "node node_modules/@amjs/create-index"
    }
}
```

| Options | Description |
|:---:|:--- |
| `--d`, `-docs`, `-partials` | Additional [Handlebars]() templates to add into README file |
