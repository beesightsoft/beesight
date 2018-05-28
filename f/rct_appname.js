const rct_util = require('../lib/rct_util')
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
const files = require('../lib/files')

const log = console.log

const defaultConfig = {
  projectPath: '',
  appId: 'com.beesightsoft.rct',
  currentAppName: 'BeeSightSoftRCT',
  newAppName: 'BeeSightSoftRCTNew'
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

var getConfig = () => {
  var questions = [
    {
      name: 'newAppName',
      type: 'input',
      default: defaultConfig.newAppName,
      message: 'Enter app name:',
      filter: function(value) {
        return value.replace(/\s/g, '')
      },
      validate: function(value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter new app name.'
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
      return rct_util.getAppId(projectPath)
    })
    .then(appId => {
      defaultConfig.appId = appId
      defaultConfig.currentAppName = require(defaultConfig.projectPath + '/package.json').name
      defaultConfig.newAppName = defaultConfig.currentAppName + '_' + new Date().getTime()
      return getConfig()
    })
    .then(data => {
      print.log('Update to ==> ')
      log('\tProject path: ' + defaultConfig.projectPath)
      log('\tApp id: ' + defaultConfig.appId)
      log('\tApp name: ' + defaultConfig.currentAppName + ' -> ' + data.newAppName)
      print.log('Clean project')
      rct_util.npmResetSync(defaultConfig.projectPath)
      print.log('Process....')
      rct_util.changeAppNameSync(
        defaultConfig.projectPath,
        defaultConfig.appId,
        data.newAppName,
        defaultConfig.currentAppName
      )
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
