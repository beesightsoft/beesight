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
var shell       = require('shelljs');
var files       = require('../lib/files');

const log = console.log;

module.exports = {
  main : function() {
    var spinner = new Spinner("Cloning, please wait...");
    spinner.start();

    const remote = 'https://github.com/beesightsoft/bss-rct-template.git';
    const repoName = "bss-rct-template";
    git
    .silent(true)
    .clone(remote, repoName)
    .then(() => {
      spinner.stop();
      print.ok('Finish clone.');
      
      print.log("Install dependencies...");
      shell.cd(repoName);
      if (shell.exec('npm i').code !== 0) {
        shell.exit(1);
      }
      print.ok('Finish install.');
    })
    .catch((err) => {
      spinner.stop();
      print.error(err);
    })
  }

};
