const chalk = require('chalk')
const print = require('chalk-printer')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const files = require('../lib/files')
const opentype = require('opentype.js')

const log = console.log

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

var genFun = (fontFamily, fullName, postScriptName) => {
  return '\t' + fontFamily.padEnd(25) + fullName.padEnd(30) + postScriptName
}

const run = () => {
  var dir = files.getCurrentDirectory() + '/'
  print.ok('Read all font (.ttf, .otf, .ttc) info in current directory: ' + dir)

  var fsReadDir = fs.readdirSync(dir)
  var fileList = []
  fsReadDir.forEach(function(file) {
    var filePath = dir + file
    if (fs.statSync(filePath).isFile() && (file.endsWith('.ttf') || file.endsWith('.otf') || file.endsWith('.ttc'))) {
      try {
        var font = opentype.loadSync(filePath).names
        fileList.push({
          fontFamily: font.fontFamily[Object.keys(font.fontFamily)[0]],
          fullName: font.fullName[Object.keys(font.fullName)[0]],
          postScriptName: font.postScriptName[Object.keys(font.postScriptName)[0]]
        })
      } catch (e) {}
    }
  })

  if (fileList.length > 0) {
    var fileListSorted = fileList.sort(function(a, b) {
      return a.fontFamily > b.fontFamily ? 1 : b.fontFamily > a.fontFamily ? -1 : 0
    })

    log(chalk.blue.bold(genFun('Font Family', 'Full Name', 'Script Name')))
    for (var i = 0; i < fileListSorted.length; i++) {
      var info = fileListSorted[i]
      log(genFun(info.fontFamily, info.fullName, info.postScriptName))
    }
  } else {
    print.ok("beesight doesn't see any font file in this directory.")
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
