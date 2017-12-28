const print = require('chalk-printer');

const log = console.log;

module.exports = {
    main: function () {

        log(
            '\nUsage: beesight <feature>'
            + '\nwhere <feature> is on of:'
            + '\n\trct, rct_reset, rct_appname, v, h'
            + '\n'
            + '\n\tbeesight h\tHelp.'
            + '\n\tbeesight v\tVersion.'
            + '\n\tbeesight rct\tGenerate react native project template.'
            + '\n\tbeesight rct_reset\tReset cache react native project.'
            + '\n\tbeesight rct_appname\tRename react native project.'
        );


    }

};
