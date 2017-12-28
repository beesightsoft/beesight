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

var chalk       = require('chalk');
var print       = require('chalk-printer');
var clear       = require('clear');
var figlet      = require('figlet');
var minimist    = require('minimist');
var _           = require('lodash');
var files       = require('./lib/files');

const log = console.log;

clear();
log(
	chalk.yellow(
		figlet.textSync('beesight', { horizontalLayout: 'full' })
		)
	);

var argv = minimist(process.argv.slice(2));
// { _: [ 'f_name', 'option' ] }

var feature = argv._[0];
var fPath = files.getDirectoryBase() + '/f/' + feature + '.js';

if(files.fileExists(fPath)){
	try {
		require(fPath).main();
	} catch (err) {
		print.error(err);
	}
}else{
	print.error('Feature is not found!!! Carefully, ok');
}






