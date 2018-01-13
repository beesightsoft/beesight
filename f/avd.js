const print = require('chalk-printer');
const shell = require('shelljs');
const inquirer = require('inquirer');


var getEmulatorId = (emulatorIds) => {
    var choices = [];
    for (var i = 0; i < emulatorIds.length; i++) {
        var id = emulatorIds[i];
        // if (id != null && id != undefined && id.length > 0) {
        choices.push({
            value: emulatorIds[i],
            checked: i == 0
        });
        // }
    }
    var questions = [{
        name: 'emulatorId',
        type: 'list',
        message: 'Choose emulator id:',
        choices: choices
    }];
    return inquirer.prompt(questions);
}

const startEmulator = (emId) => {
    shell.exec("emulator @" + emId + " -timezone Asia/Ho_Chi_Minh", {async: true});
    process.exit(0);
}
const run = () => {
    print.ok("Start Android emulator");
    var emulatorIds = shell.exec('emulator -list-avds', {silent: true}).stdout;
    if (emulatorIds != null && emulatorIds != undefined && emulatorIds.length > 0) {
        emulatorIds = emulatorIds.split(/\r?\n/).filter(Boolean);
    }

    if (emulatorIds.length > 1) {
        getEmulatorId(emulatorIds).then(data => {
            startEmulator(data.emulatorId);
        });
    } else if (emulatorIds.length == 1) {
        startEmulator(emulatorIds[0]);
    } else {
        print.error("Don't have any Emulator to start.")
    }


}
module.exports = {
    main: function () {
        try {
            run();
        } catch (err) {
            print.error(err);
        }
    }

};

