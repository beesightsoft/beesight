const print = require('chalk-printer')

const log = console.log
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0 //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ')
    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0, targetLength)
    }
  }
}

var genFun = (funName, funDesc) => {
  return '\n\t' + funName.padEnd(20) + funDesc
}

module.exports = {
  main: function() {
    log(
      '\nUsage: beesight <command> [params]' +
        '\nwhere <command> is on of:' +
        // genFun('h', 'Help.') +
        // genFun('v', 'Version.') +
        // genFun('avd', 'Start Android emulator.') +
        // genFun('font', 'Read font info.') +
        // genFun('rct', 'Generate react native project template.') +
        // genFun('rct_reset', 'Reset cache react native project.') +
        // genFun('rct_appname', 'Rename react native project.') +
        // genFun('rct_appid', 'Change app id react-native project.') +
        // genFun('rct_release_fix', "Fix 'Duplicate file' error when build android release.")
      '\n  Param for -g command: rct (react native), flutter, android'+
      '\n  Param for -m command: rct (react native), flutter, android'+
      '\n  - With react native:' +
          '\n\t+ Reset cache of react native project.'+
          '\n\t+ Rename of react native project.'+
          '\n\t+ Change app id of react-native project.'+
      '\n  Param for -u command:'+
          '\n\t+ avd: run android emulator'+
          '\n\t+ font: Show font information'+
      '\n  Param for -h: Show cli instruction'+
      '\n  Param for -v: Show cli version'
    )
  }
}
