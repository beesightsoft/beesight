const print = require('chalk-printer');

const log = console.log;
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

var genFun = (funName, funDesc) => {
    return '\n\t' + funName.padEnd(20) + funDesc;
}

module.exports = {
    main: function () {

        log(
            '\nUsage: beesight <feature>'
            + '\nwhere <feature> is on of:'
            + '\n\trct, rct_reset, rct_appname, rct_appid, v, h, avd'
            + '\n'
            + genFun("h", "Help.")
            + genFun("v", "Version.")
            + genFun("avd", "Start Android emulator.")
            + genFun("rct", "Generate react native project template.")
            + genFun("rct_reset", "Reset cache react native project.")
            + genFun("rct_appname", "Rename react native project.")
            + genFun("rct_appid", "Change app id react-native project.")

        );


    }

};
