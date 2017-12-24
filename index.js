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
preferences – manage CLI application encrypted preferences https://www.npmjs.com/package/preferences

github – Node wrapper for the GitHub API https://www.npmjs.com/package/github
lodash – JavaScript utility library https://www.npmjs.com/package/lodash
simple-git – runs Git commands in a Node.js application https://www.npmjs.com/package/simple-git
touch – implementation of the *Nix touch command https://www.npmjs.com/package/touch

*/

var chalk       = require('chalk');
var print       = require('chalk-printer')
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var minimist    = require('minimist');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var files       = require('./lib/files');

const log = console.log;

clear();
log(
	chalk.yellow(
		figlet.textSync('beesight', { horizontalLayout: 'full' })
		)
	);

var argv = minimist(process.argv.slice(2));
// { _: [ 'my-repo', 'just a test repository' ] }

var feature = argv._[0];
var fPath = './f/' + feature + '.js';
if(files.fileExists(fPath)){
	try {
		var f = require(fPath);
		print.ok('Running feature: %s', feature);
		f.main();
	} catch (err) {
		print.error(err);
	}
}else{
	print.error('Feature is not found!!! Carefully, ok');
}






