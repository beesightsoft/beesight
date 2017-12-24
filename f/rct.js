/*
print.ok('hello world')
print.warn('hello world')
print.error('hello world')
print.trace('hello world')
print.log('hello world')
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
var git         = require('simple-git/promise')();
var touch       = require('touch');
var fs          = require('fs');
var files       = require('../lib/files');

const log = console.log;

module.exports = {
  main : function() {
    var status = new Spinner('Cloning, please wait...');
    status.start();

    const remote = 'https://github.com/beesightsoft/bss-rct-template.git';
    git
    .silent(true)
    .clone(remote, files.getCurrentDirectoryBase())
    .then(() => {
      status.stop();
      print.ok('Finish');
    })
    .catch((err) => {
      status.stop();
      print.error(err);
    })
  }

};
