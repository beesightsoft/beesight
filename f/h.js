const chalk = require('chalk');
const print = require('chalk-printer');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const minimist = require('minimist');
const Spinner = require('clui').Spinner;
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const replace = require('replace-in-file');
const files       = require('../lib/files');

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
