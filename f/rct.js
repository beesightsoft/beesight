var chalk       = require('chalk');
var print       = require('chalk-printer');
var clear       = require('clear');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var minimist    = require('minimist');
var Preferences = require('preferences');
var Spinner     = require('clui').Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git/promise')();
var touch       = require('touch');
var path        = require('path');
var fs          = require('fs');
var shell       = require('shelljs');
var files       = require('../lib/files');

const log = console.log;

var run = () => {
  print.log("React native project template.");
  var spinner = new Spinner("Cloning, please wait...");
  spinner.start();

  const remote = 'https://github.com/beesightsoft/bss-rct-template.git';
  const repoName = "bss-rct-template";
  git
  .silent(false)
  .clone(remote, repoName)
  .then(() => {
    spinner.stop();
    print.ok('Finish clone.');

    shell.cd(repoName);
    shell.exec("git remote rm origin");

    print.ok('Finish install.');
    print.log('===> Next step'
      +'\n\t- cd to \'%s\' folder'
      +'\n\t- Install dependencies by command \'npm i\'', repoName);
  })
  .catch((err) => {
    spinner.stop();
    print.error(err);
  })
}

module.exports = {
  main : function() {
    try {
      run();
    } catch (err) {
      print.error(err);
    }

  }

};
