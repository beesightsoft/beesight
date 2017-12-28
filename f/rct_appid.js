const rct_util = require('../lib/rct_util');
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

const log = console.log;

const defaultConfig = {
    projectPath: "/Users/nhancao/Downloads/bss-rct-template",
    appName: "BeeSightSoftRCT",
    currentAppId: "com.beesightsoft.rct",
    newAppId: "com.app.test",
}

var getProjectPath = () => {

    var questions = [
        {
            name: 'projectPath',
            type: 'input',
            default: defaultConfig.projectPath,
            message: 'Enter project path:',
            filter: function (value) {
                return value.replace(/\s/g, '');
            },
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter project path.';
                }
            }
        }
    ];

    return inquirer.prompt(questions);
}

var getConfig = () => {

    var questions = [
        {
            name: 'newAppId',
            type: 'input',
            default: defaultConfig.newAppId,
            message: 'Enter app id:',
            filter: function (value) {
                return value.replace(/\s/g, '');
            },
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter new app id.';
                }
            }
        }
    ];

    return inquirer.prompt(questions);
}

const run = () => {

    getProjectPath()
        .then((data) => data.projectPath)
        .then((projectPath) => {
            defaultConfig.projectPath = projectPath;
            return rct_util.getAppId(projectPath);
        })
        .then((appId) => {
            defaultConfig.appName = require(defaultConfig.projectPath + '/package.json').name;
            defaultConfig.currentAppId = appId;
            defaultConfig.newAppId = defaultConfig.newAppId + "_" + new Date().getTime() % 100;
            return getConfig();
        })
        .then((data) => {
            print.log("Update to ==> ");
            log("\tProject path: " + defaultConfig.projectPath);
            log("\tApp name: " + defaultConfig.appName);
            log("\tApp id: " + defaultConfig.currentAppId + " -> " + data.newAppId);

            print.log("Clean project");
            rct_util.npmResetSync(defaultConfig.projectPath);
            print.log("Process....");
            rct_util.changeAppIdSync(defaultConfig.projectPath, defaultConfig.appName, data.newAppId, defaultConfig.currentAppId);
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
