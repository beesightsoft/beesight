const rct_util = require('../../../lib/rct_util')
const chalk = require('chalk')
const print = require('chalk-printer')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')
const minimist = require('minimist')
const Spinner = require('clui').Spinner
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const replace = require('replace')
const files = require('../../../lib/files')

const log = console.log

const defaultConfig = {
  projectPath: ''
}

var getProjectPath = () => {
  var questions = [
    {
      name: 'projectPath',
      type: 'input',
      default: defaultConfig.projectPath,
      message: 'Enter project path:',
      filter: function(value) {
        return value.replace(/\s/g, '')
      },
      validate: function(value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter project path.'
        }
      }
    }
  ]

  return inquirer.prompt(questions)
}

const run = () => {
  defaultConfig.projectPath = files.getCurrentDirectory()

  getProjectPath()
    .then(data => data.projectPath)
    .then(projectPath => {
      defaultConfig.projectPath = projectPath
      print.log('Clean project')

      let e = rct_util.npmResetSync(projectPath)
      if (e) {
        print.ok('Finished')
      } else {
        print.error(e)
      }
    })
}

module.exports = {
  main: function() {
    try {
      run()
    } catch (err) {
      print.error(err)
    }
  }
}
