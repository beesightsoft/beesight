const print = require('chalk-printer')
const shell = require('shelljs')
const inquirer = require('inquirer')

var getEmulatorId = emulatorIds => {
  var choices = []
  for (var i = 0; i < emulatorIds.length; i++) {
    var id = emulatorIds[i]
    choices.push({
      value: id,
      checked: i == 0
    })
  }
  var questions = [
    {
      name: 'emulatorId',
      type: 'list',
      message: 'Choose emulator id:',
      choices: choices
    }
  ]
  return inquirer.prompt(questions)
}

const startEmulator = emId => {
  var options = '-no-snapshot'

  var argv = process.argv.slice(3)
  if (argv.length > 0) {
    options = argv.join(' ')
  }
  var command = 'emulator -avd ' + emId + ' ' + options
  print.log(command)
  shell.exec(command, function(code, stdout, stderr) {
    console.log('Exit code:', code)
    console.log('Program output:', stdout)
    console.log('Program stderr:', stderr)
  })
  process.exit(0)
}
const run = () => {
  print.ok(
    'Start Android emulator. \nMore option detail at: https://developer.android.com/studio/run/emulator-commandline.html'
  )
  var emulatorIds = shell.exec('emulator -list-avds', { silent: true }).stdout
  if (emulatorIds != null && emulatorIds != undefined && emulatorIds.length > 0) {
    emulatorIds = emulatorIds.split(/\r?\n/).filter(Boolean)
  }

  if (emulatorIds.length > 1) {
    getEmulatorId(emulatorIds).then(data => {
      startEmulator(data.emulatorId)
    })
  } else if (emulatorIds.length == 1) {
    startEmulator(emulatorIds[0])
  } else {
    print.error("Don't have any Emulator to start.")
  }
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
