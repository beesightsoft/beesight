#!/usr/bin/env node
'use strict'
/*
LIBS
chalk – colorizes the output https://www.npmjs.com/package/chalk
chalk-printer - print colored message in the console https://www.npmjs.com/package/chalk-printer
clear – clears the terminal screen https://www.npmjs.com/package/clear
clui – draws command line tables, gauges and spinners https://www.npmjs.com/package/clui
figlet – creates ASCII art from text https://www.npmjs.com/package/figlet
inquirer – creates interactive command line user interface https://www.npmjs.com/package/inquirer
minimist – parses argument options https://www.npmjs.com/package/minimist

lodash – JavaScript utility library https://www.npmjs.com/package/lodash
simple-git – runs Git commands in a Node.js application https://www.npmjs.com/package/simple-git
shelljs - https://www.npmjs.com/package/shelljs
replace - https://www.npmjs.com/package/replace
gradlejs - https://github.com/ninetwozero/gradle-to-js

print.ok('hello world')
print.warn('hello world')
print.error('hello world')
print.trace('hello world')
print.log('hello world')

*/

const chalk = require('chalk')
const print = require('chalk-printer')
const clear = require('clear')
const figlet = require('figlet')
const minimist = require('minimist')
const _ = require('lodash')
const files = require('./lib/files')
const shell = require('shelljs')

const log = console.log

clear()
log(chalk.yellow(figlet.textSync('beesight', {horizontalLayout: 'full'})))
var program = require('commander');
program
    .usage('<command> [params]')
    .option('-v, --versions', 'Version')
    .option('-h, --helps', 'Help')
    .option('-u, --util [params]', 'Run util function', /^(font|avd)$/i)
    .option('-g, --generate [params]', 'Generate template', /^(rct|flutter|android)$/i)
    .option('-m, --modify [params]', 'Modify/Update project', /^(rct|flutter|android)$/i)
    .allowUnknownOption(true)
    .parse(process.argv);


var feature;
if (program.versions) feature = 'v';
else if (program.util) feature = 'util/' + program.util;
else if (program.generate) feature = 'generate/' + program.generate;
else if (program.modify) feature = 'modify/' + program.modify + "/" + program.args[0];

    var fPath = files.getDirectoryBase() + '/f/' + feature + '.js'

    // console.log(fPath);

    if (files.fileExists(fPath)) {
        try {
            require(fPath).main()
        } catch (err) {
            print.error(err)
        }
    } else {
        print.error('Feature is not found!!! Carefully, ok')
        try {
            require(files.getDirectoryBase() + '/f/h.js').main()
        } catch (e) {
        }
}
