const chalk = require('chalk');
const print = require('chalk-printer');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const minimist = require('minimist');
const Spinner = require('clui').Spinner;
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const replace = require('replace');
const files = require('../lib/files');
const rct_util = require('../lib/rct_util');

const log = console.log;


const defaultConfig = {
    remote: "https://github.com/beesightsoft/bss-rct-template.git",
    folderName: "bss-rct-template",
    appName: "BeeSightSoftRCT",
    appId: "com.beesightsoft.rct"
}

const currentDir = files.getCurrentDirectory();

var getConfig = (defaultConfig, callback) => {

    var questions = [
        {
            name: 'folderName',
            type: 'input',
            default: defaultConfig.folderName,
            message: 'Enter folder name:',
            filter: function (value) {
                return value.replace(/\s/g, '');
            },
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter folder name.';
                }
            }
        },
        {
            name: 'appName',
            type: 'input',
            default: defaultConfig.appName,
            message: 'Enter app name:',
            filter: function (value) {
                return value.replace(/\s/g, '');
            },
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter app name.';
                }
            }
        },

        {
            name: 'appId',
            type: 'input',
            default: defaultConfig.appId,
            message: 'Enter app id:',
            filter: function (value) {
                return value.replace(/\s/g, '');
            },
            validate: function (value) {
                log(value);
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter app id.';
                }
            }
        }
    ];

    inquirer.prompt(questions).then(callback);
}

var changeFolderName = (newFolderName, currentFolderName) => {
    if (newFolderName != currentFolderName) {
        print.log("Folder name has been updated.");
        shell.mv(currentDir + '/' + currentFolderName, currentDir + '/' + newFolderName);

        print.ok("Update folder name successfully.");
        return true;
    } else {
        print.log("Folder name does not change.");
        return false;
    }
}

var run = () => {
    print.log("React native project template.");

    shell.exec("git clone " + defaultConfig.remote + " " + defaultConfig.folderName);
    shell.cd(defaultConfig.folderName);
    shell.exec("git remote rm origin");
    shell.cd("../");

    //update appName
    defaultConfig.appName = require(currentDir + '/' + defaultConfig.folderName + '/package.json').name

    getConfig(defaultConfig, (data) => {

        print.log("Update to ==> ");
        log("\tFolder name: " + defaultConfig.folderName + " -> " + data.folderName);
        log("\tApp id: " + defaultConfig.appId + " -> " + data.appId);
        log("\tApp name: " + defaultConfig.appName + " -> " + data.appName);

        var projectPath = currentDir + '/' + data.folderName;

        var change = changeFolderName(data.folderName, defaultConfig.folderName);
        change |= rct_util.changeAppIdSync(projectPath, defaultConfig.appName, data.appId, defaultConfig.appId);
        change |= rct_util.changeAppNameSync(projectPath, data.appId, data.appName, defaultConfig.appName);

        shell.cd(data.folderName);
        if(change){
            shell.exec('git add -A .');
            shell.exec('git commit -m "update config"');
        }
        shell.cd("../");

        print.ok('Finish install.');
        print.log('===> Next step'
            + '\n\t- cd to \'%s\' folder'
            + '\n\t- Install dependencies by command \'npm i\''
            + '\n\t- Build and run android \'react-native run-android\''
            + '\n\t- Build and run ios \'cd ios; pod install; cd ../; react-native run-ios\''
            , data.folderName);

    });
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
