const print = require('chalk-printer');
const shell = require('shelljs');
const inquirer = require('inquirer');


var getEmulatorId = (emulatorIds) => {
    var choices = [];
    for (var i = 0; i < emulatorIds.length; i++) {
        var id = emulatorIds[i];
        if (id != null && id != undefined && id.length > 0) {
            choices.push({
                value: emulatorIds[i],
                checked: i == 0
            });
        }
    }
    var questions = [{
        name: 'emulatorId',
        type: 'list',
        message: 'Choose emulator id:',
        choices: choices
    }];
    return inquirer.prompt(questions);
}

const run = () => {
    print.ok("Start Android emulator");
    var emulatorIds = shell.exec('emulator -list-avds', {silent: true}).stdout;
    if (emulatorIds != null && emulatorIds != undefined && emulatorIds.length > 0) {
        emulatorIds = emulatorIds.split(/\r?\n/);
    }

    if (emulatorIds.length > 0) {
        getEmulatorId(emulatorIds).then(data => {
            shell.exec("emulator @" + data.emulatorId + " -timezone Asia/Ho_Chi_Minh", {async:true});
            process.exit(0);
        })
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

