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

const log = console.log;


const defaultConfig = {
    remote: "https://github.com/beesightsoft/bss-rct-template.git",
    folderName: "bss-rct-template",
    appName: "BeeSightSoftRCT",
    appId: "com.beesightsoft.rct"
}

const currentDir = files.getCurrentDirectoryBase();

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

var changeAppName = (projectDir, appId, newAppName, currentAppName) => {

    if (newAppName != currentAppName) {
        print.log("Change app name.");

        /*
        Modified
            app.json
            index.js
            package.json
            android/settings.gradle
            android/app/src/main/res/values/strings.xml
            ios/Podfile
            ios/NhanCaoTesresr/AppDelegate.m
            ios/NhanCaoTesresr/Info.plist
            ios/NhanCaoTesresr.xcodeproj/project.pbxproj
            ios/NhanCaoTesresr.xcodeproj/xcshareddata/xcschemes/NhanCaoTesresr.xcscheme
            ios/NhanCaoTesresr.xcodeproj/xcshareddata/xcschemes/NhanCaoTesresr-tvOS.xcscheme
            ios/NhanCaoTesresr/NhanCaoTesresr.entitlements
            ios/NhanCaoTesresrTests/NhanCaoTesresrTests.m
            storybook/storybook.js
            android/app/src/main/java/com/beesightsoft/rct/MainActivity.java

        Rename
            ios/NhanCaoTesresr/*
            ios/NhanCaoTesresr-tvOS/*
            ios/NhanCaoTesresrTests/*
            ios/NhanCaoTesresrTests-tvOSTests/*

        Remove pod files
            ios/NhanCaoTesresr.xcworkspace
            ios/Podfile.lock
            ios/Pods

         */
        //Remove pod files & node modules
        try {
            shell.rm('-rf', projectDir + '/ios/' + currentAppName + '.xcworkspace');
            shell.rm('-rf', projectDir + '/ios/' + currentAppName + "-tvOS");
            shell.rm('-rf', projectDir + '/ios/' + currentAppName + "Tests-tvOSTests");
            shell.rm('-rf', projectDir + '/ios/' + currentAppName + '.xcodeproj/xcshareddata/xcschemes/' + currentAppName + '-tvOS.xcscheme');
            shell.rm('-rf', projectDir + '/ios/Pods');
            shell.rm('-rf', projectDir + '/ios/Podfile.lock');
            shell.rm('-rf', projectDir + '/node_modules')
        } catch (e) {
            print.warn(e);
        }

        //Rename folder name
        files.renamePath(projectDir + '/ios/' + currentAppName, projectDir + '/ios/' + newAppName);
        files.renamePath(projectDir + '/ios/' + currentAppName + "Tests", projectDir + '/ios/' + newAppName + "Tests");

        //Rename file name
        files.renamePath(projectDir + '/ios/' + currentAppName + '.xcodeproj', projectDir + '/ios/' + newAppName + '.xcodeproj');
        files.renamePath(projectDir + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + currentAppName + '.xcscheme',
            projectDir + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + newAppName + '.xcscheme');

        files.renamePath(projectDir + '/ios/' + newAppName + '/' + currentAppName + '.entitlements',
            projectDir + '/ios/' + newAppName + '/' + newAppName + '.entitlements');
        files.renamePath(projectDir + '/ios/' + newAppName + 'Tests/' + currentAppName + 'Tests.m',
            projectDir + '/ios/' + newAppName + 'Tests/' + newAppName + 'Tests.m');

        //Replace content file
        try {
            replace({
                regex: currentAppName,
                replacement: newAppName,
                paths: [
                    projectDir + '/app.json',
                    projectDir + '/index.js',
                    projectDir + '/package.json',
                    projectDir + '/storybook/storybook.js',
                    projectDir + '/android/settings.gradle',
                    projectDir + '/android/app/src/main/java/' + appId.split('.').join('/') + '/MainActivity.java',
                    projectDir + '/android/app/src/main/res/values/strings.xml',
                    projectDir + '/ios/Podfile',
                    projectDir + '/ios/' + newAppName + '/AppDelegate.m',
                    projectDir + '/ios/' + newAppName + '/Info.plist',
                    projectDir + '/ios/' + newAppName + '.xcodeproj/project.pbxproj',
                    projectDir + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + newAppName + '.xcscheme',
                    projectDir + '/ios/' + newAppName + 'Tests/' + newAppName + 'Tests.m'
                ],
                recursive: true,
                silent: false,
            });
        } catch (e) {
            print.warn(e);
        }

        print.ok("Update app name successfully.");
        return true;
    } else {
        print.log("App name does not change.");
        return false;
    }

}

var changeAppId = (folderName, appName, newAppId, currentAppId) => {
    if (newAppId != currentAppId) {
        print.log("Update app id: " + newAppId);

        replace({
            regex: currentAppId,
            replacement: newAppId,
            paths: [
                currentDir + '/' + folderName + '/ios/' + appName + '.xcodeproj/project.pbxproj',
                currentDir + '/' + folderName + '/android/app/build.gradle',
                currentDir + '/' + folderName + '/android/app/BUCK',
                currentDir + '/' + folderName + '/android/app/src/main/AndroidManifest.xml',
                currentDir + '/' + folderName + '/android/app/src/main/java/' + currentAppId.split('.').join('/') + '/MainActivity.java',
                currentDir + '/' + folderName + '/android/app/src/main/java/' + currentAppId.split('.').join('/') + '/MainApplication.java',
            ],
            recursive: true,
            silent: false,
        });

        const srcPath = currentDir + '/' + folderName + '/android/app/src/main/java';
        const currPath = srcPath + '/com/beesightsoft/rct/';
        const newPath = srcPath + '/' + newAppId.split('.').join('/') + '/';
        const tmpPath = currentDir + '/' + folderName + '/android/_tmp/';

        log("newPath", newPath);
        print.log("Change android package folder.");

        shell.mv(currPath, tmpPath);
        shell.rm('-rf', srcPath + '/com/');

        shell.mkdir('-p', newPath);
        shell.mv(tmpPath + "*", newPath);
        shell.rm('-rf', tmpPath);

        print.ok("Update app id successfully.");
        return true;
    } else {
        print.log("App id does not change.");
        return false;
    }
}

var run = () => {
    print.log("React native project template.");

    shell.exec("git clone " + defaultConfig.remote + " " + defaultConfig.folderName);
    shell.cd(defaultConfig.folderName);
    shell.exec("git remote rm origin");

    //update appName
    defaultConfig.appName = require(currentDir + '/' + defaultConfig.folderName + '/package.json').name

    getConfig(defaultConfig, (data) => {

        print.log('Default config');
        log(defaultConfig);
        print.log('New config');
        log(data);

        shell.cd("../");
        var change = changeFolderName(data.folderName, defaultConfig.folderName);
        change |= changeAppId(data.folderName, defaultConfig.appName, data.appId, defaultConfig.appId);

        shell.cd(data.folderName);
        change |= changeAppName(currentDir + '/' + data.folderName, data.appId, data.appName, defaultConfig.appName);

        if(change){
            shell.exec("git add -A .");
            shell.exec("git commit -m 'update config'" );
        }

        print.ok('Finish install.');
        print.log('===> Next step'
            + '\n\t- cd to \'%s\' folder'
            + '\n\t- Install dependencies by command \'npm i\'', data.folderName);

    });
}

module.exports = {
    main: function () {
        try {
           // run();
        } catch (err) {
            print.error(err);
        }

    }

};
