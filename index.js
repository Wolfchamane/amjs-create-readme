#!/usr/bin/env node
const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');
const templater = require('@amjs/templater');

let partialsDir = 'docs';
process.argv.forEach((arg, index) => {
    switch (arg) {
        case '--d':
        case '-docs':
        case '-partials':
            partialsDir = process.argv[index + 1];
            break;
        default:
            break;
    }
});

const cwd = process.cwd();
partialsDir = path.resolve(cwd, partialsDir);

// Get coverage badges
const getBadges = () => {
    const badges = {};
    const coverageIndex = path.resolve(cwd, 'coverage', 'index.html');

    if (fs.existsSync(coverageIndex)) {
        const dom = new JSDOM(fs.readFileSync(coverageIndex).toString());
        const clearfix = dom.window.document.querySelector('.clearfix');
        Array.from(clearfix.querySelectorAll('div.fl')).forEach(node => {
            const key = node.querySelector('.quiet').textContent.trim();
            const value = node.querySelector('.strong').textContent.trim();
            let color = value.match(/\d+/).pop();
            color = Number(color) === 100 ? 'brightgreen' : 'red';
            badges[key] = {
                value,
                color
            };
        });
    } else {
        console.warn('[@amjs/create-index] [WARN]: Missing coverage, badges setup will be avoided');
    }

    return Object.keys(badges)
        .map(
            key =>
                `![${key}](https://img.shields.io/badge/${key}-${encodeURIComponent(badges[key].value)}-${
                    badges[key].color
                }.svg)`
        )
        .join(' ');
};

const packageFile = require(path.resolve(cwd, 'package.json'));

const config = Object.assign({}, packageFile, { badges: getBadges() });

const files = [path.resolve(__dirname, 'src', 'base.hbs')].concat(
    fs.readdirSync(partialsDir).map(file => path.resolve(partialsDir, file))
);

let content = '';
files.filter(file => file.endsWith('.hbs')).forEach(file => (content += templater(file, config)));

fs.writeFileSync(path.resolve(cwd, 'README.md'), content, 'utf-8');
