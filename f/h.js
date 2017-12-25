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

module.exports = {
  main : function() {
   
    log(
      '\nUsage: beesight <feature>'
      +'\nwhere <feature> is on of:'
      +'\n\trct, v, h'
      +'\n'
      +'\n\tbeesight rct\tgenerate react native project template.'
      +'\n\tbeesight h\thelp.'
      +'\n\tbeesight v\tversion.'

      );


  }

};
