var print       = require('chalk-printer');
var pjson       = require('../package.json');

module.exports = {
  main : function() {
	print.ok("beesight: v%s", pjson.version);
  }

};

