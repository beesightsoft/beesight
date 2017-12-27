const print       = require('chalk-printer');
const pjson       = require('../package.json');

module.exports = {
  main : function() {
	print.ok("beesight: v%s", pjson.version);
  }

};

