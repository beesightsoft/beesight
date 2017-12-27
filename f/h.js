const print = require('chalk-printer');

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
