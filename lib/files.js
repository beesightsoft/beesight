var fs = require('fs');
var path = require('path');

module.exports = {
  getDirectoryBase : function() {
    return path.dirname(path.dirname(fs.realpathSync(__filename)));
  },

  getCurrentDirectoryBase : function() {
    return path.basename(process.cwd());
  },

  directoryExists : function(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  fileExists : function(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

};